
import getLongTermCust from './getLongTermCust';

describe('Hankyo', ()=>{
  it('are retrieved', async ()=>{
    const result = await getLongTermCust(0);
    console.log(result.totalCount);
    const records = result.records as LongTermCustomerType[];

    if (records.length > 0) {
      const dueDates = records
        .filter((record) => Boolean(record.追客可能時期.value))
        .map((record) => record.追客可能時期.value)
        .join('\n');
      console.log(dueDates);
    }

    expect(result).toHaveProperty('totalCount');
  }, 10000);
});
