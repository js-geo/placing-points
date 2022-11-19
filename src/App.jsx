import { useState, Fragment, createContext, useContext } from "react";
import "./App.css";
import { Point } from "./components/Point";

const LabelContext = createContext("-");
export const useLabelContext = () => useContext(LabelContext);

function App() {
  const [position, setPosition] = useState([]);
  const [popped, setPopped] = useState([]);

  function handleClick(e) {
    const x = e.nativeEvent.clientX;
    const y = e.nativeEvent.clientY;
    setPosition([...position, [x, y]]);
  }

  function handleBack() {
    const newPosition = [...position];
    const poppedPoint = newPosition.pop();
    position.length !== 0 ? setPopped([...popped, poppedPoint]) : null;
    setPosition([...newPosition]);
  }

  function handleForth() {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    !position ? position.push(poppedPoint) : null;
    popped.length !== 0
      ? setPosition([...position, popped[popped.length - 1]])
      : null;
    setPopped([...newPopped]);
  }

  const [state, setState] = useState(true);

  let testvar = "Variable";

  const [theme, setTheme] = useState("dark");

  return (
    <>
      <div style={{ top: 0, left: 0, height: 30 }}>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleForth}>Forth</button>
        <button
          onClick={() => {
            if (state) {
              setState(false);
            } else {
              setState(true);
            }
          }}
        >
          Coordinate on/off
        </button>
        <button
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        >
          {(theme === 'light') ? `Dark` : `Light`}
        </button>
      </div>
      <div className="App" onClick={handleClick}>
        {position.length !== 0 &&
          position.map((pos, id) => (
            <Fragment key={id}>
              <LabelContext.Provider value={theme}>
                <Point left={pos[0]} top={pos[1]} showLabel={state}>
                  {/* Text, {testvar} */}
                </Point>
              </LabelContext.Provider>
            </Fragment>
          ))}
      </div>
    </>
  );
}

export default App;
