// components
import CalendarIndex from "./components/calendar/CalendarIndex";
// global style
import GlobalStyle from "./styles/GlobalStyle";
// styled components
import styled from "styled-components";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { ContextProvider } from "./Context/Context";

function App() {
  
  return (
    <ContextProvider>
      <div className="App">
        <AnimatePresence exitBeforeEnter>
          <GlobalStyle />
          <GlobalWrapper>
            
            <BoxTwo>
              <CalendarIndex />
            </BoxTwo>
          </GlobalWrapper>
        </AnimatePresence>
      </div>
    </ContextProvider>
  );
}

// STYLES
const GlobalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgba(234, 234, 239, 255);
  padding: 10px; // issue
`;

const BoxOne = styled.div`
  width: 75%;
  height: 97.5vh;

`;

const BoxTwo = styled.div`
margin-left: 10px;
  width: 25%;
  height: 97.5vh;
`;
export default App;
