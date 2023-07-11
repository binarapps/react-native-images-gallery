import React from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import { dataWithImages } from '../mockedData';

import Gallery from '@binarapps/react-native-images-gallery';

const { width, height } = Dimensions.get('screen');

export function ImagesGalery({ onCloseGalery }: { onCloseGalery: () => void }) {
  return (
    <Gallery
      bg={styles.bgColor}
      handleCloseGallery={onCloseGalery}
      images={dataWithImages}
      bottomBarDisabled
    />
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
