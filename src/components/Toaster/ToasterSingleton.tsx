import React from 'react';
import ReactDOM from 'react-dom';
import {get} from 'lodash';
import {block} from '../utils/cn';
import type {ToasterArgs, ToasterPublicMethods, ToastProps} from './types';
import {getToastIndex} from './utilities/getToastIndex';
import {ToasterProvider} from './Provider/ToasterProvider';
import {ToasterComponent} from './ToasterComponent/ToasterComponent';

const TOASTER_KEY: unique symbol = Symbol('Toaster instance key');
const bToaster = block('toaster');

declare global {
    interface Window {
        [TOASTER_KEY]: ToasterSingleton;
    }
}

export class ToasterSingleton {
    // FIXME: BREAKING CHANGE. Rename to "rootNode" and convert to private
    _rootNode!: HTMLDivElement;
    // FIXME: BREAKING CHANGE. Rename to "toasts" and convert to private
    _toasts: ToastProps[] = [];
    private className = '';
    private mobile = false;
    private componentAPI: null | ToasterPublicMethods = null;

    constructor(args?: ToasterArgs) {
        const additionalClass = get(args, ['additionalClass'], '');
        const className = get(args, ['className'], '');
        const mobile = get(args, ['mobile'], false);

        if (window[TOASTER_KEY] instanceof ToasterSingleton) {
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

    /**
     * @deprecated Use `toaster.add` instead
     * @param toastOptions
     */
    createToast = async (toastOptions: ToastProps) => {
        this.add(toastOptions);
    };

    /**
     * @deprecated Use `toaster.remove` instead
     * @param {string} name
     */
    removeToast = (name: string) => {
        this.remove(name);
    };

    /**
     * @deprecated Use `toaster.update` instead
     * @param name
     * @param overrideOptions
     */
    overrideToast = (name: string, overrideOptions: Partial<ToastProps>) => {
        this.update(name, overrideOptions);
    };

    // FIXME: BREAKING CHANGE. Rename to "removeToastFromDOM" and convert to private
    /** @deprecated  Will be renamed and converted to private method in te next major */
    _removeToastFromDOM(name: string) {
        this.remove(name);
    }

    // FIXME: BREAKING CHANGE. Rename to "getToastIndex" and convert to private
    /** @deprecated  Will be renamed and converted to private method in te next major */
    _getToastIndex = (name: string) => {
        return getToastIndex(this._toasts, name);
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
            <ToasterProvider
                ref={(api) => {
                    this.componentAPI = api;
                }}
            >
                <ToasterComponent hasPortal={false} mobile={this.mobile} />
            </ToasterProvider>,
            this._rootNode,
            () => Promise.resolve(),
        );
    }

    destroy() {
        this._toasts = [];
        ReactDOM.unmountComponentAtNode(this._rootNode);
        document.body.removeChild(this._rootNode);
    }

    private setRootNodeClassName() {
        this._rootNode.className = bToaster({mobile: this.mobile}, this.className);
    }
}
