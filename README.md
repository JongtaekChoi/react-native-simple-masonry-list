# react-native-simple-masonry-list

A simple masonry list implementation for react native. It uses the item's height to place items. So all items must have height value.

## Installation

```sh
npm install react-native-simple-masonry-list
```

![Mar-05-2022 03-10-41](https://user-images.githubusercontent.com/17980230/156818651-c0f5ab3f-2612-43d8-8725-1d6e49a5ee45.gif)

## Usage

See [example](example/src/App.tsx)

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
