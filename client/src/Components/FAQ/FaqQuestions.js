import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Collapse } from "reactstrap"
import { ChevronDown } from "react-feather"
import classnames from "classnames"

const collapseItems = [
  {
    id: 1,
    title: "?ווייפיי/wifiאיך מחברים את המכשיר לרשת ה",
    content:{
        text: "על מנת לבצע את ההתחברות יש לעקוב אחרי השלבים הבאים (1) פתח את אפליקציית ההגדרות במכשיר הסלולרי שלך (2) כנס בהגדרות למקום שבו מגדירים את הוויפיי (3) חפש רשת בשם סקאנלי והתחבר אליה (4) בחר את הרשת הביתית שלך מתוך הרשימה הכנס את הסיסמה אליה והתחבר אליה (5) חכה מספר שניות, אם התהליך הושלם בהצלחה תקבל מכך התרעה קולית מהמכשיר, אם לא קיבלת תגובה מהמכשיר לאחר מספר שניות, עליך לבצע את התהליך מחדש",
        }
  },
  {
    id: 2,
    title: "?המכשיר לא עובד לי, מה לעשות",
    content:{
    text:"אם המכשיר לא עובד אז יש לבצע את השלבים הבאים (1) הפתרון הפשוט ביותר הוא להוציא את המכשיר מהחשמל ולהכניסו חזרה  (2) אם הבעיה עדיין לא נפתרה יש ליצור קשר איתנו ונברר מה הבעיה",
    // image: <img src="data:image/jpeg;base64,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"/>
    }
  },
  {
    id: 3,
    title: "?איך אפשר לשנות את הסופרמרקט שאליו נוספים המוצרים",
    content:{
        text:"בשביל לשנות את הסופרמרקט יש להתחבר לחשבון באתר, ללכת להגדרות, לבחור את הרשת החדשה וללחוץ שמור",
        }
  },
  {
    id: 4,
    title: "?מה קורה אם המוצר לא נמצא בסופר שבחרתי",
    content:{
      text: "אם המוצר לא נמצא בסופר הוא לא יתווסף לעגלה, אבל הוא יישמר בהיסטוריית הסריקות שלך"
    }
  },
  {
    id: 5,
    title: "?האם ניתן להוסיף לעגלה מוצר שלא ברשותי",
    content:{
      text:"במקרה כזה עליך לעשות את מה שהיית עושה גם ללא המכשיר, להתחבר לאתר רשת הסופרמרקט לחפש ולהוסיף את המוצר"
    }
  },
  {
    id: 6,
    title:
      "?כיצד אוכל לראות אילו מוצרים צרכתי הכי הרבה",
      content:{
        text:"על מנת לראות זאת יש להיכנס לנתוני הצריכה, שם תוכל לראות את כל המוצרים שקנית וכמה הם עלו לך"
      }
  },
]

class FaqQuestions extends React.Component {
  state = {
    collapseID: "",
    status: "Closed"
  }

  toggleCollapse = collapseID => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }))
  }

  onEntered = id => {
    if (id === this.state.collapseID) this.setState({ status: "Opened" })
  }
  onEntering = id => {
    if (id === this.state.collapseID) this.setState({ status: "Opening..." })
  }

  onExited = id => {
    if (id === this.state.collapseID) this.setState({ status: "Closed" })
  }

  onExiting = id => {
    if (id === this.state.collapseID) this.setState({ status: "Closing..." })
  }

  render() {
    const accordionMarginItems = collapseItems.map(collapseItem => {
      if (this.props.value > 0) {
        return (
          <div
            className="collapse-margin accordion vx-collapse"
            key={collapseItem.id}
          >
            <Card
              onClick={() => this.toggleCollapse(collapseItem.id)}
              className={classnames("shadow-none", {
                "collapse-collapsed":
                  this.state.status === "Closed" &&
                  this.state.collapseID === collapseItem.id,
                "collapse-shown":
                  this.state.status === "Opened" &&
                  this.state.collapseID === collapseItem.id,
                closing:
                  this.state.status === "Closing..." &&
                  this.state.collapseID === collapseItem.id,
                opening:
                  this.state.status === "Opening..." &&
                  this.state.collapseID === collapseItem.id
              })}
            >
              <CardHeader>
                <CardTitle className="lead collapse-title collapsed text-truncate w-75">
                  {collapseItem.title}
                </CardTitle>
                <ChevronDown className="collapse-icon" size={15} />
              </CardHeader>
              <Collapse
                isOpen={collapseItem.id === this.state.collapseID}
                onEntering={() => this.onEntering(collapseItem.id)}
                onEntered={() => this.onEntered(collapseItem.id)}
                onExiting={() => this.onExiting(collapseItem.id)}
                onExited={() => this.onExited(collapseItem.id)}
              >
                <CardBody>{collapseItem.content.text}</CardBody>
              </Collapse>
            </Card>
          </div>
        )
      } else if (collapseItem.title.toLowerCase().includes(this.props.value)) {
        return (
          <div
            className="collapse-margin accordion vx-collapse"
            key={collapseItem.id}
          >
            <Card
            
              onClick={() => this.toggleCollapse(collapseItem.id)}
              className={classnames("shadow-none", {
                "collapse-collapsed":
                  this.state.status === "Closed" &&
                  this.state.collapseID === collapseItem.id,
                "collapse-shown":
                  this.state.status === "Opened" &&
                  this.state.collapseID === collapseItem.id,
                closing:
                  this.state.status === "Closing..." &&
                  this.state.collapseID === collapseItem.id,
                opening:
                  this.state.status === "Opening..." &&
                  this.state.collapseID === collapseItem.id
              })}
            >
              <CardHeader>
                <CardTitle style={{textAlign:"right"}} className="lead collapse-title collapsed text-truncate ">
                  {collapseItem.title}
                </CardTitle>
                <ChevronDown className="collapse-icon" size={15} />
              </CardHeader>
              <Collapse
                isOpen={collapseItem.id === this.state.collapseID}
                onEntering={() => this.onEntering(collapseItem.id)}
                onEntered={() => this.onEntered(collapseItem.id)}
                onExiting={() => this.onExiting(collapseItem.id)}
                onExited={() => this.onExited(collapseItem.id)}
              >
                <CardBody style={{textAlign:"right"}}>{collapseItem.content.text}<br />{collapseItem.content.image}</CardBody>
              </Collapse>
            </Card>
          </div>
        )
      }else{
        return null
      }
      
    })
    return <div> {accordionMarginItems}</div>
  }
}
export default FaqQuestions
