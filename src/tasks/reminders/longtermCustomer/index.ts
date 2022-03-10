import {format} from 'date-fns';
import {LongTermCustomerType} from '../../../types/kintone';
import {notifyDev} from '../../../utils';
import getLongTermCust from './lib/getLongTermCust';
import sendToSlack from './lib/sendToSlack';

/**
 * Send slack message when a long term customer is due.
 */
export const longtermCustomer = async () => {
  const result = await getLongTermCust();
  // eslint-disable-next-line max-len
  notifyDev(`Cron job: longtermCustomer ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\nRecords: ${result.totalCount}`);
  // console.log(process.env.NODE_ENV, result.records.length, 'node');
  if (result.ok) {
    await sendToSlack(
      result.records as unknown as LongTermCustomerType[],
    );
  }
};
