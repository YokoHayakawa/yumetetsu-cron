import cron from 'node-cron';
import syncCustomers from './tasks/syncDoKintone/customers';

cron.schedule('* * * * * *', () => {
  console.log('running a task every second');
});

cron.schedule('* * * * * *', () => {
  syncCustomers();
});
