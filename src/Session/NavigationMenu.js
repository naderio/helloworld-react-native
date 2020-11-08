import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, List, ListItem, Icon, Thumbnail, Left, Body } from 'native-base';

import { useNavigation, useNavigationState } from '@react-navigation/native';

import * as Interaction from '../Shared/Interaction';

import { logout } from '../Auth/state';

const styles = StyleSheet.create({
  itemIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
});

function NavigationMenu() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const userAccount = useSelector((state) => state.Auth.userAccount) || {};

  const path = useNavigationState((state) =>
    state.routes[state.index].state ? state.routes[state.index].state.routes[state.routes[0].state.index].name : '',
  );

  const doLogout = React.useCallback(() => {
    dispatch(logout())
      .then(() => Interaction.toast({ type: Interaction.SUCCESS, content: 'Goodbye!' }))
      .catch((error) => Interaction.toast({ type: Interaction.FAILURE, content: error.message }));
  }, [dispatch]);

  return (
    <Container>
      <Content>
        <List>
          <ListItem avatar selected={path === '/profile'} onPress={() => navigation.navigate('/profile')}>
            <Left>
              <Thumbnail circle small source={{ uri: userAccount.pictureUrl }} />
            </Left>
            <Body>
              <Text>{userAccount.name}</Text>
            </Body>
          </ListItem>
          <ListItem icon selected={path === '/home'} onPress={() => navigation.navigate('/home')}>
            <Left>
              <Icon name="home" style={styles.itemIcon} />
            </Left>
            <Body>
              <Text>Home</Text>
            </Body>
          </ListItem>
          <ListItem icon selected={path === '/about'} onPress={() => navigation.navigate('/about')}>
            <Left>
              <Icon name="information-circle" style={styles.itemIcon} />
            </Left>
            <Body>
              <Text>About</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => doLogout()}>
            <Left>
              <Icon name="log-out" style={styles.itemIcon} />
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
          {process.env.NODE_ENV === 'development' && (
            <ListItem icon selected={path === '/debug'} onPress={() => navigation.navigate('/debug')}>
              <Left>
                <Icon _name="information-circle" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Debug</Text>
              </Body>
            </ListItem>
          )}
          {process.env.NODE_ENV === 'development' && (
            <ListItem icon selected={path === '/draft'} onPress={() => navigation.navigate('/draft')}>
              <Left>
                <Icon _name="information-circle" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Draft</Text>
              </Body>
            </ListItem>
          )}
        </List>
      </Content>
    </Container>
  );
}

export default NavigationMenu;
