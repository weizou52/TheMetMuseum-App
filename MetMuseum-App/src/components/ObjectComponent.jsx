import {useEffect, useState} from 'react'
import axios from 'axios'
import { BsHandThumbsUp } from 'react-icons/bs'
import { useGlobalContext } from '../context'



const ObjectComponent = (props)=>{
  const {selectObject,addToFavorites} = useGlobalContext();
  const objectPreUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
  const [data, setData]=useState({})
  const objectUrl= objectPreUrl+props.id
  useEffect(()=>{
    axios.get(objectUrl).then((response)=>setData(response.data))
  },[]) 
  
  if (data.primaryImage){
    return (
    <article key={data.objectID} className="single-meal" >
        <img src={data.primaryImage} className="img" onClick={() => selectObject(data.objectID)} />
        <footer>
          <h5>{data.title}</h5>
          <button className='like-btn' onClick={() => addToFavorites(data.objectID)}><BsHandThumbsUp /></button>
        </footer>
      </article>
    
  )
  }else{
    return <></>
  }
}
export default ObjectComponent;
