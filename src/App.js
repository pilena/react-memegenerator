import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [state, setstate] = useState([]);

  useEffect(() => {
   fetc("https://api.imgflip.com/get_memes").then(x => x.json().then(response => ))
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
