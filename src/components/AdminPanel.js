import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Collapse } from 'reactstrap';
import Octicon, { ChevronDown, ChevronUp } from '@githubprimer/octicons-react';

import PatientsList from './PatientsList'
import RegisterPatient from './RegisterPatient'

class AdminPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenList: false,
            isOpenReg: false
        }

        this.toggleList = this.toggleList.bind(this);
        this.toggleReg = this.toggleReg.bind(this);
    }

    toggleList() {
        this.setState({
            isOpenList: !this.state.isOpenList
        })
    }
    toggleReg() {
        this.setState({
            isOpenReg: !this.state.isOpenReg
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>
                        Панель адміністратора
                    </h1>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <div style={{ display: "flex" }}>
                            <h3 style={{width: "fit-content"}}>Список пацієнтів</h3>
                            <Button color="primary" className="ml-1 px-3" onClick={this.toggleList}>
                                <Octicon size={20} icon={this.state.isOpenList ? ChevronUp : ChevronDown} />
                            </Button>
                        </div>                       
                        <Collapse isOpen={this.state.isOpenList} className="mt-2">
                            {this.state.isOpenList ? 
                            <PatientsList isAdmin={true} /> : null}
                        </Collapse>                       
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <div style={{ display: "flex" }}>
                            <h3 style={{width: "fit-content"}}>Зареєструвати пацієнта</h3>
                            <Button color="primary" className="ml-1 px-3" onClick={this.toggleReg}>
                                <Octicon size={20} icon={this.state.isOpenReg ? ChevronUp : ChevronDown} />
                            </Button>
                        </div>
                        <Collapse isOpen={this.state.isOpenReg} className="mt-2">
                           <RegisterPatient />
                        </Collapse>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AdminPanel;