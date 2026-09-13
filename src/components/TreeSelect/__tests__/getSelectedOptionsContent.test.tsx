import * as React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {getSelectedOptionsContent} from '../utils';

type Item = {title: React.ReactNode};

const itemsById: Record<string, Item> = {
    id1: {title: 'title1'},
    id2: {title: 'title2'},
    id3: {title: <span>title3</span>},
};

const mapItemDataToContentProps = (item: Item) => item;

describe('TreeSelect getSelectedOptionsContent', () => {
    describe('default appearance', () => {
        test('empty value. Should return null', () => {
            const result = getSelectedOptionsContent(itemsById, [], mapItemDataToContentProps);

            expect(result).toBe(null);
        });

        test('string titles. Should return joined string', () => {
            const result = getSelectedOptionsContent(
                itemsById,
                ['id1', 'id2'],
                mapItemDataToContentProps,
            );

            expect(result).toBe('title1, title2');
        });

        test('item NOT presence. Should return empty content for it', () => {
            const result = getSelectedOptionsContent(
                itemsById,
                ['id1', 'unknown'],
                mapItemDataToContentProps,
            );

            expect(result).toBe('title1, ');
        });

        test('ReactNode title. Should render every title instead of stringifying it', () => {
            render(
                <div data-qa="content">
                    {getSelectedOptionsContent(
                        itemsById,
                        ['id1', 'id3'],
                        mapItemDataToContentProps,
                    )}
                </div>,
            );

            expect(screen.getByTestId('content')).toHaveTextContent('title1, title3');
        });
    });

    describe('renderSelectedOption callback', () => {
        test('item presence. Should be called with item data', () => {
            const renderSelectedOption = jest.fn(({id}) => id);

            getSelectedOptionsContent(
                itemsById,
                ['id1'],
                mapItemDataToContentProps,
                renderSelectedOption,
            );

            expect(renderSelectedOption).toHaveBeenCalledTimes(1);
            expect(renderSelectedOption).toHaveBeenCalledWith({id: 'id1', data: itemsById.id1}, 0);
        });

        test('item NOT presence. Should be called without data', () => {
            const renderSelectedOption = jest.fn(({id}) => id);

            getSelectedOptionsContent(
                itemsById,
                ['unknown'],
                mapItemDataToContentProps,
                renderSelectedOption,
            );

            expect(renderSelectedOption).toHaveBeenCalledTimes(1);
            expect(renderSelectedOption).toHaveBeenCalledWith({id: 'unknown', data: undefined}, 0);
        });

        test('Should render the callback result without adding separators', () => {
            render(
                <div data-qa="content">
                    {getSelectedOptionsContent(
                        itemsById,
                        ['id1', 'id3'],
                        mapItemDataToContentProps,
                        ({id}) => (
                            <span>[{id}]</span>
                        ),
                    )}
                </div>,
            );

            expect(screen.getByTestId('content')).toHaveTextContent('[id1][id3]');
        });
    });
});
