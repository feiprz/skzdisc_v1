const AlbumArt = ({ albumImg }) => {
    const albumArt = `/images/albums/${albumImg}`;
    return (
      <figure className="album-art">
        <img src={albumArt} alt="album" />
      </figure>
    )
  }
  
  export default AlbumArt