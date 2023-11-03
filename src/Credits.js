import ProfilePic from './components/ProfilePic';
import { Link } from 'react-router-dom';

const Credits = ({ credits, handleCreditURL }) => {
  const strayKids = (name) => {
    return name.replaceAll("(3RACHA)", "");
  }

  const producers = [...credits].sort((a, b) => 
    (a.name).toLowerCase() > (b.name).toLowerCase() ? 1 : -1,);

  
  return (
    <main>
      <h1>Credits</h1>
      
      <div className="main-container credit-page">
        { credits.length &&
        <>
          <section className="col-skz">
            <div className="skz-container">
              <h2>Stray Kids</h2>
              <div className="skz-flex">
              { credits.map( (person) => (
                person.skz &&
                <div className="skz-card" key={person.id}>
                  <Link to={handleCreditURL(person.name)}>
                    <ProfilePic img={person.img} alt={strayKids(person.name)}/>
                    <p>{strayKids(person.name)}</p>
                  </Link>
                </div>
              ))}
              </div>
            </div>
          </section>

          <section className="col-2">
            <h2>Other Producers</h2>
            { producers.map( (person) => (
              !person.skz && 
              <Link to={handleCreditURL(person.name)} key={person.id}>
                <li className="list-style" key={person.id}>{person.name}</li>
              </Link>
            ))}
          </section>
        </>
        }
        </div>
    </main>

  )
}

export default Credits