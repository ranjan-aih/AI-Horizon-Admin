import { useState } from 'react';
import CaseStudy from "./Components/CaseStudy.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CaseStudy/>
    </>
  );
}

export default App;
