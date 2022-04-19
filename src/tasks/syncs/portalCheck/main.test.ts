import {main} from './main';

test('main', async () => {
  expect(await main()).toMatchSnapshot();
}, 10000000000);
