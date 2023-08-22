import "../Assets/styles/Pages/ProductDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from '../Store/Cart/cartSlice'
import { useUser } from "../hooks/useUser";
import NavbarComponent from '../Component/Navbars/NavbarComponent';
import Footer from "../Component/Footer/Footer";
import Rating from "../Layout/Rating"
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceDetails, setPriceDetails] = useState({})

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();


  const addCart = () => {
    if (user) {
      dispatch(add(product))
    }
    navigate('/cart')


  }
  const fetchProduct = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/product/${id}`);
      const data = await result.json();
      setProduct(data[0]);
      adjustPrice(data[0].productPrice);
      setLoading(true);

    } catch (error) {

      setError(Error);
    }
  };
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
    if (price >= 1 && price < 250) discount(price * 30, 5)
    else if (price >= 250 && price < 500) discount(price * 20, 10)
    else discount(price * 10, 15)
  }
  useEffect(() => {
    try {
      fetchProduct();
    } catch (error) {
      setError(error)
    }
  }, []);
  if (!loading)
    return (
      <div className="loading">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="wrong">
        <span> Something went wrong </span>
      </div>
    );
  return (
    <>
      <NavbarComponent />
      <div className="product-item-container">
        <div className="product-item-img-cart-buy">
          <div className="product-item-img ">
            <img className="item-img" src={product.productImage} alt="" />
          </div>
          <div className="product-item-cart-buy">
            <Button onClick={addCart} variant="success" className="btn cart-btn">ADD TO CART</Button>
            <Button className="btn buy-btn">BUY NOW</Button>
          </div>
        </div>

        <div className="product-item-details">
          <h4 className="product-item-title">{product.productTitle}</h4>
          <span className="product-item-special-price">Special Price</span>
          <div className="product-item-price-details">
            <span className="product-item-new-price">&#8377;{priceDetails.NewPrice}</span>
            <span className="product-item-actual-price">&#8377;{priceDetails.ActualPrice}</span>
            <span className="product-item-discount">{priceDetails.Discount}% off</span>
          </div>
          <div className="product-item-rating">
            <div className="product-item-rate">4.5<StarIcon fontSize="x-small" /></div>
            <span className="product-item-rate-reviews-count">5,679 ratings and 377 reviews</span>
          </div>

          <div className="product-item-description">
            <span>Description</span><p >{product.productDescription}</p>
          </div>

          <div className="product-specification border">
            <h4>Specifications</h4>
            <div className="inthebox">
              <span>In the Box</span>
              <p>
                1 Camera, Lens SEL2870, Lens Hood, Lens Cap, Lens Rear Cap, Power Cord, Rechargeable Battery
                NP-FW50, AC Adaptor AC-UD10, Shoulder Strap, Body Cap, Accessory Shoe Cap, Eyepiece Cup, Micro
                USB Cable, Camera Bag
              </p>
            </div>

            <div className="general">
              <span className="genral-title">General</span>
              <div>
              <div className="product-item-general">
                <span>Brand</span><p >SONY</p>
              </div>
              <div className="product-item-general">
                <span>Model Number</span><p>
                  ILCE-7M2K/BQ IN5</p>
              </div>
              <div className="product-item-general">
                <span>Series</span><p>
                  Alpha Full Frame</p>
              </div>
              <div className="product-item-general">
                <span>Model Name</span><p>NA</p>
              </div>
              <div className="product-item-general">
                <span>SLR Variant</span><p>
                  Body with 28 - 70 mm Lens</p>
              </div>

              <div className="product-item-general">
                <span>SLR Variant</span><p>
                  Body with 28 - 70 mm Lens</p>
              </div>
              <div className="product-item-general">
                <span>Type</span><p>Mirrorless</p>
              </div>
              <div className="product-item-general">
                <span>color</span><p>Black</p>
              </div>
              </div>

            </div>
          </div>

          <Rating/>
        </div>

     


      </div>
      <Footer />
    </>
  );
}
