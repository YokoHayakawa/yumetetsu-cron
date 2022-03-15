// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import cron from 'node-cron';
import {appName} from './config';
import {longtermCustomer} from './tasks/reminders';
import {syncDoNetCust} from './tasks/syncToKintone/syncDoNetCust';
import {formattedTime, notifyDev} from './utils';


/**
 * Reminds about longterm customer every day at 9:30 am
 */
cron.schedule('30 9 * * *', longtermCustomer, {
  scheduled: true,
  timezone: 'Asia/Tokyo',
});

/**
 * Full sync donet customers to kintone.
 */
cron.schedule('At 22:00 on Sunday.', () => syncDoNetCust(true));

/**
 * Full sync donet customers to kintone.
 *
 * At every 5th minute past every hour
 * from 8 through 19
 * on every day-of-week from Monday through Saturday.
 */
cron.schedule('*/10 8-19 * * 1-6', () => syncDoNetCust());

/**
 * Still alive log.
 */
// cron.schedule('*/5 * * * * *', ()=> notifyDev(formattedTime() + ': Alive'));

notifyDev(`${formattedTime()} ${appName} started.`);
