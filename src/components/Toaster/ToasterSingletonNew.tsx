import React from 'react';

import {ToasterProvider} from './Provider/ToasterProvider';
import {ToasterComponent} from './ToasterComponent/ToasterComponent';
import type {ToastProps, ToasterPublicMethods} from './types';

const TOASTER_NEW_KEY: unique symbol = Symbol('Toaster new instance key');

declare global {
    interface Window {
        [TOASTER_NEW_KEY]: ToasterSingletonNew;
    }
}

export class ToasterSingletonNew {
    private componentAPI: null | ToasterPublicMethods = null;

    constructor() {
        if (window[TOASTER_NEW_KEY] instanceof ToasterSingletonNew) {
            return window[TOASTER_NEW_KEY];
        }

        window[TOASTER_NEW_KEY] = this;
    }

    add = (options: ToastProps) => {
        this.componentAPI?.add(options);
    };

    remove = (name: string) => {
        this.componentAPI?.remove(name);
    };

    removeAll = () => {
        this.componentAPI?.removeAll();
    };

    update = (name: string, overrideOptions: Partial<ToastProps>) => {
        this.componentAPI?.update(name, overrideOptions);
    };

    has = (name: string) => {
        return this.componentAPI?.has(name) ?? false;
    };

    render = () => {
        return (
            <ToasterProvider
                ref={(api) => {
                    this.componentAPI = api;
                }}
            >
                <ToasterComponent />
            </ToasterProvider>
        );
    };
}
