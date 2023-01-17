import React, { useCallback } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { data } from './mockedData';

import Gallery, { GalleryImage } from '@binarapps/react-native-images-gallery';

const { width, height } = Dimensions.get('screen');

export default function App() {
  const [isGalleryVisible, setIsGalleryVisible] =
    React.useState<boolean>(false);

  const video = React.useRef(null);

  const renderVideo = useCallback(
    ({ uri }: GalleryImage): JSX.Element => (
      <View style={styles.videoBox}>
        <TouchableHighlight>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        </TouchableHighlight>
      </View>
    ),
    []
  );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {isGalleryVisible && (
          <Gallery
            bg={styles.bgColor}
            handleCloseGallery={() => setIsGalleryVisible(false)}
            images={data}
            bottomBarDisabled
            optionalComponentsObject={{
              video: renderVideo,
              card: Card,
            }}
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

const Card = ({
  content,
  name,
  uri,
}: GalleryImage & { content?: string }): JSX.Element => {
  const [isTextMode, setIsTextMode] = React.useState<boolean>(true);

  return (
    <View style={styles.card}>
      {isTextMode ? (
        <>
          <Text style={styles.cardHeaderText}>{name}</Text>
          <View style={styles.contentWrapper}>
            <Image source={{ uri }} style={styles.smallPicture} />
            <Text>{content}</Text>
          </View>
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => setIsTextMode(false)}
          >
            <Text style={styles.blueButtonText}>Press me</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => setIsTextMode(true)}
          style={styles.bigPictureWrapper}
        >
          <Image source={{ uri }} style={styles.bigPicture} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bgColor: { backgroundColor: 'black' },
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
  videoBox: {
    width,
    height,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  cardHeaderText: { fontSize: 20, fontWeight: 'bold' },
  video: { width, height: height * 0.6, marginTop: 30 },
  contentWrapper: { width: '100%' },
  smallPicture: {
    width: '100%',
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
  },
  blueButton: { backgroundColor: 'blue', padding: 10 },
  blueButtonText: { color: 'white' },
  bigPictureWrapper: { width: '100%' },
  bigPicture: {
    width: '100%',
    height: '100%',
    marginBottom: 5,
    borderRadius: 10,
  },
});
