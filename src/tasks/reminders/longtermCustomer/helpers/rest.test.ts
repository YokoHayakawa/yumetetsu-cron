import {reset} from './reset';

describe('Reset', () => {
  it('is successult', async ()=>{
    const result = await reset();
    expect(result).toMatchSnapshot();
  });
});
