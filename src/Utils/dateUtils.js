import {
  DAYSINWEEK,
  MONTHSINYEAR,
  WEEKSINYEAR,
} from "./constantsCalendar";

export const checkLeapYear = (year) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

export const getMonthsDaysInYear = (year) => {
  return [
    31,
    checkLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
};

/* 
  Zeller's rule: finding the day of a particular date in the calendar in the history.
  Here used to find which day (string name) is a specic day. For instance, which day of the
  week is the 21 of December 1994: it is a thurdsay. so we now know how to populate the 
  calendar with the right day of the week for each respective day.
  

  k = to the first day of the month, our case (1) first day of the month from the costs above
  m = to the first month after the current month we are considering, in this case January (0)
  so february would be (1) and December (11). Values of an array.
  D = to the last two digits of the year.  In this case 2021, D = 21.
  C = to the first two digits of the year.  In this case 2021, C = 20.

  F = to For any real number x, let [x] be the greatest integer less than or equal to x,
      which you get by truncating any fractional part.  Then compute:
      f = k + [(13*m-1)/5] + D + [D/4] + [C/4] - 2*C.
      Once you have this, then  f - 7*[f/7] will give you the day of the week, with Sunday = 0,
      Monday = 1, and so on. will give you the day of the week, with Sunday = 0, Monday = 1, 
      and so on.
*/
const calcFirstDayofYear = (y, M = 0, k = 1) => {
  const m = ((M + 10) % 12) + 1;
  const D = (y % 100) - (m > 10 ? 1 : 0);
  const C = Math.floor(y / 100);
  const F =
    k +
    Math.floor((13 * m - 1) / 5) +
    D +
    Math.floor(D / 4) +
    Math.floor(C / 4) -
    2 * C;
  const T = F > 0 ? F : (F - (Math.floor(F) + 2) * 7) % 7;
  return T % 7;
};

export const generateDateGrid = (activeMonth, year) => {
  let DAYSINMONTH = getMonthsDaysInYear(year);

  // 54 rows, weeks in a year that will be filled by the second function
  const dateGrid = Array.from({ length: WEEKSINYEAR }, (_) =>
    // 7 columns, days in a week
    Array.from({ length: DAYSINWEEK }, (_) => [1, false])
  );

  /* 
    in sum: dateGrid is and array containing 54 weeks (weeks in a year)
    where each week contains an array of 7 days (days in a week)
    which contain two values in an array, the day itself and a false value
    as initial value. True is when the day as integer is the current day
  */
  // console.log('DATE GRID', dateGrid);

  /* 
    the -1 after indexOfFirstWeekDayOfTheYear is a way of making the start of the first week
    of the year on friday (index 4 of the array) instead of satuday (index 5 of the array). 
    The reason why it was set to index 5 is because the british have the week starting
    on sunday, so index 5 was actually friday.
    it is a trick that consider also the leap year too, so using 2020 is fine.
  */

  let indexOfFirstWeekDayOfTheYear = calcFirstDayofYear(year)-1;
  //let firstday = indexOfFirstWeekDayOfTheYear;
  if (indexOfFirstWeekDayOfTheYear===-1){
    indexOfFirstWeekDayOfTheYear = 6;
  }
    //console.log({ indexOfFirstWeekDayOfTheYear, firstday });
  // To populate the first week of the grid
  for (let i = 0; i < indexOfFirstWeekDayOfTheYear; i++) {
    /* 
      - recap considering the 1 of january 2021.
      - indexOfFirstWeekDayOfTheYear is 4 (index for friday)
      - dateGrid is the array containing 54 weeks in a year, with inside another array of 7 weeks
        and inside the current day in integer and true/false value corresponding on the current
        day

      here below you take, the first week, the current index and the current day in integer,
      so if it is the 1 JANUARY you say: 1 
      DAYSINMONTH is an array corresponding to how many days are in a month so it is like
      0:31, 1: 28 etc etc
    */
    dateGrid[0][i][0] =
      DAYSINMONTH[11] - (indexOfFirstWeekDayOfTheYear - 1) + i;
  }

  let weekValue = 0,
    k = indexOfFirstWeekDayOfTheYear;
  // MONTHSINYEAR is 12
  for (let i = 0; i < MONTHSINYEAR; i++) {
    //DAYSINMONTH[i] you take the respective days in each month
    for (let j = 0; j < DAYSINMONTH[i]; j++) {
      // console.log(dateGrid[weekValue]);
      if (dateGrid[weekValue][k]) {
        dateGrid[weekValue][k][0] = j + 1; // for a respective day integer of the week = ?
        dateGrid[weekValue][k][1] = i === activeMonth;
        dateGrid[weekValue][k][3] = i;
        k++;
        if (k === DAYSINWEEK) {
          k = 0;
          weekValue++;
        }
      }
    }
  }

  // To populate the last row of the date grid
  for (let i = k; i < DAYSINWEEK; i++) {
    if (dateGrid[weekValue][i]) {
      dateGrid[weekValue][i][0] = i - k + 1;
    }
    //  console.log(i, k);
  }
  return dateGrid;
};;
