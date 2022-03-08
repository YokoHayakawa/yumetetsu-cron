// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import cron from 'node-cron';
import {longtermCustomer} from './tasks/reminders';


cron.schedule('* * * * * *', () => {
  console.log('running a task every second');
  console.log(process.env.KINTONE_BASE_URL);
});

/**
 * Reminds about longterm customer every day
 */
cron.schedule('* * * * * *', longtermCustomer);


