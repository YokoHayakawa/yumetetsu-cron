import {longtermCustomer} from '.';


describe('Longterm Customer Reminder', ()=>{
  it('is successful.', async ()=>{
    const result = await longtermCustomer();

    console.log(result);

    expect(result).toHaveProperty('ok');
  });
});
