import { Link } from 'react-router-dom';

const SongCredits = ({ track, handleCreditURL }) => {
    const lyricists = track.lyrics;
    const composers = track.compose;
    const arrangers = track.arrange;

    return (
    <div className="song-credits tags">
        <p className="credits-list">
            <span className="label">Lyrics by: </span>
            <span>
                { 
                    lyricists.map( (lyricist) => { return (
                    <li key={lyricist}><Link to={handleCreditURL(lyricist)}>{lyricist}</Link></li>
                    )})
                }
            </span>
        </p>
        <p className="credits-list"> 
            <span className="label">Compose by: </span>
            <span>
                { 
                    composers.map( (composer) => { return (
                    <li key={composer}><Link to={handleCreditURL(composer)}>{composer}</Link></li>
                    )})
                }
            </span>
        </p>
        <p className="credits-list">
            <span className="label">Arranged by: </span>
            <span>
                {   
                    arrangers.map( (arranger) => { return (
                    <li key={arranger}><Link to={handleCreditURL(arranger)}>{arranger}</Link></li>
                    )})
                }
            </span>
        </p>
    </div>
    
    )
}

export default SongCredits