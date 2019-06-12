import React, { Component } from 'react';
import './App.css';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/Home'
import AdminPanel from './components/AdminPanel'

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      value: null,
      collapsed: true
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">
              Поліклініка, відділення №5
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/admin">
                    Панель адміністратора
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink herf="/about">
                    Про проект
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>

          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={AdminPanel} />
        </Router>

      </div>
    );
  }
}

export default App;
