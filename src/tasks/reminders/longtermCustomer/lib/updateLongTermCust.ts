import {APP_IDS, kintoneClient} from '../../../../api/kintone';


export const markSuccess = (recId: string) =>{
  kintoneClient.record.updateRecord({
    app: APP_IDS['longTermCustomers'],
    id: recId,
    record: {
      isSentToSlack: {value: '1'},
    } as Partial<LongTermCustomerType>,
  });
};
