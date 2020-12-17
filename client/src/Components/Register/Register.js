import React, { Component } from 'react'
import { Form, Button, Container,Col,Dropdown } from 'react-bootstrap';
import './register.scss'
import * as mainActions from '../../Store/Actions/mainActions'
import { connect } from 'react-redux'
import { DASHBOARD_PATH, LOGIN_PATH } from '../../Constants/const'
import axios from '../../Axios/config';

class Register extends Component {
    state = {
        email: '',
        password: '',
        shufersalUsername: '',
        shufersalPassword: '',
        ramiLevyUsername: '',
        ramiLevyPassword: '',
        selection: 'Shufersal',
        sound: true,
        usernameWifi: '',
        passwordWifi: '',
        submitUsername: false,
        submitPassword: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email,password,shufersalUsername,
            shufersalPassword,ramiLevyUsername,ramiLevyPassword,
            selection, sound,usernameWifi,passwordWifi} = this.state;
        try{
            await this.props.registerAll(email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi)
            // await this.props.register(email,password)
            // await this.props.updateSettings(shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound)
            // await this.props.updateWifiDetails(usernameWifi,passwordWifi)    
        }
        catch(error){
            console.log(error)
        }
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
                <h1 style={{textAlign:"right"}}>הרשמה</h1>
                <Form onSubmit={(e) => this.handleSubmit(e)} style={{textAlign:"right"}}>
                <Col xs={12} lg={6} className="float-right">

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>דואר אלקטרוני</Form.Label>
                        <Form.Control type="email" placeholder="הכנס דואר אלקטרוני" name="email" onChange={(e) => this.handleChange(e)} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control type="password" placeholder="הכנס סיסמה" name="password" onChange={(e) => this.handleChange(e)} />
                    </Form.Group>
                    <Dropdown>

<Dropdown.Toggle variant="dark" id="dropdown-basic" className="margin-cart">
    {this.state.selection === 'Shufersal' ? 'שופרסל' : 'רמי לוי'}
</Dropdown.Toggle>
בחר עגלה

<Dropdown.Menu className="margin-cart">
    <Dropdown.Item onClick={() => this.setState({ selection: 'Shufersal' })}>שופרסל</Dropdown.Item>
    <Dropdown.Item onClick={() => this.setState({ selection: 'Rami Levy' })}>רמי לוי</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
<div className="form-margin-top">
{this.state.selection === 'Shufersal' && <div>
<Form.Group controlId="formBasicEmail">
<Form.Label>שופרסל אימייל</Form.Label>
<Form.Control name="shufersalUsername" type="email" placeholder="הכנס מייל לשופרסל" onChange={(e) => this.handleChange(e)} value={this.state.shufersalUsername} />
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Label>שופרסל סיסמה</Form.Label>
<Form.Control name="shufersalPassword" type="password" placeholder="הכנס סיסמה לשופרסל" onChange={(e) => this.handleChange(e)} value={this.state.shufersalPassword} />
</Form.Group>
</div>}

{this.state.selection !== 'Shufersal' && 
<div>
<Form.Group controlId="formBasicEmail">
<Form.Label>רמי לוי אימייל</Form.Label>
<Form.Control name="ramiLevyUsername" type="text" placeholder="הכנס מייל לרמי לוי" onChange={(e) => this.handleChange(e)} value={this.state.ramiLevyUsername} />
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Label>רמי לוי סיסמה</Form.Label>
<Form.Control name="ramiLevyPassword" type="password" placeholder="הכנס סיסמה לרמי לוי" onChange={(e) => this.handleChange(e)} value={this.state.ramiLevyPassword} />
</Form.Group>
</div>
}


<Form.Group controlId="formBasicCheckbox" className="margin-sound">
<Form.Check name="sound" type="checkbox" label="תגובות אודיו מהמכשיר" onChange={(e) => this.setState({ sound: e.target.checked })} checked={this.state.sound} />
</Form.Group>
</div>

<Form.Group controlId="formBasicEmail" className="align-right">
                        <Form.Label>Wifiשם משתמש ל</Form.Label>
                        <Form.Control name="usernameWifi" type="text" placeholder="wifiהכנס שם משתמש ל" onChange={(e) => this.handleChange(e)} value={this.state.usernameWifi} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="align-right">
                    <Form.Label>Wifiסיסמה ל</Form.Label>
                        <Form.Control name="passwordWifi" type="password" placeholder="wifiהכנס סיסמה ל" onChange={(e) => this.handleChange(e)} value={this.state.passwordWifi} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        הרשמה
              </Button>
              <p> יש לך כבר חשבון? לחץ<span onClick={() => this.props.history.push(LOGIN_PATH)} className="register-link"> כאן </span> כדי להתחבר</p>
            

</Col>

                </Form>

        

            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.main.loggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(mainActions.register(email, password)),
        updateSettings: (shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound) => dispatch(mainActions.updateSettings(shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound)),
        updateWifiDetails: (username, password) => dispatch(mainActions.updateWifiDetails(username, password)),
        registerAll: (email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi) => dispatch(mainActions.registerAll(email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
