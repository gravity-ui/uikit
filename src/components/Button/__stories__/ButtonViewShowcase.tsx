import {Gear} from '@gravity-ui/icons';
import {DEFAULT_THEME} from '@gravity-ui/uikit-themer';

import {Icon} from '../../Icon';
import {useThemeType} from '../../theme';
import {cn} from '../../utils/cn';
import {Button} from '../Button';
import type {ButtonProps} from '../types';

import './ButtonViewShowcase.scss';

const b = cn('button-view-showcase');

export function ButtonViewShowcase(args: ButtonProps) {
    const theme = useThemeType();

    const contrastBackgrounds: Record<string, string> = {
        contrast: 'transparent',
        'contrast-inverted':
            DEFAULT_THEME.utilityColors['base-background'][theme === 'dark' ? 'light' : 'dark']
                .value,
        'contrast-light': DEFAULT_THEME.utilityColors['base-background'].dark.value,
        'contrast-dark': DEFAULT_THEME.utilityColors['base-background'].light.value,
    };
    const views = [
        '-',
        'normal',
        'action',
        'outlined',
        'outlined-info',
        'outlined-success',
        'outlined-warning',
        'outlined-danger',
        'outlined-utility',
        'outlined-action',
        'raised',
        'flat',
        'flat-secondary',
        'flat-info',
        'flat-success',
        'flat-warning',
        'flat-danger',
        'flat-utility',
        'flat-action',
        'contrast',
        'contrast-inverted',
        'contrast-light',
        'contrast-dark',
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
                        style={{backgroundColor: contrastBackgrounds[view]}}
                        className={b('grid-cell')}
                    >
                        <Button {...props}>
                            <Icon data={Gear} />
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
