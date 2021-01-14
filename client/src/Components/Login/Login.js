import React, { Component } from 'react'
import * as mainActions from '../../Store/Actions/mainActions'
import { connect } from 'react-redux'
import { Form, Button, Container,Col,Row } from 'react-bootstrap';
import './login.scss'
import { DASHBOARD_PATH, REGISTER_PATH } from '../../Constants/const'
class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.logIn(this.state.email, this.state.password);
    if (this.props.loggedIn) {
      this.props.history.push(DASHBOARD_PATH);
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Container className="form app-background">
        <Col xs={12} lg={{ span: 6, offset: 3 }} className="form-style">
        <h2 style={{textAlign:"center"}}>התחברות למשתמש קיים</h2>

        <Form onSubmit={(e) => this.handleSubmit(e)} style={{textAlign:"right"}} >
        <Col className="top">
          <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>דואר אלקטרוני</Form.Label> */}
            <Form.Control type="email" placeholder="הכנס דואר אלקטרוני" name="email" onChange={(e) => this.handleChange(e)} />

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>סיסמה</Form.Label> */}
            <Form.Control type="password" placeholder="הכנס סיסמה" name="password" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          
          
          <Button className="btn-block mr-1 mt-1" variant="primary" type="submit">
            התחבר
  </Button>
          <p className="top-p"> עדיין אין לך חשבון? לחץ<span onClick={() => this.props.history.push(REGISTER_PATH)} className="register-link"> כאן </span> על מנת ליצור אחד</p>
          </Col>

        </Form>
        </Col>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.main.currentUser,
    loggedIn: state.main.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) => dispatch(mainActions.logIn(email, password))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
