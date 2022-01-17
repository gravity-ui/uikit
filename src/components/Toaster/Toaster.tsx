import React from 'react';
import ReactDOM from 'react-dom';
import {block} from '../utils/cn';
import {ToastGeneralProps} from './Toast/Toast';
import {ToastsContainer} from './ToastsContainer/ToastsContainer';

const TOASTER_KEY: unique symbol = Symbol('Toaster instance key');
const bToaster = block('toaster');

declare global {
    interface Window {
        [TOASTER_KEY]: any;
    }
}

export interface Toast extends ToastGeneralProps {
    isOverride?: boolean;
}

export class Toaster {
    readonly _additionalClass!: string;
    _toasts!: Toast[];
    _rootNode!: any;

    constructor({additionalClass = ''} = {}) {
        if ((window as any)[TOASTER_KEY]) {
            const me = window[TOASTER_KEY];
            me._additionalClass = additionalClass;
            me._rootNode.className = bToaster(null, me._additionalClass);
            return me;
        }

        this._additionalClass = additionalClass;
        this._toasts = [];
        this._createRootNode();
        this._render();

        window[TOASTER_KEY] = this;
    }

    createToast = async (toastOptions: ToastGeneralProps) => {
        const {name} = toastOptions;
        const index = this._getToastIndex(name);

        if (index !== -1) {
            await this.removeToast(name);
        }

        this._toasts.push(toastOptions);
        this._render();
    };

    removeToast = (name: string) => {
        const index = this._getToastIndex(name);

        if (index === -1) {
            return;
        }

        this._removeToastFromDOM(name);
    };

    overrideToast = (name: string, overrideOptions: Partial<ToastGeneralProps>) => {
        const index = this._getToastIndex(name);

        if (index === -1) {
            return;
        }

        this._toasts[index] = {
            ...this._toasts[index],
            ...overrideOptions,
            isOverride: true,
        };

        this._render();
    };

    _removeToastFromDOM(name: string) {
        const index = this._getToastIndex(name);
        this._toasts.splice(index, 1);
        this._render();
    }

    _getToastIndex = (name: string) => {
        return this._toasts.findIndex((toast) => toast.name === name);
    };

    _createRootNode() {
        this._rootNode = document.createElement('div');
        this._rootNode.className = bToaster(null, this._additionalClass);
        document.body.appendChild(this._rootNode);
    }

    _render() {
        ReactDOM.render(
            <ToastsContainer toasts={this._toasts} removeCallback={this.removeToast} />,
            this._rootNode,
            () => Promise.resolve(),
        );
    }
}
