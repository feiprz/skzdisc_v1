import AlbumArt from './components/AlbumArt';
import AlbumSong from './components/AlbumSong';
import SongCredits from './components/SongCredits';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

const AlbumPage = ({ songs, albums, handleAlbumArt, handleCreditURL }) => {
  const { id } = useParams();
  const album = albums.find( album => (album.id).toString() === id);

  const songLink = (title) => {
    const getSongID = songs.filter( song => song.title === title).map( track => track.id);
    const songID = getSongID.toString();

    return `/song/${songID}`
  }

  const getSong = (trackTitle) => {
    const songArray = songs.find( song => song.title === trackTitle);
    return songArray;
  }



  return (
    <main>
      <h1>Album</h1>

      <div className="main-container">
      { album &&
      <>
        <section className="col-1">
          <div className="inner">
            <h2>Album Details</h2>
            <AlbumArt albumImg={ handleAlbumArt(album.title) } />
            <div className="details">
              <p><span className="label">Album Title: </span>{album.title}</p>
              <p><span className="label">Album Type: </span>{album.desc}</p>
              <p><span className="label">Release Date: </span>{ format(new Date(album.date), 'yyyy.MM.dd') } </p>
            </div>
          </div>
        </section>

        <section className="col-2">
          <h2>Tracklist</h2>
        {
          album.tracklist.map( (track) => (
            <>
              <Link to={songLink(track.title)}>
               <AlbumSong 
                  key={track.num}
                  num={track.num} 
                  titleTrack={track.titleTrack}
                  songTitle={track.title} 
                  songs={songs}
                />
              </Link>
              <div key={track.num}>
                <SongCredits track={getSong(track.title)} handleCreditURL={handleCreditURL}/>
              </div>
            </>
          ))
        }
        </section>
      </>
      }

      { !album &&
        <p>No data to display. Maybe you need to reload</p>
      }
      </div>
    </main>
  )
}

export default AlbumPage