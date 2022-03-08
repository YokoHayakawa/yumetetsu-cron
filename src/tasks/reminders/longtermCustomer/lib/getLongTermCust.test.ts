import getLongTermCust from './getLongTermCust';

describe('Longterm Customer Records', ()=>{
  it('are retrieved', async ()=>{
    const result = await getLongTermCust();
    expect(result).toHaveProperty('totalCount');
  });
});
