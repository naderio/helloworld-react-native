import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Left, Body, Title, Right, Icon, Button, Text } from 'native-base';

import { useNavigationState, useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'monospace',
    fontSize: 10,
  },
});

function DebugView() {
  const navigation = useNavigation();

  const reduxState = useSelector((state) => state);

  const navigationState = useNavigationState((state) => state);

  const content = {
    redux: reduxState,
    navigation: navigationState,
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>DEBUG</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Text style={styles.text}>{JSON.stringify(content, null, 2)}</Text>
      </Content>
    </Container>
  );
}

export default DebugView;
