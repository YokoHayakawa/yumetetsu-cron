
import {login} from './login';

describe('DoNet', ()=>{
  it('login successfully', async ()=>{
    const closed = await (await login()).close();
    expect(closed);
  }, 30000);
});
