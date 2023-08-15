import { useSelector } from "react-redux"
import Hcard from "../Component/Cards/Hcard"
import '../Assets/styles/Pages/Cart.css'
import NavbarComponent from '../Component/Navbars/NavbarComponent';
import Footer from "../Component/Footer/Footer";
export default function Cart() {

    const products=useSelector(state=>state.persistedReducer.cart)
    return (
        <>
            <NavbarComponent />
            <div className="cart-container">
                {
                    products.map(product =>
                        <Hcard key={product.productId} data={product} />
                    )
                }
            </div>
            <Footer/>
        </>
    )
}