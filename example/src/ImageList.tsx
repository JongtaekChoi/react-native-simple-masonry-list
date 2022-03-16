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
import Token from './Token';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ImageList() {
  const insets = useSafeAreaInsets();
  const columnCount = 3;
  const itemCountVariation = [50, 200, 1000];
  const itemWidth = Dimensions.get('screen').width / columnCount - 20;
  const [images, setImages] = React.useState<
    Array<{ image: UnsplashImage; height: number }>
  >([]);
  const [itemCount, setItemCount] = React.useState(50);

  React.useEffect(() => {
    getImages(itemCount).then((imageList) => {
      setImages(
        imageList.map((image) => ({
          image,
          height: (itemWidth * image.height) / image.width + 24,
        }))
      );
    });
  }, [itemWidth, itemCount]);

  console.log(itemCount);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text>Column count : {columnCount}</Text>
        <View style={styles.selectItemCount}>
          <Text>Item count : </Text>
          {itemCountVariation.map((count) => (
            <Token
              key={`${count}`}
              isActive={itemCount === count}
              onPress={() => setItemCount(count)}
            >
              {count}
            </Token>
          ))}
        </View>
      </View>
      <MasonryList
        style={styles.masonryList}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        data={images}
        columnCount={columnCount}
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
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectItemCount: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
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
