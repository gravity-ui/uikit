import {getNumerationList, getSize} from './utils';

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
});
