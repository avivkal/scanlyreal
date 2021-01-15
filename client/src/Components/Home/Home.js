import React, { Component } from 'react'
import { Form, Button, Container,Col,Row } from 'react-bootstrap';
import SliderDefault from '../../Assets/SliderDefault'
import H1CtaSection from '../../Assets/H1CtaSection'
import CounterDefault from '../../Assets/CounterDefault'
import H1ChooseUsSection from '../../Assets/H1ChooseUsSection'
import H1FeaturesSection from '../../Assets/H1FeaturesSection'
import './home.scss'
class Home extends Component {


  render() {
    return (
      <div>
        <div className="row-background">
        <SliderDefault currentProps={this.props.history}/>

        </div>
          <H1ChooseUsSection />
          <H1CtaSection currentProps={this.props.history}/>
          {/* <H1FeaturesSection /> */}

          {/* <CounterDefault /> */}
      </div>
    );
  }
}

export default Home;
