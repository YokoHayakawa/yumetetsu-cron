import {format} from 'date-fns';
import {APP_IDS, kintoneClient} from '../api/kintone';
import {getYearDiffFromToday} from './dates';

describe('Date', ()=>{
  it('retrieved year difference',
    async <
      U extends LongTermCustomerType,
      T extends keyof U
    >() => {
      const differences = (
        await kintoneClient
          .record
          .getRecords({
            app: APP_IDS.longTermCustomers,
            query: `${'追客可能時期' as T} = ""`,
          })
      )
        .records
        .map((record) => {
          const rec = record as unknown as U;
          return {
            dateFromRec: rec.receptionDate.value,
            dateToday: format(new Date(), 'yyyy-MM-dd'),
            difference: getYearDiffFromToday(rec.receptionDate.value),
          };
        });
      expect(differences).toMatchSnapshot();
    },
  );
});
