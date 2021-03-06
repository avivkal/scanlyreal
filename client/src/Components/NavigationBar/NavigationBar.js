import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { DASHBOARD_PATH,FAQ_PATH,DASHBOARD_COMPARISON_PATH,REGISTER_PATH,HOME_PAGE_PATH,LOGIN_PATH, WIFI_SETUP_PATH, DASHBOARD_NOT_ADDED_PATH,DASHBOARD_FILTERS_PATH, SETTINGS_PATH } from '../../Constants/const'
import './navigationBar.scss'
const NavigationBar = () => {
    // state = {
    //     show: false
    // } 
    // showDropdown = (e)=>{
    //     this.setState({show:true});
    // }
    // hideDropdown = e => {
    //     this.setState({show:false});
    // }

    const token = useSelector(state => state.main.token)
    const logOutHandler = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        window.location.reload();
    }

        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand as={Link} to={HOME_PAGE_PATH}>Scanly</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* {console.log(localStorage.getItem('admin'))}
                    {localStorage.getItem('admin') && <Nav className="ml-auto align"> <Nav.Link as={Link} to={WIFI_SETUP_PATH}>Wifi הגדרת</Nav.Link>
                            <Nav.Link as={Link} to={DASHBOARD_FILTERS_PATH}>admin</Nav.Link>
                            <Nav.Link as={Link} to={DASHBOARD_NOT_ADDED_PATH}>מוצרים שלא נוספו</Nav.Link></Nav>} */}
                   
                      {(localStorage.getItem('currentUser') !== null || (token !== undefined && token !== null && token !== '')) ? <Nav className="ml-auto align"> <Nav.Link as={Link} to={SETTINGS_PATH}>
                            הגדרות </Nav.Link>
                            <Nav.Link as={Link} to={FAQ_PATH}>שאלות תשובות</Nav.Link>
                            <Nav.Link as={Link} to={DASHBOARD_FILTERS_PATH}>נתוני צריכה</Nav.Link>

                        <Nav.Link as={Link} to={DASHBOARD_COMPARISON_PATH}>השוואת מחירים</Nav.Link>                     
                        <Nav.Link as={Link} to={DASHBOARD_PATH}>היסטוריית מוצרים</Nav.Link> <Button onClick={logOutHandler} variant="danger">התנתקות מהחשבון</Button></Nav> : <Nav className="ml-auto align">                            
                            <Nav.Link as={Link} to={LOGIN_PATH}>התחברות למשתמש קיים</Nav.Link>
                            <Nav.Link as={Link} to={REGISTER_PATH}>יצירת משתמש חדש</Nav.Link>
                            <Nav.Link as={Link} to={HOME_PAGE_PATH}>עמוד הבית</Nav.Link>

</Nav>}  
                        {/* <NavDropdown title="המוצרים שלי" id="collasible-nav-dropdown" show={this.state.show}
   onMouseEnter={this.showDropdown} 
   onMouseLeave={this.hideDropdown}>
        <NavDropdown.Item as={Link} to={DASHBOARD_FILTERS_PATH}>נתוני צריכה</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={DASHBOARD_NOT_ADDED_PATH}>מוצרים שלא נוספו</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={DASHBOARD_PATH}>מוצרים</NavDropdown.Item>
      </NavDropdown> */}
                </Navbar.Collapse>
            </Navbar>
        );
    
}


export default NavigationBar;

