import { useEffect, useRef } from "react";
import styled from "styled-components";
import { DATE, MONTH } from "../../Utils/constantsCalendar";

const MonthComponent = (props) => {
  const monthRef = useRef();
  // 214
  useEffect(() => {
    let obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry,index) => {
          //console.log(props)
          if (entry.intersectionRatio >= 0.7) {
            props.setActiveMonth(props.mid);
          }
        });
      },
      {
        root: document.querySelector(".calendarContainer"),
        rootMargin: "0px",
        threshold: 0.8,
      }
    );
    obs.observe(monthRef.current);
  },[]);

  useEffect(() => {
    const monthRefValue = monthRef && monthRef.current;
    if(monthRefValue) {
      if(props.mid === DATE.getMonth()) {
        monthRefValue.scrollIntoView();
      }
    }
  }, [])
  return (
    <Months id={MONTH[props.mid]} ref={monthRef}>
      {props.children}
    </Months>
  );
};
// STYLES month name 
const Months = styled.div`
  scroll-snap-align: start;
  /* color: #2a8282; */
`;
export default MonthComponent;
