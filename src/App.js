import React, { Component } from 'react';
import './App.css';
import AstronomyCard from './AstronomyCard';
import NeoLookup from './NeoLookup';
import Mars from './Mars';
import axios from 'axios';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      alertVisible: false,
      date: '',
      astronomy: [{ date: '', explanation: '', title: '', url: '' }],
      activeIndex: 0,
      isOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getAllAstronomy = () => {
    axios
      .get('/getallastronomy')
      .then(result => {
        this.setState({ astronomy: result.data });
        console.log(this.state.astronomy);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllAstronomy();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `/getastronomy?date=${this.state.date}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllAstronomy();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeAstronomy(date) {
    this.setState({
      astronomy: this.state.astronomy.filter(ast => {
        if (ast.date !== date) return ast;
      })
    });
    const query = `/deleteastronomy?date=${date}`;
    axios
      .get(query)
      .then(result => {
        this.getAllAstronomy();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1 className="display-4">Serendipity</h1>
          <p className="lead">Search astronomy</p>
        </Jumbotron>

        <Container>
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="#APOD">Astronomy of The Day</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="https://www.nasa.gov/">NASA</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          <br />

          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Astronomy not found
              </Alert>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="date">Enter Astronomy Date</Label>
                  <Input
                    type="text"
                    name="date"
                    id="date"
                    placeholder="Example: 2017-11-26"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row key={this.state.astronomy[0].date}>
            <AstronomyCard
              removeAstronomy={this.removeAstronomy.bind(this)}
              astronomy={this.state.astronomy[0]}
            />
          </Row>
        </Container>

        <Mars />

        <Jumbotron>
          <p className="lead">
            <br />
            <i>
              An aptitude for making desirable discoveries by accident, luck.
            </i>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
