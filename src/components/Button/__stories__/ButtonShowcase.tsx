import React from 'react';

import {Gear} from '@gravity-ui/icons';
import block from 'bem-cn-lite';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Icon} from '../../Icon';
import {Button} from '../Button';
import type {ButtonProps} from '../Button';

import './ButtonShowcase.scss';

const b = block('button-showcase');

export function ButtonShowcase() {
    return (
        <Showcase title="Button" className={b()}>
            {renderViewGrid()}
            <ShowcaseItem title="size">
                <p>
                    <Button size="xs">Size xs</Button>
                    <span style={{margin: '8px'}} />
                    <Button size="s">Size s</Button>
                    <span style={{margin: '8px'}} />
                    <Button size="m">Size m</Button>
                    <span style={{margin: '8px'}} />
                    <Button size="l">Size l</Button>
                    <span style={{margin: '8px'}} />
                    <Button size="xl">Size xl</Button>
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="width">
                <div style={{width: 100, border: '2px dashed gray'}}>
                    <p>
                        <Button>none none none</Button>
                    </p>
                    <p>
                        <Button width="auto">auto auto auto</Button>
                    </p>
                    <p>
                        <Button width="max">max</Button>
                    </p>
                </div>
            </ShowcaseItem>
        </Showcase>
    );
}

function renderViewGrid() {
    const contrastColor = '#027bf3';
    const icon = 'none';
    const views = [
        '-',
        'normal',
        'action',
        'outlined',
        'outlined-info',
        'outlined-danger',
        'raised',
        'flat',
        'flat-info',
        'flat-danger',
        'flat-secondary',
        'normal-contrast',
        'outlined-contrast',
        'flat-contrast',
    ] as const;
    const states = ['view', 'default', 'disabled', 'loading', 'selected'] as const;

    const items = [];

    for (const view of views) {
        for (const state of states) {
            const key = `${view}_${state}`;

            if (view === '-' && state === 'view') {
                items.push(
                    <div key={key} className={b('grid-cell', {head: 'left'})}>
                        <strong>view\state</strong>
                    </div>,
                );
            } else if (state === 'view') {
                items.push(
                    <div key={key} className={b('grid-cell', {head: 'left'})}>
                        <strong>{view}</strong>
                    </div>,
                );
            } else if (view === '-') {
                items.push(
                    <div key={key} className={b('grid-cell', {head: 'top'})}>
                        <strong>{state}</strong>
                    </div>,
                );
            } else {
                const props: ButtonProps = {
                    view,
                };

                if (state === 'selected') {
                    props.selected = true;
                }

                if (state === 'disabled') {
                    props.disabled = true;
                }

                if (state === 'loading') {
                    props.loading = true;
                }

                if (icon === 'none') {
                    props.children = [<Icon key="icon" data={Gear} />, 'Button'];
                } else if (icon === 'right') {
                    props.children = ['Button', <Icon key="icon" data={Gear} />];
                } else if (icon === 'both') {
                    props.children = [
                        <Icon key="icon-1" data={Gear} />,
                        'Button',
                        <Icon key="icon-2" data={Gear} />,
                    ];
                } else if (icon === 'only') {
                    props.children = <Icon key="icon" data={Gear} />;
                } else {
                    props.children = 'Button';
                }

                items.push(
                    <div
                        key={key}
                        style={{
                            backgroundColor: view.endsWith('contrast') ? contrastColor : '',
                        }}
                        className={b('grid-cell')}
                    >
                        <Button {...props} />
                    </div>,
                );
            }
        }
    }

    return <div className={b('grid')}>{items}</div>;
}
