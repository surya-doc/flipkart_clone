import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className="md:block">
            <div className="footer">
                    <div className="restFooter flex justify-center pl-10 py-4">
                        <div className="flex justify-center md:w-12/12 w-8/12">
                            <div className="footerCol flex-col md:w-3/12 w-2/12">
                                <h4>ABOUT</h4>
                                <ul>
                                    <li><Link to="/">Contact Us</Link ></li>
                                    <li><Link to="/">About Us</Link ></li>
                                    <li><Link to="/">Careers</Link ></li>
                                    <li><Link to="/">Flipkart Stories</Link ></li>
                                    <li><Link to="/">Press</Link ></li>
                                    <li><Link to="/">Flipkart Wholesale</Link ></li>
                                </ul>
                            </div>
                            <div className="footerCol flex-col md:w-3/12 w-2/12">
                                <h4>Help</h4>
                                <ul>
                                    <li><Link to="/">Payments</Link ></li>
                                    <li><Link to="/">Shipping</Link ></li>
                                    <li><Link to="/">Cancellation & Returns</Link ></li>
                                    <li><Link to="/">FAQ</Link ></li>
                                    <li><Link to="/">Report Infringement</Link ></li>
                                </ul>
                            </div>
                            <div className="footerCol flex-col md:w-3/12 w-2/12">
                                <h4>POLICY</h4>
                                <ul>
                                    <li><Link to="/">Return Policy</Link ></li>
                                    <li><Link to="/">Terms Of Use</Link ></li>
                                    <li><Link to="/">Security</Link ></li>
                                    <li><Link to="/">Privacy</Link ></li>
                                    <li><Link to="/">Sitemap</Link ></li>
                                    <li><Link to="/">EPR Compliance</Link></li>
                                </ul>
                            </div>
                            <div className="footerCol flex-col md:w-3/12 w-2/12">
                                <h4>Social</h4>
                                <ul>
                                    <li><Link to="/">Facebook</Link ></li>
                                    <li><Link to="/">Twitter</Link ></li>
                                    <li><Link to="/">YouTube</Link ></li>
                                </ul>
                            </div>
                        </div>
                        <div className="right md:hidden flex w-4/12">
                            <div className="mail md:hidden flex-col w-1/2 px-4" style={{borderLeft: "1px solid gray"}}>
                                <h4>Mail Us:</h4>
                                <p>
                                    Flipkart Internet Private Limited,
                                    Buildings Alyssa, Begonia &
                                    Clove Embassy Tech Village,
                                    Outer Ring Road, Devarabeesanahalli Village,
                                    Bengaluru, 560103,
                                    Karnataka, India
                                </p>
                            </div>
                            <div className="mail md:hidden  flex-col w-1/2 px-4">
                                <h4>Registered Office Address:</h4>
                                <p>
                                    Flipkart Internet Private Limited,
                                    Buildings Alyssa, Begonia &
                                    Clove Embassy Tech Village,
                                    Outer Ring Road, Devarabeesanahalli Village,
                                    Bengaluru, 560103,
                                    Karnataka, India
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="imgFooter text-xs py-4 px-4 text-white flex justify-between">
                        <p className="w-1/5 p-1">Sell On Flipkart</p>
                        <p className="w-1/5 p-1">Advertise</p>
                        <p className="w-1/5 p-1">Gift Cards</p>
                        <p className="w-1/5 p-1">Help Center</p>
                        <p className="w-1/5 p-1">© 2007-2021 Flipkart.com</p>
                    </div>
                    <div className="text-center" style={{backgroundColor: "#172337", color: "#FFF"}}>
                        <p className="pb-4 text-lg"><i>Flipkart Clone</i> made by Surya Dana</p>
                    </div>
                </div>
        </div>
    )
}

export default Footer
