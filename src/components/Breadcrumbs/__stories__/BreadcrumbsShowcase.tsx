import React from 'react';
import block from 'bem-cn-lite';
import {Breadcrumbs, BreadcrumbsProps} from '../Breadcrumbs';
import './BreadcrumbsShowcase.scss';

const b = block('breadcrumbs-showcase');

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

const sizes1 = [100, 250, 300];

const sizes2 = [150, 200, 250, 300];

interface BreadcrumbsShowcaseProps extends Omit<BreadcrumbsProps, 'items'> {}

export function BreadcrumbsShowcase(props: BreadcrumbsShowcaseProps) {
    const defaultBreadcrumbsList = sizes1.map((size) => (
        <div
            style={{
                width: size,
            }}
            key={size}
        >
            <BreadcrumbsWrapper {...props} items={breadcrumbsItems} />
        </div>
    ));

    const breadcrumbsWith2LastItems = sizes2.map((size) => (
        <div
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
                <p>По умолчанию: до схлопывания элементов нет, после схлопывания один элемент.</p>
                {defaultBreadcrumbsList}
            </div>
            <div className={b('item')}>
                <p>
                    Кастомизация: до схлопывания один элемент, после схлопывания два элемента,
                    элементы в попапе идут лесенкой.
                </p>
                {breadcrumbsWith2LastItems}
            </div>
        </div>
    );
}
