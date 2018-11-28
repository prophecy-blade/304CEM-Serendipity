import React, { Component } from 'react';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class AstronomyCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { date, explanation, title, url } = this.props.astronomy;

    return (
      <div>
        <Card>
          <CardImg top width="100%" src={url} alt="Card image cap" />

          <CardBody>
            <CardTitle>{title}</CardTitle>

            <CardSubtitle>{date}</CardSubtitle>

            <CardText>{explanation}</CardText>

            <Button
              color="primary"
              onClick={() => this.props.removeAstronomy(date)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AstronomyCard;
