import {
  differenceInYears,
  getYear, isSameDay, parseISO, setYear} from 'date-fns';


export const getYearDiffFromToday = (dateStr : string) : number => {
  return differenceInYears(new Date(), parseISO(dateStr));
};

export const isSameMonthDay = (dateStr: string): boolean => {
  const adjustedYear = setYear(parseISO(dateStr), getYear(new Date()));
  const result = isSameDay(adjustedYear, new Date());
  // logger.info(`Same Day? ${dateStr} ${result}`);
  return result;
};
