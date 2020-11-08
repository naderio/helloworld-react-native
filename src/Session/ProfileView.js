import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Spinner,
  Text,
  Icon,
  Button,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import { COLOR, STYLE } from '../common/styles';

import * as Interaction from '../Shared/Interaction';

import { fetchProfile } from '../Auth/state';

const styles = StyleSheet.create({
  header: {
    height: 200,
    paddingTop: 6,
  },
  fontSize: {
    fontSize: 16,
  },
  user_name: {
    marginTop: 10,
    color: COLOR.inverse,
  },
  card: {
    marginLeft: 36,
    marginRight: 36,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  avatar: {
    alignItems: 'center',
    padding: 8,
  },
  colorVerified: { color: COLOR.success },
  colorUnverified: { color: COLOR.off },
});

function ProfileView() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const processing = useSelector((state) => state.Activity.processing);
  const userAccount = useSelector((state) => state.Auth.userAccount);
  const userProfile = useSelector((state) => state.Auth.userProfile);

  React.useEffect(() => {
    dispatch(fetchProfile()).catch((error) => Interaction.toast({ type: Interaction.FAILURE, content: error.message }));
  }, [dispatch]);

  return (
    <Container>
      <Header span style={styles.header}>
        <View style={[STYLE.fit, STYLE.flex_center]}>
          <View style={styles.avatar}>
            <Thumbnail large resizeMode="cover" source={{ uri: userAccount.pictureUrl }} />
            <Text style={styles.user_name}>{userAccount.name}</Text>
          </View>
        </View>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            {processing ? <Spinner size="small" inverse /> : <Icon name="menu" />}
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>

      <Content padder>
        <Card transparent style={styles.card}>
          <CardItem>
            <Body>
              <Text style={styles.fontSize}>{userAccount.email}</Text>
              <Text note style={styles.fontSize}>
                Email
              </Text>
            </Body>

            {userAccount.emailVerified ? (
              <Icon name="ios-checkmark-circle-outline" style={styles.colorVerified} />
            ) : (
              <Icon name="ios-checkmark-circle-outline" style={styles.colorUnverified} />
            )}
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

export default ProfileView;
