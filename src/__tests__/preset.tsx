import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

interface ItemProps {
  testID?: string;
  value: string;
  height: number;
}

const heights = [50, 60, 70, 100, 130, 200, 500];

export function getRandomData(len: number = 50): Array<ItemProps> {
  return new Array(len).fill(null).map((_) => {
    const height = heights[Math.floor(Math.random() * heights.length)];
    return {
      value: `height: ${height}`,
      height: height,
    };
  });
}

export const ItemView: React.FC<ItemProps> = ({ value, height, testID }) => {
  return (
    <View testID={testID} style={[styles.itemContainer, { height }]}>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
