import React, { Component } from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Search } from './search';

const AppCol = ({children}) => (
  <Col xs={12} md={8} mdOffset={2}>
    {children}
  </Col>
)

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <AppCol>
        <Row>
          <Col xs>
            <h1 style={{'text-align': 'center'}}>Weights</h1>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Row>
              <label htmlFor="movement">What are we lifting today?</label>
            </Row>
            <Row>
              <Search />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs>(search results)</Col>
        </Row>
        </AppCol>
      </Grid>
    );
  }
}

export default App;
