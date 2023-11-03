import { FaSquareXTwitter } from 'react-icons/fa6';
import { TfiYoutube } from 'react-icons/tfi';
import { FaInstagram, FaGlobeAsia, FaFacebookSquare } from 'react-icons/fa';


const Home = () => {
  const img = (name) => {
    return `/images/${name}.jpg`;
  }

  return (
    <main className="home-pg">
      <section className="title-desc">
        <h1>SKZ DISC</h1>
        <p className="disable">/skiz disc/</p>
        <p className="description">A fan-made website for Stray Kids discography. This website contains details about their albums, songs, and credits.</p>
      </section>
      <section className="about" id="skz-about">
        <figure className="home-img">
          <img src={img("stray_kids")} alt="Stray Kids" />
        </figure>
        <p className="text-area">
          Stray Kids (also known as SKZ) is an 8 member group under JYP Entertainment debuted on March 25, 2018. They are a self-producing group who are heavily involve in writing, composing and arranging their songs.
        </p>
      </section>
      <section className="about" id="unit-about">
        <figure className="home-img">
          <img src={img("skz_units")} alt="Stray Kids Main Units" />
        </figure>
        <div className="text-area">
          <p><b>Stray Kids have 3 main units.</b></p>

          <p><b>3RACHA</b> is the producing team of Stray Kids who are mostly involve in producing their songs. They also produce for other artists. Their credit name often have (3RACHA) beside their name. They started as a hip-hop crew during their trainee days and uploaded their songs and covers online since January 18, 2017.</p>

          <p>Following 3RACHA's name, the other two units are named <b>DANCERACHA</b> for the dance team and <b>VOCALRACHA</b> for the vocal team (it isn't that obvious hahaha). DANCERACHA and VOCALRACHA also writes and compose since Stray Kids' pre-debut show titled "Stray Kids". Despite divided into three main units, each member takes part in different roles (vocal, dance, rap) depending on their songs and performances.</p>

          <p>On <a href="/credits"><u>Credits</u></a> and <a href="/credits/search"><u>Search</u></a> page you may view the songs they worked on together and with other producers.</p>
        </div>
      </section>
      <section className="about">
        <p>Stray Kids is a very versatile group who are admired because of their performances, song making, and great personality. Check them out on their socials.</p>
        <div className="socials">
          <a aria-label="Youtube" href="https://www.youtube.com/c/StrayKids" target="_blank" rel="noopener noreferrer">
            <TfiYoutube />
          </a>
          <a aria-label="Twitter or X" href="https://twitter.com/Stray_Kids" target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter />
          </a>
          <a aria-label="Instagram" href="https://www.instagram.com/realstraykids" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a aria-label="Facebook" href="https://web.facebook.com/JYPEStrayKids" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare />
          </a>
          <a aria-label="Website" href="https://straykids.jype.com/" target="_blank" rel="noopener noreferrer">
            <FaGlobeAsia />
          </a>
        </div>
      </section>
    </main> 
  )
}

export default Home