import SmallAlbumArt from './components/SmallAlbumArt';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSortNumericDownAlt, FaSortNumericDown } from 'react-icons/fa';

const Songs = ({ newFirst, oldFirst, handleAlbumArt, message, setMessage  }) => {
    
  const [ sortList, setSortList ] = useState(newFirst);
  const [ firstIsNew, setFirstIsNew ] = useState(true);
  const [ search, setSearch ] = useState('');
  const [ songList, setSongList ]  = useState(sortList);

  useEffect( () => {
    const searchKey = search.toLowerCase();
    const searchResult = sortList.filter( (song) => 
      ((song.title).toLowerCase()).includes(searchKey)
      || (song.otherTitle ? ((song.otherTitle).toLowerCase()).includes(searchKey) : false)
      || (song.singer ? ((song.singer).toLowerCase()).includes(searchKey) : false)
      || ((((song.album).toString()).toLowerCase()).includes(searchKey))
    );

    setSongList(searchResult); 

    if (searchResult.length === 0 && search !== "") {
      setMessage("No Results Found");
    } else {
      setMessage("Couldn't fetch data at this moment.");
    }

  }, [sortList, search, setMessage])

  return (
    <main>
      <h1>Songs</h1>
      <div className="list-ctrl">
        <form className="list-form" onSubmit={ (e) => e.preventDefault()}>
          <label className="search-label" htmlFor="searchSong">Search</label>
          <input 
            className="searchbox"
            id="searchSong" 
            type="text" 
            role="searchbox" 
            placeholder="Search Song"
            value={search} 
            onChange={ (e) => setSearch(e.target.value)}
          />

          {/* New Song First */}
          <button 
            onClick={ (e) => {
              setSortList(oldFirst);
              setFirstIsNew(false);
            }}
            className={ firstIsNew ? "show" : "hidden" }
          ><FaSortNumericDownAlt/></button>

          {/* Old Song First */}
          <button 
            onClick={ (e) =>{
              setSortList(newFirst);
              setFirstIsNew(true);
            }}
            className={ !firstIsNew ? "show" : "hidden" }
          ><FaSortNumericDown/></button>
        </form>
        <p className="list-number">Number of songs: {songList.length}</p>
      </div>

      { songList.length ? 
        <>
        <div className="songs-container">
          { 
            songList.map( (song) => (
            <article className="card song-list" key={song.id}>
              <Link to={song.id}>
                <div className="scroll song-summary">
                  <SmallAlbumArt albumImg={ handleAlbumArt(song.album[0]) }/>
                
                  { song.otherTitle                     
                    ? <p className={ song.titleTrack ? "song-title glow" : "song-title" } >
                        {song.otherTitle} / {song.title} 
                      </p>
                    : <p className={ song.titleTrack ? "song-title glow" : "song-title" }>{song.title}</p>
                  }
                  { song.singer && <p className="song-singer">{song.singer}</p> }
                  <p className="song-album-name">{(song.album).join(', ')}</p>
                </div>
              </Link>
            </article>
            )) 
          }
        </div>
        </>
        : <p>{message}</p>
      }
    </main> 
  )
}

export default Songs