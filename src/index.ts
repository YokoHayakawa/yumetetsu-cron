// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import cron from 'node-cron';
import {longtermCustomer} from './tasks/reminders';
import {formattedTime, notifyDev} from './utils';


/**
 * Reminds about longterm customer every day at 9 am
 */
cron.schedule('30 9 * * * ', longtermCustomer, {
  scheduled: true,
  timezone: 'Asia/Tokyo',
});

/**
 * Still alive log.
 */

cron.schedule('*/5 * * * * *', ()=> notifyDev(formattedTime() + ': Alive'));

console.log(formattedTime() + ' Cron server is now running.');
