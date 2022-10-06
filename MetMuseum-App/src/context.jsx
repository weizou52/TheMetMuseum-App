import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const initialObjectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sunflowers'
const allObjectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q='
// const randomUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'


const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

const AppProvider = ({ children }) => {
  const [objects, setObjects] =useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedObject, setSelectedObject] = useState(null)
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  // const fetchObjects = (url) => {
  //   setLoading(true)
  //   axios.get(url).then((res)=>res.data.objectIDs).then((newData)=>setObjects(newData))
  //   setLoading(false)
  // }

  const fetchObjects = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.objectIDs) {
        setObjects(data.objectIDs)
      }
      else {
        setObjects([])
      }
    }
    catch (e) {

      console.log(e.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchObjects(initialObjectsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchObjects(`${allObjectsUrl}${searchTerm}`)
  }, [searchTerm])


  
  const fetchRandomObject = () => {
    let randomId= [Math.floor(Math.random()*20000)]
    console.log(randomId)
    setObjects(randomId)
  }


  const selectObject = (idObject) => {
    setSelectedObject(idObject);
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  const addToFavorites = (idObject) => {
    if (favorites.indexOf(idObject)>-1) return
    const updatedFavorites = [...favorites, idObject]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  const removeFromFavorites = (idObject) => {
    const updatedFavorites = favorites.filter((id) => id !=idObject);
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  return (
    <AppContext.Provider
      value={{ loading, objects, setObjects, setSearchTerm, fetchRandomObject, showModal, selectObject, selectedObject, closeModal, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }