import { client } from '@/platforms/workable/client';
import fullIcon from '@/platforms/workable/logos/full';
import boxIcon from '@/platforms/workable/logos/box';
import { auth, platform } from '@/sdk';

    export default platform('workable', {
      auth: auth.apiToken(),
      display: {
        name: 'Workable',
        logos: {
         defaultURI: fullIcon ?? boxIcon,
     fullURI: fullIcon,
     boxURI: boxIcon,
        },
        colors: {
          primary: '#00766a',
        },
        categories: ["other"],
      },
      client,
      constants: {},
      actions: {},
    });
