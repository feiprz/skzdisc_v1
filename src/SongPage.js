import Youtube from './components/Youtube';
import SongCredits from './components/SongCredits';
import { useParams, Link } from 'react-router-dom';

const SongPage = ({ albums, songs, handleCreditURL }) => {
  const { id } = useParams();
  const song = songs.find( song => (song.id).toString() === id);

  const handleAlbumLink = (name) => {
    const thisAlbum = albums.find( album => album.title === name);
    return `/album/${thisAlbum.id}`;
  }

  return (
    <main className="song-page">
      <h1>Song</h1>

      <div className="main-container">
        <div className="col-sp col-wide">
            { song &&
              <>
                <section className="song-details col">
                  <h2>Music / Video</h2>
                  <Youtube videoId={song.video}/>
                </section> 

                <section className="col">
                  <h2>Details</h2>
                    <div className="details" key={song.id}>
                      { song.titleTrack && <p className="title-track">Title Track</p>}
                      { song.otherTitle ?
                        <>
                          <p><span className="label">Title: </span>{song.otherTitle}</p> 
                          <p><span className="label">English Title: </span>{song.title}</p>
                        </>

                        : <p><span className="label">Title: </span>{song.title}</p>
                      }
                      <p><span className="label">Sung by: </span>
                        { song.singer ? song.singer : "Stray Kids" }
                      </p>
                      <p className="tags">
                        <span className="label">Released in:</span>
                        { song.album.map( album => (
                          <li><Link to={handleAlbumLink(album)}>{album}</Link></li>
                        ))}
                      </p>
                    </div> 
                  <h2>Credits</h2>
                  <SongCredits track={song} handleCreditURL={handleCreditURL}/>
                </section>
              </>
            }

            { !song &&
              <p>No data to display. Maybe you need to reload</p>
            }
          </div>
        </div>
    </main>
    
  )
}

export default SongPage