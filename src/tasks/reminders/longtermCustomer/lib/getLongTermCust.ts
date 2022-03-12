import {APP_IDS, kintoneClient} from '../../../../api/kintone';


export default async <T extends keyof LongTermCustomerType>() => {
  return kintoneClient.record.getRecords({
    app: APP_IDS['longTermCustomers'],
    totalCount: true,
    query:
    [
      `${'isSentToSlack' as T} = "0"`,
      `${'追客可能時期' as T} <= TODAY()`,
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
