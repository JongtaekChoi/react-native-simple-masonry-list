import * as React from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UnsplashImage, getImages } from './utils';

import MasonryList from 'react-native-simple-masonry-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ImageList() {
  const insets = useSafeAreaInsets();
  const itemWidth = Dimensions.get('screen').width / 2 - 20;
  const [images, setImages] = React.useState<
    Array<{ image: UnsplashImage; height: number }>
  >([]);

  React.useEffect(() => {
    getImages().then((imageList) => {
      setImages(
        imageList.map((image) => ({
          image,
          height: (itemWidth * image.height) / image.width + 24,
        }))
      );
    });
  }, [itemWidth]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MasonryList
        style={styles.masonryList}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        data={images}
        columnCount={2}
        renderItem={({ item: { image }, index }) => (
          <View style={styles.itemContainer} key={`${image.id}-${index}`}>
            <Image
              source={{ uri: image.urls.small }}
              style={{
                width: itemWidth,
                height: Math.round((itemWidth * image.height) / image.width),
              }}
            />
            <TouchableOpacity style={styles.textContainer}>
              <Text
                style={{ maxWidth: itemWidth }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Author: {image.user.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  masonryList: {
    flex: 1,
    width: '100%',
  },
  itemContainer: {
    marginTop: 4,
  },
  textContainer: {
    height: 20,
  },
});
