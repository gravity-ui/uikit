import {act} from '@testing-library/react';
import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {layerManager} from '../LayerManager';

describe('LayerManager', () => {
    setupTimersMock();

    test('should add all non-idle layers directly to stack', () => {
        layerManager.reset();

        const layer1 = {};
        const layer2 = {};

        act(() => layerManager.add(layer1));
        act(() => layerManager.add(layer2));

        expect(layerManager).toHaveProperty('stack.length', 2);
    });

    test('should add idle layer when stack is empty after timeout', () => {
        layerManager.reset();

        const layer1 = {idle: true, idleTimeout: 10000};

        act(() => layerManager.add(layer1));

        jest.advanceTimersByTime(50);

        expect(layerManager).toHaveProperty('stack.length', 0);
        expect(layerManager).toHaveProperty('preStack.length', 1);

        jest.advanceTimersByTime(20000);

        expect(layerManager).toHaveProperty('stack.length', 1);
        expect(layerManager).toHaveProperty('preStack.length', 0);
    });

    test('should not add idle layer to stack when stack is not empty', () => {
        layerManager.reset();

        const layer1 = {idle: true, idleTimeout: 100};
        const layer2 = {};

        act(() => layerManager.add(layer1));

        jest.advanceTimersByTime(50);

        act(() => layerManager.add(layer2));

        expect(layerManager).toHaveProperty('stack.length', 1);
        expect(layerManager).toHaveProperty('preStack.length', 1);

        jest.advanceTimersByTime(200);

        expect(layerManager).toHaveProperty('stack.length', 1);
        expect(layerManager).toHaveProperty('preStack.length', 1);
    });

    test('should add non-idle layer on top of idle layer', () => {
        layerManager.reset();

        const layer1 = {idle: true, idleTimeout: 100};
        const layer2 = {};

        act(() => layerManager.add(layer1));

        jest.advanceTimersByTime(200);

        expect(layerManager).toHaveProperty('stack.length', 1);
        expect(layerManager).toHaveProperty('preStack.length', 0);

        act(() => layerManager.add(layer2));

        expect(layerManager).toHaveProperty('stack.length', 2);
        expect(layerManager).toHaveProperty('preStack.length', 0);
    });

    test('should add idle layers depending on idlePriority', () => {
        layerManager.reset();

        const layer1 = {idle: true, idleTimeout: 100, idlePriority: 1};
        const layer2 = {idle: true, idleTimeout: 100, idlePriority: 2};

        act(() => layerManager.add(layer1));

        jest.advanceTimersByTime(50);

        act(() => layerManager.add(layer2));

        jest.advanceTimersByTime(200);

        expect(layerManager).toHaveProperty('stack.length', 1);
        expect(layerManager).toHaveProperty('preStack.length', 1);
        expect(layerManager).toHaveProperty('stack.0.idlePriority', 2);
    });
});
