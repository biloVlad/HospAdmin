import React, { Component } from 'react';
import { ListGroup, Toast, ToastHeader, Spinner, ToastBody } from 'reactstrap';

import PatientItem from './PatientItem';

class PatientsList extends Component {
    constructor(props) {
        super(props);


        this.state = {
            error: null,
            isLoaded: false,
            patients: [],
            collapsed: true,
            dropdownOpen: false
        };
        this.loadPatientsFromDB = this.loadPatientsFromDB.bind(this);      
    }

    loadPatientsFromDB() {
        console.log("Fetch...");
        fetch("http://hospitalbilo.com/hosp/patient")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        patients: result
                    });
                    console.log('has loaded');
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    componentDidMount() {
        this.loadPatientsFromDB();
    }

    getListPatients() {
        const {isAdmin} = this.props;
        return (
            <ListGroup>
                {this.state.patients.map((item, index) => (
                    <PatientItem isAdmin={isAdmin} patient={item} key={index} />
                ))}
            </ListGroup>

        );
    }

    content() {       
        if (this.state.isLoaded)
            return (
                <div>
                    {this.getListPatients()}
                </div >
            );
        else
            return (
                <Toast>
                    <ToastHeader icon={<Spinner size="sm" />}>
                        Завантаження
                </ToastHeader>
                    <ToastBody>
                        Зачекайте, інформація замантажується!
                </ToastBody>
                </Toast>
            );
    }



    render() {       
        return (
            this.content()
        );
    }
}

export default PatientsList;