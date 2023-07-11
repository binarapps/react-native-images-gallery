import {
  FlashList,
  FlashListProps,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import React, {
  useState,
  ReactNode,
  useCallback,
  useMemo,
  ReactElement,
} from 'react';
import {
  Dimensions,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ZoomableImage } from './ZoomableImage';

import { useToggle } from './hooks/useToggle';
import { ReText } from './components/ReText';

const { width, height } = Dimensions.get('screen');

export type GalleryImage = {
  uri: string;
  name?: string;
  type?: string;
  description?: string;
};

type optionalComponent<T> = {
  type: string;
  component: (item: T) => JSX.Element;
};

type FullScreenGalleryProps<T> = {
  optionalComponentsObject?: { [key: string]: (item: T) => ReactElement };
  images: T[];
  handleCloseGallery: () => void;
  additionalRightTopBarComponent?: ReactNode;
  bottomBarContent?: ReactNode;
  bottomBarDisabled?: boolean;
  topBarDisabled?: boolean;
  setCurrentIndex?: (index: number) => void;
  pressedImgIndex?: number;
  closeButtonComponent?: ReactNode;
  optionalComponents?: optionalComponent<T>[];
  bg?: {
    backgroundColor: string;
  };
};

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<any>>(FlashList);

export const Gallery = <T extends GalleryImage>({
  images,
  handleCloseGallery,
  additionalRightTopBarComponent,
  bottomBarContent,
  setCurrentIndex,
  pressedImgIndex,
  closeButtonComponent,
  bottomBarDisabled = false,
  topBarDisabled = false,
  bg,
  optionalComponentsObject = {},
}: FullScreenGalleryProps<T>) => {
  const [isOnlyImageMode, toggleImageMode] = useToggle(true);
  const { top, bottom } = useSafeAreaInsets();
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const currentSlide = useSharedValue('1');

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const xValue = event.contentOffset.x / width;
      const roundedValue = Math.round(xValue);
      currentSlide.value = (roundedValue + 1).toString();

      if (setCurrentIndex && xValue === roundedValue) {
        runOnJS(setCurrentIndex)(roundedValue);
      }
    },
    onBeginDrag: () => {
      runOnJS(setIsScrolling)(true);
    },
    onEndDrag: () => {
      runOnJS(setIsScrolling)(false);
    },
  });

  const handleSafeAreaTop = useMemo(() => {
    return { paddingTop: top + 11 };
  }, [top]);

  const renderTopBar = useMemo(
    () => (
      <View style={styles.barContainer}>
        <View
          style={[styles.barContentContainer, handleSafeAreaTop, helpers.pb12]}
        >
          <TouchableOpacity onPress={handleCloseGallery}>
            {closeButtonComponent ? (
              closeButtonComponent
            ) : (
              <View style={styles.closeButtonContainer}>
                <Text style={helpers.colorWhite}>Close</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.currentImageNumberChip}>
            <ReText
              text={currentSlide}
              style={[helpers.colorWhite, helpers.fonstSize20]}
            />
            <Text
              style={[
                helpers.colorWhite,
                helpers.fonstSize20,
                Platform.OS === 'ios' ? helpers.mx6 : helpers.mr7,
              ]}
            >
              /
            </Text>
            <Text style={[helpers.colorWhite, helpers.fonstSize20]}>
              {images.length}
            </Text>
          </View>
          {additionalRightTopBarComponent ? (
            additionalRightTopBarComponent
          ) : (
            <View style={helpers.width10percent} />
          )}
        </View>
      </View>
    ),
    [
      additionalRightTopBarComponent,
      closeButtonComponent,
      currentSlide,
      handleCloseGallery,
      handleSafeAreaTop,
      images.length,
    ]
  );

  const handleSafeAreaBottom = useMemo(() => {
    return { paddingBottom: bottom + 11 };
  }, [bottom]);

  const renderBottomBar = useMemo(() => {
    return (
      <View style={[styles.barContainer, helpers.bottom0]}>
        <View
          style={[
            styles.barContentContainer,
            handleSafeAreaBottom,
            helpers.pt12,
          ]}
        >
          {!!bottomBarContent && bottomBarContent}
        </View>
      </View>
    );
  }, [bottomBarContent, handleSafeAreaBottom]);

  const renderLoader = useMemo(() => {
    if (isLoading) {
      return (
        <View style={helpers.fullScreenCentered}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }

    return null;
  }, [isLoading]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<T>) => {
      if (item?.type) {
        const renderDifferentType = optionalComponentsObject[item.type];
        if (renderDifferentType) {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleImageMode}
              style={styles.imageModeWrapper}
            >
              {React.createElement(renderDifferentType, item)}
            </TouchableOpacity>
          );
        }
      }

      return (
        <ZoomableImage
          uri={item.uri}
          toggleImageMode={toggleImageMode}
          setIsZoomed={setIsZoomed}
          isZoomed={isZoomed}
          stopLoading={stopLoading}
          isScrolling={isScrolling}
        />
      );
    },
    [
      toggleImageMode,
      isZoomed,
      stopLoading,
      isScrolling,
      optionalComponentsObject,
    ]
  );
  const keyExtractor = useCallback((item: GalleryImage) => item.uri, []);

  return (
    <View style={[bg ? bg : styles.galleryBackground, helpers.flex1]}>
      {!topBarDisabled && isOnlyImageMode && renderTopBar}
      {renderLoader}

      <View style={styles.imagesList}>
        <AnimatedFlashList
          onScroll={scrollHandler}
          estimatedItemSize={width}
          data={images}
          horizontal
          extraData={{ isZoomed, isScrolling }}
          pagingEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialScrollIndex={pressedImgIndex}
          scrollEnabled={!isZoomed}
        />
      </View>

      {isOnlyImageMode && !bottomBarDisabled && renderBottomBar}
    </View>
  );
};

const styles = StyleSheet.create({
  galleryBackground: {
    backgroundColor: '#323232',
    flex: 1,
  },
  closeButtonContainer: {
    padding: 10,
    backgroundColor: 'rgba(225,225,225,0.2)',
    borderRadius: 10,
  },
  imagesList: {
    width,
    height,
  },
  barContainer: {
    zIndex: 20,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  barContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentImageNumberChip: {
    paddingHorizontal: 8,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
  },
  imageModeWrapper: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const helpers = StyleSheet.create({
  flex1: { flex: 1 },
  pt12: { paddingTop: 12 },
  pb12: { paddingBottom: 12 },
  mx6: { marginHorizontal: 6 },
  mr7: { marginRight: 7 },
  bottom0: { bottom: 0 },
  colorWhite: { color: 'white' },
  width10percent: { width: '10%' },
  fonstSize20: { fontSize: 20 },
  fullScreenCentered: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
