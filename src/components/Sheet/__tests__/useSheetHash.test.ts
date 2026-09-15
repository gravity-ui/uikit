import {act, renderHook} from '../../../../test-utils/utils';
import type {History, Location} from '../../mobile';
import {Platform} from '../../mobile';
import {useSheetHash} from '../hooks/useSheetHash';

describe('useSheetHash', () => {
    test.each([Platform.BROWSER, Platform.IOS, Platform.ANDROID])(
        'keeps callbacks stable for equivalent location objects on %s',
        (platform) => {
            const history: History = {
                action: '',
                replace: jest.fn(),
                push: jest.fn(),
                goBack: jest.fn(),
            };
            const location: Location = {pathname: '/page', search: '?filter=one', hash: '#parent'};
            const {result, rerender} = renderHook(
                (props) => useSheetHash({id: 'sheet', platform, history, ...props}),
                {initialProps: {location}},
            );
            const {setHash, removeHash, shouldClose} = result.current;

            rerender({location: {...location}});

            expect(result.current.setHash).toBe(setHash);
            expect(result.current.removeHash).toBe(removeHash);
            expect(result.current.shouldClose).toBe(shouldClose);
        },
    );

    describe.each([Platform.IOS, Platform.ANDROID])('on %s', (platform) => {
        test.each([
            {pathname: '/new', search: '?filter=old'},
            {pathname: '/old', search: '?filter=new'},
        ])('preserves the latest URL: $pathname$search', ({pathname, search}) => {
            const history: History = {
                action: '',
                replace: jest.fn(),
                push: jest.fn(),
                goBack: jest.fn(),
            };
            const {result, rerender} = renderHook(
                (props) => useSheetHash({id: 'sheet', platform, history, ...props}),
                {
                    initialProps: {
                        location: {pathname: '/old', search: '?filter=old', hash: '#parent'},
                    },
                },
            );
            result.current.resetHashHistory();
            const location = {pathname, search, hash: '#parent'};
            rerender({location});

            act(() => result.current.setHash());

            expect(platform === Platform.IOS ? history.replace : history.push).toHaveBeenCalledWith(
                {
                    pathname,
                    search,
                    hash: 'sheet',
                },
            );

            rerender({location: {...location, hash: '#sheet'}});
            act(() => result.current.removeHash());

            if (platform === Platform.IOS) {
                expect(history.replace).toHaveBeenLastCalledWith({
                    pathname,
                    search,
                    hash: '#parent',
                });
            } else {
                expect(history.goBack).toHaveBeenCalledTimes(1);
            }
        });
    });
});
