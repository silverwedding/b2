import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Divider } from 'react-native-elements';
import {
  Container,
  Item,
  Input,
  Content,
  Button,
  Text,
  Spinner,
} from 'native-base';
import { loginUser, loginSkip } from '../actions';

const styles = {
  errorTextStyle: {
    padding: 10,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
    this.submit = this.submit.bind(this);
    this.skip = this.skip.bind(this);
  }

  submit(values) {
    this.props.loginUser(values);
  }

  skip() {
    this.props.loginSkip();
  }

  renderInput({ input, meta: { error } }) {
    const hasError = error !== undefined;
    return (
      <Item error={hasError}>
        <Input {...input} />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    );
  }

  renderButton() {
    const { loading, handleSubmit } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Button full primary rounded={false} onPress={handleSubmit(this.submit)}>
        <Text>Login</Text>
      </Button>
    );
  }

  render() {
    const { authError } = this.props;

    return (
      <Container>
        <Content padder>
          <Field name="email" component={this.renderInput} />
          <Field name="password" component={this.renderInput} />
          <Text style={styles.errorTextStyle}>
            {authError}
          </Text>
          {this.renderButton()}
          <Divider style={{ backgroundColor: 'white' }} />
          <Button full success rounded={false} onPress={this.skip}>
            <Text>Skip Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const LoginFormRedux = reduxForm()(LoginForm);
const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;

  return {
    form: 'LoginForm',
    authError: error,
    loading,
  };
};

export default connect(mapStateToProps, {
  loginUser, loginSkip,
})(LoginFormRedux);
