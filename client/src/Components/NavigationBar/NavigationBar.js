import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button,NavDropdown } from 'react-bootstrap';
import { DASHBOARD_PATH, WIFI_SETUP_PATH, DASHBOARD_NOT_ADDED_PATH,DASHBOARD_FILTERS_PATH, SETTINGS_PATH } from '../../Constants/const'

class NavigationBar extends Component {
    // state = {
    //     show: false
    // } 
    // showDropdown = (e)=>{
    //     this.setState({show:true});
    // }
    // hideDropdown = e => {
    //     this.setState({show:false});
    // }

    render() {
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand as={Link} to={DASHBOARD_PATH}>Scanly</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link as={Link} to={SETTINGS_PATH}>
                            הגדרות </Nav.Link>
                            <Nav.Link as={Link} to={WIFI_SETUP_PATH}>Wifi הגדרת</Nav.Link>
                            <Nav.Link as={Link} to={DASHBOARD_FILTERS_PATH}>נתוני צריכה</Nav.Link>
                            <Nav.Link as={Link} to={DASHBOARD_NOT_ADDED_PATH}>מוצרים שלא נוספו</Nav.Link>

                        <Nav.Link as={Link} to={DASHBOARD_PATH}>מוצרים</Nav.Link>
                        {/* <NavDropdown title="המוצרים שלי" id="collasible-nav-dropdown" show={this.state.show}
   onMouseEnter={this.showDropdown} 
   onMouseLeave={this.hideDropdown}>
        <NavDropdown.Item as={Link} to={DASHBOARD_FILTERS_PATH}>נתוני צריכה</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={DASHBOARD_NOT_ADDED_PATH}>מוצרים שלא נוספו</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={DASHBOARD_PATH}>מוצרים</NavDropdown.Item>
      </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default NavigationBar;

