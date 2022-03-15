import React, { useEffect, useState } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';

interface Props<T extends { height: number }>
  extends Omit<ScrollViewProps, 'children'> {
  columnCount?: 2 | 3;
  data: Array<T>;
  renderItem(props: { item: T; index: number }): React.ReactNode;
}

function MasonryList<T extends { height: number }>(
  props: Props<T>
): React.ReactElement {
  const { columnCount = 2, data, renderItem, ...scrollViewProps } = props;
  const [splitData, setSplitData] = useState<Array<Array<T>>>();

  useEffect(() => {
    const offsets = new Array(columnCount).fill(0);
    const newSplitData: Array<Array<T>> = new Array(columnCount)
      .fill(0)
      .map(() => []);
    for (let item of data) {
      const minOffset = offsets.reduce((minValue, currentValue) =>
        minValue > currentValue ? currentValue : minValue
      );
      const minOffsetIndex = offsets.findIndex((value) => value === minOffset);
      newSplitData[minOffsetIndex].push(item);
      offsets[minOffsetIndex] += item.height;
    }
    setSplitData(newSplitData);
  }, [data, columnCount]);

  return (
    <ScrollView
      {...scrollViewProps}
      style={[styles.container, scrollViewProps.style]}
      contentContainerStyle={[
        styles.contentContainer,
        scrollViewProps.contentContainerStyle,
      ]}
    >
      {splitData?.map((items, index) => {
        return (
          <View
            key={`column-${index}`}
            style={[styles.column, { marginLeft: index && 5 }]}
          >
            {items.map((item, itemIndex) =>
              renderItem({ item, index: itemIndex })
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: { flexDirection: 'row', justifyContent: 'center' },
  column: { flex: 1, alignItems: 'center' },
});

export default MasonryList;
