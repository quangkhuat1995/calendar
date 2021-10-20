import { createContext, useState } from 'react';
import { DATE } from '../Utils/constantsCalendar';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [minutes, setMinutes] = useState(DATE.getMinutes());
  const [hours, setHours] = useState(DATE.getHours());

  return (
    <Context.Provider
      value={{
        minutes,
        setMinutes,
        hours,
        setHours
      }}
    >
      {children}
    </Context.Provider>
  );
};


