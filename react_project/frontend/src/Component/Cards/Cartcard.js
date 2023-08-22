import React from "react";
import '../../Assets/styles/Components/Cartcard.css'
import { remove } from '../../Store/Cart/cartSlice'
import { useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
export default function Hcard({ data }) {


    const [qty, setQty] = useState(1);
    const [priceDetails, setPriceDetails] = useState({})
    const [trimTitle, setTrimTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    const trim = (str) => {
        if (str.length > 50)
            str = str.slice(0, 41) + "...";
        setTrimTitle(str)
    }
    const discount = (updatedprice, offer) => {
        const newPrice = updatedprice - ((updatedprice * offer) / 100)
        setPriceDetails(
            {
                ActualPrice: parseInt(updatedprice),
                Discount: offer,
                NewPrice: parseInt(newPrice)
            }
        )
    }
    const adjustPrice = (price) => {
        if (price >= 1 && price < 250) discount(price, 5)
        else if (price >= 250 && price < 500) discount(price, 10)
        else discount(price, 15)
    }



    const dispatch = useDispatch();
    const removeProduct = (id) => {
        dispatch(remove(id))
    }

    useEffect(() => {
        try {
            adjustPrice(data.productPrice);
            trim(data.productTitle);
            setLoading(true);
        } catch (error) {
            setError(error)
        }

    }, [])

    return (
        <>
            <Card>
                <Card.Body className="Hcard">
                    <img src={data.productImage} alt="" className="cart-product-img" />
                    <div className="cart-product-details">
                        <h5>{trimTitle}</h5>
                        {/* <h6>&#8377;{priceDetails.NewPrice*qty}</h6> */}
                        <div className="product-price-details">
                            <span className="product-actual-price">&#8377;{priceDetails.ActualPrice}</span>
                            <span className="product-new-price">&#8377;{priceDetails.NewPrice * qty}</span>
                            <span className="product-discount">{priceDetails.Discount}% off</span>
                        </div>
                        <span>Delivery by Wed Aug 23 | <span style={{ color: 'green' }}>Free</span> </span>
                        <div className="btn-box">
                            <Button variant="danger" onClick={() => removeProduct(data.productId)}>Remove</Button>
                            <div className="Qty-counter">
                                <button onClick={() => setQty(qty - 1)} disabled={qty === 1 ? true : false}>-</button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(qty + 1)}>+</button>
                            </div>
                        </div>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}