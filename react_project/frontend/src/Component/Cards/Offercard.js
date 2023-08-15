
import '../../Assets/styles/Components/Offercard.css'
import {Button} from 'react-bootstrap'
export default function Offercard({data}) {

    return (
        <>
            <div className="offer-card-container">
                <div className='offers'>
                    <h5>{data.offer}</h5>
                    <span>{data.text}</span>
                    <Button>Explore</Button>
                </div>
                <img src={data.image} alt="" />
            </div>
        </>
    )
} 