import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Container,Dropdown,Col } from 'react-bootstrap';
import axios from '../../Axios/config'
import './DashboardComparison.scss'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Table} from "reactstrap"
import "../../Assets/scss/pages/dashboard-analytics.scss"
import "../../Assets/scss/bootstrap-extended/_tables.scss"

class DashboardComparison extends Component {
    state = {
        products: [],
        shufersalTotal: 0,
        ramiLevyTotal: 0,
        image: '',
        days: 30,
        }

    componentDidMount = async () => {
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
    loadData = async (days) => {
      this.props.load()
      axios.post('/products/aggByMarket',{email:getCurrentUser().email,number:days, isShufersal:true}).then(data=>{
          this.setState({products:data.data})
          let x = 0,y=0;
          for(let i = 0; i<data.data.length; i++){
              x+= data.data[i].priceSufersal;
              y+=data.data[i].priceRamiLevy;
          }
          this.setState({shufersalTotal:x})
          this.setState({ramiLevyTotal:y})

          this.props.finishedLoading()
      })
    }

    handleDropdownChange = async (days) => {
        this.setState({days:days})
        this.loadData(days)
    }

    render(){
        if(this.props.loading)
            return <Col xs={12} className="d-flex justify-content-center spinner-style"><CircularProgress /></Col>
        if(this.state.products === null || this.state.products === undefined || this.state.products.length === 0)
            return <Container>
            <h1 style={{textAlign:"right"}}>השוואת מחירים</h1>
            <h1 className="table-style-image margin-top-container">לא נסרקו עדיין מוצרים</h1>
            </Container>
            
        return(
            <Container className="margin-top-container">
            <h1 className="align-right">השוואת מחירים</h1>
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
                    {/* <p className="align-right">לאיזו עגלה המוצר נכנס = 🛒</p> */}


     
        <Table
          bordered hover
          className="dashboard-table table-hover-animation mb-0 mt-1 style-center"
        >
          <thead>
          <tr className="table-header">
      <th className="table-style-image">ניתן לחסוך</th>
      <th className="table-style-image">מחיר כולל שופרסל</th>
      <th className="table-style-image">מחיר כולל רמי לוי</th>
      <th className="table-style-image">תמונה</th>
      <th>שם מוצר</th>

    </tr>
          </thead>

          <tbody>

          {this.state.products.map((current) => {
          const isSelectionShufersal = current.selection === 'Shufersal';
          const difference = (Math.round((current.priceSufersal-current.priceRamiLevy) * 100) / 100).toFixed(2);
          let message = ''
          if(isSelectionShufersal){
            if(difference>0){
                message = `₪ ${Math.abs(difference)} ניתן לחסוך ברמי לוי`
            }
            
          }
          else{
            if(difference<0){
                message = `₪ ${Math.abs(difference)} ניתן לחסוך בשופרסל`
            }
            
          }
          if(current.shufersalPrice !== 'לא נמצא' && current.ramiLevyPrice !== 'לא נמצא'){

              return <tr key={current._id.barcode}>
              <td>{difference}₪</td>
              <td>{Math.abs((Math.round((current.priceSufersal) * 100) / 100).toFixed(2))} ₪</td>
              <td>{Math.abs((Math.round((current.priceRamiLevy) * 100) / 100).toFixed(2))} ₪</td>
              <td className="table-style-image"><img height="50px" src={current._id.image}/></td>
              <td className='table-style-image'>{current._id.name}</td>

            </tr>
                          
          }
          
                      
      })}
       <tr key='totalComparisonHeader'>
    <th>ניתן לחסוך</th>
    <th>שופרסל</th>
    <th>רמי לוי</th>
    <td></td>
    <td></td>
        </tr>
        <tr key='totalComparison'>
    <td>{Math.abs((Math.round(((this.state.ramiLevyTotal-this.state.shufersalTotal)) * 100) / 100).toFixed(2))} ₪ :הפרש מחיר בין הסלים</td>

          <td className={this.state.shufersalTotal < this.state.ramiLevyTotal ? 'green-style' : 'red-style'}>{(Math.round(this.state.shufersalTotal * 100) / 100).toFixed(2)} ₪</td>
          <td className={this.state.shufersalTotal > this.state.ramiLevyTotal ? 'green-style' : 'red-style'}>{(Math.round(this.state.ramiLevyTotal * 100) / 100).toFixed(2)} ₪</td>
          <td></td>
          <th> סה"כ</th>
        </tr>
          </tbody>
        </Table>


                                {/* <Table bordered hover className="table-style">
  <thead>
    <tr className="table-header">
      <th className="table-style-image">ניתן לחסוך</th>
      <th className="table-style-image">שופרסל</th>
      <th className="table-style-image">רמי לוי</th>
      <th className="table-style-image">תמונה</th>
      <th>שם מוצר</th>
      <th className="d-none d-lg-table-cell">תאריך</th>

    </tr>
  </thead>
  <tbody>
      {this.state.products.map((current) => {
          const date = new Date(current.creationDate);
          const newDate = date.toLocaleDateString('he-IS');
        //   const greater = current.shufersalPrice < current.ramiLevyPrice ? 'shufersal' : 'ramiLevy'
          //greater === 'shufersal' ? 'red-style' : 'green-style'
          const isSelectionShufersal = current.selection === 'Shufersal' ? true : false;
          const difference = (Math.round((current.shufersalPrice-current.ramiLevyPrice) * 100) / 100).toFixed(2);
          let message = ''
          if(isSelectionShufersal){
            if(difference>0){
                message = `₪ ${Math.abs(difference)} ניתן לחסוך ברמי לוי`
            }
            
          }
          else{
            if(difference<0){
                message = `₪ ${Math.abs(difference)} ניתן לחסוך בשופרסל`
            }
            
          }
          return <tr key={current._id}>
          <td className='table-style-image'>{message} </td>
          <td className={(!isSelectionShufersal && 'gray-style') + ' table-style-image'}>{current.shufersalPrice} {current.shufersalPrice !=='לא נמצא' && '₪'} {isSelectionShufersal && <div>🛒</div>}</td>
      <td className={(isSelectionShufersal && 'gray-style') + ' table-style-image'}>{current.ramiLevyPrice} {current.ramiLevyPrice !=='לא נמצא' && '₪'} {!isSelectionShufersal && <div>🛒</div>}</td>
          <td className="table-style-image"><img height="50px" src={current.image}/></td>
          <td>{current.name}</td>
          <td className="d-none d-lg-table-cell">{newDate}</td>

        </tr>
                      
      })}
        <tr key='totalPrice' style={{borderTop: "2px solid black"}}>
          <td></td>
          <td>{((Math.round(this.state.shufersalTotalNotComparison * 100) / 100).toFixed(2))}₪</td>
          <td>{((Math.round(this.state.ramiLevyTotalNotComparison * 100) / 100).toFixed(2))}₪</td>
          <td>מחיר כולל לפי סל</td>
        </tr>

        
  </tbody>
</Table> */}




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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComparison);