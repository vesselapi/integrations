import { first, isArray, parallel, sift, tryit } from 'radash';
import { PlatformPermissions } from '../../sdk';
import { client } from './client';
import {
  isSalesforceSupportedObjectType,
  SalesforceSupportedObjectType,
} from './schemas';

// NOTE: These will be used in the UI, so they should be user-friendly.
const USER_PERMISSIONS_API_DISABLED_ERROR_MESSAGE =
  'API access is disabled. Please check with your system administrator.';
const MISSING_OBJECTS_ERROR_MESSAGE =
  'Missing permissions. Please ensure you have access to the following objects: ';

export const makePermissions = (): PlatformPermissions => {
  return {
    validate: async ({ resources, auth }) => {
      const [err, result] = await tryit(client.userPermissions)(auth, {});
      if (err) {
        console.warn({
          message: 'Failed to validate permissions',
          metadata: {
            context: err,
          },
        });
        return {
          errorMessage: USER_PERMISSIONS_API_DISABLED_ERROR_MESSAGE,
          valid: false,
        };
      }
      const {
        data: { records },
      } = result;
      if (!first(records)?.PermissionsApiEnabled) {
        return {
          errorMessage: USER_PERMISSIONS_API_DISABLED_ERROR_MESSAGE,
          valid: false,
        };
      }

      const describe = async (objectType: SalesforceSupportedObjectType) => {
        try {
          return await client.sobjects.describe(auth, { objectType });
        } catch (err) {
          const errBody = (err as any).body;
          const { error } = isArray(errBody) ? errBody[0] : errBody;
          if (
            !['INVALID_TYPE', 'OBJECT_NOT_FOUND', 'NOT_FOUND'].includes(error)
          ) {
            console.warn({
              message: `Unknown permissions error for ${objectType}`,
              error,
              metadata: {
                context: err,
              },
            });
          }
          return {
            data: { createable: false, updateable: false, retrieveable: false },
          };
        }
      };

      const check = async (objectType: string) => {
        // Content Notes aren't available for all accounts.
        if (objectType === 'ContentNote') return null;
        if (!isSalesforceSupportedObjectType(objectType)) return null;

        const {
          data: { createable, updateable, retrieveable },
        } = await describe(objectType);

        // Users and ListViews only need to be retrievable.
        if (objectType === 'User' && retrieveable) return null;
        if (objectType === 'ListView' && retrieveable) return null;

        if (!retrieveable || !createable || !updateable) return objectType;
      };

      const missingObjects = sift(await parallel(5, resources, check));
      if (missingObjects.length === 0) {
        return { errorMessage: null, valid: true };
      }

      return {
        errorMessage: MISSING_OBJECTS_ERROR_MESSAGE + missingObjects.join(', '),
        valid: false,
      };
    },
  };
};

export const permissions = makePermissions();
