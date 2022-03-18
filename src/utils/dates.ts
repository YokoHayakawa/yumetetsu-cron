import {differenceInYears, parseISO} from 'date-fns';

export const getYearDiffFromToday = (dateStr : string) : number => {
  return differenceInYears(new Date(), parseISO(dateStr));
};
