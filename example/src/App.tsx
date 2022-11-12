import * as React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Gallery from '@binarapps/react-native-images-gallery';

export default function App() {
  const [isGalleryVisible, setIsGalleryVisible] =
    React.useState<boolean>(false);

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
