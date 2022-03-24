
import getLongTermCust from './getLongTermCust';

describe('Hankyo', ()=>{
  it('are retrieved', async ()=>{
    const result = await getLongTermCust(0);
    console.log(result.totalCount);
    const records = result.records as LongTermCustomerType[];

    if (records.length > 0) {
      const dueDates = records
        .map((record) => record.receptionDate.value)
        .join(',');
      console.log(dueDates);
    }

    expect(result).toHaveProperty('totalCount');
  }, 10000);
});
