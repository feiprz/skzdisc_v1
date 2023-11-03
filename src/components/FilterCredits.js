import { AlbumArtSmall } from './SmallAlbumArt';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FilterCredits = ({ isSKZ, person, songs, handleAlbumArt }) => {
  const allCredits = songs.filter( song => 
      (song.lyrics).includes(person) ||
      (song.compose).includes(person) ||
      (song.arrange).includes(person) 
  );

 const writtenSongs = songs.filter( song => (song.lyrics).includes(person));
  const soloWritten = songs.filter( song => (song.lyrics).includes(person) && (song.lyrics).length === 1);

  const composedSongs = songs.filter( song => (song.compose).includes(person));

  const arrangedSongs = songs.filter( song => (song.arrange).includes(person));
  const soloArranged = songs.filter( song => (song.arrange).includes(person) && (song.lyrics).length === 1);

  const [songList, setSongList] = useState(allCredits);
  const [visibility, setVisibility] = useState("hidden");

  const handleFilterMenu = () => {
    if ( visibility === "hidden") {
      setVisibility("shown");
    } else {
      setVisibility("hidden");
    }
  }


  return (
    <section className={ isSKZ ? "col-2" : "col-2 col-wide"}>
      { !isSKZ &&
        <div className="details prod-name">
          <h2 key={person}>{person}</h2>
        </div>
      }
      <h2>Song Credits</h2>
        <div className="filter-container">
          <p>Number of Songs: {songList.length}</p>

          <div>
            <button id="filter" className="filter-button"
              onClick={handleFilterMenu}
            >
              Select Filter 
              <span>&#9662;</span>
            </button>
            <menu 
              id="filter-menu" 
              className={`filter-options ${visibility}`}
              onClick={handleFilterMenu}
            >
              <button onClick={ e => { 
                setSongList(allCredits)
              }}>
                All Credited Songs
              </button>
              <button className={ writtenSongs.length ? "shown" : "hidden"}
                onClick={ e => { 
                  setSongList(writtenSongs)
              }}>
                Lyrics
              </button>
              <button className={ soloWritten.length ? "shown" : "hidden"}
                onClick={ e => { 
                  setSongList(soloWritten)
              }}>
                Solo Lyrics
              </button>
              <button className={ composedSongs.length ? "shown" : "hidden"}
                onClick={ e => { 
                  setSongList(composedSongs)
              }}>
                Composition
              </button>
              <button className={ arrangedSongs.length ? "shown" : "hidden"}
                onClick={ e => { 
                  setSongList(arrangedSongs)
              }}>
                Arrangement
              </button>
              <button className={ soloArranged.length ? "shown" : "hidden"}
                onClick={ e => { 
                  setSongList(soloArranged)
              }}>
                Solo Arrangement
              </button> 
            </menu>
          </div>
        </div>
        
      
      
      { songList.map( (song) => (
        <article className="card song-list" key={song.id}>
          <Link to={`/song/${song.id}`}>
            <div className="scroll song-summary">
              <AlbumArtSmall albumImg={ handleAlbumArt(song.album[0]) } />
              { song.otherTitle                     
                ? <p className={ song.titleTrack ? "song-title glow" : "song-title" } >
                    {song.otherTitle} / {song.title} 
                  </p>
                : <p className={ song.titleTrack ? "song-title glow" : "song-title" }>{song.title}</p>
              }
              { song.singer && <p className="song-singer">{song.singer}</p> }
              <p className="song-album-name">{song.album[0]}</p>
            </div>
          <p className="checkList"> 
              { 
                (song.lyrics).includes(person) &&
                <span>✔ Lyrics  </span>
              }
              { 
                (song.compose).includes(person) &&
                <span>✔ Composition  </span>
              }
              { 
                (song.arrange).includes(person) &&
                <span className="no-wrap">✔ Arrangement  </span>
              }
          </p>
          </Link>
        </article>
      ))}
    </section>
  )
}

export default FilterCredits