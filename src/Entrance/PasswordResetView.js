import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Spinner, Input, Item, Text, Form } from 'native-base';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Interaction from '../Shared/Interaction';

import { initiatePasswordReset } from '../Auth/state';

const styles = StyleSheet.create({
  header: {
    height: 0,
  },
  header_logo: {
    flex: 1,
    minHeight: 'auto',
  },
});

function PasswordResetView() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const processing = useSelector((state) => state.Activity.processingById[initiatePasswordReset.ID] || false);

  const [data, setData] = React.useReducer((state, newState) => ({ ...state, ...newState }), {
    email: '',
  });

  const dataIsValid = React.useMemo(() => {
    return !!data.email;
  }, [data.email]);

  const submit = React.useCallback(() => {
    if (!dataIsValid) {
      return;
    }

    const { email } = data;

    dispatch(initiatePasswordReset(email)).catch((error) => {
      Interaction.toast({ type: Interaction.FAILURE, content: error.message });
    });
  }, [dataIsValid, data, dispatch]);

  return (
    <Container>
      <Header noShadow style={styles.header} />

      <Content padder contentContainerStyle={STYLE.flex_grow}>
        <LogoHeader style={styles.header_logo} />

        <Form>
          <Item regular>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              value={data.email}
              autoCapitalize="none"
              returnKeyType="send"
              enablesReturnKeyAutomatically
              onChangeText={(email) => setData({ email })}
              onSubmitEditing={submit}
            />
          </Item>

          <View style={STYLE.spacer} />

          <Button block primary disabled={processing} onPress={submit}>
            <Text>Reset my Password</Text>
            {processing && <Spinner size="small" inverse />}
          </Button>
        </Form>

        <View style={STYLE.spacer} />

        <View style={STYLE.spacer} />

        <View style={STYLE.flex_row}>
          <Button block dark transparent style={STYLE.flex} onPress={() => navigation.navigate('/signup')}>
            <Text>Sign up</Text>
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

export default PasswordResetView;
