import React, { useEffect, useState } from "react";
import '../../Assets/styles/Components/Vcard.css'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function Vcard({ data }) {
  const[priceDetails,setPriceDetails]=useState({})
  const[trimTitle,setTrimTitle]=useState('');
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null)


  const trim = (str) => {
    if (str.length > 50)
       str=str.slice(0, 41) + "...";
    setTrimTitle(str)
  }
  const discount=(updatedprice,offer)=>
  {
    const newPrice=updatedprice-((updatedprice*offer)/100)
    setPriceDetails(
       {
        ActualPrice:parseInt(updatedprice),
        Discount:offer,
        NewPrice:parseInt(newPrice)
        }
    )
  }
  const adjustPrice =(price)=>
  {
    if(price>=1 && price<250) discount(price*30,5)
    else if(price>=250 && price<500) discount(price*20,10)
    else  discount(price*10 ,15)
  }
  useEffect(()=>
  {
    try {
      adjustPrice(data.productPrice);
      trim(data.productTitle);
      setLoading(true);
    } catch (error) {
      setError(error)
    }

  },[])
  return (
    <>
      <Card style={{ width: '18rem' }} as={Link} to={`/productdetails/${data.productId}`} className="Vcard">
        <Card.Img variant="top" src={data.productImage} className="product-img" />
        {loading?
                <Card.Body className="product-details">
                <h5 className="product-title">{trimTitle}</h5>
                <div className="product-rating">
                  <div className="product-rate">
                    4.5 <StarIcon fontSize="x-small" />
                  </div>
                  <span className="product-rate-count">(140)</span>
                </div>
                <div className="product-price-details">
                  <span className="product-new-price"><CurrencyRupeeIcon fontSize="x-small" />{priceDetails.NewPrice}</span>
                  <span className="product-actual-price"><CurrencyRupeeIcon fontSize="x-small"/>{priceDetails.ActualPrice}</span>
                  <span className="product-discount">{priceDetails.Discount}% off</span>
                </div>
                <span className="product-delivery">Free Delivery</span>
                {/* <Button variant="primary" onClick={() => addProduct(data)}>Add to cart</Button> */}
              </Card.Body>:
              <span>loading...</span>}

      </Card>
    </>
  )
}