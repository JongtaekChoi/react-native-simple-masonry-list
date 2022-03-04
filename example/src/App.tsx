import * as React from 'react';

import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MasonryList from 'react-native-simple-masonry-list';
import { UNSPLASH_ACCESS_KEY } from '../env.json';

interface UnsplashImage {
  id: string;
  width: number;
  height: number;

  urls: {
    small: string;
  };
  user: {
    name: string;
  };
}

async function fetchUnsplash(
  path: string,
  params: Record<string, string | number> = {}
): Promise<UnsplashImage[]> {
  const paramsString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return fetch(encodeURI(`https://api.unsplash.com/${path}?${paramsString}`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error(`Fetch failed with code ${response.status}.`);
  });
}

export default function App() {
  const itemWidth = Dimensions.get('screen').width / 2 - 20;
  const [images, setImages] = React.useState<
    Array<{ image: UnsplashImage; height: number }>
  >([]);

  React.useEffect(() => {
    fetchUnsplash('photos/random', { count: 30 }).then((result) => {
      setImages(
        result.map((image) => ({
          image,
          height: (itemWidth * image.height) / image.width + 24,
        }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MasonryList
        style={styles.masonryList}
        data={images}
        columnCount={2}
        renderItem={({ item: { image } }) => (
          <View style={styles.itemContainer} key={image.id}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  masonryList: {
    width: '100%',
  },
  itemContainer: {
    marginTop: 4,
  },
  textContainer: {
    height: 20,
  },
});
