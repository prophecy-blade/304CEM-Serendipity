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
  Table
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // alertVisible: false,

      // title: '',

      neos: [
        { neo_reference_id: '', name: '', designation: '', nasa_jpl_url: '' }
      ]
    };

    // this.onChange = this.onChange.bind(this);

    // this.onSubmit = this.onSubmit.bind(this);

    // this.onDismiss = this.onDismiss.bind(this);
  }

  getAllNeos = () => {
    axios

      .get('/getneolookup')

      .then(result => {
        this.setState({ neos: result.data });

        console.log(this.state.neos);
      })

      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllNeos();
  }

  //for popup

  // onDismiss() {
  //   this.setState({ alertVisible: false });
  // }

  //for form

  // onSubmit = e => {
  //   e.preventDefault();

  //   this.setState({ alertVisible: false });

  //   const query = `//getneolookup?`;

  //   console.log(query);

  //   axios

  //     .get(query)

  //     .then(result => {
  //       console.log(result.data);

  //       if (result.data === 'Not found') {
  //         this.setState({ alertVisible: true });
  //       }

  //       this.getAllNeos();
  //     })

  //     .catch(error => {
  //       alert('Error: ', error);
  //     });
  // };

  // for form field

  // onChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  // removeNeo() {
  //   this.setState({
  //     neos: this.state.neos.filter(neo => {
  //       if (neo) return neo;
  //     })
  //   });

  //   const query = `/deleteneo?`;

  //   axios

  //     .get(query)

  //     .then(result => {
  //       this.getAllNeos();
  //     })

  //     .catch(error => {
  //       alert('Error: ', error);
  //     });
  // }

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1 className="display-3">Neo Lookup</h1>

          <p className="lead">Search for Neo Lookup</p>
        </Jumbotron>

        <Container>
          {/* <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Neo not found
              </Alert>
            </Col>
          </Row> */}

          {/* <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Enter neo title</Label>

                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="enter movie title..."
                    onChange={this.onChange}
                  />
                </FormGroup>

                <Button color="primary">Submit</Button>

                <p />
              </Form>
            </Col>
          </Row> */}

          <Row>
            <Table>
              <thead>
                <tr>
                  <th>neo_reference_id</th>
                  <th>Name</th>

                  <th>designation</th>

                  <th>nasa_jpl_url</th>
                </tr>
              </thead>

              {/* <tbody>
                {this.state.neos.map(neo => {
                  return (
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            this.removeMovie(movie.title);
                          }}
                        >
                          Delete
                        </button>
                      </td>

                      <td>{neo.neo_reference_id}</td>
                      <td>{neo.Name}</td>
                      <td>{neo.designation}</td>
                      <td>
                        <img src={neo.nasa_jpl_url} />
                      </td>
                    </tr>
                  );
                })}
              </tbody> */}
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
