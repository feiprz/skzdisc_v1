
const Youtube = ({ videoId }) => {
    const videoURL = `https://www.youtube.com/embed/${videoId}?si=pwv-T2ysw3HCopyn`;

    return (
    <section className="video-container">
        <iframe width="100%" height="100%" 
        src={videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </section>
  )
}

export default Youtube