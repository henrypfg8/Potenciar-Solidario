import Swal from 'sweetalert2'

const Success = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha publicado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
  return (
    <div>
      
    </div>
  )
}

export default Success