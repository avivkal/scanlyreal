import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Container,Table,Dropdown,Spinner,Row,Col } from 'react-bootstrap';
import axios from '../../Axios/config'
import './dashboardFilters.scss'
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends Component {
    state = {
        products: [],
        days: 30,
        totalPriceLocal: 0,
        filter:'price'
    }

    componentDidMount = async () => {
        // axios.get('https://chp.co.il/autocompletion/product_extended?term=8717163647226').then(data=> console.log(data.data[0].value))
        if (!this.props.loggedIn) {
            if (getCurrentUser()) {
                this.props.setLoggedIn()
                this.loadData(this.state.days)
            }
            else {
                this.props.history.push(LOGIN_PATH)
            }
        }
        else{
            this.loadData(this.state.days)
        }
    }
    loadData = (days,filter) => {
        this.props.load()
        const isShufersal = this.props.currentUser.selection === 'Shufersal' ? true : false;
        axios.post('/products/agg',{email:getCurrentUser().email,number:days, isShufersal:isShufersal,filter:filter}).then(data=>{
            this.setState({products:data.data})
            let x = 0;
            for(let i = 0; i<data.data.length; i++){
                x+= data.data[i].price;
            }
            this.setState({totalPriceLocal:x})

            this.props.finishedLoading()
        })
    }

    //all through currentUser in Redux!! no local storage!! only for password and username

    handleDropdownChange = async (days) => {
        this.setState({days:days})
        this.loadData(days)
    }

    handleDropdownChangeFilters = async (data) => {
        this.setState({filter:data})
        this.loadData(this.state.days,data)
    }
    render(){
        if(this.props.loading)
            return <Col xs={12} className="d-flex justify-content-center spinner-style"><CircularProgress /></Col>
        if(this.state.products === null || this.state.products === undefined || this.state.products.length === 0)
            return <Container>
                <h1 style={{textAlign:"right"}}>נתוני צריכה</h1>
            <h1 className="align-none">לא נסרקו עדיין מוצרים</h1>
                </Container>
        return(
            <Container className="margin-top-container">
             
<h1 style={{textAlign:"right"}}>נתוני צריכה</h1>
<Row>
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

                    <Dropdown className="dropdown-style">
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {this.state.filter === 'price' ? 'מחיר כולל' : 'כמות'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.handleDropdownChangeFilters('price')}>מחיר כולל</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdownChangeFilters('amount')}>כמות </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Row>

<Table bordered hover className="table-style">
  <thead className="table-header">
    <tr>
    <th>מחיר כולל</th>
    <th>כמות</th>

      <th>תמונה</th>
      <th>שם מוצר</th>
    </tr>
  </thead>
  <tbody>
      {this.state.products.map(current => {
          return <tr key={current._id.barcode}>
                        <td>{current.price}₪</td>
                        <td>{current.total}</td>

          <td><img height="50px" src={current._id.image}/></td>
          <td>{current._id.name}</td>

        </tr>
      })}
    <tr key={'total'}>
          <td>{(Math.round((this.state.totalPriceLocal) * 100) / 100).toFixed(2)} ₪</td>

        </tr>
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