import { useGlobalContext } from '../context'
import ObjectComponent from './ObjectComponent'

const Objects = () => {
  const { loading, selectObject, objects, setObjects} = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }

  if (objects.length < 1) {
    return <section className="section">
      <h4>No objects matched your search term. Please try again.</h4>
    </section>
  }

  if (objects.length>120){
    setObjects(objects.slice(0,120))
  }

  return <section className="section-center">
    {objects.map((singleObjectId) => {
      return (
        <ObjectComponent key={singleObjectId} id={singleObjectId} onClick={() => selectObject(singleObjectId)} />
      )
    })}
  </section>

 
}


export default Objects

