import {useGlobalContext} from '../context'
import FavoritesComponent from './FavoritesComponent'


const Favorites = () => {
  const {favorites} = useGlobalContext()
  
  return <section className='favorites'>
    <div className='favorites-content'>
      <h5>Favorites</h5>
      <div className='favorites-container'>
        {favorites.map((singleObjectId)=>{
          return <FavoritesComponent key={singleObjectId} id={singleObjectId}/>
        })}
      </div>
    </div>
  </section>
}

export default Favorites;