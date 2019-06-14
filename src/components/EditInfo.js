import React, { Component } from 'react'
import {
    Button,
    Toast, ToastBody, ToastHeader,
    Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import Octicon, { Pencil } from '@githubprimer/octicons-react';

class EditInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            patient: null,
            isAlert: false
        };
        this.toggle = this.toggle.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.setError = this.setError.bind(this)
        this.setSuccess = this.setSuccess.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
        this.setRoom = this.setRoom.bind(this)
    }
    componentWillMount() {
        const { patient } = this.props;
        this.setState({ patient: patient });
    }
    handleChangeInput = event => {
        const { patient } = this.state;
        patient.room = event.target.value;
        this.setState({ patient });
    }
    getRoomEdit() {
        const { patient } = this.state;

        return <div>
            <p>
                <b> Палата: </b> {patient.room}
            </p>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Змінити палату</InputGroupAddon>
                <Input
                    name="room"
                    placeholder="Палата"
                    onChange={this.handleChangeInput}
                    value={patient.room || ""}
                >
                </Input>
                <InputGroupAddon addonType="append">
                    <Button onClick={this.setRoom} color="success">Зберегти</Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    }
    setSuccess(result) {
        this.setState({ isSuccess: "success", responseMessage: result.message, isAlert: true })
        setTimeout(this.hideAlert, 5000)

    }

    setError(result) {
        this.setState({ isSuccess: "danger", responseMessage: result.message, isAlert: true })
        setTimeout(this.hideAlert, 5000)
    }
    hideAlert() {
        this.setState({ isAlert: false })
    }
    setRoom() {
        const { patient } = this.state;
        let bodyData = JSON.stringify({
            "document": {
                "pnum": patient.document.pnum,
                "pser": patient.document.pser
            },
            "room": patient.room
        });
        fetch('http://hospitalbilo.com/hosp/patient/set/room', {
            method: 'POST',
            body: bodyData
        })
            .then(res => res.json())
            .then(
                (result) => {
                    return (
                        (result.status === "success") ?
                            this.setSuccess(result) : this.setError(result)

                    );
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {
        const {isSuccess, responseMessage, isAlert} =  this.state;
        let successAlert =
            <Toast>
                <ToastHeader icon={isSuccess}>
                    {(isSuccess === "success") ? 'Успішно' : 'Помилка'}
                </ToastHeader>
                <ToastBody>
                    {responseMessage}
                </ToastBody>
            </Toast>

        return (
            <span className="mr-1">
                <Button color="info" onClick={this.toggle}>
                    <Octicon icon={Pencil} />
                </Button>
                {this.state.modal ?
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                        <ModalHeader toggle={this.toggle}>Змінити палату пацієнта</ModalHeader>
                        <ModalBody>
                            {isAlert ? successAlert : null}
                            {this.getRoomEdit()}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Закрити</Button>
                        </ModalFooter>
                    </Modal> : null}
            </span>
        );
    }
}

export default EditInfo;