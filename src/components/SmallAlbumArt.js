const SmallAlbumArt = ({ albumImg }) => {
  return (
    <figure className="smallAlbum">
      <img src={`./images/albums/${albumImg}`} alt="album" />
    </figure>
  )
}

const AlbumArtSmall = ({ albumImg }) => {
  return (
    <figure className="smallAlbum">
      <img src={`../images/albums/${albumImg}`} alt="album" />
    </figure>
  )
}

export { AlbumArtSmall }
export default SmallAlbumArt