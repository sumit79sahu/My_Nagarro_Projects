import Offercard from "../Component/Cards/Offercard";
import fashion from '../Assets/Images/men-fashion.jpg'
import furniture from '../Assets/Images/Furniture.jpg'
import ProductCategorycard from "../Component/Cards/ProductCategorycard";
import cycle from '../Assets/Images/cycle.jpg'
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import '../Assets/styles/Layout/Body.css';
import { useEffect} from "react";
export default function Body() {


    const [productCategories, setProductCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(null);
    const fetchProductCategories = async () => {
        try {
            const result = await fetch("http://localhost:3000/api/categories");
            const data = await result.json();
            console.log(data)
            setProductCategories(data);
            setLoading(true);

        } catch (error) {
            setError(Error);
        }

    }
 
    const [offer, setOffer] = useState(
        [
            { offer: "Get Up to 60% off | Furniture", text: "Indulge in Luxurious Confomfort. Discover our Premium furniture Colletion", image: furniture },
            { offer: "Get Up to 60% off | Styles for men", text: "New Season. New Mood. New You. Its Time To Turn Over a New Leaf", image: fashion },
            { offer: "Get Up to 60% off | Furniture", text: "Indulge in Luxurious Confomfort. Discover our Premium furniture Colletion", image: furniture }
        ])



    const [offerStart, setOfferStart] = useState(0)
    const [offerEnd, setOfferEnd] = useState(2)


    const [categoryStart, setCategoryStart] = useState(0)
    const [categoryEnd, setCategoryEnd] = useState(5)

    const onOfferNext = () => {
        setOfferStart(offerStart + 1)
        setOfferEnd(offerEnd + 1)
    }
    const onOfferPrevious = () => {
        setOfferStart(offerStart - 1)
        setOfferEnd(offerEnd - 1)
    }

    const onCategoryNext = () => {
        setCategoryStart(categoryStart + 1)
        setCategoryEnd(categoryEnd + 1)
    }
    const onCategoryPrevious = () => {
        setCategoryStart(categoryStart - 1)
        setCategoryEnd(categoryEnd - 1)
    }


    useEffect(() => {
        fetchProductCategories();
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
            <div className="main-container">
                <div className="home-offers">
                    <h4>Offers</h4>
                    <span>Best deals and special offers for you</span>
                    <div className="offers-cards">

                        {
                            offerStart === 0 ? null : <button className="navigation-btn p-btn" onClick={onOfferPrevious}><i className="fa fa-solid fa-chevron-left"></i></button>
                        }
                        {
                            offer.slice(offerStart, offerEnd).map((data, index) =>
                            (

                                <Offercard data={data} key={index} />

                            ))
                        }
                        {
                            offer.length === offerEnd ? null : <button className="navigation-btn n-btn" onClick={onOfferNext}><i className="fa fa-solid fa-chevron-right"></i></button>
                        }

                    </div>
                    {/* <div className="page-count">
                        {
                            offer.map(() => (<div className="pagination"></div>))
                        }
                    </div> */}


                </div>
                <div className="product-categories ">
                    <h4>Today's Deals</h4>
                    <span>Products with the Best selling  Price</span>
                    <div className="product-container">
                        {
                            categoryStart === 0 ? null : <button className="navigation-btn p-btn" onClick={onCategoryPrevious}><i className="fa fa-solid fa-chevron-left"></i></button>
                        }

                        {
                            productCategories.slice(categoryStart, categoryEnd).map((product, index) => (
                                <ProductCategorycard data={product} key={index} />
                            ))}

                        {
                            productCategories.length === categoryEnd ? null : <button className="navigation-btn n-btn" onClick={onCategoryNext}><i className="fa fa-solid fa-chevron-right"></i></button>
                        }
                    </div>
                </div>
                <div className="product-banners-ratedproduct">
                    <div className="rated-products">
                        <h4>Top Rated Products</h4>
                        <div className="rated-products-container">
                            <ProductCategorycard data={productCategories[1]} />
                            <ProductCategorycard data={productCategories[2]} />
                            <ProductCategorycard data={productCategories[3]} />
                            <ProductCategorycard data={productCategories[1]} />
                        </div>
                    </div>
                    <div className="product-banner2">
                        <div>
                            <h1>Capture Every Moment</h1>
                            <h4>Explore Our Camera & Photograpgy Gear </h4>
                        </div>
                        <a href=""><h4>Explore Cameras </h4></a>
                    </div>
                </div>
            </div>
        </>
    )
}