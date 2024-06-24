import {useState} from "react";
import Progressbar from "./components/Progressbar";
import {useEffect} from "react";

function App() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 100);

    return clearInterval()
  }, []);

  return (
    <div className="progressContainer">
      <h1 className="title">Progress Bar</h1>
      <Progressbar value={value} />
    </div>
  );
}

export default App;
