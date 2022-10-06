import {useEffect, useState} from 'react'
import axios from 'axios'
import { useGlobalContext } from '../context'



const FavoritesComponent = (props)=>{

  const {selectObject, removeFromFavorites} = useGlobalContext()
  const objectPreUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
  const [data, setData]=useState({})
  const objectUrl= objectPreUrl+props.id
  useEffect(()=>{
    axios.get(objectUrl).then((response)=>setData(response.data))
  },[]) 
  
  if (data.primaryImage){
    return (
      <div key={data.objectID} className='favorites-item'>
            <img src={data.primaryImage} className='favorites-img img' onClick={()=>selectObject(data.objectID)}/>
            <button className='remove-btn' onClick={()=>removeFromFavorites(data.objectID)}>remove</button>
      </div>
    
  )
  }else{
    return <></>
  }
}
export default FavoritesComponent;
