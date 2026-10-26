import {fireEvent} from '../../../../../test-utils/utils';
import {layerManager} from '../LayerManager';
import type {LayerConfig} from '../LayerManager';

function pressEscape() {
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});
}

describe('LayerManager', () => {
    const addedLayers: LayerConfig[] = [];

    function add(config: LayerConfig) {
        layerManager.add(config);
        addedLayers.push(config);

        return config;
    }

    afterEach(() => {
        addedLayers.splice(0).forEach((config) => layerManager.remove(config));
    });

    test('puts a nested layer that registers before its parent above the parent', () => {
        const parentElement = document.createElement('div');
        const childElement = document.createElement('div');
        const parent: LayerConfig = {
            type: 'modal',
            getElement: () => parentElement,
            onEscapeKeyDown: jest.fn(),
        };
        const child: LayerConfig = {
            type: 'sheet',
            parent,
            getElement: () => childElement,
            onEscapeKeyDown: jest.fn(),
        };

        // Effects run from the children up, so a layer opened along with its parent registers first
        add(child);
        add(parent);

        expect(layerManager.getLayers()).toEqual([{type: 'modal'}, {type: 'sheet'}]);
        expect(layerManager.getElementsAbove(parent)).toEqual([childElement]);
        expect(layerManager.getElementsAbove(child)).toEqual([]);

        pressEscape();

        expect(child.onEscapeKeyDown).toHaveBeenCalledTimes(1);
        expect(parent.onEscapeKeyDown).not.toHaveBeenCalled();
    });

    test('never makes a passive layer the top one, but keeps it in the order', () => {
        const passiveElement = document.createElement('div');
        const active = add({type: 'modal', onEscapeKeyDown: jest.fn()});
        const passive = add({
            type: 'drawer',
            passive: true,
            getElement: () => passiveElement,
            onEscapeKeyDown: jest.fn(),
        });

        expect(layerManager.getLayersCount()).toBe(1);
        expect(layerManager.getLayers()).toEqual([{type: 'modal'}]);
        expect(layerManager.getElementsAbove(active)).toEqual([passiveElement]);

        pressEscape();

        expect(active.onEscapeKeyDown).toHaveBeenCalledTimes(1);
        expect(passive.onEscapeKeyDown).not.toHaveBeenCalled();
    });

    test('ignores the removal of a layer that was never added', () => {
        const layer = add({type: 'modal', onEscapeKeyDown: jest.fn()});

        layerManager.remove({type: 'popup'});

        expect(layerManager.getLayers()).toEqual([{type: 'modal'}]);

        pressEscape();

        expect(layer.onEscapeKeyDown).toHaveBeenCalledTimes(1);
    });
});
