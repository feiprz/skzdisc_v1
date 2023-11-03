const AlbumSong = ({ num, titleTrack, songTitle, songs }) => {
    const track = songs.find( song => (song.title).toString() === songTitle);

    return (
        <li className="list-style tracklist" key={num}>
            <div className="track-num">
                <p>{num}.</p> 
                { titleTrack && <p className="title-track">Title</p> }
            </div>

            <div className="track-details">
            { track.otherTitle  
                ? <p className="song-title">{track.otherTitle} / {track.title}</p>
                : <p className="song-title">{track.title}</p> 
            }

            { track.singer
                ? <p className="song-singer">{track.singer}</p>
                : <p className="song-singer">Stray Kids</p>
            }  
            </div>
        </li>
    )
}

export default AlbumSong
