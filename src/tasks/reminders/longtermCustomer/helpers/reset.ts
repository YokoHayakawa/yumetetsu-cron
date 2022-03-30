import {APP_IDS, kintoneClient} from '../../../../api/kintone';


export const reset = async <T extends keyof LongTermCustomerType>() => {
  const result = await kintoneClient.record.getRecords({
    app: APP_IDS.longTermCustomers,
    query: [
      `${'slackSentStatus' as T} > 0`,
      `${'追客可能時期' as T} = ""`,
    ].join(' and '),
  });

  return kintoneClient.record.updateRecords({
    app: APP_IDS.longTermCustomers,
    records: result.records.map((record) => {
      const rec = record as unknown as LongTermCustomerType;
      return {
        id: rec.$id.value,
        record: {
          slackSentStatus: {value: 0},
        },
      };
    }),
  });
};

export const deleteMessages = async <
  T extends keyof LongTermCustomerType
>() => {
  const result = await kintoneClient.record.getAllRecords({
    app: APP_IDS.longTermCustomers,
  });

  const records = result as unknown as LongTermCustomerType[];
  console.log('Records length : ', records.length);
  /* new Promise(
      (resolve) => setTimeout(
        ()=> resolve(sendRecToSlack(rec, slackSentStatus)),
        idx * globalInterval,
      ),
    ); */
  /* Delete messages */
  /*   for (const record of records ) {
    await new Promise(
      (resolve) => setTimeout(
        ()=> resolve(
          slackApp.client.chat.delete({
            channel: record.slackChannel.value,
            ts: record.slackTS.value,

          }),
        ), 1000,
      )).catch((err) => console.log(err.message));
  } */

  return kintoneClient.record.updateAllRecords({
    app: APP_IDS.longTermCustomers,
    records: records.map((record) => {
      console.log(record);
      const rec = record as unknown as LongTermCustomerType;
      return {
        id: rec.$id.value,
        record: {
          ['slackSentStatus' as T]: {value: '0'},
          ['sentToSlackDate' as T]: {value: ''},
          ['stopNotifyReason' as T]: {value: ''},
          ['slackUserId' as T]: {value: ''},
          ['slackDisplayName' as T]: {value: ''},
          ['slackTS' as T]: {value: ''},
          ['slackChannel' as T]: {value: ''},
        },
      };
    }),
  }).catch((e)=> {
    console.log('Error', e.errors);
    return e;
  },
  );
};
