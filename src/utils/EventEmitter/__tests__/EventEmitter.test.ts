import {EventEmitter} from '../EventEmitter';

test('should subscribe for events', (done) => {
    const emitter = new EventEmitter<{foo: [string, string, string]}>();

    expect(emitter.notify('foo', ['foo', 'bar', '1qux'])).toBe(false);

    const unsubscribe1 = emitter.subscribe('foo', (...data) => {
        expect(data).toEqual(['foo', 'bar', 'qux']);
    });

    const unsubscribe2 = emitter.subscribe('foo', (...data) => {
        expect(data).toEqual(['foo', 'bar', 'qux']);

        done();
    });

    expect(emitter.notify('foo', ['foo', 'bar', 'qux'])).toBe(true);

    unsubscribe1();
    unsubscribe2();
});
