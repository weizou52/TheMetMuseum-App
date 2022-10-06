import {useGlobalContext} from '../context'
import {useEffect, useState} from 'react'
import axios from 'axios'


const Modal = () => {
  const {selectedObject, closeModal}=useGlobalContext()
  const objectPreUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
  const [data, setData]=useState({})
  const objectUrl= objectPreUrl+selectedObject

  useEffect(()=>{
    axios.get(objectUrl).then((response)=>setData(response.data))
  },[]) 
  
  return <aside className='modal-overlay'>
  <div className='modal-container'>
    <img src={data.primaryImage} alt={data.title} className='img modal-img'/>
    <div className='modal-content'>
      <h4>{data.title}</h4>
      <p>{data.artistDisplayName}{data.artistDisplayBio}</p>
      <p>Classification:  {data.classification}</p>
      <p>AccessionNumber:  {data.accessionNumber}</p>
      <a href={data.objectURL} target='_blank'>Original Source</a>
      <button className='btn btn-hipster close-btn' onClick={closeModal}>close</button>
    </div>
    
  </div>
  </aside>
}

export default Modal;