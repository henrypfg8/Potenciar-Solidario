import React, { useState, useEffect, useRef} from 'react'


const CardDashboard = ({post}) => {
  const [addPostToList, setAddPostToList] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      console.log('agregar a la lista');
      //hacer el dispatch de la acción para agregar el post a la lista de espera
    } else {
      console.log('eliminando de la lista');
        //hacer el dispatch de la acción para eliminar el post de la lista de espera
    }
    setAddPostToList(e.target.checked);
  };

  const handleDeleteById = id => {
    // hacer el dispatch de la acción para eliminar el post de la base de datos
  }


  return (
    <div className='dashboard__card'>
       <div>
       <img className='dashboard__img' src={post.image} alt="imagen" />
       </div>
       <div className='dashboard__info'>
         <h1>{post.title}</h1>
         <p className='dashboard__p'>{post.description}</p>
       </div>
        <div className='dashboard__selected'>
        <input className='dashboard__check' type="checkbox"
          checked={addPostToList} // Asegúrate de que el checkbox refleje el estado
          onChange={handleCheckboxChange}
        />
            <img className='dashboard__trash' src="/images/trash.png" alt="img-trash" 
              onClick={() => handleDeleteById(post.id)}
              />
        </div>
    </div>
  )
}

export default CardDashboard