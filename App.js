import React from 'react';
import { View, Text, Button, Image, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

const LogoTitle = () =>
  <Image
    source={{uri: 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c529.png'}}
    style={{width: 50, height: 30}}
  />

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="info"
        coloe="black"
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigate('Details', {
            itemId: 86,
            otherParam: 'Anything you want'
          })}
        />
        <Button
          title='Open Modal'
          onPress={() => navigate('Modal')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'details'
  // }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.itemId : 'Details'
    }
  }

  render() {
    const { navigate, goBack, setParams } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null
    const otherParam = params ? params.otherParam : null

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details Screen again"
          onPress={() => navigate('Details')}
        />
        <Button
          title="Go Back"
          onPress={() => goBack()}
        />
        <Button
          title="Update the title"
          onPress={() => setParams({ itemId: 93 })}
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    const { navigate, goBack } = this.props.navigation

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar hidden={true} />
        <Text style={{ fontSize: 30}}>This is a modal!</Text>
        <Button
          onPress={() => goBack(null)}
          title="Dismiss"
        />
        <Button
          onPress={() => navigate('ModalDetails')}
          title="go next!"
        />
      </View>
    )
  }
}

class ModalDetailsScreen extends React.Component {
  render() {
    const { navigate, goBack } = this.props.navigation

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 30}}>This is a modal details!</Text>
        <Button
          onPress={() => navigate('ModalDetails')}
          title="go next!"
        />
      </View>
    )
  }
}

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      gestureResponseDistance: {
        horizontal: 100
      }
    })
  }
)

const ModalStack = StackNavigator(
  {
    Main: {
      screen: ModalScreen
    },
    ModalDetails: {
      screen: ModalDetailsScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      gestureResponseDistance: {
        horizontal: 100,
        vertical: 500
      }
    }),
    headerMode: 'none'
  }
)

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Modal: {
      screen: ModalStack
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
