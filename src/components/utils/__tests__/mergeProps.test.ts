import {mergeProps} from '../mergeProps';

describe('mergeProps', () => {
    describe('basic merging', () => {
        it('should return empty object for no arguments', () => {
            expect(mergeProps()).toEqual({});
        });

        it('should return props unchanged when single object passed', () => {
            expect(mergeProps({id: 'foo', disabled: true})).toEqual({id: 'foo', disabled: true});
        });

        it('should merge two objects, last value wins for plain props', () => {
            expect(mergeProps({id: 'first', role: 'button'}, {id: 'second'})).toEqual({
                id: 'second',
                role: 'button',
            });
        });

        it('should merge three objects', () => {
            // @ts-expect-error
            expect(mergeProps({a: 1}, {b: 2}, {c: 3})).toEqual({a: 1, b: 2, c: 3});
        });

        it('should overwrite with undefined when explicitly passed', () => {
            expect(mergeProps({id: 'foo'}, {id: undefined})).toEqual({id: undefined});
        });
    });

    describe('event handlers', () => {
        it('should call both handlers when merged', () => {
            const first = jest.fn();
            const second = jest.fn();
            const {onClick} = mergeProps({onClick: first}, {onClick: second}) as {
                onClick: (...args: unknown[]) => unknown;
            };
            onClick('arg');
            expect(first).toHaveBeenCalledWith('arg');
            expect(second).toHaveBeenCalledWith('arg');
        });

        it('should return first defined return value', () => {
            const {onClick} = mergeProps({onClick: () => 'first'}, {onClick: () => 'second'}) as {
                onClick: () => unknown;
            };
            expect(onClick()).toBe('first');
        });

        it('should return undefined when all handlers return undefined', () => {
            const {onClick} = mergeProps(
                {onClick: () => undefined},
                {onClick: () => undefined},
            ) as {onClick: () => unknown};
            expect(onClick()).toBeUndefined();
        });

        it('should chain three event handlers', () => {
            const calls: number[] = [];
            const {onChange} = mergeProps(
                {onChange: () => calls.push(1)},
                {onChange: () => calls.push(2)},
                {onChange: () => calls.push(3)},
            ) as {onChange: () => void};
            onChange();
            expect(calls).toEqual([1, 2, 3]);
        });

        it('should silently drop non-function on* values (matched by event pattern)', () => {
            // on* keys matching the event pattern are only processed when the value is a function;
            // non-function values are not forwarded to the result
            // @ts-expect-error
            expect(mergeProps({onSomething: 'string'}, {onSomething: 'override'})).toEqual({});
        });

        it('should not treat on* with lowercase third char as event handlers', () => {
            // "online" — third char 'l' is not uppercase
            const first = jest.fn();
            const second = jest.fn();
            // @ts-expect-error
            const result = mergeProps({online: first}, {online: second}) as {online: unknown};
            expect(result.online).toBe(second);
            expect(first).not.toHaveBeenCalled();
        });
    });

    describe('className merging', () => {
        it('should concatenate className', () => {
            expect(mergeProps({className: 'foo'}, {className: 'bar'})).toEqual({
                className: 'foo bar',
            });
        });

        it('should concatenate className across three objects', () => {
            expect(mergeProps({className: 'a'}, {className: 'b'}, {className: 'c'})).toEqual({
                className: 'a b c',
            });
        });

        it('should set className when only one object has it', () => {
            expect(mergeProps({id: 'x'}, {className: 'bar'})).toEqual({
                id: 'x',
                className: 'bar',
            });
        });

        it('should overwrite className when first object has no className', () => {
            expect(mergeProps({id: 'x'}, {className: 'bar'}, {className: 'baz'})).toEqual({
                id: 'x',
                className: 'bar baz',
            });
        });

        it('should concatenate *ClassName props', () => {
            // @ts-expect-error
            expect(mergeProps({modalClassName: 'base'}, {modalClassName: 'extra'})).toEqual({
                modalClassName: 'base extra',
            });
        });

        it('should concatenate multiple *ClassName props independently', () => {
            expect(
                mergeProps(
                    // @ts-expect-error
                    {className: 'a', contentClassName: 'c1'},
                    {className: 'b', contentClassName: 'c2'},
                ),
            ).toEqual({className: 'a b', contentClassName: 'c1 c2'});
        });

        it('should overwrite className when value is not a string', () => {
            // undefined className from second object → plain overwrite
            expect(mergeProps({className: 'foo'}, {className: undefined})).toEqual({
                className: undefined,
            });
        });
    });
});
