import React, { Component } from 'react'
import { Row, Col, Input, InputGroup, InputGroupAddon, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
class RegisterPatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null,
            lastname: null,
            surename: null,
            pser: null,
            pnum: null,
            org: null,
            orgunit: null,
            room: null,
            doctor: null,
            nameMed: null,
            cod: null,
            time: null,
            count: null,
            isValid: false,
            isSuccess: null,
            responseMessage: null,
            isAlert: false
        }
        this.regPat = this.regPat.bind(this)
        this.setError = this.setError.bind(this)
        this.setSuccess = this.setSuccess.bind(this)
        this.hideAlert = this.hideAlert.bind(this)

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
    handleChangeInput = event => {
        this.setState({ [event.target.name]: event.target.value });

        let reg = new RegExp();
        if (
            event.target.name === "name" ||
            event.target.name === "lastname" ||
            event.target.name === "surename" ||
            event.target.name === "doctor" ||
            event.target.name === "pser"
        ) {
            reg = /^[a-zA-Zа-яА-Я]+$/;
        } else if (
            event.target.name === "org" ||
            event.target.name === "orgunit" ||
            event.target.name === "room" ||
            event.target.name === "nameMed" ||
            event.target.name === "cod"
        ) {
            reg = /^[a-zA-Zа-яА-Я0-9]+$/;
        } else if (
            event.target.name === "pnum" ||
            event.target.name === "time" ||
            event.target.name === "count"
        ) {
            reg = /^0*(?:(?!999\.9\d*$)\d{0,3}(?:\.\d*)?|999\.0*)$/;
        }


        if (event.target.value !== "") {
            if (reg.test(event.target.value)) {
                event.target.className = "form-control";
                this.setState({ isValid: true });
            } else {
                event.target.className = "is-invalid form-control"
                this.setState({ isValid: false })
            }
        }
    }

    sendRequestForReg(dataBody) {
        fetch('http://hospitalbilo.com/hosp/patient/delete', {
            method: 'POST',
            body: dataBody
        })
            .then(res => res.json())
            .then(
                (result) => {
                    return (
                        (result.status === "success") ?
                            window.location.reload() : null

                    );
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    regPat = event => {
        console.log(event.target);

        const {
            name,
            lastname,
            surename,
            pser,
            pnum,
            org,
            orgunit,
            room,
            doctor,
            nameMed,
            cod,
            time,
            count
        } = this.state;
        if (
            name &&
            lastname &&
            surename &&
            pser &&
            pnum &&
            org &&
            orgunit &&
            room &&
            doctor &&
            nameMed &&
            cod &&
            time &&
            count
        ) {
            let bodyData = JSON.stringify({
                "name": name,
                "surename": surename,
                "lastname": lastname,
                "org": org,
                "orgunit": orgunit,
                "room": room,
                "document": {
                    "pnum": pnum,
                    "pser": pser
                },
                "info": {
                    "data": {
                        "temperatures": [
                        ]
                    },
                    "medication": {
                        "doctor": doctor,
                        "name": nameMed,
                        "cod": cod,
                        "dosage": {
                            "time": time,
                            "count": count
                        }
                    }
                }
            });

            if (this.state.isValid) {
                this.sendRequestForReg(bodyData);
            }
        }

    }
    render() {
        const {
            name,
            lastname,
            surename,
            pser,
            pnum,
            org,
            orgunit,
            room,
            doctor,
            nameMed,
            cod,
            time,
            count,
            isSuccess,
            responseMessage,
            isAlert
        } = this.state;

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
            <div className="border p-2">
                {isAlert ? successAlert : null}
                <Row >
                    <Col>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Персональні дані</InputGroupAddon>
                            <Input
                                name="lastname"
                                placeholder="Прізвище"
                                onChange={this.handleChangeInput}
                                value={lastname || ""}
                            >
                            </Input>
                            <Input
                                name="name"
                                placeholder="Ім'я"
                                onChange={this.handleChangeInput}
                                value={name || ""}
                            >
                            </Input>
                            <Input
                                name="surename"
                                placeholder="По батькові"
                                onChange={this.handleChangeInput}
                                value={surename || ""}
                            >
                            </Input>
                            <Input
                                name="pser"
                                placeholder="Серія"
                                onChange={this.handleChangeInput}
                                value={pser || ""}
                            >
                            </Input>
                            <Input
                                name="pnum"
                                type="number"
                                placeholder="Номер паспорту"
                                onChange={this.handleChangeInput}
                                value={pnum || ""}
                            >
                            </Input>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Дані про установу</InputGroupAddon>
                            <Input
                                name="org"
                                placeholder="Назва установи"
                                onChange={this.handleChangeInput}
                                value={org || ""}
                            >
                            </Input>
                            <Input
                                name="orgunit"
                                placeholder="Відділення"
                                onChange={this.handleChangeInput}
                                value={orgunit || ""}
                            >
                            </Input>
                            <Input
                                name="room"
                                placeholder="Кімната"
                                onChange={this.handleChangeInput}
                                value={room || ""}
                            >
                            </Input>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Дані лікаря та ліки</InputGroupAddon>
                            <Input
                                name="doctor"
                                placeholder="ПІБ лікаря"
                                onChange={this.handleChangeInput}
                                value={doctor || ""}
                            >
                            </Input>
                            <Input
                                name="nameMed"
                                placeholder="Призначені ліки"
                                onChange={this.handleChangeInput}
                                value={nameMed || ""}
                            >
                            </Input>
                            <Input
                                name="cod"
                                placeholder="Код ліків"
                                onChange={this.handleChangeInput}
                                value={cod || ""}
                            >
                            </Input>
                            <Input
                                name="time"
                                placeholder="Разів в день"
                                onChange={this.handleChangeInput}
                                value={time || ""}
                                type="number"
                            >
                            </Input>
                            <Input
                                name="count"
                                placeholder="За раз"
                                onChange={this.handleChangeInput}
                                value={count || ""}
                                type="number"
                            >
                            </Input>
                            <InputGroupAddon addonType="append">
                                <Button onClick={this.regPat} color="success">Зареєструвати</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RegisterPatient;