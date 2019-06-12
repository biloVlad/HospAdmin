import React, { Component } from 'react'
import { Button, Toast, ToastHeader, Spinner, ToastBody, Row, Col } from 'reactstrap'

import Octicon, { CircleSlash, Sync } from '@githubprimer/octicons-react';

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
            value: null,
            currentStateBtn: "info",
            currentTextBtn: "Виміряти температуру"
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }
    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1000);
    }
    stopTimer() {
        this.setState({
            isOn: false,
        })
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({
            time: 0, isOn: false,
            value: null,
            currentStateBtn: "info",
            currentTextBtn: "Виміряти температуру"
        })
    }

    measureSuccess(value) {
        this.setState({
            currentStateBtn: "success",
            currentTextBtn: "Операція успішна!",
            value: value
        });
        this.stopTimer();
    }

    sendRequestForTemp() {
        console.log("Fetch...");
        fetch("http://hospitalbilo.com/hosp/check/temperature")
            .then(res => res.json())
            .then(
                (result) => {
                    return result.status === "success" ?
                        this.measureSuccess(result.value) :
                        null
                },
                (error) => {
                    console.log(error);
                }
            );
    }


    render() {
        const { currentStateBtn, currentTextBtn, value } = this.state;

        let stop = (this.state.time === 0 || !this.state.isOn) ?
            null :
            <Button color="danger" onClick={this.stopTimer}>
                <Octicon size="small" icon={CircleSlash} />
            </Button>


        let success =
            <Toast>
                <ToastHeader icon="success">
                    Успішно
                </ToastHeader>
                <ToastBody>
                    <Row>
                        <Col>
                            Показник: {value}
                        </Col>
                        <Col xs="auto">
                            <Button className="p-0 m-0 px-1" onClick={this.resetTimer}>
                                <Octicon size="small" icon={Sync} />
                            </Button>
                        </Col>
                    </Row>
                </ToastBody>
            </Toast>

        let loadTemp = (this.state.time === 0 || !this.state.isOn) ?
            <Button
                color={currentStateBtn}
                onClick={this.startTimer}
            >
                {currentTextBtn}
                {(this.state.time === 0 || !this.state.isOn) ? null : stop}
            </Button> :
            <Toast>
                <ToastHeader icon={<Spinner size="sm" />}>
                    Очікування
                    <Button color="danger" onClick={this.stopTimer} className="p-0 px-1 pb-1 ml-1" >
                        <Octicon icon={CircleSlash} />

                    </Button>
                </ToastHeader>
                <ToastBody>
                    Зачекайте, очікуються показники!
                    </ToastBody>
            </Toast>




        return (
            <div className="border p-3 mt-3">
                {(this.state.currentStateBtn === "success") ? null : loadTemp}
                {(this.state.currentStateBtn === "success") ? success : null}
                {(this.state.time === 0 || !this.state.isOn) ? null : this.sendRequestForTemp()}
            </div>
        )
    }
}

export default Timer;