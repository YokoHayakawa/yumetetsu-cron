import getLongTermCust from './lib/getLongTermCust';

/**
 * Send slack message when a long term customer is due.
 */
export const longtermCustomer = async () => {
  const result = await getLongTermCust();

  if (+<string>result.totalCount) {
    console.log(result.totalCount, result, 'success');
  }
};
