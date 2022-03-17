# react-native-simple-masonry-list

[![npm version](https://badge.fury.io/js/react-native-simple-masonry-list.svg)](https://badge.fury.io/js/react-native-simple-masonry-list)

A simple masonry list implementation for react native. It uses the item's height to place items. If the item has a vertical margin then the margin value must be added to the height value.

<img src="https://user-images.githubusercontent.com/17980230/158784811-e467ee11-5a8b-4a1c-86ad-f7a91fe62297.gif" width="200"/>

## Placement problem

If the user does not provide height values then the items will be placed just left to right and top to bottom by order. It may cause unbalanced column height and if it has more items, the height imbalance increases the probability. The below example show this. So it is recommended to fill the height of all items.

<img src="https://user-images.githubusercontent.com/17980230/158781600-6905ff72-7f86-4e00-afc0-ff6f7b7de327.gif" width="200"/>

## Installation

```sh
npm install react-native-simple-masonry-list
```

## Usage

It requires data and renderItem props like FlatList.

```typescript
import MasonryList from 'react-native-simple-masonry-list';

// ...

<MasonryList
  data={images}
  renderItem={({ item }) => <SomeComponent> ...</SomeComponent>}
  style={{ flex: 1 }}
/>;
```

## Example

See [example](example/src/App.tsx). This example code get unsplash random images using [unsplash getting random photo api](https://unsplash.com/documentation#get-a-random-photo). It gets random 30 images from Unsplash API. The MasonryList split these images into 2 (or 3) columns in order. The previous image is placed higher regardless of the column, and the image of the same vertical offset is aligned from left to right.

If you want to run the example you must create env.json file to example folder and provide Unsplash access key.

### Props

The props of the MasonryList extend the props of ScrollView. It is wrapped with a ScrollView container and all props values are used in the container except below values.

|                 | necessary | types                                                                                          | default   | info                              |
| --------------- | --------- | ---------------------------------------------------------------------------------------------- | --------- | --------------------------------- |
| data            | V         | Array<T extends {height?: number}>                                                             |           | Item list to display.             |
| renderItem      | V         | ({item: <T extends {height?: number}>, index: number, columnIndex: number}) => React.ReactNode |           | render function of the item.      |
| columnCount     |           | number                                                                                         | 2         | Column count of the list          |
| columnViewStyle |           | ViewStyle \| (columnIndex: number) => ViewStyle                                                | undefined | The style of each colum container |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Next TODO

It uses ScrollView internally. So, it renders all items even if it has a huge count of items. So it may occur performance issue.

![Mar-17-2022 19-07-23](https://user-images.githubusercontent.com/17980230/158786418-874adce9-7853-4953-8bd7-ae776ec0c56a.gif)

In this example, you can see that adding more items takes up more time and memory when rendering.

## License

MIT
