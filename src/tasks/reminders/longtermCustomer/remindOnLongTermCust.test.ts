import {remindOnLongtermCust} from './remindOnLongtermCust';

describe('Remind On Long Term', () => {
  it('is successful', async ()=>{
    const result = await remindOnLongtermCust();

    console.log(result);
    expect(result).toMatchSnapshot();
  });
});
