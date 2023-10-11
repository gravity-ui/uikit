import React from 'react';

import {Gear} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {cn} from '../../utils/cn';
import {Button} from '../Button';
import type {ButtonProps} from '../Button';

import './ButtonViewShowcase.scss';

const b = cn('button-view-showcase');

export function ButtonViewShowcase(args: ButtonProps) {
    const contrastColor = '#027bf3';
    const views = [
        '-',
        'normal',
        'action',
        'outlined',
        'outlined-info',
        'outlined-success',
        'outlined-warning',
        'outlined-danger',
        'outlined-action',
        'raised',
        'flat',
        'flat-secondary',
        'flat-info',
        'flat-success',
        'flat-warning',
        'flat-action',
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
                    ...args,
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

                items.push(
                    <div
                        key={key}
                        style={{
                            backgroundColor: view.endsWith('contrast') ? contrastColor : '',
                        }}
                        className={b('grid-cell')}
                    >
                        <Button {...props}>
                            <Icon key="icon" data={Gear} />
                            Button
                        </Button>
                    </div>,
                );
            }
        }
    }

    return (
        <div className={b()}>
            <div className={b('grid')}>{items}</div>
        </div>
    );
}
