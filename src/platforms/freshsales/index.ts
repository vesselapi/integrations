import { auth, platform } from '@/sdk';
import { client } from './client';
import fullIcon from '@/platforms/freshsales/logos/full';
import boxIcon from '@/platforms/freshsales/logos/box';

export default platform('freshsales', {
  auth: auth.apiToken({
    questions: [
      { type: 'text', id: 'subdomain', label: 'Organization Subdomain' },
    ],
    display: {
      markdown: () =>
        `- Login to Freshsales to find your Organization Subdomain. In your address bar, the subdomain is the first part of the URL. For example, if your URL is https://example-org.myfreshworks.com, your subdomain is "example-org" without quotes.`,
    },
  }),
  display: {
    name: 'Freshsales',
    logos: {
        defaultURI: fullIcon ?? boxIcon,
        fullURI: fullIcon,
        boxURI: boxIcon,
    },
    colors: {
        primary: '#e47302',
    },
    categories: ["crm"],
    },
  client,
  constants: {},
  actions: {},
});
