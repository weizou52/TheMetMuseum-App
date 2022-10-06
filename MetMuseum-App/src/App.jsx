import './App.css'
import {useGlobalContext} from './context'
import Favorites from './components/Favorites'
import Objects from './components/Objects'
import Modal from './components/Modal'
import Search from './components/Search'

export default function App() {
  const {showModal, favorites}=useGlobalContext()
  return (
    <main>
      <Search/>
      {favorites.length > 0 && <Favorites />}
      
      <Objects/>
      {showModal && <Modal/>}
      
      
    </main>
  )
}
