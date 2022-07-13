import React from 'react';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import {block} from '../utils/cn';
import type {ToasterArgs, ToasterPublicMethods, ToastProps} from './types';
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
    private rootNode!: HTMLDivElement;
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
        this.createRootNode();
        this.render();

        window[TOASTER_KEY] = this;
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.rootNode);
        document.body.removeChild(this.rootNode);
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

    private createRootNode() {
        this.rootNode = document.createElement('div');
        this.setRootNodeClassName();
        document.body.appendChild(this.rootNode);
    }

    private render() {
        ReactDOM.render(
            <ToasterProvider
                ref={(api) => {
                    this.componentAPI = api;
                }}
            >
                <ToasterComponent hasPortal={false} mobile={this.mobile} />
            </ToasterProvider>,
            this.rootNode,
            () => Promise.resolve(),
        );
    }

    private setRootNodeClassName() {
        this.rootNode.className = bToaster({mobile: this.mobile}, this.className);
    }
}
