import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Form, Button, Dropdown, Container, Col } from 'react-bootstrap';
import axios from 'axios'
import * as promptActions from '../../Store/Actions/promptActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import './settings.scss'

class Settings extends Component {
    state = {
        shufersalUsername: '',
        shufersalPassword: '',
        ramiLevyUsername: '',
        ramiLevyPassword: '',
        selection: 'Shufersal',
        sound: false
    }
    componentDidMount = () => {
        //load everything
        this.props.load();
        try{
            axios.post('/details/' ,{email: getCurrentUser().email}).then(data => {
                const user = data.data;
                if(user.selection === '' || user.selection === undefined || user.selection === null)
                    user.selection = 'Shufersal';
                this.setState({
                    shufersalUsername: user.shufersalUsername,
                    shufersalPassword: user.shufersalPassword,
                    ramiLevyUsername: user.ramiLevyUsername,
                    ramiLevyPassword: user.ramiLevyPassword,
                    selection: user.selection,
                    sound: user.sound
                });
                
        
            })
        }
        catch(error)
       {
        this.props.openPrompt('תקלה','לא ניתן לבצע את הפעולה');
       }
       finally{
        this.props.finishedLoading();
       }
        
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.updateSettings(this.state.shufersalUsername,
            this.state.shufersalPassword,
            this.state.ramiLevyUsername,
            this.state.ramiLevyPassword,
            this.state.selection,
            this.state.sound,
        );
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {        
        return (
            <Container>
                <Form onSubmit={this.onSubmit} className="align-right margin">
                    <Col xs={12} lg={6} className="float-right">
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
                        <Form.Control name="shufersalUsername" type="text" placeholder="Enter Shufersal Username" onChange={(e) => this.onChange(e)} value={this.state.shufersalUsername} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>שופרסל סיסמה</Form.Label>
                        <Form.Control name="shufersalPassword" type="password" placeholder="Enter Shufersal Password" onChange={(e) => this.onChange(e)} value={this.state.shufersalPassword} />
                    </Form.Group>
                    </div>}
                        
                    {this.state.selection !== 'Shufersal' && 
                    <div>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>רמי לוי אימייל</Form.Label>
                    <Form.Control name="ramiLevyUsername" type="text" placeholder="Enter Rami Levy Username" onChange={(e) => this.onChange(e)} value={this.state.ramiLevyUsername} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>רמי לוי סיסמה</Form.Label>
                    <Form.Control name="ramiLevyPassword" type="password" placeholder="Enter Rami Levy Password" onChange={(e) => this.onChange(e)} value={this.state.ramiLevyPassword} />
                </Form.Group>
                </div>
                    }
                    
                   
                    <Form.Group controlId="formBasicCheckbox" className="margin-sound">
                        <Form.Check name="sound" type="checkbox" label="תגובות אודיו מהמכשיר" onChange={(e) => this.setState({ sound: e.target.checked })} checked={this.state.sound} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        שמור
                    </Button>
                    </div>
                    </Col>
                </Form>
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
        updateSettings: (shufersalUsername, shufersalPassword, ramiLevyUsername, ramiLevyPassword, selection, sound) => dispatch(mainActions.updateSettings(shufersalUsername, shufersalPassword, ramiLevyUsername, ramiLevyPassword, selection, sound)),
        openPrompt: (title, text) => dispatch(promptActions.openPrompt(title, text)),
        load: () => dispatch(loadingActions.loading()),
        finishedLoading: () => dispatch(loadingActions.finishedLoading()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);