import NavbarComponent from "../Component/Navbars/NavbarComponent"
import headerimg from '../Assets/Images/header.png'
import mobile from '../Assets/Images/mobile.jpg'
import fashion from '../Assets/Images/fashion.jpg'
import beauty from '../Assets/Images/beauty.jpg'
import electronic from '../Assets/Images/electronics.jpg'
import others from '../Assets/Images/others.jpg'
import '../Assets/styles/Layout/Header.css'
export default function Header() {
    return (
        <>
            <NavbarComponent />
            <div className="header-container">
                <div className="header-body">
                    <div className="header-text">
                        <h1>The All-in-One Ecommerce Solution</h1>
                        <p>Shoppers have spent more than $28 billion and placed over 185 million orders on QuickMart ecommerce website</p>
                    </div>
                    <img src={headerimg} className="header-banner-img" />
                </div>
                <div className="header-footer-bar">
                    <a href=""><img src={fashion} alt="" /><h5>Fashion</h5></a>
                    <a href=""><img src={electronic} alt="" /><h5>Electronics</h5></a>
                    <a href=""><img src={mobile} alt="" /><h5>Mobiles</h5></a>
                    <a href=""><img src={beauty} alt="" /><h5>Beauty</h5></a>
                    <a href=""><img src={others} alt="" /><h5>others</h5></a>
                </div>
            </div>
        </>
    )
}