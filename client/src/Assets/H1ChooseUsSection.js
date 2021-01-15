import React, {Component} from 'react';
import './myslider.scss'
class H1ChooseUsSection extends Component {
	render() {
		return (
			<div className="choose-us-area pt-100 pb-70 pos-relative">
				{/* <div className="shape spahe2 bounce-animate">
					<img src={require("../../../public/assets/img/shape/why-shape.png")} alt=""/>
				</div> */}
				<div className="container">
					<div className="row">
						<div className="col-xl-7 col-lg-12">
							<div className="choose-img mb-30" style={{marginTop:"20px"}}>
								<img src={require('./scan.jpeg').default} alt=""/>
							</div>
						</div>
						<div className="col-xl-5 col-lg-12">
							<div className="choose-wrapper mb-30">
								<div className="choose-section align-right">
									<h1>?מה המערכת נותנת לי</h1>
									{/* <p>
										המערכת נותנת מגוון 
									</p> */}
								</div>
								<div className="choose-content mb-40 align-right">
									<div className="choose-us-img">
										{/* <img src={require("../../../public/assets/img/icon/1.png")} alt=""/> */}
									</div>
									<div className="choose-text">
										<h4>חיסכון בזמן</h4>
										<p>
											כל מוצר נכנס בצורה אוטומטית ישר לתוך סל הקניות האונליין שלכם, ובכך חוסך לכם זמן יקר
										</p>
									</div>
								</div>
								<div className="choose-content mb-40 align-right">
									<div className="choose-us-img">
										{/* <img src={require("../../../public/assets/img/icon/2.png")} alt=""/> */}
									</div>
									<div className="choose-text">
										<h4>חיסכון בכסף וזמינות מוצרים</h4>
										<p>
											אף פעם לא תשכחו לקנות מוצרים, ולא פחות חשוב, לעולם לא תבזבזו כסף מיותר על מוצרים שאתם לא צורכים
										</p>
									</div>
								</div>
								<div className="choose-content align-right ">
									<div className="choose-us-img">
										{/* <img src={require("../../../public/assets/img/icon/3.png")} alt=""/> */}
									</div>
									<div className="choose-text">
										<h4>צרכנות נבונה</h4>
										<p>
											המערכת מאפשרת לכם לראות על מה וכמה כסף אתם מוציאים, מאפשרת לכם לשפר את הרגלי הצריכה שלכם ולהשוות מחירים בין רשתות שונות
										</p>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default H1ChooseUsSection;