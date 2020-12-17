import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as promptActions from '../../Store/Actions/promptActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Container,Dropdown,Table,Spinner } from 'react-bootstrap';
import axios from '../../Axios/config'
import './dashboard.scss'
import { finishedLoading } from '../../Store/Actions/loadingActions';

class Dashboard extends Component {
    state = {
        products: [],
        // productsNotAdded: [],
        shufersalTotal: 0,
        ramiLevyTotal: 0,
        image: '',
        days: 30,
        shufersalTotalNotComparison:0,
        ramiLevyTotalNotComparison: 0
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
    loadData = async (days) => {
        this.props.load()
        const shufersalTotalPrice = await axios.post('/products/total', {email:getCurrentUser().email,number:days,isShufersal: true})
        const ramiLevyTotalPrice = await axios.post('/products/total', {email:getCurrentUser().email,number:days,isShufersal: false})
        const filteredShufersal = shufersalTotalPrice.data.filter(current => current._id.selection === "shufersalPrice")
        const filteredRamiLevy = ramiLevyTotalPrice.data.filter(current => current._id.selection === "ramiLevyPrice")
        if(filteredShufersal.length > 0 && filteredRamiLevy.length >0){
          this.setState({shufersalTotalNotComparison: filteredShufersal[0].price})
          this.setState({ramiLevyTotalNotComparison: filteredRamiLevy[0].price})  
        }
        axios.post('/products/', {email: getCurrentUser().email,number:days}).then(data => {
            this.setState({products: data.data});
            let y = 0, m = 0;
            for(let x in data.data){
                if(data.data[x].shufersalPrice!=='לא נמצא' && data.data[x].ramiLevyPrice!=='לא נמצא'){
                    y += data.data[x].shufersalPrice;
                    m += data.data[x].ramiLevyPrice;
                }
            }
            this.setState({shufersalTotal: y})
            this.setState({ramiLevyTotal: m})
            this.props.finishedLoading()
    })
        // axios.get('/products/notAdded/' + getCurrentUser().email).then(data => {
        //     this.setState({productsNotAdded: data.data})

        //   })
    }

    handleDropdownChange = async (days) => {
        this.setState({days:days})
        this.loadData(days)
    }

    render(){
      console.log(this.state.products)
        if(this.props.loading)
            return <Spinner animation="border" className="spinner" />
        if(this.state.products === null || this.state.products === undefined || this.state.products.length === 0)
            return <Container>
            <h1 style={{textAlign:"right"}}>מוצרים שסרקת</h1>
            <h1 className="table-style-image margin-top-container">לא נסרקו עדיין מוצרים</h1>
            </Container>
            
        return(
            <Container className="margin-top-container">
            <h1 className="align-right">מוצרים שסרקת</h1>
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
                    <p className="align-right">לאיזו עגלה המוצר נכנס = 🛒</p>

                                <Table bordered hover className="table-style">
  <thead>
    <tr>
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
                message = `₪ ${difference} ניתן לחסוך ברמי לוי`
            }
            
          }
          else{
            if(difference<0){
                message = `₪ ${difference} ניתן לחסוך בשופרסל`
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
</Table>

<Table bordered hover className="table-style-image">
  <thead>
    <tr>
      <th>ניתן לחסוך</th>
      <th>שופרסל</th>
      <th>רמי לוי</th>
      <th></th>

    </tr>
  </thead>
  <tbody>


<tr key='totalComparison'>
    <td>{(Math.round((Math.abs(this.state.ramiLevyTotal-this.state.shufersalTotal)) * 100) / 100).toFixed(2)} ₪ :הפרש מחיר בין הסלים</td>

          <td className={this.state.shufersalTotal < this.state.ramiLevyTotal ? 'green-style' : 'red-style'}>{(Math.round(this.state.shufersalTotal * 100) / 100).toFixed(2)} ₪</td>
          <td className={this.state.shufersalTotal > this.state.ramiLevyTotal ? 'green-style' : 'red-style'}>{(Math.round(this.state.ramiLevyTotal * 100) / 100).toFixed(2)} ₪</td>
          <td> השוואת סלים בין מוצרים זהים</td>
        </tr>
</tbody>

</Table>    
{/* <h1 style={{textAlign:"right"}}>מוצרים שלא נכנסו לעגלה</h1>
<Table striped bordered hover variant="dark" className="table-style">
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);