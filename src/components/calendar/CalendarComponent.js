import { DAYSINWEEK, WEEKSINYEAR } from "../../Utils/constantsCalendar";
import { generateDateGrid } from "../../Utils/dateUtils";
import DateComponent from "./DateComponent";
import MonthComponent from "./MonthComponent";
import styled from "styled-components";
import { useEffect, useState } from "react";

const CalendarComponent = ({
  setActiveMonth,
  activeMonth,
  year,
  setYear,
  refToWrapper,
}) => {
  // STATES
  const [monthRowFunction, setMonthRowFunction] = useState([]);
  const [dateGrid, setDateGrid] = useState(null);

/*  useEffect(() => {
    if (activeMonth === 12) {
      setTimeout(()=>{

      },1)
      setYear(+year + 1);
      refToWrapper.current.scrollTop = 0
      setActiveMonth(0);
    }
  }, [activeMonth]);*/

  function handleActive(weekIndex, dayIndex) {
    let newDateGrid = [
      ...dateGrid.map((i) => [...i.map((y) => [y[0], y[1], false,y[3],year])]),
    ];
    newDateGrid[weekIndex][dayIndex][2] = true;
    /*newDateGrid.forEach((week, i) =>
      week.forEach((day, y) => {
        if (i !== weekIndex && y !== dayIndex) {
          day[2] = false;
        }
      })
    );*/
    setDateGrid(newDateGrid);
  }
 

  useEffect(() => {
    if(dateGrid){
      // console.log({ dateGrid });
      if (activeMonth < 12 ) {
        let newDateGrid = [
          ...dateGrid.map((i) => [
            ...i.map((y) => [y[0], y[3] === activeMonth, y[2], y[3], year]),
          ]),
        ];
        if(activeMonth===0){

          const dateGrid = generateDateGrid(0, +year - 1);
          newDateGrid.unshift(...dateGrid)
          // console.log(newDateGrid);
        }
        setDateGrid(newDateGrid);
        //here only change active month
  /*    } else if (activeMonth === 0) {
        //refToWrapper.current.style.pointerEvents = 'none'
        setYear(+year - 1);
        const dateGrid = generateDateGrid(11, +year - 1);
        setDateGrid(dateGrid);
        refToWrapper.current.scrollTop = 10000;
        setActiveMonth(11);*/
      } else {
        //refToWrapper.current.style.pointerEvents = 'none'
        setYear(+year + 1);
        const dateGrid = generateDateGrid(0, +year + 1);
        setDateGrid(dateGrid);
        refToWrapper.current.scrollTop = 0;
        setActiveMonth(0);
      }
    }else{
      const dateGrid = generateDateGrid(activeMonth, year);
      setDateGrid(dateGrid);
      //generate grid only once on component didmount
    }
    
  }, [activeMonth]);

  useEffect(() => {
    if (dateGrid) {
      const firstDayInMonth = [];
      const weekRowValue = [];

      for (let weekIndex = 0; weekIndex < WEEKSINYEAR; weekIndex++) {
        let weekRow = [];
        // from 0 to 7
        for (let dayIndex = 0; dayIndex < DAYSINWEEK; dayIndex++) {
          if (dateGrid[weekIndex][dayIndex][0] === 1) {
            firstDayInMonth.push(weekIndex);
          }

          weekRow.push(
            <DateComponent
              key={dayIndex + '' + firstDayInMonth.length}
              date={dateGrid[weekIndex][dayIndex]}
              day={dayIndex}
              month={firstDayInMonth.length}
              dateGrid={dateGrid}
              setActive={() => handleActive(weekIndex, dayIndex)}
              activeMonth={activeMonth}
            />
          );
        }
        weekRowValue.push(<Week key={weekIndex}>{weekRow}</Week>);
      }

      let currentMonth = 1,
        monthRow = [];

      const newMonthRowFunction = Array(WEEKSINYEAR)
        .fill(1)
        .map((val, index) => {
          if (index && index === firstDayInMonth[currentMonth]) {
            const monthValue = (
              <MonthComponent
                key={index}
                mid={currentMonth - 1}
                setActiveMonth={setActiveMonth}
                activeMonth={activeMonth}
              >
                {monthRow}
              </MonthComponent>
            );
            currentMonth++;
            monthRow = [weekRowValue[index]];
            return monthValue;
          } else {
            monthRow.push(weekRowValue[index]);
          }
        });
      setMonthRowFunction(newMonthRowFunction);
    }
  }, [dateGrid]);

  return monthRowFunction;
};

// STYLES
const Week = styled.div`
  display: flex;
  scroll-snap-align: start;
`;

export default CalendarComponent;
