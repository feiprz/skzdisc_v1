import { AlbumArtSmall } from './components/SmallAlbumArt';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';

const CreditSearch = ({ credits, songs, handleAlbumArt }) => {
  const [ songList, setSongList ] = useState(songs);

  const [ selectedType, setSelectedType ] = useState("All");
  const [ isExclusive, setIsExclusive] = useState(false);
  const [ selected, setSelected ] = useState([]);

  const [ search, setSearch ] = useState('');
  const [ prodList, setProdList ] = useState(credits);
  const [ message, setMessage ] = useState("");
  const [ showMenu, setShowMenu ] = useState(true);
  const [ showCredits, setShowCredits ] = useState(false);

  const { width } = useWindowSize();

  useEffect( () => {
    if (width >= 600) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [width])

  useEffect( () => {
    if (selectedType === "All") {
      const allCredits = songs.filter( song => selected.every((i) => {
        return (song.lyrics).includes(i) || (song.compose).includes(i) || (song.arrange).includes(i) 
      }));
      setSongList(allCredits);

    } else if (selectedType === "Lyrics") {
        if (isExclusive) {
          const lyrics = songs.filter( song => 
            selected.every((i) => (song.lyrics).includes(i)) && (song.lyrics).length === selected.length
          );
          setSongList(lyrics);
        } else {
          const lyrics = songs.filter( song => selected.every((i) => (song.lyrics).includes(i)));
          setSongList(lyrics);
        }

    } else if (selectedType === "Composition") {
        if (isExclusive) {
          const composition = songs.filter( song => 
            selected.every((i) => (song.compose).includes(i)) && (song.compose).length === selected.length
          );
          setSongList(composition);
        } else {
          const composition = songs.filter( song => selected.every((i) => (song.compose).includes(i)));
          setSongList(composition);
        }

    } else if (selectedType === "Arrangement") {
        if (isExclusive) {
          const arrangement = songs.filter( song => 
            selected.every((i) => (song.arrange).includes(i)) && (song.arrange).length === selected.length
          );
          setSongList(arrangement);
        } else {
          const arrangement = songs.filter( song => selected.every((i) => (song.arrange).includes(i)));
          setSongList(arrangement);
        }

    } else {
      setSongList(songs);
    }
  }, [songs, selectedType, isExclusive, selected])

  // Searching Name
  useEffect( () => {
    const searchKey = search.toLowerCase();
    const searchResult = credits.filter( (p) => ((p.name).toLowerCase()).includes(searchKey)
    );

    setProdList(searchResult); 

    if (searchResult.length === 0 && search !== "") {
      setMessage("No Results Found");
    } else {
      setMessage("Couldn't fetch data at this moment.");
    }

  }, [credits, search])

  // radio buttons
  const handleOptionChange = (e) => {
    setSelectedType(e.target.value);
  }

  // selected only
  const handleSelectOpt = (e) => {
    setIsExclusive( prev => !prev );
  }

  // names 
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelected(pre => [...pre, value]);
    } else {
      setSelected(pre => {
        return [...pre.filter( name => name !== value)]
      })
    } 
  }

  const handleShowCreds = (e) => {
    setShowCredits( prev => !prev );
  }

  const handleReset = (e) => {
    setSongList(songs);
    setSelected([]);
    setSelectedType("All");
    setIsExclusive(false);
    setSearch('');
  }

  return (
    <main className="page-cs">
        <h1>Credit Search</h1>
        <div className="main-container">
          <section className="col-1 search-here">
            <div className="inner">
              <h2>Search Here</h2>
              <div className="grouped">
                <p className="label">Direction</p>
                <p>Select names to see what songs they worked on together.</p>
              </div>
              <div className="btn-grp">
                <button id="showMenu" className="btn-ctrl btn-green full" 
                  onClick={ (e) => {
                    e.preventDefault();
                    setShowMenu(true);
                  }} 
                > Show Menu
                </button>
                <button className="reset btn-ctrl btn-red full" type="reset" 
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>

              <div className={`pop-up ${showMenu ? "" : "hide"}`}>
                <form className="credit-search">
                  <div className="grouped selected-names">
                    <p className="label"
                    > You Selected
                    </p>
                    <div className="result">
                      <p>Credit Type: {selectedType}</p>
                      <p>Selected only?: {isExclusive.toString()}</p>
                      <p>Names: {selected.join(', ')}</p>
                    </div> 
        
                  </div>

                  <div className="selection-container">
                    <div className="grouped">
                      <p className="label">Options</p>
                      <div className="selection-grp">
                        <label className="form-control radio">
                          <input type="radio" name="creditType" 
                            id="allType" value="All"
                            checked={ selectedType === "All" }
                            onChange={handleOptionChange}
                          />
                          All
                        </label>

                        <label className="form-control radio">
                          <input type="radio" name="creditType" 
                            id="crLyrics" value="Lyrics"
                            checked={ selectedType === "Lyrics" }
                            onChange={handleOptionChange}
                          />
                        Lyrics</label>

                        <label className="form-control radio">
                          <input type="radio" name="creditType" 
                            id="crCompose" value="Composition"
                            checked={ selectedType === "Composition" }
                            onChange={handleOptionChange}
                          />
                        Composition</label>

                        <label  className="form-control radio">
                          <input type="radio" name="creditType"
                            id="crArrange" value="Arrangement"
                            checked={ selectedType === "Arrangement" }
                            onChange={handleOptionChange}
                          />
                          Arrangement 
                        </label>
                      </div>

                      <div className="selection-grp">
                        <label 
                        className={`form-control ${(selectedType === "All") ? "disable" : ""}`}>
                          <input type="checkbox" name="selectedOnly" disabled={selectedType === "All"}
                            id="selectedOnly" checked={isExclusive} onChange={handleSelectOpt} />
                          Consist of selected names only
                        </label>
                        <label 
                        className="form-control">
                          <input type="checkbox" name="showCreds" 
                            id="showCreds" checked={showCredits} onChange={handleShowCreds} />
                          Show Credits
                        </label>
                      </div>
                    </div>

                    <div className="grouped nameSearch">
                      <p className="label">Select Name</p>
                      <label className="search-label" htmlFor="searchName">Search</label>
                        <input 
                          className="searchbox"
                          id="searchName" 
                          type="text" 
                          role="searchbox" 
                          placeholder="Search Name"
                          value={search} 
                          onChange={ (e) => setSearch(e.target.value)}
                        />
                      { prodList.length ? 
                          prodList.map( (person) => (
                          <label key={person.id} 
                            className={ person.skz ? "form-control glowskz" : "form-control"} >
                            <input type="checkbox" name="nameList" 
                              id={person.id} value={person.name} onClick={handleChange}
                            />

                            {person.name}
                          </label>
                          ))
                        : <p>{message}</p>
                      }
                    </div>
                  </div>

                  <div className="btn-container">
                    <button className="reset btn-ctrl btn-red half" type="reset" 
                    onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button id="showResult" className="btn-ctrl btn-green half"
                      onClick={ (e) => {
                        e.preventDefault();
                        setShowMenu(false);
                    }}>
                      Result
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <section className="col-2">
            <p>Number of Songs: {songList.length}</p>
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
                    <p className="song-album-name">{(song.album).join(', ')}</p>
                  </div>
                </Link>
                <div className={!showCredits ? "hide" : "show"}>
                  <p className="checkList">Lyrics by: {(song.lyrics).join(', ')}</p>
                  <p className="checkList">Compose by: {(song.compose).join(', ')}</p>
                  <p className="checkList">Arranged by: {(song.arrange).join(', ')}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
    </main>
  )
}

export default CreditSearch