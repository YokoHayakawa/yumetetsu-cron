import {format} from 'date-fns';
import {LongTermCustomerType} from '../../../types/kintone';
import {formattedTime, notifyDev} from '../../../utils';
import getLongTermCust from './lib/getLongTermCust';
import sendToSlack from './lib/sendToSlack';

/**
 * Send slack message when a long term customer is due.
 */
export const longtermCustomer = async () => {
  const result = await getLongTermCust();
  // eslint-disable-next-line max-len
  notifyDev(`${formattedTime} Task: longtermCustomer \nRecords: ${result.totalCount}`);

  if (result.ok) {
    await sendToSlack(
      result.records as unknown as LongTermCustomerType[],
    );
  }
};
