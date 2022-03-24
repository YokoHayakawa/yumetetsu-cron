import {APP_IDS, kintoneClient} from '../../../../api/kintone';
import sendToSlack from './sendToSlack';

describe('Send to Slack', ()=> {
  it('is successful', async ()=>{
    const result = await kintoneClient.record.getRecords({
      app: APP_IDS.longTermCustomers,
      totalCount: true,
    });


    const slackResp = await sendToSlack(
      result.records as unknown as LongTermCustomerType[],
      1,
    );

    expect(result.totalCount).toMatchSnapshot();
    expect(slackResp).toMatchSnapshot();
  });
});
