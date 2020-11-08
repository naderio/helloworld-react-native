import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Left, Body, Title, Right, Content, Text, Icon, Button } from 'native-base';

import { RELEASE_VERSION } from '../common/config';

function AboutView() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>About</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <View>
          <Text>
            Release:
            {RELEASE_VERSION}
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default AboutView;
