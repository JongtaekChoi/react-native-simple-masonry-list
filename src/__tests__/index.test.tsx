import { ItemView, getRandomData } from './preset';

import MasonryList from '../';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('MasonryList', () => {
  it('renders without errors', () => {
    const data = getRandomData();

    const { getByTestId, toJSON } = render(
      <MasonryList
        testID="MasonryList"
        data={data}
        renderItem={({ item, index }) => {
          console.log(index);
          return (
            <ItemView
              testID={`item-${index}`}
              value={`${item.value}-${index}`}
              height={item.height}
              key={`${index}`}
            />
          );
        }}
      />
    );

    getByTestId(`item-${data.length - 1}`);
    expect(toJSON()).toMatchSnapshot();
  });
});
