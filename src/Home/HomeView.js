import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Spinner,
  Text,
  Icon,
  Button,
  CardItem,
} from 'native-base';

import { FlatList } from 'react-native-gesture-handler';

import { STYLE } from '../common/styles';

import * as Interaction from '../Shared/Interaction';

import { fetchPosts } from './state';

function HomeView() {
  const dispatch = useDispatch();

  const processing = useSelector((state) => state.Activity.processingById[fetchPosts.ID] || false);
  const posts = useSelector((state) => state.Home.posts);

  const navigation = useNavigation();

  React.useEffect(() => {
    dispatch(fetchPosts()).catch((error) => Interaction.toast({ type: Interaction.FAILURE, content: error.message }));
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            {processing ? <Spinner size="small" inverse /> : <Icon name="menu" />}
          </Button>
        </Left>
        <Body>
          <Title>Posts Feed</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <FlatList
          contentContainerStyle={[STYLE.flex_grow, STYLE.padder]}
          // ListEmptyComponent={<DataEmpty icon="history" message="There are no posts yet!" />}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardItem key={item.id} button bordered>
              <Left>
                <Text>{item.title}</Text>
              </Left>
            </CardItem>
          )}
        />
      </Content>
    </Container>
  );
}

export default HomeView;
