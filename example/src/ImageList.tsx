import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Profiler, useCallback, useEffect, useRef } from 'react';
import { UnsplashImage, getImages } from './utils';

import MasonryList from 'react-native-simple-masonry-list';
import Token from './Token';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const itemCountVariation = [50, 200, 1000, 3000];
const columnCountVariation = [2, 3] as const;
const DEFAULT_ITEM_COUNT = 50;

export default function ImageList() {
  const insets = useSafeAreaInsets();
  const [columnCount, setColumnCount] = React.useState<2 | 3>(2);

  const itemWidth = Dimensions.get('screen').width / columnCount - 20;
  const itemCount = useRef(50);

  const renderingTimeRef = useRef(0);
  const [renderingTime, setRenderingTime] = React.useState(
    renderingTimeRef.current
  );

  const [images, setImages] = React.useState<
    Array<{ image: UnsplashImage; height: number }>
  >([]);

  const changeItemCount = useCallback(
    (count: number) => {
      getImages(count).then((imageList) => {
        itemCount.current = count;
        const items = imageList.map((image) => ({
          image,
          height: (itemWidth * image.height) / image.width + 24,
        }));
        setImages(items);
      });
    },
    [itemWidth]
  );

  const onRender = useCallback((_, __, actualDuration) => {
    renderingTimeRef.current = Math.round(actualDuration);
  }, []);

  useEffect(() => {
    changeItemCount(DEFAULT_ITEM_COUNT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRenderingTime(renderingTimeRef.current);
  }, [images]);

  console.log(new Date());

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerColumn}>
          <Text style={styles.headerColumnTitle}>Column count</Text>
          <View style={styles.tokensContainer}>
            {columnCountVariation.map((count) => (
              <Token
                key={`column-count-${count}`}
                isActive={columnCount === count}
                onPress={() => setColumnCount(count)}
              >
                {count}
              </Token>
            ))}
          </View>
        </View>
        <View style={styles.headerColumnLine} />
        <View style={styles.headerColumn}>
          <Text style={styles.headerColumnTitle}>Item count</Text>
          <View style={styles.tokensContainer}>
            {itemCountVariation.map((count) => (
              <Token
                key={`${count}`}
                isActive={itemCount.current === count}
                onPress={() => changeItemCount(count)}
              >
                {count}
              </Token>
            ))}
          </View>
        </View>
        <View style={styles.headerColumnLine} />

        <View style={[styles.headerColumn, styles.durationValueTitle]}>
          <Text style={styles.headerColumnTitle} numberOfLines={2}>
            Rendering Duration
          </Text>
          <Text>{renderingTime} ms</Text>
        </View>
      </View>
      <Profiler id="masonryList" onRender={onRender}>
        <MasonryList
          style={styles.masonryList}
          contentContainerStyle={[
            { paddingBottom: insets.bottom },
            styles.masonryListContent,
          ]}
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
      </Profiler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerColumn: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  headerColumnLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
  },
  headerColumnTitle: {
    width: '100%',
    textAlign: 'center',
  },
  durationValueTitle: {
    flex: 1,
  },
  tokensContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  masonryList: {
    flex: 1,
    width: '100%',
  },
  masonryListContent: {
    paddingHorizontal: 5,
  },
  itemContainer: {
    marginTop: 4,
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    height: 20,
  },
});
