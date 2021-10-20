import styled from 'styled-components';
import { DATE, MONTH } from '../../Utils/constantsCalendar';
import { useEffect, useState } from 'react';

const DateComponent = ({
  day,
  month,
  date,
  activeMonth,
  setActive,
  dateGrid,
}) => {
  //STATES
  const [className, setClassName] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  let [value, active, activeDay, curmonth, year] = date;

  // FUNCTIONS
  function checkActive() {
    
    if (value === DATE.getDate() ) {
      if (month - 1 === DATE.getMonth()) {
        if (activeDay || firstLoad) {
          // console.log(activeDay,'active',value);
          setClassName('active');
        } else if (year === DATE.getFullYear()) {
          
          setClassName('current');
        }
      }
    } else if (activeDay) {
      setClassName('active');
    } else {
      setClassName('');
    }

  }
  useEffect(() => {
    checkActive();
    setFirstLoad(false);
  }, [value, activeDay, month, active, dateGrid]);

  useEffect(() => {
    checkActive();
  }, []);

  return (
    <Date
      className={`${day === 6 ? 'sunday' : ''} ${active ? 'active-month' : ''}`}
    >
      <DateBox>
        <Text onClick={setActive} className={className}>
          {value}
        </Text>
        {value === 1 ? (
          <Month className={activeMonth === month - 1 ? 'active-month' : ''}>
            {MONTH[month - 1] && MONTH[month - 1].substr(0, 0)}
          </Month>
        ) : null}
      </DateBox>
    </Date>
  );
};
// STYLES 820: active and sunday need to work, error in console
const Date = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 50px;
  // borders around days of the month
  /* border-right: 1px solid #e6e5e6;
  border-bottom: 1px solid #e6e5e6; */
  /* padding: 0px 5px 0px 5px; */
  box-sizing: border-box;
  background-color: #146165;
  &:last-child {
    border-right: 0;
  }
  &.sunday {
    /* background-color: #217373;  */
  }
  &.active-month {
    transition: color 0.3s ease-in;
    color: rgba(136, 174, 180, 255);
  }
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  height: 28px;
  width: 28px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 20px;

  &.active {
    background-color: rgba(2, 179, 150, 255);
    text-align: center;
    border-radius: 10px;
    color: rgba(163, 228, 218, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  &.current {
    text-align: center;
    border-radius: 10px;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const Month = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
`;
/* .month-active {
    padding: 0 4px;
  }; */

export default DateComponent;
