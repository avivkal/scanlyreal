import React, { Component } from 'react'
import { Form, Button, Container,Col,Dropdown } from 'react-bootstrap';
import './register.scss'
import * as mainActions from '../../Store/Actions/mainActions'
import { connect } from 'react-redux'
import { DASHBOARD_PATH, LOGIN_PATH } from '../../Constants/const'
import * as loadingActions from '../../Store/Actions/loadingActions'
import CircularProgress from '@material-ui/core/CircularProgress';

class Register extends Component {
    state = {
        email: '',
        password: '',
        shufersalUsername: '',
        shufersalPassword: '',
        ramiLevyUsername: '',
        ramiLevyPassword: '',
        selection: 'Shufersal',
        sound: false,
        usernameWifi: '',
        passwordWifi: '',
        submitUsername: false,
        submitPassword: false,
        passwordWifiConfirm: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email,password,shufersalUsername,
            shufersalPassword,ramiLevyUsername,ramiLevyPassword,
            selection, sound,usernameWifi,passwordWifi} = this.state;
        this.props.load()
        try{
            await this.props.registerAll(email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi)
            // await this.props.register(email,password)
            // await this.props.updateSettings(shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound)
            // await this.props.updateWifiDetails(usernameWifi,passwordWifi)    
        }
        catch(error){
            console.log(error)
        }
        finally{
            this.props.finishedLoading()
        }
        if (this.props.loggedIn) {
            this.props.history.push(DASHBOARD_PATH);
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        if(this.props.loading)
            return <Col xs={12} className="d-flex justify-content-center spinner-style"><CircularProgress /></Col>
        return (
            <Container className="form app-background">
                        <Col xs={12} lg={{ span: 6, offset: 3 }} className="form-style">

                <h3 style={{textAlign:"center"}}>יצירת משתמש חדש</h3>
                <Form onSubmit={(e) => this.handleSubmit(e)} style={{textAlign:"right"}}>
                <Col className="top">

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="הכנס דואר אלקטרוני" name="email" onChange={(e) => this.handleChange(e)} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="צור סיסמה" name="password" onChange={(e) => this.handleChange(e)} />
                    </Form.Group>
                    <hr />
<h3 style={{textAlign:"center"}}>עגלת הקניות</h3>

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
<Form.Control name="shufersalUsername" type="email" placeholder="הכנס מייל לשופרסל" onChange={(e) => this.handleChange(e)} value={this.state.shufersalUsername} />
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Control name="shufersalPassword" type="password" placeholder="הכנס סיסמה לשופרסל" onChange={(e) => this.handleChange(e)} value={this.state.shufersalPassword} />
</Form.Group>
</div>}
<hr />

{this.state.selection !== 'Shufersal' && 
<div>
<Form.Group controlId="formBasicEmail">
<Form.Control name="ramiLevyUsername" type="text" placeholder="הכנס מייל לרמי לוי" onChange={(e) => this.handleChange(e)} value={this.state.ramiLevyUsername} />
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Control name="ramiLevyPassword" type="password" placeholder="הכנס סיסמה לרמי לוי" onChange={(e) => this.handleChange(e)} value={this.state.ramiLevyPassword} />
</Form.Group>
</div>
}


<Form.Group controlId="formBasicCheckbox" className="margin-sound">
<Form.Check name="sound" type="checkbox" label="תגובות אודיו מהמכשיר" onChange={(e) => this.setState({ sound: e.target.checked })} checked={this.state.sound} />
</Form.Group>
</div>
{/* <hr />
<h3 style={{textAlign:"center"}}>הביתית Wifiרשת ה</h3>
<Form.Text className="text-muted">
 לידיעתכם: אנחנו משתמשים בוויפיי על מנת לחבר אח"כ את המכשיר לאינטרנט
    </Form.Text>

<Form.Group controlId="formBasicEmail" className="align-right top-p">
                        <Form.Control name="usernameWifi" type="text" placeholder="הביתית Wifiהכנס את שם רשת ה" onChange={(e) => this.handleChange(e)} value={this.state.usernameWifi} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="align-right">
                        <Form.Control name="passwordWifi" type="password" placeholder="הביתית Wifiהכנס סיסמה לרשת ה" onChange={(e) => this.handleChange(e)} value={this.state.passwordWifi} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="align-right">
                        <Form.Control name="passwordWifiConfirm" type="password" placeholder="הביתית Wifiהכנס  עוד הפעם סיסמה לרשת ה" onChange={(e) => this.handleChange(e)} value={this.state.passwordWifiConfirm} />
                    </Form.Group>
 */}
                    <Button disabled={!(this.state.email !== '' && this.state.password !== '' && this.state.selection==='Shufersal' ? (this.state.shufersalUsername !== '' && this.state.shufersalPassword !== '') : (this.state.ramiLevyUsername !== '' && this.state.ramiLevyPassword !== ''))} className="btn-block mr-1 mt-1 btn-md" variant="primary" type="submit">
                        הרשמה
              </Button>
              <p className="top-p"> יש לך כבר חשבון? לחץ<span onClick={() => this.props.history.push(LOGIN_PATH)} className="register-link"> כאן </span> כדי להתחבר</p>
            

</Col>

                </Form>

        
</Col>
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.main.loggedIn,
        loading: state.loading.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(mainActions.register(email, password)),
        updateSettings: (shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound) => dispatch(mainActions.updateSettings(shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound)),
        updateWifiDetails: (username, password) => dispatch(mainActions.updateWifiDetails(username, password)),
        registerAll: (email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi) => dispatch(mainActions.registerAll(email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi)),
        load: () => dispatch(loadingActions.loading()),
        finishedLoading: () => dispatch(loadingActions.finishedLoading()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
