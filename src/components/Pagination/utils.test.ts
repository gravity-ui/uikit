import * as warnModule from '../utils/warn';

import type {ButtonItem, PageItem} from './types';
import {buildComponentProps, getNumerationList, getSize, getViews} from './utils';

const warnOnceMock = jest.spyOn(warnModule, 'warnOnce').mockImplementation(() => {});

describe('Pagination utils', () => {
    describe('[desktop]: getNumerationList', () => {
        it('1 page when number of pages 1', () => {
            expect(getNumerationList({page: 1, numberOfPages: 1, mobile: false})).toEqual([1]);
        });
        it('2 siblings pages when number of pages 2', () => {
            expect(getNumerationList({page: 1, numberOfPages: 2, mobile: false})).toEqual([1, 2]);
            expect(getNumerationList({page: 2, numberOfPages: 2, mobile: false})).toEqual([1, 2]);
        });
        it('3 siblings pages when number of pages 3', () => {
            expect(getNumerationList({page: 1, numberOfPages: 3, mobile: false})).toEqual([
                1, 2, 3,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 3, mobile: false})).toEqual([
                1, 2, 3,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 3, mobile: false})).toEqual([
                1, 2, 3,
            ]);
        });
        it('4 siblings pages when number of pages 4', () => {
            expect(getNumerationList({page: 1, numberOfPages: 4, mobile: false})).toEqual([
                1, 2, 3, 4,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 4, mobile: false})).toEqual([
                1, 2, 3, 4,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 4, mobile: false})).toEqual([
                1, 2, 3, 4,
            ]);
            expect(getNumerationList({page: 4, numberOfPages: 4, mobile: false})).toEqual([
                1, 2, 3, 4,
            ]);
        });
        it('3 siblings pages, ellipsis and last page when number of pages 5', () => {
            expect(getNumerationList({page: 1, numberOfPages: 5, mobile: false})).toEqual([
                1,
                2,
                3,
                'ellipsis',
                5,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 5, mobile: false})).toEqual([
                1,
                2,
                3,
                'ellipsis',
                5,
            ]);
        });
        it('4 siblings pages when number of pages 5', () => {
            expect(getNumerationList({page: 3, numberOfPages: 5, mobile: false})).toEqual([
                2, 3, 4, 5,
            ]);
            expect(getNumerationList({page: 4, numberOfPages: 5, mobile: false})).toEqual([
                2, 3, 4, 5,
            ]);
            expect(getNumerationList({page: 5, numberOfPages: 5, mobile: false})).toEqual([
                2, 3, 4, 5,
            ]);
        });
        it('3 siblings pages, ellipsis and last page when number of pages 6', () => {
            expect(getNumerationList({page: 1, numberOfPages: 6, mobile: false})).toEqual([
                1,
                2,
                3,
                'ellipsis',
                6,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 6, mobile: false})).toEqual([
                1,
                2,
                3,
                'ellipsis',
                6,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 6, mobile: false})).toEqual([
                2,
                3,
                4,
                'ellipsis',
                6,
            ]);
        });
        it('4 siblings pages when number of pages 6', () => {
            expect(getNumerationList({page: 4, numberOfPages: 6, mobile: false})).toEqual([
                3, 4, 5, 6,
            ]);
            expect(getNumerationList({page: 5, numberOfPages: 6, mobile: false})).toEqual([
                3, 4, 5, 6,
            ]);
            expect(getNumerationList({page: 6, numberOfPages: 6, mobile: false})).toEqual([
                3, 4, 5, 6,
            ]);
        });
        it('3 siblings pages, ellipsis and last page when number of pages 10', () => {
            expect(getNumerationList({page: 1, numberOfPages: 10, mobile: false})).toEqual([
                1,
                2,
                3,
                'ellipsis',
                10,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 10, mobile: false})).toEqual([
                1,
                2,
                3,
                'ellipsis',
                10,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 10, mobile: false})).toEqual([
                2,
                3,
                4,
                'ellipsis',
                10,
            ]);
            expect(getNumerationList({page: 4, numberOfPages: 10, mobile: false})).toEqual([
                3,
                4,
                5,
                'ellipsis',
                10,
            ]);
            expect(getNumerationList({page: 5, numberOfPages: 10, mobile: false})).toEqual([
                4,
                5,
                6,
                'ellipsis',
                10,
            ]);
            expect(getNumerationList({page: 6, numberOfPages: 10, mobile: false})).toEqual([
                5,
                6,
                7,
                'ellipsis',
                10,
            ]);
            expect(getNumerationList({page: 7, numberOfPages: 10, mobile: false})).toEqual([
                6,
                7,
                8,
                'ellipsis',
                10,
            ]);
        });
        it('4 siblings pages when number of pages 10', () => {
            expect(getNumerationList({page: 8, numberOfPages: 10, mobile: false})).toEqual([
                7, 8, 9, 10,
            ]);
            expect(getNumerationList({page: 9, numberOfPages: 10, mobile: false})).toEqual([
                7, 8, 9, 10,
            ]);
            expect(getNumerationList({page: 10, numberOfPages: 10, mobile: false})).toEqual([
                7, 8, 9, 10,
            ]);
        });
    });

    describe('[mobile]: getNumerationList', () => {
        it('1 page when number of pages 1', () => {
            expect(getNumerationList({page: 1, numberOfPages: 1, mobile: true})).toEqual([
                1,
                'pageOf',
                1,
            ]);
        });
        it('1 page, pageOf and last page when number of pages 2', () => {
            expect(getNumerationList({page: 1, numberOfPages: 2, mobile: true})).toEqual([
                1,
                'pageOf',
                2,
            ]);
        });
        it('1 page when number of pages 2', () => {
            expect(getNumerationList({page: 2, numberOfPages: 2, mobile: true})).toEqual([
                2,
                'pageOf',
                2,
            ]);
        });
        it('1 page, pageOf and last page when number of pages 3', () => {
            expect(getNumerationList({page: 1, numberOfPages: 3, mobile: true})).toEqual([
                1,
                'pageOf',
                3,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 3, mobile: true})).toEqual([
                2,
                'pageOf',
                3,
            ]);
        });
        it('1 page when number of pages 3', () => {
            expect(getNumerationList({page: 3, numberOfPages: 3, mobile: true})).toEqual([
                3,
                'pageOf',
                3,
            ]);
        });
        it('1 page, pageOf and last page when number of pages 4', () => {
            expect(getNumerationList({page: 1, numberOfPages: 4, mobile: true})).toEqual([
                1,
                'pageOf',
                4,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 4, mobile: true})).toEqual([
                2,
                'pageOf',
                4,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 4, mobile: true})).toEqual([
                3,
                'pageOf',
                4,
            ]);
        });
        it('1 page when number of pages 4', () => {
            expect(getNumerationList({page: 4, numberOfPages: 4, mobile: true})).toEqual([
                4,
                'pageOf',
                4,
            ]);
        });
        it('1 page, pageOf and last page when number of pages 5', () => {
            expect(getNumerationList({page: 1, numberOfPages: 5, mobile: true})).toEqual([
                1,
                'pageOf',
                5,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 5, mobile: true})).toEqual([
                2,
                'pageOf',
                5,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 5, mobile: true})).toEqual([
                3,
                'pageOf',
                5,
            ]);
            expect(getNumerationList({page: 4, numberOfPages: 5, mobile: true})).toEqual([
                4,
                'pageOf',
                5,
            ]);
        });
        it('1 page when number of pages 5', () => {
            expect(getNumerationList({page: 5, numberOfPages: 5, mobile: true})).toEqual([
                5,
                'pageOf',
                5,
            ]);
        });
        it('1 page, pageOf and last page when number of pages 6', () => {
            expect(getNumerationList({page: 1, numberOfPages: 6, mobile: true})).toEqual([
                1,
                'pageOf',
                6,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 6, mobile: true})).toEqual([
                2,
                'pageOf',
                6,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 6, mobile: true})).toEqual([
                3,
                'pageOf',
                6,
            ]);
            expect(getNumerationList({page: 4, numberOfPages: 6, mobile: true})).toEqual([
                4,
                'pageOf',
                6,
            ]);
            expect(getNumerationList({page: 5, numberOfPages: 6, mobile: true})).toEqual([
                5,
                'pageOf',
                6,
            ]);
        });
        it('1 page when number of pages 6', () => {
            expect(getNumerationList({page: 6, numberOfPages: 6, mobile: true})).toEqual([
                6,
                'pageOf',
                6,
            ]);
        });
        it('1 page, pageOf and last page when number of pages 10', () => {
            expect(getNumerationList({page: 1, numberOfPages: 10, mobile: true})).toEqual([
                1,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 2, numberOfPages: 10, mobile: true})).toEqual([
                2,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 3, numberOfPages: 10, mobile: true})).toEqual([
                3,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 4, numberOfPages: 10, mobile: true})).toEqual([
                4,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 5, numberOfPages: 10, mobile: true})).toEqual([
                5,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 6, numberOfPages: 10, mobile: true})).toEqual([
                6,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 7, numberOfPages: 10, mobile: true})).toEqual([
                7,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 8, numberOfPages: 10, mobile: true})).toEqual([
                8,
                'pageOf',
                10,
            ]);
            expect(getNumerationList({page: 9, numberOfPages: 10, mobile: true})).toEqual([
                9,
                'pageOf',
                10,
            ]);
        });
        it('1 page when number of pages 10', () => {
            expect(getNumerationList({page: 10, numberOfPages: 10, mobile: true})).toEqual([
                10,
                'pageOf',
                10,
            ]);
        });
    });

    describe('[desktop]: getSize', () => {
        it('without size  prop', () => {
            expect(getSize({mobile: false})).toEqual('m');
        });
        it('size prop is accounted', () => {
            expect(getSize({mobile: false, propSize: 'l'})).toEqual('l');
        });
    });

    describe('[mobile]: getSize', () => {
        it('without size  prop', () => {
            expect(getSize({mobile: true})).toEqual('l');
        });
        it('size prop is accounted', () => {
            expect(getSize({mobile: false, propSize: 'm'})).toEqual('m');
        });
    });

    describe('[desktop]: getViews', () => {
        it('clear view', () => {
            expect(getViews({propView: 'clear', mobile: false})).toEqual({
                buttonView: 'flat',
                inputView: 'normal',
                pageSizerView: 'clear',
            });
        });
        it('outlined view', () => {
            expect(getViews({propView: 'outlined', mobile: false})).toEqual({
                buttonView: 'outlined',
                inputView: 'normal',
                pageSizerView: 'normal',
            });
        });
    });

    describe('[mobile]: getViews', () => {
        it('clear view', () => {
            expect(getViews({propView: 'clear', mobile: true})).toEqual({
                buttonView: 'flat',
                inputView: 'clear',
                pageSizerView: 'clear',
            });
        });
        it('outlined view', () => {
            expect(getViews({propView: 'outlined', mobile: true})).toEqual({
                buttonView: 'outlined',
                inputView: 'normal',
                pageSizerView: 'normal',
            });
        });
    });

    describe('buildComponentProps', () => {
        const pageItem: PageItem = {
            type: 'page',
            current: false,
            page: 2,
            simple: false,
            key: 2,
        };

        const pageSize = 10;
        const onUpdate = jest.fn();

        beforeEach(() => {
            warnOnceMock.mockClear();
            onUpdate.mockClear();
        });

        it('returns only onClick when component is undefined', () => {
            expect(
                buildComponentProps({component: undefined, item: pageItem, pageSize, onUpdate}),
            ).toEqual({onClick: expect.any(Function)});
        });

        it('does not call getPageProps when component is undefined', () => {
            const getPageProps = jest.fn(() => ({to: '/foo'}));
            expect(
                buildComponentProps({
                    component: undefined,
                    item: pageItem,
                    getPageProps,
                    pageSize,
                    onUpdate,
                }),
            ).toEqual({onClick: expect.any(Function)});
            expect(getPageProps).not.toHaveBeenCalled();
        });

        it('returns {component} when getPageProps is not provided', () => {
            const Custom = () => null;
            expect(
                buildComponentProps({component: Custom, item: pageItem, pageSize, onUpdate}),
            ).toEqual({
                component: Custom,
                onClick: expect.any(Function),
            });
        });

        it('warns for component="a" when getPageProps is not provided', () => {
            expect(
                buildComponentProps({component: 'a', item: pageItem, pageSize, onUpdate}),
            ).toEqual({onClick: expect.any(Function)});
            expect(warnOnceMock).toHaveBeenCalledTimes(1);
        });

        it('warns for component="a" when getPageProps returns no href', () => {
            const getPageProps = jest.fn(() => ({target: '_blank'}));
            expect(
                buildComponentProps({
                    component: 'a',
                    item: pageItem,
                    getPageProps,
                    pageSize,
                    onUpdate,
                }),
            ).toEqual({
                onClick: expect.any(Function),
                target: '_blank',
            });
            expect(warnOnceMock).toHaveBeenCalledTimes(1);
        });

        it('merges getPageProps result with component', () => {
            const Custom = () => null;
            const getPageProps = jest.fn(() => ({to: '?page=2', 'data-x': '1'}));
            expect(
                buildComponentProps({
                    component: Custom,
                    item: pageItem,
                    getPageProps,
                    page: 2,
                    pageSize,
                    onUpdate,
                }),
            ).toEqual({
                component: Custom,
                onClick: expect.any(Function),
                to: '?page=2',
                'data-x': '1',
            });
            expect(getPageProps).toHaveBeenCalledWith({item: pageItem, page: 2});
        });

        it('returns anchor props without component for component="a" and does not warn', () => {
            const getPageProps = jest.fn(() => ({href: '?page=2', target: '_blank'}));
            expect(
                buildComponentProps({
                    component: 'a',
                    item: pageItem,
                    getPageProps,
                    page: 2,
                    pageSize,
                    onUpdate,
                }),
            ).toEqual({
                onClick: expect.any(Function),
                href: '?page=2',
                target: '_blank',
            });
            expect(getPageProps).toHaveBeenCalledWith({item: pageItem, page: 2});
            expect(warnOnceMock).not.toHaveBeenCalled();
        });

        it('strips Pagination-managed keys from getPageProps result', () => {
            const Custom = () => null;
            const hijack = () => {};
            const getPageProps = jest.fn(() => ({
                to: '?page=2',
                onClick: hijack,
                className: 'evil',
                size: 'xl',
                view: 'normal',
                selected: true,
                disabled: true,
                qa: 'hijacked',
                'aria-current': 'date',
                extraProps: {onClick: hijack},
                children: 'pwned',
            }));
            const result = buildComponentProps({
                component: Custom,
                item: pageItem,
                getPageProps,
                pageSize,
                onUpdate,
            });
            expect(result).toEqual({
                component: Custom,
                onClick: expect.any(Function),
                to: '?page=2',
            });
            expect(result.onClick).not.toBe(hijack);
        });

        it('returns no onClick and skips getPageProps for a disabled navigation button', () => {
            const disabledButton: ButtonItem = {type: 'button', action: 'previous', disabled: true};
            const getPageProps = jest.fn(() => ({href: '?action=previous'}));

            expect(
                buildComponentProps({
                    component: 'a',
                    item: disabledButton,
                    getPageProps,
                    pageSize,
                    onUpdate,
                }),
            ).toEqual({});
            expect(getPageProps).not.toHaveBeenCalled();
            expect(warnOnceMock).not.toHaveBeenCalled();
        });

        it('still forwards props for an enabled navigation button', () => {
            const enabledButton: ButtonItem = {type: 'button', action: 'next', disabled: false};
            const getPageProps = jest.fn(() => ({href: '?action=next'}));

            expect(
                buildComponentProps({
                    component: 'a',
                    item: enabledButton,
                    getPageProps,
                    page: 3,
                    pageSize,
                    onUpdate,
                }),
            ).toEqual({
                onClick: expect.any(Function),
                href: '?action=next',
            });
            expect(getPageProps).toHaveBeenCalledWith({item: enabledButton, page: 3});
        });

        it('onClick triggers onUpdate for the target page', () => {
            const {onClick} = buildComponentProps({
                component: undefined,
                item: pageItem,
                page: 2,
                pageSize,
                onUpdate,
            });
            (onClick as (event: unknown) => void)({});
            expect(onUpdate).toHaveBeenCalledWith(2, pageSize);
        });
    });
});
