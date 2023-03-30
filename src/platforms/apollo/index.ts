import { auth, platform } from '../../sdk';

export default platform('apollo', {
  auth: [
    auth.apiToken({
      display: {
        markdown: `- Please ensure your Apollo API key is a Master Key.
- For detailed steps on how to create your Apollo API key, please see this [tutorial](https://docs.vessel.land/integrations/apollo).`,
      },
    }),
  ],
  display: {
    name: 'Apollo',
    iconURI: 'TBD',
  },
  constants: {},
  client: {} as any,
  actions: {},
});
