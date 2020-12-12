import React, { Component } from 'react'
import { Button, Modal,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as promptActions from '../../Store/Actions/promptActions'
import './prompt.scss'
class Prompt extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.closePrompt()}> 
                <Modal.Header>
                <Col md={12} className="float-right">
                    <Modal.Title className="align">{this.props.promptTitle}</Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body className="align">
                    {this.props.promptText}</Modal.Body>
                <Modal.Footer>
                    
                         <Button variant="secondary" onClick={() => this.props.closePrompt()}>
                            Close
                </Button>
                    



                </Modal.Footer>
            </Modal>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        show: state.prompt.show,
        promptTitle: state.prompt.promptTitle,
        promptText: state.prompt.promptText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closePrompt: () => dispatch(promptActions.closePrompt()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Prompt);
