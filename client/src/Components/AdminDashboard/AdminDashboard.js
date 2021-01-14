import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as mainActions from '../../Store/Actions/mainActions'
import * as promptActions from '../../Store/Actions/promptActions'
import * as loadingActions from '../../Store/Actions/loadingActions'
import { LOGIN_PATH } from '../../Constants/const';
import { getCurrentUser } from '../../UtilityFunctions/functions';
import { Container,Dropdown,Table,Spinner,Col } from 'react-bootstrap';
import axios from '../../Axios/config'
// import './dashboard.scss'
import CircularProgress from '@material-ui/core/CircularProgress';
// import 'react-date-range/dist/styles.css'; 
// import 'react-date-range/dist/theme/default.css'; 
// import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'rsuite';
import { Package } from "react-feather"
import StatisticsCard from '../../Assets/StatisticsCard'
import DispatchedOrders from '../../Assets/DispatchedOrders'

import 'rsuite/dist/styles/rsuite-default.css';


class AdminDashboard extends Component {
    state = {
        shufersal:[],
        ramiLevy:[],
        totalActiveUsers:0,
        notAdded: [],
        users: [],
        shufersalTotal: 0,
        ramiLevyTotal: 0,
        image: '',
        days: 30,
        shufersalTotalNotComparison:0,
        ramiLevyTotalNotComparison: 0,
        products:[],
        currentSearchedEmail: '',
        usersList: []

    }
   
    componentDidMount = async () => {
        // axios.get('https://chp.co.il/autocompletion/product_extended?term=8717163647226').then(data=> console.log(data.data[0].value))
        if (!this.props.loggedIn) {
            if (getCurrentUser()) {
                this.props.setLoggedIn()
                this.loadData(30)
            }
            else {
                this.props.history.push(LOGIN_PATH)
            }
        }
        else{
            this.loadData()
        }
    }
    loadData = async (arr) => {
        this.props.load()
        // axios.post('/admin/activeUsers',{email:getCurrentUser().email,admin:true,isShufersal:false}).then(data=>this.setState({arr:data.data}))
        await axios.post('/admin/agg',{email:getCurrentUser().email,admin:true,isShufersal:true, min:arr[1],max:arr[0]}).then(data=>this.setState({shufersal: data.data}))
        await axios.post('/admin/agg',{email:getCurrentUser().email,admin:true,isShufersal:false, min:arr[1],max:arr[0]}).then(data=>this.setState({ramiLevy: data.data}))
        await axios.post('/admin/totalActiveUsers',{email:getCurrentUser().email,admin:true, min:arr[1],max:arr[0]}).then(data=>{this.setState({totalActiveUsers: data.data.length})})
        await axios.post('/admin/notAdded',{email:getCurrentUser().email,admin:true, min:arr[1],max:arr[0]}).then(data=>this.setState({notAdded: data.data}))
        const usersCurrent =  await axios.post('/admin/findAll',{email:getCurrentUser().email,admin:true, min:arr[1],max:arr[0]})
        var realAll = new Array(usersCurrent.length)
        for(let i = 0; i<usersCurrent.data.length;i++){
          // realAll[i].email = usersCurrent.data[i]._id.email;
          const start = new Date(); 
          start.setDate(start.getDate() + 1)
          var all = []
          for(let j =0; j<7; j++){
            const before = new Date(start) //late
            start.setDate(start.getDate() - 1)
            await axios.post('/admin/usersData',{email:getCurrentUser().email,admin:true,min:before,max:start,findEmail:usersCurrent.data[i]._id.email}).then(data=>{all.push({arr: data})})
          }
          all.email = usersCurrent.data[i]._id.email
          realAll.push(all)
        }
        this.setState({users: realAll})
        const filterUsers1 = realAll.filter(current => current!==undefined)
        const filterUsers = filterUsers1.map(current => current!==undefined && current.email)
        this.setState({usersList: filterUsers})
    }

    loadForUser = async (searched) => {
      const shufersalTotalPrice = await axios.post('/admin/total', {email:getCurrentUser().email,searchEmail:searched,isShufersal: true,admin:true})
        const ramiLevyTotalPrice = await axios.post('/admin/total', {email:getCurrentUser().email,searchEmail:searched,isShufersal: false,admin:true})
        const filteredShufersal = shufersalTotalPrice.data.filter(current => current._id.selection === "shufersalPrice")
        const filteredRamiLevy = ramiLevyTotalPrice.data.filter(current => current._id.selection === "ramiLevyPrice")
        if(filteredShufersal.length > 0 && filteredRamiLevy.length >0){
          this.setState({shufersalTotalNotComparison: filteredShufersal[0].price})
          this.setState({ramiLevyTotalNotComparison: filteredRamiLevy[0].price})  
        }
        axios.post('/admin/user', {email: getCurrentUser().email, searchEmail:searched,admin:true}).then(data => {
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
        })
    }
    handleDropdownChange = async (days) => {
        this.setState({days:days})
        this.loadData(days)
    }

    checkArr = (arr) => {
        if(arr !== undefined && arr !== null && arr[0] !== undefined)
            return true;
        return false;
    }

    render(){
        let x = null,y=null,z=null;
        if(this.state.totalActiveUsers!==0){
            x = (<Table bordered hover className="table-style">
            <thead>
              <tr className="table-header">
              <th >(משתמשים יחודיים) סהכ</th>
                <th>רמי לוי</th>
                <th>שופרסל</th>
                <th></th>
          
              </tr>
            </thead>
            <tbody>
                 <tr>
                    <td>{this.checkArr(this.state.ramiLevy.price) && (Math.round((this.state.ramiLevy.price[0].price+ this.state.shufersal.price[0].price) * 100) / 100).toFixed(2) }</td>
                    <td>{this.checkArr(this.state.ramiLevy.price) && this.state.ramiLevy.price[0].price}</td>
                    <td>{this.checkArr(this.state.shufersal.price) && this.state.shufersal.price[0].price}</td>
                    <th>סה"כ רכישות</th>
                  </tr>
                  <tr>
                    <td>{this.state.totalActiveUsers}</td>
                    <td>{this.state.ramiLevy.activeUsers && this.state.ramiLevy.activeUsers.length}</td>
                    <td>{this.state.shufersal.activeUsers && this.state.shufersal.activeUsers.length}</td>
                    <th>משתמשים פעילים</th>
                  </tr>          
                  <tr>
                    <td>{this.checkArr(this.state.ramiLevy.price) && (Math.round(((this.state.ramiLevy.price[0].price+ this.state.shufersal.price[0].price) / this.state.totalActiveUsers) * 100) / 100).toFixed(2) }</td>
                    <td>{this.checkArr(this.state.ramiLevy.price)&&(this.state.ramiLevy.price[0].price / this.state.ramiLevy.activeUsers.length)}</td>
                    <td>{this.checkArr(this.state.shufersal.price) && (Math.round((this.state.shufersal.price[0].price / this.state.shufersal.activeUsers.length) * 100) / 100).toFixed(2)}</td>
                    <th>ממוצע רכישות</th>
                  </tr>
          
                  
            </tbody>
          </Table>) 
        }
        if(this.state.notAdded.length>0){
        y=(<Table bordered hover className="table-style">
        <thead className="table-header">
          <tr>
          <th>סהכ</th>

            <th>לקוחות שופרסל</th>
            <th>רמי לוי</th>
            <th>מוצרים שלא נמצאו</th>

          </tr>
        </thead>
        <tbody>
            {this.state.notAdded.map(current => {
                const nameToshow = current._id.name !== '' ? current._id.name : `${current._id.barcode} :ברקוד`
                          const date = new Date(current.creationDate);
                          const newDate = date.toLocaleDateString('he-IS');          
                return <tr key={current._id}>
                              <td>{current.totalShufersal+current.totalRamiLevy}</td>
                <td>{current.totalShufersal}</td>
                <td>{current.totalRamiLevy}</td>
                <td>{nameToshow}</td>

              </tr>
            })}
          
        </tbody>
      </Table>) 
       
        }
        z=(<Table bordered hover className="table-style">
      <thead>
        <tr className="table-header">
        <th >אימייל</th>
          <th>היום</th>
          <th>אתמול</th>
          <th>שלשום</th>
          <th>לפני 3 ימים</th>
          <th>לפני 4 ימים</th>
          <th>לפני 5 ימים</th>
          <th>לפני 6 ימים</th>
    
        </tr>
      </thead>
      <tbody>
      {this.state.users.map(current => {
          if(current !== undefined){
            // if(current[0].arr.data[0] !== undefined)
            //   console.log(current[0].arr.data[0].price)

              return <tr>
              <td>{current.email !== undefined && current.email}</td>
              <td>{current[0].arr.data[0] !== undefined && current[0].arr.data[0].price}</td>
              <td>{current[1].arr.data[0] !== undefined && current[1].arr.data[0].price}</td>
              <td>{current[2].arr.data[0] !== undefined && current[2].arr.data[0].price}</td>
              <td>{current[3].arr.data[0] !== undefined && current[3].arr.data[0].price}</td>
              <td>{current[4].arr.data[0] !== undefined && current[4].arr.data[0].price}</td>
              <td>{current[5].arr.data[0] !== undefined && current[5].arr.data[0].price}</td>
              <td>{current[6].arr.data[0] !== undefined && current[6].arr.data[0].price}</td>
              
              {/* <td>{my.arr.data._id.email}</td> */}
            </tr>
            }
          }
                
      )}
      </tbody>
    </Table>) 
       return(
           <div>
    <h1>Dashboard Admin</h1>
           
    <DateRangePicker 
        onChange={(e)=>this.loadData(e)}
        placeholder="Select Date Range"
    />

        {x}
        {y}
        {z}
        <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
בחר מייל                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        {this.state.usersList.map(current=> {
                            return  <Dropdown.Item onClick={()=>this.loadForUser(current)}>{current}</Dropdown.Item>

                          })}
                        </Dropdown.Menu>
                    </Dropdown>
        <Table bordered hover className="table-style">
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
</Table>

<Table bordered hover className="table-style-image table-style">
  <thead>
    <tr className="table-header">
      <th>ניתן לחסוך</th>
      <th>שופרסל</th>
      <th>רמי לוי</th>
      <th></th>

    </tr>
  </thead>
  <tbody>


<tr key='totalComparison'>
    <td>{Math.abs((Math.round(((this.state.ramiLevyTotal-this.state.shufersalTotal)) * 100) / 100).toFixed(2))} ₪ :הפרש מחיר בין הסלים</td>

          <td className={this.state.shufersalTotal < this.state.ramiLevyTotal ? 'green-style' : 'red-style'}>{(Math.round(this.state.shufersalTotal * 100) / 100).toFixed(2)} ₪</td>
          <td className={this.state.shufersalTotal > this.state.ramiLevyTotal ? 'green-style' : 'red-style'}>{(Math.round(this.state.ramiLevyTotal * 100) / 100).toFixed(2)} ₪</td>
          <td> השוואת סלים בין מוצרים זהים</td>
        </tr>
</tbody>

</Table>    
        <Col lg="3" md="6" sm="12">
        <StatisticsCard
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat="97.5K"
        statTitle="Orders Received"
        type="area"
        options={{chart: {
          id: "subscribers",
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        grid: {
          show: false
        },
        colors: ["#7367F0"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth",
          width: 2.5
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.9,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 80, 100]
          }
        },
      
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          x: { show: false }
        }}}
        series={[
          {
            name: "Test",
            data: [10, 40, 36, 52, 38, 60, 55]
          }
        ]}
        type="area"
      />
<DispatchedOrders />
          </Col>
        
           {/* {this.state.shufersal.map(current => {
               return <div key={current._id}>
                   <p>Day: {current._id}</p>
                   <p>Products Added :{current.totalProductsAdded}</p>
                   <p>Users List: {current.totalUsers.map(currentUser => {return <p key={currentUser}>{currentUser}</p>})}</p>
                   <p>Users Amount: {current.totalUsers.length}</p>

                   </div>
           })} */}

           </div>
           
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);