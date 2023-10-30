import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
const Success = ({frase}) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title:`${frase}`,
        showConfirmButton: false,
        timer: 2000,
        color : '#005692',
        iconColor : '#005692'
      
      })
  return (
    <div>
      
    </div>
  )
}

export default Success