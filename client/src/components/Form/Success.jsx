import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
const Success = ({frase, color}) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title:`${frase}`,
        showConfirmButton: false,
        timer: 2000,
        color : `${color}`,
        iconColor : `${color}`
      
      })
  return (
    <div>
      
    </div>
  )
}

export default Success