import '../../Assets/styles/Components/ProductCategorycard.css'
import {Link} from 'react-router-dom';
export default function ProductCategorycard({data}) {
    return (
        <>
            <div className="product-category-card border">
                <Link to={`/productList/${data.categoryId}`}>
                    <img src={data.categoryImage} alt="" />
                    <span>{data.category}</span>
                    <h5>From &#8377; {data.products.length===0?0:data.products[0].productPrice}</h5>
                </Link>
            </div>

        </>
    )
}