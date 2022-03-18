import {logger} from '../../../utils';
import getLongTermCust from './lib/getLongTermCust';
import {SlackSentStatus} from './helpers';
import sendToSlack from './lib/sendToSlack';


export const remindOnLongtermCust = async () => {
  for (const slackSentStatus of [1, 0]) {
    const result = await getLongTermCust(slackSentStatus as SlackSentStatus);

    // eslint-disable-next-line max-len
    logger.info(`Task: longtermCustomer, processing sentStatus of ${slackSentStatus} \nRecords: ${result.totalCount}`);

    if (result.ok) {
      await sendToSlack(
        result.records as unknown as LongTermCustomerType[],
        slackSentStatus as SlackSentStatus,
      );
    }
  }
};
