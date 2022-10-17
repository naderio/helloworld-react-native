# Hello World

## Preview

- [Android](https://appetize.io/app/@{APPETIZE_ANDROID_ID}?device=nexus5&scale=75&orientation=portrait&osVersion=7.1)
- [iOS](https://appetize.io/app/@{APPETIZE_IOS_ID}?device=iphone6s&scale=75&orientation=portrait&osVersion=11.1)

## References

- [API Specifications/Documentation](https://starterspecapi.docs.apiary.io/)
- [Documentation](./docs)
- [Guidelines](https://github.com/naderio/helloworld-dev/tree/master/docs/guidelines)

## Technology

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [React Native](https://facebook.github.io/react-native/)
- [NativeBase](https://nativebase.io/)
- [React Navigation](https://reactnavigation.org/)

## Requirements

- [Node.js](https://nodejs.org/)
- [React Native CLI](https://www.npmjs.com/package/react-native-cli)
- Xcode Command Line tools (`xcode-select --install`)
- [CocoaPods](https://cocoapods.org/) (`gem install cocoapods`)
- [xcpretty](https://github.com/supermarin/xcpretty) (`gem install xcpretty`)
- [Bash v4](http://tldp.org/LDP/abs/html/bashver4.html) (default on GNU/Linux, `brew install bash` on macOS)

## Usage

```sh
# install dependencies
npm install

# run bundler
npm start

# run on Android device/emulator
npm run android

# run on iOS device/simulator
npm run ios

# run tests
npm run test

# lint code
npm run lint

# format code
npm run format
```

## Debugging

From DevTools

```javascript
// use logger
Logger.debug('Hello World!');

// check if there is an authenticated session
AuthService.isAuthenticated();

// get state from Redux store
$store.getState().MyModule.myField;

// dispatch action from Redux store
$store.dispatch($state.MyModule.$myAction(/* args */));
```
