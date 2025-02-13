import * as React from 'react';

import {cn} from '../../../utils/cn';
import {Breadcrumbs} from '../Breadcrumbs';
import type {BreadcrumbsProps} from '../Breadcrumbs';
import type {RenderBreadcrumbsItemProps} from '../types';

import './BreadcrumbsShowcase.scss';

const b = cn('breadcrumbs-showcase');

const breadcrumbsItems = [
    {
        text: 'Region',
    },
    {
        text: 'Country',
    },
    {
        text: 'City',
    },
    {
        text: 'District',
    },
    {
        text: 'Street',
    },
];

interface BreadcrumbsWrapperProps extends Omit<BreadcrumbsProps, 'items'> {
    items: Array<{text: string}>;
}

class BreadcrumbsWrapper extends React.Component<BreadcrumbsWrapperProps> {
    state = {
        currentItemIndex: this.props.items.length - 1,
    };

    render() {
        return <Breadcrumbs {...this.props} items={this.getItems()} />;
    }

    private getItems() {
        const {items} = this.props;
        const {currentItemIndex} = this.state;

        return items.slice(0, currentItemIndex + 1).map((item, index) => ({
            text: item.text,
            action: () => {
                this.setState({
                    currentItemIndex: index,
                });
            },
        }));
    }
}

const sizes = [100, 150, 200, 250, 300];

interface BreadcrumbsShowcaseProps extends Omit<BreadcrumbsProps, 'items'> {}

const Container = ({children, isCurrent}: RenderBreadcrumbsItemProps) => {
    return <div style={isCurrent ? undefined : {border: '1px solid tomato'}}>{children}</div>;
};

export function BreadcrumbsShowcase(props: BreadcrumbsShowcaseProps) {
    const defaultBreadcrumbsList = sizes.map((size) => (
        <div
            className={b('container')}
            style={{
                width: size,
            }}
            key={size}
        >
            <BreadcrumbsWrapper {...props} items={breadcrumbsItems} />
        </div>
    ));

    return (
        <div className={b()}>
            <div className={b('item')}>
                <p>Different sizes of container</p>
                {defaultBreadcrumbsList}
            </div>
            <div className={b('item')}>
                <p>Custom divider</p>
                <Breadcrumbs
                    {...props}
                    renderItemDivider={() => '>'}
                    items={breadcrumbsItems.map(({text}) => ({text, action: () => {}}))}
                />
            </div>
            <div className={b('item')}>
                <p>Custom title</p>
                <Breadcrumbs
                    {...props}
                    items={breadcrumbsItems.map(({text}) => ({
                        text,
                        title: `Custom title for ${text}`,
                        action: () => {},
                    }))}
                />
            </div>
            <div className={b('item')}>
                <p>Custom render item</p>
                <Breadcrumbs
                    {...props}
                    items={breadcrumbsItems.map(({text}) => ({text, action: () => {}}))}
                    renderItem={Container}
                />
            </div>
        </div>
    );
}
