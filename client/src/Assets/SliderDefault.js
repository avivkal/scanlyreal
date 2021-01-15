import React, { Component, useState } from 'react';
// import Slider from "react-slick";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from "react-router-dom";
import { Button,Col,Row,Container } from 'react-bootstrap';
import './myslider.scss'
const SliderDefault = (props) =>  {

   
    return (
        <div style={{paddingBottom:"30px", paddingRight:"30px"}}>
            <Row>
                <Col className="slider-content top">
                <h1 data-animation="fadeInUp" data-delay=".6s" className="align-right white">
                                        Scanly 
                                        </h1>
                </Col>
                </Row>
                <Row >
                <Col>                <p data-animation="fadeInUp" data-delay=".8s" className="align-right white">
                                        המערכת היחידה שמאפשרת לכם לדעת מה וכמה צרכתם במדויק <br /> ולמלא את סל הקניות האינטרנטי בצורה אוטומטית


                                        </p>
                </Col>
                </Row>
                <Row>
                <Col >                <div className="slider-button align-right">
                                            <Button variant="warning" style={{color:"white"}} onClick={()=>props.currentProps.push("/login")}>התחברות למערכת</Button>
                                            <Button variant="info" style={{color:"white", marginLeft:"10px"}} onClick={()=>props.currentProps.push("/register")}>יצירת משתמש חדש</Button>
                                            {/* <Link href="/services" as="/services" >
                                                <a data-animation="fadeInLeft" data-delay=".8s" className="btn">
                                                    Our Services
                                                </a>
                                            </Link>
                                            <Link href="/contact" as="/contact" >
                                                <a data-animation="fadeInRight" data-delay="1s" className="btn active">
                                                    Contact Us
                                                </a>
                                            </Link> */}
                                        </div>
                </Col>
            </Row>
        </div>
        // <div className="slider-area">
        //         <div className="single-slider">
        //         {/* style={{ backgroundImage:`url(${'assets/img/slider/slider1.jpg'})`}} */}
        //             <div className="  d-flex align-items-center" >
        //                 <div className="container">
        //                     <div className="row ">
        //                         <div className="col-xl-6">
        //                             <div className="slider-content mt-85">
        //                                 <h1 data-animation="fadeInUp" data-delay=".6s" className="align-right margin-right-style">
        //                                 Scanly 
        //                                 </h1>
        //                                 <p data-animation="fadeInUp" data-delay=".8s" className="align-right">
        //                                 המערכת היחידה שמאפשרת לכם לדעת מה וכמה צרכתם במדויק <br /> ולמלא את סל הקניות האינטרנטי בצורה אוטומטית


        //                                 </p>
        //                                 <div className="slider-button align-right">
        //                                     <Button variant="warning" style={{color:"white"}}>התחברות למערכת</Button>
        //                                     {/* <Link href="/services" as="/services" >
        //                                         <a data-animation="fadeInLeft" data-delay=".8s" className="btn">
        //                                             Our Services
        //                                         </a>
        //                                     </Link>
        //                                     <Link href="/contact" as="/contact" >
        //                                         <a data-animation="fadeInRight" data-delay="1s" className="btn active">
        //                                             Contact Us
        //                                         </a>
        //                                     </Link> */}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
               
              
        // </div>
    );
}

export default SliderDefault;