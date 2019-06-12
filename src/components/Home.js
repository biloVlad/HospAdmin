import React, { Component } from 'react'
import PatientsList from './PatientsList';
import { Container, Row, Col } from 'reactstrap';
import alt from '../../public/logo.png';
class Home extends Component {
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="3">
                        <img src={alt} alt="alt" className="photo-image" />
                    </Col>
                    <Col xs="9">
                        <PatientsList />
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default Home;