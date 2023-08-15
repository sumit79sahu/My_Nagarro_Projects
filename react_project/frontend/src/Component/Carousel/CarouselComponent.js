import Carousel from 'react-bootstrap/Carousel';
import img from '../../Assets/Images/laptop.jpg'
import img1 from '../../Assets/Images/laptop1.jpg'
import img2 from '../../Assets/Images/laptop2.webp'
export default function CarouselComponent() {
  return (
    <>
    <div style={{padding:'20px',paddingBottom:'0'}}>
    <Carousel >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>

    </>
  );
}

