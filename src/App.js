import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Meme from './components/Meme';
require('dotenv').config();

function App() {

  const objectToQueryParam = (obj) => {
   const params =  Object.entries(obj).map(([key, value]) => `${key}=${value}`)
    return '?' + params.join('&');
  }

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null)

  useEffect(() => {
   fetch("https://api.imgflip.com/get_memes").then(x => x.json().then(response => setTemplates(response.data.memes) ))
  }, [])

  if(meme) {
    return (
      <div>
        <img src={meme} alt="Your custom meme!"/>
      </div>
    )
  }

  return (
    <div className="App">
    {template && (
      <form onSubmit ={async e => {
        e.preventDefault();
        // add logic to create meme from api
        const params = {
          template_id : template.id,
          text0: topText,
          text1: bottomText,
          username: 'lenalegenda',
          password: 'pilena123'
        }
        const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);
        
        const json = await response.json()
        //console.log(json);

        setMeme(json.data.url)
      }}>
          <Meme template={template} />
          <div className="meme-form" >
          <input placeholder="top text" 
            value={topText} 
            onChange={e => setTopText(e.target.value)} />
          <input placeholder="bottom text" 
            value={bottomText}
            onChange={e => setBottomText(e.target.value)} />

          <button type="submit"> Create Meme </button>
          </div>
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
