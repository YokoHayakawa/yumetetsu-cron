import {KintoneRestAPIClient} from '@kintone/rest-api-client';

export const kintoneClient = new KintoneRestAPIClient({
  baseUrl: process.env.KINTONE_BASE_URL,
  auth: {apiToken: [
    process.env.KINTONE_CUSTOMERS_TOKEN,
    process.env.KINTONE_LONGTERM_CUSTOMERS_TOKEN,
  ]},
});


export const APP_IDS = {
  'customers': '84',
  'longTermCustomers': '189',
  'reins': 191,
};
