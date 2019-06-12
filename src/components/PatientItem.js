import React, { Component } from 'react';
import { ListGroupItem, Button, Collapse } from 'reactstrap';
import Octicon, { ChevronDown, ChevronUp, Trashcan, Pencil } from '@githubprimer/octicons-react';
import { Row, Col } from 'reactstrap';

import PatientInfo from './PatientInfo';
import PatientAdmin from './PatientAdmin'
class PatientItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patient: {},
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
        this.deletePat = this.deletePat.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    getPatientStringInfo(patient) {
        let info = `${patient.lastname} ${patient.name} ${patient.surename}, ${patient.org} ${patient.orgunit}`;

        return info;
    }


    componentDidMount() {
        const patientProp = this.props.patient;
        this.setState({
            patient: patientProp
        })
    }

    editingView() {
        return (
            <Collapse isOpen={this.state.collapse}>
                <PatientAdmin patient={this.state.patient} isActive={this.state.collapse} />
            </Collapse>
        )
    }
    deletePat() {
        const {patient} = this.state;

        let dataBody = JSON.stringify({
            "document": {
                "pnum": patient.document.pnum,
                "pser": patient.document.pser
            }
        })

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
    render() {
        const { patient, isAdmin } = this.props;
        const { collapse } = this.state;

        let edit =
            <div>
                <Button color="danger" onClick={this.deletePat} className="mr-1">
                    <Octicon icon={Trashcan} />
                </Button>
                <Button color="info" className="mr-1">
                    <Octicon icon={Pencil} />
                </Button>
            </div>



        return (
            <ListGroupItem>
                <Row>
                    <Col>
                        {this.getPatientStringInfo(patient)}
                    </Col>
                    <Col xs="auto" style={{ display: "inherit" }}>

                        {isAdmin ? edit : null}

                        <PatientInfo patient={patient} className="mr-1" title={this.getPatientStringInfo(patient)} />

                        <Button color="primary" onClick={this.toggle}>
                            <Octicon icon={collapse ? ChevronUp : ChevronDown} />
                        </Button>
                    </Col>
                </Row>
                {this.editingView()}
            </ListGroupItem >
        );
    }
}

export default PatientItem;