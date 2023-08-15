import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginShow } from "../../Store/Login/loginSlice";
import { signupShow } from "../../Store/Signup/signupSlice";
import { removeAuthToken } from "../../Store/Login/userAuthorizationSlice";
import { useSelector } from "react-redux";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useUser } from "../../hooks/useUser";
import "../../Assets/styles/Components/Navbar.css";

export default function NavbarComponent() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.persistedReducer.cart);
  const navigate = useNavigate();


  const onLogout = () => {
    navigate('/')
    dispatch(removeAuthToken())
  }
  const user = useUser();
  return (
    <>

      <div className="navbar-container navbar">
        <div className="nav-cnt-item1">
          <Link className="home" to="/">
            <h2 className="main-title">QuickMart</h2>
          </Link>
          {!user ? (<>
            <Nav.Link
              className="ms-2 nav-link"
              onClick={() => dispatch(loginShow(true))}
            >
              Login
            </Nav.Link>
            <Nav.Link
              className="ms-2 nav-link"
              onClick={() => dispatch(signupShow(true))}
            >
              SignUp
            </Nav.Link></>) : (
              <Nav.Link as={Link} to="/cart" >
                <IconButton aria-label="cart" className="cart-icon nav-link" >
                  <ShoppingCartIcon fontSize="small" />
                  {cartItem.length !== 0 ? (
                    <span className="cart-badge">{cartItem.length}</span>
                  ) : (
                    <span></span>
                  )}
                </IconButton>
              </Nav.Link>
          )}

        </div>
        <div className="nav-cnt-item2 nav-link">
          {!user ? null
            :
            <NavDropdown title={`${user.name}`} id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to={'/myprofile'}>My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>

            </NavDropdown>}

        </div>
      </div>

    </>
  );
}
