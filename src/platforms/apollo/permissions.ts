import { tryit } from 'radash';
import { PlatformPermissions } from '../../sdk';
import { client } from './client';

// NOTE: These will be used in the UI, so they should be user-friendly.
const INVALID_API_TOKEN_MESSAGE = 'Invalid API Token';

export const makePermissions = (): PlatformPermissions => {
  return {
    validate: async ({ auth }) => {
      const [err, result] = await tryit(client.auth.health)(auth, {});
      if (err || !result.data.is_logged_in) {
        console.warn({
          message: 'Failed to validate permissions for Apollo',
          metadata: { error: err, result },
        });
        return {
          valid: false,
          errorMessage: INVALID_API_TOKEN_MESSAGE,
        };
      }
      return {
        valid: true,
        errorMessage: null,
      };
    },
  };
};

export const permissions = makePermissions();
