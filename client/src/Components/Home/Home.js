import React, { Component } from 'react'
import { Form, Button, Container,Col,Row } from 'react-bootstrap';
import SliderDefault from '../../Assets/SliderDefault'
import H1CtaSection from '../../Assets/H1CtaSection'
class Home extends Component {


  render() {
    return (
      <Container>
          <SliderDefault />
          <H1CtaSection />
       <h1>Home page</h1>
      </Container>
    );
  }
}

export default Home;
