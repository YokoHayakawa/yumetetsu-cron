import {APP_IDS, kintoneClient} from '../../../../api/kintone';


export default async () => {
  return kintoneClient.record.getRecords({
    app: APP_IDS['longTermCustomers'],
    totalCount: true,
    query: '',
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
