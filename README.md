# @binarapps/react-native-images-gallery

images gallery component

![hippo](https://thumbs.gfycat.com/BouncyShabbyDoctorfish-max-1mb.gif)
![hippo](https://thumbs.gfycat.com/FrightenedHighAsiansmallclawedotter-max-1mb.gif)
![hippo](https://thumbs.gfycat.com/GrotesqueUnawareGrassspider-max-1mb.gif)

## Installation

### via Yarn

```sh
yarn add react-native-gesture-handler@2.5.0 @shopify/flash-list@1.1.0 react-native-reanimated@2.9.1 react-native-redash@18.1.0 react-native-safe-area-context@4.3.1
```

```sh
yarn add @binarapps/react-native-images-gallery
```

### via npm

```sh
npm install react-native-gesture-handler@2.5.0 @shopify/flash-list@1.1.0 react-native-reanimated@2.9.1 react-native-redash@18.1.0 react-native-safe-area-context@4.3.1
```

```sh
npm install @binarapps/react-native-images-gallery
```

### Add Reanimated's Babel plugin to your babel.config.js:

```js
  module.exports = {
    presets: [
      ...
    ],
    plugins: [
      ...
      'react-native-reanimated/plugin',
    ],
  };
```

### Wrap your app with SafeAreaProvider

```js
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return <SafeAreaProvider>...</SafeAreaProvider>;
}
```

## Example Usage

```js
import * as React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Gallery from '@binarapps/react-native-images-gallery';

export default function App() {
  const [isGalleryVisible, setIsGalleryVisible] = React.useState(false);

  const images = [
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      name: 'name',
      description: 'string',
    },
    {
      uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'name',
      description: 'string',
    },
  ];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {isGalleryVisible && (
          <Gallery
            handleCloseGallery={() => setIsGalleryVisible(false)}
            images={images}
          />
        )}
        {!isGalleryVisible && (
          <TouchableOpacity onPress={() => setIsGalleryVisible(true)}>
            <Text>Open Gallery</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
```

## Troubleshooting

### Cannot convert undefined or null to Object in JavaScript

Change node version to v16.18.0
https://apple.stackexchange.com/questions/171530/how-do-i-downgrade-node-or-install-a-specific-previous-version-using-homebrew

## Contributors

- [Damian Pi??tka](https://www.github.com/oscris1) - @oscris1
- [Mateusz Rostkowski](https://www.github.com/MateuszRostkowski) - @MateuszRostkowski

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
