import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Container,Table,Dropdown,Spinner } from 'react-bootstrap';
import axios from 'axios'
import './DashboardNotAdded.scss'
class Dashboard extends Component {
    state = {
        productsNotAdded: [],
        days: 30
    }

    componentDidMount = async () => {
        // axios.get('https://chp.co.il/autocompletion/product_extended?term=8717163647226').then(data=> console.log(data.data[0].value))
        if (!this.props.loggedIn) {
            if (getCurrentUser()) {
                await this.props.logIn(getCurrentUser().email,getCurrentUser().password)
                this.props.setLoggedIn()
                this.loadData(this.state.days)
            }
            else {
                this.props.history.push(LOGIN_PATH)
            }
        }
        else{
            await this.props.logIn(getCurrentUser().email,getCurrentUser().password)
            this.loadData(this.state.days)
        }
    }
    loadData = (days) => {
        this.props.load()
        axios.post('/products/notAdded/' ,{email: getCurrentUser().email,number:days}).then(data => {
            this.setState({productsNotAdded: data.data})
            this.props.finishedLoading()
          })
    }

    handleDropdownChange = async (days) => {
        this.setState({days:days})
        this.loadData(days)
    }
    render(){
        if(this.props.loading)
            return <Spinner animation="border" className="spinner" />
        return(
            <Container className="margin-top-container">
             
<h1 style={{textAlign:"right"}}>מוצרים שלא נכנסו לעגלה</h1>
<Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  לפי    {this.state.days} ימים אחרונים
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.handleDropdownChange(7)}>לפי 7 ימים אחרונים</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdownChange(30)}>לפי 30 ימים אחרונים </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdownChange(365)}>לפי 365 ימים אחרונים</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
<Table bordered hover className="table-style">
  <thead>
    <tr>
      <th>תמונה</th>
      <th>שם מוצר</th>
      <th>תאריך</th>
    </tr>
  </thead>
  <tbody>
      {this.state.productsNotAdded.map(current => {
                    const date = new Date(current.creationDate);
                    const newDate = date.toLocaleDateString('he-IS');          
          return <tr key={current._id}>
                        <td><img height="50px" src={current.image}/></td>
          <td>{current.name}</td>
          <td>{newDate}</td>

        </tr>
      })}
    
  </tbody>
</Table>


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
        load: () => dispatch(loadingActions.loading()),
        finishedLoading: () => dispatch(loadingActions.finishedLoading()),
        logIn: (email, password) => dispatch(mainActions.logIn(email, password))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);