import {APP_IDS, kintoneClient} from '../../../../api/kintone';
import format from 'date-fns/format';
import {subMonths} from 'date-fns';

/**
 * 0 : reminder ✖, actual ✖;
 * 1 : reminder 〇, actual ✖;
 * 2 : eminder 〇, actual 〇;
 */
type SlackSentStatus = 0 | 1 | 2

const getLongTermCust = async <T extends keyof LongTermCustomerType>
(
  dateStr: string = format(new Date(), 'yyyy-MM-dd'),
  slackSentStatus : SlackSentStatus = 0,
) => {
  // const dateToCompare = format(new Date(), 'yyyy-MM-dd');
  console.log(dateStr, 'dateStr');


  return kintoneClient.record.getRecords({
    app: APP_IDS['longTermCustomers'],
    totalCount: true,
    query:
    [
      `${'slackSentStatus' as T} = "${slackSentStatus}"`,
      `${'追客可能時期' as T} <= "${dateStr}"`,
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

export const getPreRemindHankyo = () => {
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


export default getLongTermCust;


