import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Meme from './components/Meme';

function App() {

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
   fetch("https://api.imgflip.com/get_memes").then(x => x.json().then(response => setTemplates(response.data.memes) ))
  }, [])

  return (
    <div className="App">
    {template && (
      <form onSubmit ={ e => {
        e.preventDefault();
        // add logic to create meme from api
      }}>
          <Meme template={template} />
          <input placeholder="top text" />
          <input placeholder="bottom text" />
          <button type="submit"> Create Meme </button>
      </form>
      )}
      {!template && (
        <>
        <h1>Pick a template</h1>
        {templates.map(template => {
          return (
            <Meme template={template} onClick={() => {
              setTemplate(template)
            } } 
            />
          )
        })}
        </>
       ) }
    </div>
  );
}

export default App;
