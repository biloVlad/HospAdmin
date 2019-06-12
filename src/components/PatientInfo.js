import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Row, Col } from 'reactstrap';
import Octicon, { Info } from '@githubprimer/octicons-react';

import CanvasJSReact from '../lib/canvasjs.react';

class PatientInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalInfo: false,
            patient: null,
            modalGraph: false,
            dateStart: null,
            dateEnd: null
        };

        this.toggleInfo = this.toggleInfo.bind(this);
        this.toggleGraph = this.toggleGraph.bind(this);
    }
    toggleInfo() {
        this.setState(prevState => ({
            modalInfo: !prevState.modalInfo
        }));
    }
    toggleGraph() {
        this.setState(prevState => ({
            modalGraph: !prevState.modalGraph
        }));
    }

    getPatientInfo() {
        const { patient } = this.state;

        let info = <div>
            <p>
                <b> Пацієнт: </b> {patient.lastname} {patient.name} {patient.surename}
            </p>
            <p>
                <b> Назва установи: </b> {patient.org}
            </p>
            <p>
                <b> Відділення: </b> {patient.orgunit}
            </p>
            <p>
                <b> Палата: </b> {patient.room}
            </p>
            <p>
                <b> Паспортні дані: </b> {patient.document.pser} {patient.document.pnum}
            </p>
        </div>

        return info;
    }

    getTempGraph() {
        const { patient, dateStart, dateEnd } = this.state;

        let CanvasJSChart = CanvasJSReact.CanvasJSChart;
        var dps = []; // dataPoints
        const options = {
            title: {
                text: "Графік вимірів показників температури"
            },
            axisY: {
                includeZero: false
            },
            axisX: {
                valueFormatString: "D.MM hh:mm tt",
                labelAngle: -50
            },
            data: [{
                type: "line",
                dataPoints: dps
            }]
        }

        // .var dataLength = 20; 

        let updateChart = function () {
            var dateStartD = new Date(dateStart);
            var dateEndD = new Date(dateEnd);

            for (var i = 0; i < patient.info.data.temperatures.length; i++) {
                var element = patient.info.data.temperatures[i];

                if (dateStart) {
                    if ((new Date(element.date)) < dateStartD) {
                        continue;
                    }
                }
                if (dateEnd) {
                    if ((new Date(element.date)) > dateEndD) {
                        continue;
                    }
                }

                dps.push({
                    x: new Date(element.date),
                    y: parseFloat(element.t)
                })
            }


            // if (dps.length > dataLength) {
            //     dps.shift();
            // }
        }


        updateChart();

        let d =
            <div>
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
            </div>

        return d;
    }
    handleChangeInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentWillMount() {
        const { patient } = this.props;
        this.setState({ patient: patient });
    }
    render() {
        const { dateStart, dateEnd } = this.state;
        return (
            <div className={this.props.className}>
                <Button color="info" onClick={this.toggleInfo}>
                    <Octicon icon={Info} height={20} />
                </Button>
                {this.state.modalInfo ?
                    <Modal isOpen={this.state.modalInfo} toggle={this.toggleInfo} size="lg">
                        <ModalHeader toggle={this.toggleInfo}>{this.props.title}</ModalHeader>
                        <ModalBody>
                            {this.getPatientInfo()}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleGraph}>Інформація про стан пацієнта</Button>{' '}
                            <Button color="secondary" onClick={this.toggleInfo}>Закрити</Button>
                        </ModalFooter>
                    </Modal>
                    : null}
                {this.state.modalGraph ?
                    <Modal isOpen={this.state.modalGraph} toggle={this.toggleGraph} size="lg">
                        <ModalHeader toggle={this.toggleGraph}>{this.props.title}</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="exampleDate1">Початок</Label>
                                        <Input
                                            type="datetime-local"
                                            name="dateStart"
                                            onChange={this.handleChangeInput}
                                            value={dateStart || ""}
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="exampleDate2">Кінець</Label>
                                        <Input
                                            type="datetime-local"
                                            name="dateEnd"
                                            onChange={this.handleChangeInput}
                                            value={dateEnd || ""}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            {this.getTempGraph()}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleGraph}>Закрити</Button>
                        </ModalFooter>
                    </Modal>
                    : null}
            </div>
        );
    }
}

export default PatientInfo;