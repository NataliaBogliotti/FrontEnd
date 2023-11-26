import Carousel from "react-bootstrap/esm/Carousel";


const CarouselHome = () => {
  return (
    <>
      <Carousel>

        <Carousel.Item>
          <img className='b block  w-100'
            style={{ maxHeight: "500px", objectFit: 'cover' }}
            src="public/assets/images/img 2.jpg" alt="img1" />
          <Carousel.Caption>
            <h3 style={{fontSize:"40px", fontStyle:"bold"}}>Bienvenido al mundo de la productividad</h3>
            <p style={{fontSize:"20px"}}>Organiza tu día con un eficiente listado de tareas.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className='b block  w-100'
            style={{ maxHeight: "500px", objectFit: 'cover' }}
            src="public/assets/images/img 1.jpg" alt="img2" />
        </Carousel.Item>

        <Carousel.Item>
          <img className='b block  w-100'
            style={{ maxHeight: "500px", objectFit: 'cover' }}
            src="public/assets/images/img 3.jpeg" alt="img3" />
          <Carousel.Caption style={{fontSize:"30px", fontStyle:"bold"}}>
            <p>Utiliza aplicaciones o agendas para gestionar tu lista de tareas</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default CarouselHome;
