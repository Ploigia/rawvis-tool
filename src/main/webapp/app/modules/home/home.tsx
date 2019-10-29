import './home.scss';

import React from 'react';

import {Alert, Col, Row} from 'reactstrap';

export type IHomeProp = {};

export const Home = (props: IHomeProp) => {

  return (
    <Row>
      <Col md="9">
        <h2>Welcome!</h2>
        <p className="lead">This is your homepage</p>

      </Col>
    </Row>
  );
};


export default Home;
