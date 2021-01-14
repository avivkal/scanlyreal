import React from "react"
import { Card, CardBody, FormGroup, Input, Row, Col } from "reactstrap"
import { Search } from "react-feather"
import FaqQuestions from "./FaqQuestions"
import "../../Assets/scss/pages/faq.scss"
import "./faq.scss"
class Faq extends React.Component {
  state = {
    value: ""
  }
  onChange = event => {
    let searchText = event.target.value.toLowerCase()
    this.setState({
      value: searchText
    })
  }
  render() {
    return (
      <Row>
        <Col sm="12">
          <Card className="faq-bg override">
            <CardBody className="p-sm-4 p-2" style={{textAlign:"right"}}>
              <h1 className="white-color">!יש לכם שאלה? יש לנו תשובה</h1>
              <p className="mb-2 white-color">
                חפשו מבין מגוון שאלות ומצאו את הפתרון לבעיה שלכם
              </p>
              <form>
                <FormGroup className="position-relative has-icon-left mb-0">
                  <Input
                  style={{textAlign:"right"}}
                    type="text"
                    placeholder="חפש פה"
                    bsSize="lg"
                    value={this.state.value}
                    onChange={this.onChange}
                  />
                  <div className="form-control-position">
                    {/* <Search size={14} /> */}
                  </div>
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12">
          <div className="faq">
            <Row>
              <Col sm="12">
                <FaqQuestions value={this.state.value} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
}
export default Faq
