import React, { Component } from 'react';

import { Row, Col, Container } from 'reactstrap'
import Timer from './Timer'
import SetTemp from './SetTemp'
class PatientAdmin extends Component {


    render() {
        const {patient} = this.props;             
        
        return (
            <Container>
                <Row>
                    <Col>
                        <Timer />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SetTemp patient={patient} />
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default PatientAdmin;