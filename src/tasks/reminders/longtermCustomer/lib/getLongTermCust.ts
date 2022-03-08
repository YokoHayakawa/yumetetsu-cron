import {APP_IDS, kintoneClient} from '../../../../api/kintone';

const getLongTermCust = async () => {
  return kintoneClient.record.getRecords({
    app: APP_IDS['longTermCustomers'],
    totalCount: true,
    query: '',
  })
    .then((res) => res)
    .catch((reason) => {
      console.log('エラーが発生しました: ', reason);
      return {
        totalCount: '0',
      };
    });
};

export default getLongTermCust;
