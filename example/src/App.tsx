import React, { useMemo, useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { ImagesGalery } from './galeries/ImagesGalery';
import { ContentGalery } from './galeries/ContentGalery';

const { width, height } = Dimensions.get('screen');

export default function App() {
  const [galeryOpenType, setGaleryOpenType] = useState<
    'none' | 'images' | 'mixed'
  >('none');

  const renderGalery = useMemo(() => {
    if (galeryOpenType === 'images') {
      return <ImagesGalery onCloseGalery={() => setGaleryOpenType('none')} />;
    }
    if (galeryOpenType === 'mixed') {
      return <ContentGalery onCloseGalery={() => setGaleryOpenType('none')} />;
    }
    return null;
  }, [galeryOpenType]);

  const renderButtons = useMemo(() => {
    if (galeryOpenType === 'none') {
      return (
        <>
          <TouchableOpacity onPress={() => setGaleryOpenType('images')}>
            <Text>Open Images Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGaleryOpenType('mixed')}>
            <Text>Open Mixed Gallery</Text>
          </TouchableOpacity>
        </>
      );
    }
    return null;
  }, [galeryOpenType]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {renderGalery}
        {renderButtons}
      </View>
    </SafeAreaProvider>
  );
}

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
