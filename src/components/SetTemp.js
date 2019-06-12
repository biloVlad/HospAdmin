import React, { Component } from 'react'
import { Button, Input, Collapse, InputGroupAddon, InputGroup, Toast, ToastHeader, ToastBody } from 'reactstrap'
import Octicon, { ChevronUp, ChevronDown } from '@githubprimer/octicons-react'

class SetTemp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            valueTempInput: null,
            isSuccess: null,
            responseMessage: null,
            isAlert: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleClickTempInput = this.handleClickTempInput.bind(this);
        this.setError = this.setError.bind(this)
        this.setSuccess = this.setSuccess.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleChangeInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClickTempInput() {
        const { valueTempInput } = this.state;
        const { patient } = this.props;

        let dataBody = JSON.stringify({
            document: {
                pnum: patient.document.pnum,
                pser: patient.document.pser
            },
            data: {
                t: valueTempInput
            },
        });
        this.sendRequestForSetTemp(dataBody);
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
    sendRequestForSetTemp(dataBody) {
        fetch('http://hospitalbilo.com/hosp/patient/link/temperature', {
            method: 'POST',
            body: dataBody
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

    render() {
        const { valueTempInput, isSuccess, responseMessage, isAlert } = this.state;

        let inputTemp =
            <Collapse isOpen={this.state.collapse} className="my-2">
                <InputGroup>
                    <Input
                        type="number"
                        name="valueTempInput"
                        placeholder="Показник температури, наприклад: 36.6"
                        onChange={this.handleChangeInput}
                        value={valueTempInput || ''}
                    />
                    <InputGroupAddon addonType="append">
                        <Button color="success" onClick={this.handleClickTempInput}>Задати</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Collapse>

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
            <div className="border p-3">
                <Button color="info" onClick={this.toggle}>
                    <span className="mr-2">
                        Задати температуру
                        </span>
                    <Octicon icon={this.state.collapse ? ChevronUp : ChevronDown} />
                </Button>

                {inputTemp}
                {isAlert ? successAlert : null}
            </div>
        );
    }
}

export default SetTemp;