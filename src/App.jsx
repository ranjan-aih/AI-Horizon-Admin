import { useState } from 'react';
import CaseStudy from "./Components/CaseStudy.jsx";
import Agents from "./Components/Agents.jsx";
import UseCase from "./Components/UseCase.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/*<CaseStudy/>*/}
      {/*  <Agents/>*/}
        <UseCase />
    </>
  );
}

export default App;
