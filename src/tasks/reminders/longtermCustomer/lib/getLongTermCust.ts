import {APP_IDS, kintoneClient} from '../../../../api/kintone';
import {SlackSentStatus} from '../helpers/resolveQueryDate';
import {resolveQueryDate} from '../helpers';
import {logger} from '../../../../utils';


const getLongTermCust = async <T extends keyof LongTermCustomerType>
(
  slackSentStatus : SlackSentStatus = 0,
) => {
  const queryDate = resolveQueryDate(slackSentStatus);

  logger.info(`Fetching longTermCust with date query: ${queryDate}`);

  return kintoneClient.record.getRecords({
    app: APP_IDS['longTermCustomers'],
    totalCount: true,
    query:
    [
      `${'slackSentStatus' as T} <= "${slackSentStatus}"`,
      ...queryDate,
      `${'追客可能時期' as T} != ""`,
    ].join(' and '),
  })
    .then((res) => ({...res, ok: true}))
    .catch((reason) => {
      console.log('エラーが発生しました: ', reason);
      return {
        ok: false,
        records: [],
        totalCount: '0',
      };
    });
};

/* export const getPreRemindHankyo = () => {
  return getLongTermCust(
    format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
    0,
  );
};

export const getActualRemindHankyo = () => {
  return getLongTermCust(
    format(new Date(), 'yyyy-MM-dd'),
    1,
  );
};
 */

export default getLongTermCust;


