import React, { Component } from 'react';

import './App.css';

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
  Table
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();

    this.state = {
      alertVisible: false,

      des: '',

      nhats: [
        {
          fullname: '',
          min_size: '',
          size_sigma: '',
          radar_snr_a: '',
          obs_end: '',
          obs_start: '',
          radar_obs_g: ''
        }
      ]
    };

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.onDismiss = this.onDismiss.bind(this);
  }

  getAllNhats = () => {
    axios

      .get('/getallnhats')

      .then(result => {
        this.setState({ nhats: result.data });

        console.log(this.state.nhats);
      })

      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllNhats();
  }

  //for popup

  onDismiss() {
    this.setState({ alertVisible: false });
  }

  //for form

  onSubmit = e => {
    e.preventDefault();

    this.setState({ alertVisible: false });

    //console.log(this.state.title);

    const query = `/getnhats?des=${this.state.des}`;

    console.log(query);

    axios

      .get(query)

      .then(result => {
        console.log(result.data);

        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }

        this.getAllNhats();
      })

      .catch(error => {
        alert('Error: ', error);
      });

    //const data = this.state.movies;

    //this.setState({ movies: this.state.movies.reverse() });
  };

  // for form field

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeNhats(des) {
    this.setState({
      nhats: this.state.nhats.filter(n => {
        if (n.des !== des) return n;
      })
    });

    const query = `/deletenhats?des=${des}`;

    axios

      .get(query)

      .then(result => {
        this.getAllNhats();
      })

      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1 className="display-3">NHATS</h1>

          <p className="lead">Search for NHATS</p>
        </Jumbotron>

        <Container>
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="#APOD">Accessible NEAs</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="https://cneos.jpl.nasa.gov/nhats/">
                      CNEO
                    </NavLink>
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
                NHATS not found
              </Alert>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="des">Enter des</Label>

                  <Input
                    type="text"
                    name="des"
                    id="des"
                    placeholder="Example:1943"
                    onChange={this.onChange}
                  />
                </FormGroup>

                <Button color="primary">Submit</Button>

                <p />
              </Form>
            </Col>
          </Row>

          <Row>
            <Table>
              <thead>
                <tr>
                  <th />
                  <th>Full Name</th>
                  <th>Min Size</th>
                  <th>Size Sigma</th>
                  <th>Radar SNR A</th>
                  <th>OBS End</th>
                  <th>OBS Start</th>
                  <th>Radar OBS G</th>
                </tr>
              </thead>

              <tbody>
                {this.state.nhats.map(a => {
                  return (
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            this.removeNhats(a.des);
                          }}
                        >
                          Delete
                        </button>
                      </td>

                      <td>{a.fullname}</td>
                      <td>{a.min_size}</td>
                      <td>{a.size_sigma}</td>
                      <td>{a.radar_snr_a}</td>
                      <td>{a.obs_end}</td>
                      <td>{a.obs_start}</td>
                      <td>{a.radar_obs_g}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
