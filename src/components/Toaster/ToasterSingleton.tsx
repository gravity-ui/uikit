import React from 'react';

import get from 'lodash/get';
import ReactDOM from 'react-dom';

import {block} from '../utils/cn';

import {ToasterProvider} from './Provider/ToasterProvider';
import {ToasterComponent} from './ToasterComponent/ToasterComponent';
import type {ToastProps, ToasterArgs, ToasterPublicMethods} from './types';

const TOASTER_KEY: unique symbol = Symbol('Toaster instance key');
const bToaster = block('toaster');
let ReactDOMClient: any;

declare global {
    interface Window {
        [TOASTER_KEY]: ToasterSingleton;
    }
}

export class ToasterSingleton {
    static injectReactDOMClient(client: any) {
        ReactDOMClient = client;
    }

    private rootNode!: HTMLDivElement;
    private reactRoot!: any;
    private className = '';
    private mobile = false;
    private componentAPI: null | ToasterPublicMethods = null;

    constructor(args?: ToasterArgs) {
        const className = get(args, ['className'], '');
        const mobile = get(args, ['mobile'], false);

        if (window[TOASTER_KEY] instanceof ToasterSingleton) {
            const me = window[TOASTER_KEY];
            me.className = className;
            me.mobile = mobile;
            me.setRootNodeClassName();
            return me;
        }

        this.className = className;
        this.mobile = mobile;
        this.createRootNode();
        this.createReactRoot();
        this.render();

        window[TOASTER_KEY] = this;
    }

    destroy() {
        // eslint-disable-next-line react/no-deprecated
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

    has = (name: string) => {
        return this.componentAPI?.has(name) ?? false;
    };

    private createRootNode() {
        this.rootNode = document.createElement('div');
        this.setRootNodeClassName();
        document.body.appendChild(this.rootNode);
    }

    private createReactRoot() {
        if (ReactDOMClient) {
            this.reactRoot = ReactDOMClient.createRoot(this.rootNode);
        }
    }

    private render() {
        const container = (
            <ToasterProvider
                ref={(api) => {
                    this.componentAPI = api;
                }}
            >
                <ToasterComponent hasPortal={false} mobile={this.mobile} />
            </ToasterProvider>
        );

        if (this.reactRoot) {
            this.reactRoot.render(container);
        } else {
            // eslint-disable-next-line react/no-deprecated
            ReactDOM.render(container, this.rootNode, () => Promise.resolve());
        }
    }

    private setRootNodeClassName() {
        this.rootNode.className = bToaster({mobile: this.mobile}, this.className);
    }
}
