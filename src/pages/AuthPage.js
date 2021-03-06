import AuthForm from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

class AuthPage extends React.Component {

  handleLoginSubmit= () =>{
      this.props.history.push('/school');
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              onLogoClick={this.handleLogoClick}
              onSubmitted={this.handleLoginSubmit}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
