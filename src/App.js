import About from './About';
import AlbumPage from './AlbumPage';
import Albums from './Albums';
import CreditPage from './CreditPage';
import CreditSearch from './CreditSearch';
import Credits from './Credits';
import Home from './Home';
import Layout from './Layout';
import SongPage from './SongPage';
import Songs from './Songs';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
  const [ songs, setSongs ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  const [ credits, setCredits ] = useState([]);
  const [ message, setMessage ] = useState("Couldn't fetch data at this moment.");

  const API_URL = "http://localhost:3500/";

  useEffect(() => {
    const fetchData = async () => {

      try {
        await Promise.allSettled([
          fetch(`${API_URL}songs`)
            .then((response) => response.json())
            .then((data1) => setSongs(data1.songs)),

          fetch(`${API_URL}albums`)
            .then((response) => response.json())
            .then((data2) => setAlbums(data2.albums)),

          fetch(`${API_URL}credits`)
            .then((response) => response.json())
            .then((data3) => setCredits(data3.credits)),
        ]);

      } catch (err) {
        console.log(err);
      }
    }

    setTimeout( () => fetchData(), 2000);
  }, [])

  const oldSongFirst = [...songs].sort((a, b) => a.id > b.id ? 1 : -1,);
  const allSongs = [...songs].sort((a, b) => {
    if ((a.id).slice(0, 8) === (b.id).slice(0, 8)) {
      return a.id > b.id ? 1 : -1;
    } else if ((a.id).slice(0, 8) < (b.id).slice(0, 8)) {
      return 1
    } else {
      return -1
    }
  });

  const skz = credits.filter( person => person.skz);
  const prod = credits.filter( person => !person.skz);
  const producers = [...prod].sort((a, b) => 
    (a.name).toLowerCase() > (b.name).toLowerCase() ? 1 : -1,);

  const people = skz.concat(producers);


  const handleAlbumArt = (albumName) => {
    const albumMatch = albums.filter(album => album.title === albumName).map(albumArt => albumArt.img);
    const albumCover = albumMatch.toString();
    return albumCover;
  }

  const handleCreditURL = (input) => {
    const nameLvl1 = input.toLowerCase();
    const specialChar = /[^a-zA-Z\d\s:]/g;
    const nameLvl2 = nameLvl1.replaceAll(specialChar, "");
    const name = nameLvl2.replaceAll(" ", "-");

    return `/credits/${name}`;
  }


  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>

          <Route path="album">
            <Route index element={<Albums 
              albums={albums} 
              handleAlbumArt={handleAlbumArt}     
              message={message} 
              setMessage={setMessage}
            />} />
            <Route path=":id" element={<AlbumPage 
              songs={songs} 
              albums={albums} 
              handleAlbumArt={handleAlbumArt}
              handleCreditURL={handleCreditURL}
            />}/>
          </Route>
          <Route path="credits">
            <Route index element={<Credits 
              credits={credits}
              handleCreditURL={handleCreditURL}
            />} />
            <Route path=":name" element={<CreditPage 
              credits={credits} 
              songs={songs} 
              handleAlbumArt={handleAlbumArt} 
            />}/>
            <Route path="search" element={<CreditSearch 
              credits={people}
              songs={allSongs}
              handleAlbumArt={handleAlbumArt}
            />}/>
          </Route>
          <Route path="song">
            <Route index element={<Songs 
              newFirst={allSongs} 
              oldFirst={oldSongFirst}
              handleAlbumArt={handleAlbumArt}
              message={message} 
              setMessage={setMessage}
            />} />
            <Route path=":id" element={<SongPage 
              songs={songs} 
              albums={albums}
              handleCreditURL={handleCreditURL}
            />}/>
          </Route>

          <Route path="about" element={<About />}/>

        </Route>
      </Routes>
  );
}

export default App;
