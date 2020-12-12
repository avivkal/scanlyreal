import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as promptActions from '../../Store/Actions/promptActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Form, Button, Container, Spinner,Row,Col } from 'react-bootstrap';
import axios from 'axios'
import Barcode from 'react-barcode'
import './wifi.scss'


class Wifi extends Component {
    state = {
        username: '',
        password: '',
        submitUsername: false,
        submitPassword: false,
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.updateWifiDetails(this.state.username, this.state.password);
        this.setState({ submitUsername: true })
        // axios.post('/wifi',{email:getCurrentUser().email,wifiUsername: this.state.username,wifiPassword: this.state.password }).then(data => console.log(data))
    };

    componentDidMount = () => {
        if (!this.props.loggedIn) {
            if (getCurrentUser()) {
                this.props.updateCurrentUser(getCurrentUser())
                this.props.setLoggedIn()
            }
            else {
                this.props.history.push(LOGIN_PATH)
            }
        }
        this.props.load();
        try {
            axios.get('/details/' + getCurrentUser().email).then(data => {
                const user = data.data;
                this.setState({
                    username: user.wifiUsername,
                    password: user.wifiPassword,
                });
            })
        }
        catch (error) {
            this.props.openPrompt('תקלה', 'לא ניתן לבצע את הפעולה');
        }
        finally {
            this.props.finishedLoading();
        }

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" className="spinner" />
        }

        return (
            <Container>
                {!(this.state.submitUsername || this.state.submitPassword) && <Form onSubmit={this.onSubmit} className="form-style">
                    <Col xs={12} lg={6} className="float-right">
                    <Form.Group controlId="formBasicEmail" className="align-right">
                        <Form.Label>Wifiשם משתמש ל</Form.Label>
                        <Form.Control name="username" type="text" placeholder="Enter Wifi Username" onChange={(e) => this.onChange(e)} value={this.state.username} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="align-right">
                    <Form.Label>Wifiסיסמה ל</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter Wifi Password" onChange={(e) => this.onChange(e)} value={this.state.password} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        המשך
  </Button>
  </Col>
                </Form>}
                
                {this.state.submitUsername && <Container> <Row className="center-style"> <Col md={{ span: 6, offset: 3 }}
><Barcode value={this.state.username} /></Col> </Row>
                  <Row> <Col md={{ span: 6, offset: 3 }} className="center-style"><Button variant="primary" onClick={()=>this.setState({submitPassword: true, submitUsername: false})}>
                        המשך
  </Button></Col> </Row></Container>}
                {this.state.submitPassword && <Container> <Row className="center-style"> <Col md={{ span: 6, offset: 3 }}
><Barcode value={this.state.password} /></Col> </Row>
                  <Row> <Col md={{ span: 6, offset: 3 }} className="center-style"><Button variant="primary" onClick={()=>this.setState({submitPassword: false, submitUsername: false})}>
                        סיום
  </Button></Col> </Row></Container>}


               

            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.main.currentUser,
        loggedIn: state.main.loggedIn,
        loading: state.loading.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentUser: (user) => dispatch(mainActions.updateUsername(user)),
        setLoggedIn: () => dispatch(mainActions.loggedIn()),
        updateWifiDetails: (username, password) => dispatch(mainActions.updateWifiDetails(username, password)),
        openPrompt: (title, text) => dispatch(promptActions.openPrompt(title, text)),
        load: () => dispatch(loadingActions.loading()),
        finishedLoading: () => dispatch(loadingActions.finishedLoading()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wifi);