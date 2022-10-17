/* eslint-disable react/prop-types */

import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Content, Left, Body, Title, Right, Icon, Button, Text } from 'native-base';

import { STYLE } from '../common/styles';

import * as Interaction from './Interaction';

function DraftView() {
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
          <Title>DRAFT</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Button block dark onPress={() => Interaction.toast({ type: Interaction.SUCCESS, content: 'Toast' })}>
          <Text>Toast</Text>
        </Button>
        <View style={STYLE.spacer} />
        <Button block dark onPress={() => Interaction.status({ type: Interaction.SUCCESS, content: 'Status' })}>
          <Text>Status</Text>
        </Button>
        <View style={STYLE.spacer} />
        <Button
          block
          dark
          onPress={() => {
            Interaction.alert({ title: 'Title', content: 'Alert' }).then((r) =>
              Interaction.toast({ type: Interaction.INFO, content: r }),
            );
          }}
        >
          <Text>Alert</Text>
        </Button>
        <View style={STYLE.spacer} />
        <Button
          block
          dark
          onPress={() => {
            Interaction.confirm({
              title: 'Title',
              content: 'Confirmation',
            }).then((r) => Interaction.toast({ type: Interaction.INFO, content: r }));
          }}
        >
          <Text>Confirm</Text>
        </Button>
        <View style={STYLE.spacer} />
        <Button
          block
          dark
          onPress={() => {
            Interaction.confirmWithNeutral({
              title: 'Title',
              content: 'confirmWithNeutral',
            }).then((r) => Interaction.toast({ type: Interaction.INFO, content: r }));
          }}
        >
          <Text>confirmWithNeutral</Text>
        </Button>
        <View style={STYLE.spacer} />
        <Button
          block
          dark
          onPress={() => {
            navigation.navigate('/modal', {
              render: () => (
                <View style={[STYLE.fit, STYLE.debug]}>
                  <Text>This is a modal!</Text>
                </View>
              ),
            });
          }}
        >
          <Text>Modal</Text>
        </Button>
      </Content>
    </Container>
  );
}

export default DraftView;
