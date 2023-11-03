import AlbumArt from './components/AlbumArt';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaSortNumericDownAlt, FaSortNumericDown } from 'react-icons/fa';

const Albums = ({ albums, handleAlbumArt, message, setMessage }) => {

  const oldFirst = [...albums].sort((a, b) => a.id > b.id ? 1 : -1,);
  const newFirst = [...albums].sort((a, b) => b.id > a.id ? 1 : -1,);


  const [ sortList, setSortList ] = useState(newFirst);
  const [ firstIsNew, setFirstIsNew ] = useState(true);
  const [ search, setSearch ] = useState('');
  const [ albumList, setAlbumList ]  = useState(sortList);

  useEffect( () => {
    const searchResult = sortList.filter( (album) => 
      ((album.title).toLowerCase()).includes(search.toLowerCase())
      || ((album.desc).toLowerCase()).includes(search.toLowerCase())
      || format(new Date(album.date), 'yyyy.MM.dd').includes(search.toLowerCase())
    );

    setAlbumList(searchResult);

    if (searchResult.length === 0 && search !== "") {
      setMessage("No Results Found");
    } else {
      setMessage("Couldn't fetch data at this moment.");
    }

  }, [sortList, search, setMessage])

  return (
    <main>
      <h1>Albums</h1>
      <div className="list-ctrl">
        <form className="list-form" onSubmit={ (e) => e.preventDefault()}>
          <label className="search-label" htmlFor="searchAlbum">Search</label>
          <input 
            className="searchbox"
            id="searchAlbum" 
            type="text" 
            role="searchbox" 
            placeholder="Search Album"
            value={search} 
            onChange={ (e) => setSearch(e.target.value)}
          />

          {/* New Album First */}
          <button 
            onClick={ (e) => {
              setSortList(oldFirst);
              setFirstIsNew(false);
            }}
            className={ firstIsNew ? "show" : "hidden" }
          ><FaSortNumericDownAlt/></button>

          {/* Old Album First */}
          <button 
            onClick={ (e) =>{
              setSortList(newFirst);
              setFirstIsNew(true);
            }}
            className={ !firstIsNew ? "show" : "hidden" }
          ><FaSortNumericDown/></button>
        </form>
        <p className="list-number">Number of albums: {albumList.length}</p>
      </div>

      
      { albumList.length ?
        <div className="albums-container">
          {
            albumList.map( (album) => (
              <article className="card album-list" key={album.id}>
                <Link to={album.id}>
                  <AlbumArt albumImg={ handleAlbumArt(album.title) } />
                  <p className="album-title">{album.title}</p>
                  <p className="album-desc">{album.desc}</p>
                  <p className="album-date">{ format(new Date(album.date), 'yyyy.MM.dd') } </p>
                </Link>
              </article>
            ))
          }
        </div>
        : <p>{message}</p>
      }
    </main>
  )
}

export default Albums