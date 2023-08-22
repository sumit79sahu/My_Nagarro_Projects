import { useSelector } from "react-redux"
import Cartcard from "../Component/Cards/Cartcard"
import '../Assets/styles/Pages/Cart.css'
import NavbarComponent from '../Component/Navbars/NavbarComponent';
import Footer from "../Component/Footer/Footer";
import { Link } from "react-router-dom";
import { loginShow } from "../Store/Login/loginSlice";

import { Button } from "react-bootstrap";
import cart from '../Assets/Images/cart1.webp'
import '../Assets/styles/Route/PrivateRoute.css'



export default function Cart() {

    const products = useSelector(state => state.persistedReducer.cart)
    if (products.length === 0)
        return (
            <>
                <NavbarComponent />
                <div className="private-route-login">
                    <img src={cart} alt="" className="private-route-image" />
                    <div className="navigation">
                        <span className="private-route-text">Your Cart is Empty</span>
                        <Button as={Link} to="/" type="button" className="private-route-btn" variant="success">Shop Now</Button>
                    </div>
                </div>
                <Footer />
            </>
        )
    return (
        <>
            <NavbarComponent />
            <div className="cart-product-price">
                <div className="cart-container">
                    {
                        products.map(product =>
                            <Cartcard key={product.productId} data={product} />
                        )
                    }
                </div>
                <div className="price-details border">
                    <h5>Price Details</h5>
                    <hr />
                    <div>
                        <h6>Price (item {products.length})</h6>
                        <h6>&#8377;5000</h6>
                    </div>
                    <div>
                        <h6>Discount</h6>
                        <h6 style={{ color: 'green' }}>-&#8377;2000</h6>
                    </div>
                    <div>

                        <h6>Delivery</h6>
                        <h6>Free</h6>
                    </div>
                    <hr />
                    <div>
                        <h5>Total Amount</h5>
                        <h5>&#8377;3000</h5>
                    </div>

                    <hr />
                    <h6 style={{ color: 'green' }}>You will save ₹8,005 on this order</h6>
                </div>
            </div>
            <Footer />
        </>
    )
}