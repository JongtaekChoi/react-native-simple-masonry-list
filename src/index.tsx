import React, { useMemo } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface Props<T extends { height?: number }>
  extends Omit<ScrollViewProps, 'children'> {
  columnCount?: 2 | 3;
  data: Array<T>;
  renderItem(props: {
    item: T;
    index: number;
    columnIndex: number;
  }): React.ReactNode;
  columnViewStyle?: ViewStyle | ((columnIndex: number) => ViewStyle);
}

function MasonryList<T extends { height: number }>(
  props: Props<T>
): React.ReactElement {
  const {
    columnCount = 2,
    data,
    renderItem,
    columnViewStyle,
    ...scrollViewProps
  } = props;

  const splitData = useMemo(() => {
    const offsets = new Array(columnCount).fill(0);
    const newSplitData: Array<Array<{ item: T; index: number }>> = new Array(
      columnCount
    )
      .fill(0)
      .map(() => []);
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const minOffset = offsets.reduce((minValue, currentValue) =>
        minValue > currentValue ? currentValue : minValue
      );
      const minOffsetIndex = offsets.findIndex((value) => value === minOffset);
      newSplitData[minOffsetIndex].push({ item, index: i });
      offsets[minOffsetIndex] += item.height ?? 1;
    }
    return newSplitData;
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
      {splitData?.map((items, columnIndex) => {
        return (
          <View
            key={`column-${columnIndex}`}
            style={[
              styles.column,
              typeof columnViewStyle === 'function'
                ? columnViewStyle(columnIndex)
                : columnViewStyle,
            ]}
          >
            {items.map(({ item, index }) =>
              renderItem({ item, index, columnIndex })
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
