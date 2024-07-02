
import './App.css'; 
import Axios from 'axios'; 
import { useState } from 'react'; 
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
  
function App() { 
    const [artist, setArtist] = useState(""); 
    const [song, setSong] = useState(""); 
    const [lyrics, setLyrics] = useState(""); 
  
    async function findLyrics() { 
        if (artist === "" || song === "") { 
            return; 
        } 
        try {
            await Axios.get( 
                `https://api.lyrics.ovh/v1/${artist}/${song}`).then((res,err) => { 
                if(res.status  >= 200 && res.status <= 300) {
                    let result = "Hey I found lyrics !!!" + res.data.lyrics;
                    console.log(result); 
                    setLyrics(result); 
                }
                else if (err) {
                    let errorMsg = "Sorry I couldn't find the lyrics for this song !!! " + JSON.stringify(err);
                    console.log(errorMsg);
                    setLyrics(errorMsg);
                }
                else {
                    let respMsg = "It looks like server failed to fetch lyrics for this song --- \n" + + JSON.stringify(res);
                    console.log(respMsg);
                    setLyrics(respMsg);
                }
            })
        }
        catch(ex) {
            let exception = "It looks like I failed to fetch this song's lyrics --- \n" + JSON.stringify(ex);
            console.log(exception);
            setLyrics(exception)
        }
         
    } 
  
    return ( 
        <div className="App"> 
            <h1>Find the Lyrics</h1> 
  
            <Input type="text" placeholder='Artist name' onChange={(e) => { setArtist(e.target.value) }} /> 
            <span>&nbsp; &nbsp; &nbsp;</span>
            <Input type="text" 
                placeholder='Song name'
                onChange={(e) => { setSong(e.target.value) }} /> 
            <br/>
            <br/>
            <Button variant="contained" onClick={() => findLyrics()}>Get Lyrics</Button>
            <hr /> 
            <pre>{lyrics}</pre> 
        </div> 
    ); 
} 
  
export default App;