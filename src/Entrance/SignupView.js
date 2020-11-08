import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Spinner, Input, Item, Text, Form } from 'native-base';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Interaction from '../Shared/Interaction';

import { signup } from '../Auth/state';

const styles = StyleSheet.create({
  header: {
    height: 0,
  },
  header_logo: {
    flex: 1,
    minHeight: 'auto',
  },
});

function SignupView() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const processing = useSelector((state) => state.Activity.processingById[signup.ID] || false);

  const [data, setData] = React.useReducer((state, newState) => ({ ...state, ...newState }), {
    name: '',
    email: '',
    password: '',
  });

  const dataIsValid = React.useMemo(() => {
    return !!data.name && !!data.email && !!data.password;
  }, [data.email, data.name, data.password]);

  const submit = React.useCallback(() => {
    if (!dataIsValid) {
      return;
    }

    dispatch(signup(data)).catch((error) => {
      Interaction.toast({ type: Interaction.FAILURE, content: error.message });
    });
  }, [dataIsValid, data, dispatch]);

  const nameRef = React.useRef();
  const passwordRef = React.useRef();

  return (
    <Container>
      <Header noShadow style={styles.header} />

      <Content padder contentContainerStyle={STYLE.flex_grow}>
        <LogoHeader style={styles.header_logo} />

        <Form>
          <Item regular>
            <Input
              placeholder="Name"
              value={data.name}
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onChangeText={(name) => setData({ name })}
              onSubmitEditing={() => nameRef.current.wrappedInstance.focus()}
            />
          </Item>

          <View style={STYLE.spacer} />

          <Item regular>
            <Input
              ref={nameRef}
              placeholder="Email"
              keyboardType="email-address"
              value={data.email}
              autoCapitalize="none"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onChangeText={(email) => setData({ email })}
              onSubmitEditing={() => passwordRef.current.wrappedInstance.focus()}
            />
          </Item>

          <View style={STYLE.spacer} />

          <Item regular>
            <Input
              ref={passwordRef}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              value={data.password}
              returnKeyType="send"
              enablesReturnKeyAutomatically
              blurOnSubmit
              onChangeText={(password) => setData({ password })}
              onSubmitEditing={submit}
            />
          </Item>

          <View style={STYLE.spacer} />

          <Button block primary disabled={processing} onPress={submit}>
            <Text>Sign up</Text>
            {processing && <Spinner size="small" inverse />}
          </Button>
        </Form>

        <View style={STYLE.spacer} />

        <View style={STYLE.spacer} />

        <View style={STYLE.flex_row}>
          <Button block dark transparent style={STYLE.flex} onPress={() => navigation.navigate('/password-reset')}>
            <Text>Password Reset</Text>
          </Button>

          <View style={STYLE.spacer} />

          <Button block dark transparent style={STYLE.flex} onPress={() => navigation.navigate('/login')}>
            <Text>Log in</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

export default SignupView;
