import React from "react";
import '../../Assets/styles/Components/Hcard.css'
import { remove } from '../../Store/Cart/cartSlice'
import { useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
export default function Hcard({ data }) {
    const dispatch = useDispatch();
    const removeProduct = (id) => {
        dispatch(remove(id))
    }
    return (
        <>
            <Card>
                <Card.Body className="Hcard">
                    <img src={data.productImage} alt="" className="cart-product-img" />
                    <div className="cart-product-details">
                        <h5>{data.productTitle}</h5>
                        <h6>Price {data.productPrice}</h6>
                        <Button variant="danger" onClick={()=>removeProduct(data.productId)}>Remove</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}