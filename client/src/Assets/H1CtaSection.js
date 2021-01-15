import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './myslider.scss'
import woman from './woman.jpg'
class H1CtaSection extends Component {
	render() {
		return (
			
			<div className="cta-area back">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12">
							<div className="cta-wrapper mb-15">
							{/* <img src={woman} alt="shape" style={{objectFit:'cover'}}/> */}
								<div className="cta-text align-right" >
									<h1>!הירשמו עכשיו</h1>
									<p >
										רוצים להתחיל להשתמש במערכת שלנו? לחצו כאן על מנת להירשם 
									</p>
								</div>
							</div>
						</div>
						<div className="col-xl-12 col-lg-12 col-md-12 align-right">
							<div className=" mb-15 text-md-right">
								<Button variant="warning" onClick={()=>this.props.currentProps.push("/register")}>
									הרשמה למערכת
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default H1CtaSection;