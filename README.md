# react-native-simple-masonry-list
[![npm version](https://badge.fury.io/js/react-native-simple-masonry-list.svg)](https://badge.fury.io/js/react-native-simple-masonry-list)

A simple masonry list implementation for react native. It uses the item's height to place items. So all items must have height value.

## Installation

```sh
npm install react-native-simple-masonry-list
```

![Mar-05-2022 03-10-41](https://user-images.githubusercontent.com/17980230/156818651-c0f5ab3f-2612-43d8-8725-1d6e49a5ee45.gif)

## Usage

It requires data and renderItem props like FlatList.

```typescript
import MasonryList from 'react-native-simple-masonry-list';

// ...

<MasonryList
  data={images}
  renderItem={({item}) => <SomeComponent> ...</SomeComponent>}
  style={{flex: 1}}
/>

```

## Example

See [example](example/src/App.tsx). This example code get unsplash random images using [unsplash getting random photo api](https://unsplash.com/documentation#get-a-random-photo).  It gets random 30 images from Unsplash API. The MasonryList split these images into 2 (or 3) columns in order. The previous image is placed higher regardless of the column, and the image of the same vertical offset is aligned from left to right.

If you want to run the example you must create env.json file to example folder and provide Unsplash access key.

### Props

The props of the MasonryList extend the props of ScrollView. It is wrapped with a ScrollView container and all props values are used in the container except below values.

|             | necessary | types                                                     | default | info                                                |
| ----------- | --------- | --------------------------------------------------------- | ------- | --------------------------------------------------- |
| data        | V         | Array<T extends {height: number}>                         |         | Item list to show. All item must have height value. |
| renderItem  | V         | ({item: <T extends {height: number}>}) => React.ReactNode |         | render function of the item.                        |
| columnCount |           | 2 or 3                                                    | 2       | Column count of the list                            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
