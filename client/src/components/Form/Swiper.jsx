import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
const Swiper = ({frase, color, tipo}) => {
    Swal.fire({
        position: 'center',
        icon: `${tipo}`,
        title:`${frase}`,
        showConfirmButton: false,
        timer: 3000,
        color : `${color}`,
        iconColor : `${color}`
      
      })
  return (
    <div>
      
    </div>
  )
}

export default Swiper