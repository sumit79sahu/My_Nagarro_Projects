import React from "react";
import '../../Assets/styles/Components/Footer.css'

export default function Footer() {
    return (
        <>

            <footer>
                <div className="footer-container">
                    <div className="sec aboutus">
                        <h4>About Us</h4>
                        <p>QuickMart technology drives path-breaking, customer-focused 
                            innovation that makes high quality products accessible to Indian shoppers, 
                            besides making the online shopping experience convenient, intuitive and seamless.
                        </p>
                        <ul className="sci">
                            <li><a href=""><i className="fa fa-brands fa-facebook-f"></i></a></li>
                            <li><a href=""><i className="fa fa-brands fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a href=""><i className="fa fa-brands fa-instagram" aria-hidden="true"></i></a></li>
                            <li><a href=""><i className="fa fa-brands fa-youtube" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                    <div className="sec quicklinks">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="">About</a></li>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">Privacy Policy</a></li>
                            <li><a href="">Term & Conditions</a></li>
                            <li><a href="">Help</a></li>
                        </ul>
                    </div>
                    <div className="sec quicklinks">
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="">Men</a></li>
                            <li><a href="">Women</a></li>
                            <li><a href="">Children</a></li>
                            <li><a href="">Shoes</a></li>
                            <li><a href="">Clothing</a></li>
                            <li><a href="">Watch</a></li>
                        </ul>
                    </div>
                    <div className="sec contact">
                        <h4>Contact Us</h4>
                        <ul className="info">
                            <li>
                                <span><i className="fa fa-map-marker"></i></span>
                                <span>647 Linda Street <br />
                                    Phoenixville, PA 19460,<br />USA</span>
                            </li>
                            <li>
                                <span><i className="fa fa-solid fa-phone"></i></span>
                                <p><a href="tel:+919406982875">+91 9406982875</a> <br />
                                    <a href="tel:+919406982875">+91 9406982875</a>
                                </p>
                            </li>
                            <li>
                                <span><i className="fa fa-solid fa-envelope"></i></span>
                                <p><a href="mailto:Quicksaver123@gmail.com">Quicksaver123@gmail.com</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="copyrightText">
                <p>Copyright &copy; 2023 QuickMart. All Rights Reserved.</p>
            </div>

        </>
    );
}