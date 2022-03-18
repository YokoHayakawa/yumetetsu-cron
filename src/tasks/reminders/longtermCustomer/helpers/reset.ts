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
