import React, { Component } from 'react'
import {Container,Col,Image} from 'react-bootstrap'
import './HomePage.scss'
class HomePage extends Component {

  render() {
    return (
      <Container fluid className="container-style">
          <h1>scanlyברוכים הבאים ל</h1>
          <h2>המערכת היחידה שמאפשרת לכם לדעת מה וכמה צרכתם במדויק</h2>
          <h1>ומאפשרת לכם למלא את סל הקניות (האונליין) בצורה אוטומטית</h1>
        <Col xs={6} md={4}>
    </Col>
      </Container>



    );
  }
}

export default HomePage;
