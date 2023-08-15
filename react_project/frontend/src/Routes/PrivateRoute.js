import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginShow } from "../Store/Login/loginSlice";
import { Link } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import cart from '../Assets/Images/cart1.webp'
import '../Assets/styles/Route/PrivateRoute.css'
import { useUser } from "../hooks/useUser";

export default function PrivateRoute() {
    const dispatch = useDispatch();
    const user=useUser();

    if (user) return (<Outlet />)
    return (
        <>
            <div className="private-route-container">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container className="default-navbar-container">
                         <Link className="home" to='/'><h2 className="main-title">QuickMart</h2></Link>
                    </Container>
                </Navbar>
                <div className="private-route-login">
                    <img src={cart} alt="" className="private-route-image" />
                    <div className="navigation">
                        <span className="private-route-text">Please Login to get Access</span>
                        <Button type="button" className="private-route-btn" variant="success" onClick={() => dispatch(loginShow(true))}>Login</Button>
                    </div>
                </div>
            </div>
        </>

    )

}