import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import ImageList from './ImageList';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <ImageList />
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
