import NavbarComponent from "../Component/Navbars/NavbarComponent";
import Footer from "../Component/Footer/Footer"
import '../Assets/styles/Pages/ProductList.css'
import { useState,useEffect} from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Productcard from '../Component/Cards/Productcard';


export default function ProductList()
{
    const{id:categoryId}=useParams()
    console.log(categoryId)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(null);
    const fetchProductsByCategory = async () => {
        try {
            const result = await fetch(`http://localhost:3000/api/product/category/${categoryId}`);
            const data = await result.json();
            setProducts(data);
            setLoading(true);

        } catch (error) {
            setError(Error);
        }

    }

    useEffect(() => {
        fetchProductsByCategory();
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

    return(
        <>
        <NavbarComponent/>
        <div className="productlist-container border">
            
            <div className="products">
            {
                products.map((data)=>(
                    <Productcard data={data}/>
                ))
            }
            </div>
        </div>
        <Footer/>
        </>
    );

}