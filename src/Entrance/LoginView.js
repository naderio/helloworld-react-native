import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Container, Header, Content, Button, Spinner, Input, Item, Text, Form } from 'native-base';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Interaction from '../Shared/Interaction';

import { login } from '../Auth/state';

import styles from './styles';

function LoginView() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const processing = useSelector((state) => state.Activity.processingById[login.ID] || false);

  const [data, setData] = React.useReducer((state, newState) => ({ ...state, ...newState }), {
    username: '',
    password: '',
  });

  const dataIsValid = React.useMemo(() => {
    return !!data.username && !!data.password;
  }, [data.password, data.username]);

  const submit = React.useCallback(() => {
    if (!dataIsValid) {
      return;
    }

    const { username, password } = data;
    dispatch(login(username, password)).catch((error) => {
      Interaction.toast({ type: Interaction.FAILURE, content: error.message });
    });
  }, [dataIsValid, data, dispatch]);

  const passwordRef = React.useRef();

  return (
    <Container>
      <Header noShadow style={styles.header} />

      <Content padder contentContainerStyle={STYLE.flex_grow}>
        <LogoHeader style={styles.logo} />

        <Form>
          <Item regular>
            <Input
              placeholder="Email"
              value={data.username}
              onChangeText={(username) => setData({ username })}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.wrappedInstance.focus()}
              enablesReturnKeyAutomatically
              autoCapitalize="none"
            />
          </Item>

          <View style={STYLE.spacer} />

          <Item regular>
            <Input
              ref={passwordRef}
              placeholder="Password"
              value={data.password}
              onChangeText={(password) => setData({ password })}
              returnKeyType="send"
              onSubmitEditing={() => submit()}
              secureTextEntry
              enablesReturnKeyAutomatically
              blurOnSubmit
              autoCapitalize="none"
            />
          </Item>

          <View style={STYLE.spacer} />

          <Button block primary disabled={processing} onPress={submit}>
            <Text>Log in</Text>
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

          <Button block dark transparent style={STYLE.flex} onPress={() => navigation.navigate('/signup')}>
            <Text>Sign up</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

export default LoginView;
