import React from 'react';
import ReactDOM from 'react-dom';
import {get} from 'lodash';
import {block} from '../utils/cn';
import type {ToasterArgs, ToastProps} from './types';
import {ToastList} from './ToastList/ToastList';

const TOASTER_KEY: unique symbol = Symbol('Toaster instance key');
const bToaster = block('toaster');

declare global {
    interface Window {
        [TOASTER_KEY]: Toaster;
    }
}

export class Toaster {
    // FIXME: BREAKING CHANGE. Rename to "rootNode" and convert to private
    _rootNode!: HTMLDivElement;
    // FIXME: BREAKING CHANGE. Rename to "toasts" and convert to private
    _toasts: ToastProps[] = [];
    private className = '';
    private mobile = false;

    constructor(args?: ToasterArgs) {
        const additionalClass = get(args, ['additionalClass'], '');
        const className = get(args, ['className'], '');
        const mobile = get(args, ['mobile'], false);

        if (window[TOASTER_KEY] instanceof Toaster) {
            const me = window[TOASTER_KEY];
            me.className = className || additionalClass;
            me.mobile = mobile;
            me.setRootNodeClassName();
            return me;
        }

        this.className = additionalClass;
        this.mobile = mobile;
        this._toasts = [];
        this._createRootNode();
        this._render();

        window[TOASTER_KEY] = this;
    }

    createToast = async (toastOptions: ToastProps) => {
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

    overrideToast = (name: string, overrideOptions: Partial<ToastProps>) => {
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

    // FIXME: BREAKING CHANGE. Rename to "removeToastFromDOM" and convert to private
    /** @deprecated  Will be renamed and converted to private method in te next major */
    _removeToastFromDOM(name: string) {
        const index = this._getToastIndex(name);
        this._toasts.splice(index, 1);
        this._render();
    }

    // FIXME: BREAKING CHANGE. Rename to "getToastIndex" and convert to private
    /** @deprecated  Will be renamed and converted to private method in te next major */
    _getToastIndex = (name: string) => {
        return this._toasts.findIndex((toast) => toast.name === name);
    };

    // FIXME: BREAKING CHANGE. Rename to "createRootNode" and convert to private
    /** @deprecated  Will be renamed and converted to private method in te next major */
    _createRootNode() {
        this._rootNode = document.createElement('div');
        this.setRootNodeClassName();
        document.body.appendChild(this._rootNode);
    }

    // FIXME: BREAKING CHANGE. Rename to "render" and convert to private
    /** @deprecated  Will be renamed and converted to private method in te next major */
    _render() {
        ReactDOM.render(
            <ToastList
                toasts={this._toasts}
                mobile={this.mobile}
                removeCallback={this.removeToast}
            />,
            this._rootNode,
            () => Promise.resolve(),
        );
    }

    private setRootNodeClassName() {
        this._rootNode.className = bToaster({mobile: this.mobile}, this.className);
    }
}
