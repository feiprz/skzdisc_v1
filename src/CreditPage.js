import FilterCredits from './components/FilterCredits';
import { ProfilePicture } from './components/ProfilePic';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { BsInfoCircle } from 'react-icons/bs';

const CreditPage = ({ credits, songs, handleAlbumArt }) => {
  const { name } = useParams(); 

  const urlName = (input) => {
    const nameLvl1 = input.toLowerCase();
    const specialChar = /[^a-zA-Z\d\s:]/g;
    const nameLvl2 = nameLvl1.replaceAll(specialChar, "");
    const name = nameLvl2.replaceAll(" ", "-");

    return name;
  }

  const person = credits.find( credit => urlName(credit.name).toString() === name);

  const strayKids = (name) => {
    return name.replaceAll("(3RACHA)", "");
  }

  const insta = (id) => {
    return `https://www.instagram.com/${id}/`;
  }

  return (
    <main>
      <h1>Credits</h1> 
      <div className="main-container single-credit">
        { person && 
        <>
        { person.skz &&
          <section className="col-1">
            <div className="inner">
              <h2>Profile</h2>
              <div className="skz-profile" key={person.id}>
                <ProfilePicture img={person.img} alt={strayKids(person.name)} />
                <div className="details">
                  <p><span className="label">Stage Name: </span>{strayKids(person.name)}</p>
                  <p><span className="label">Birth Date: </span>{ format(new Date(person.bday), 'MMMM d, yyyy') }</p>
                  <p>
                    <span className="label">Position: </span>
                    {person.desc}
                  </p>  
                  <p><span className="label">Instagram: </span>
                    <a href={ insta(person.instagram) }>{person.instagram}</a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        }
          
        <FilterCredits 
          isSKZ={person.skz}
          person={person.name} 
          songs={songs} 
          handleAlbumArt={handleAlbumArt}  
        />
        </>
        }

        { !person &&
          <p>No data. Please load.</p>
        }
      </div>
    </main>
  )
}

export default CreditPage