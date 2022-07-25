import {isEqual} from 'lodash';

/**
 * Iterate over mock invocation results with specific args
 *
 * @example
 * const spy = jest.fn();
 * forEachMockWhereArgs(spy, 'foo', 'bar')((value) => {
 *     // Returned `value` for calls with args 'foo' and 'bar'
 * });
 *
 * @param mock
 * @param args
 */
export function forEachMockWhereArgs<Res, Args extends unknown[]>(
    mock: jest.Mock<Res, Args>,
    ...args: Args
) {
    return function (callback: (result: jest.MockResultReturn<Res>['value']) => void) {
        mock.mock.calls.forEach((callArgs, index) => {
            if (!isEqual(callArgs, args)) {
                return;
            }

            const result = mock.mock.results[index];

            if (result.type !== 'return') {
                return;
            }

            callback(result.value);
        });
    };
}
