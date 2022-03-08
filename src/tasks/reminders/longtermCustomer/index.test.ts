import {longtermCustomer} from '.';


describe('Longterm Customer Reminder', ()=>{
  it('is successful.', async ()=>{
    expect(await longtermCustomer()).toHaveProperty('ok');
  });
});
