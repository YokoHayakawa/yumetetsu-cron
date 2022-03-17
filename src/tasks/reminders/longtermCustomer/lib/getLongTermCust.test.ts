import getLongTermCust,
{getActualRemindHankyo, getPreRemindHankyo} from './getLongTermCust';

describe('Hankyo', ()=>{
  it('are retrieved', async ()=>{
    const result = await getLongTermCust('2025-08-02');
    console.log(result.totalCount);
    expect(result).toHaveProperty('totalCount');
  });

  it('pre-remind', async ()=>{
    const result = await getPreRemindHankyo();
    const totalCount = result.totalCount || 0;
    console.log(totalCount);
    if (totalCount > 0) {
      console.log(result.records[0]);
      expect(result.records[0]).toMatchSnapshot();
    }
    expect(result).toHaveProperty('totalCount');
  });

  it('actual reminder', async ()=>{
    const result = await getActualRemindHankyo();
    const totalCount = result.totalCount || 0;
    console.log(totalCount);
    if (totalCount > 0) {
      expect(result.records[0]).toMatchSnapshot();
    }
    expect(result).toHaveProperty('totalCount');
  });
});
