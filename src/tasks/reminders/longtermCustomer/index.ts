import getLongTermCust from './lib/getLongTermCust';
import sendToSlack from './lib/sendToSlack';

/**
 * Send slack message when a long term customer is due.
 */
export const longtermCustomer = async () => {
  const result = await getLongTermCust();

  if (result.ok) {
    sendToSlack(result.records as unknown as Yume.longtermCust.SavedFields[]);
    return {ok: 'true'};
  }

  return {ok: 'false'};
};
