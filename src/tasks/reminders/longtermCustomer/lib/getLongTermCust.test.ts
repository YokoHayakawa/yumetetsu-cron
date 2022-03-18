import getLongTermCust from './getLongTermCust';

describe('Hankyo', ()=>{
  it('are retrieved', async ()=>{
    const result = await getLongTermCust(0);
    console.log(result.totalCount);
    const records = result.records as LongTermCustomerType[];

    if (records.length > 0) {
      records.forEach((record) => {
        console.log(record.追客可能時期.value);
      });
      // console.log(records[0]?.追客可能時期.value);
    }

    expect(result).toHaveProperty('totalCount');
  });
});
