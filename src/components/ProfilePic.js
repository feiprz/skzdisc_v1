const ProfilePic = ({ img, alt }) => {
    const imageURL = `/images/skz/${img}.JPG`;
    const altText = `${alt} of Stray Kids`;

    return (
    <figure className="profile-image">
        <img src={imageURL} alt={altText} />
    </figure>
  )
}

const ProfilePicture = ({ img, alt }) => {
  const imageURL = `../images/skz/${img}.JPG`;
  const altText = `${alt} of Stray Kids`;

  return (
  <figure className="profile-image-square">
      <img src={imageURL} alt={altText} />
  </figure>
  )
}

export { ProfilePicture }
export default ProfilePic