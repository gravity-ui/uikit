import * as React from 'react';

import {Bulb} from '@gravity-ui/icons';

import {ActionTooltip, Button, Icon, Label} from '../../components';
import {cn} from '../../components/utils/cn';

import './ColorPanel.scss';

interface ColorInfo {
    name: string;
    title: string;
    description: string;
}

const BACKGROUND_LIST = ['normal', 'brand', 'dark'] as const;
type Background = (typeof BACKGROUND_LIST)[number];

interface ColorPanelProps {
    title: string;
    description?: string;
    colors: ColorInfo[];
    boxBorders?: boolean;
    defaultBackground?: Background;
}

const b = cn('color-panel');
const switchBackgroundTitle = 'Switch background';

function getColorVarName(name: string) {
    return `--g-color-${name}`;
}

function shouldColorizeTitle(name: string) {
    return name.startsWith('text-') && name !== 'text-primary';
}

export function ColorPanel(props: ColorPanelProps) {
    const {title, description, colors, boxBorders, defaultBackground} = props;
    const initialIndex = defaultBackground ? BACKGROUND_LIST.indexOf(defaultBackground) : 0;
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = React.useState(
        initialIndex >= 0 ? initialIndex : 0,
    );

    function rotateBackground() {
        setCurrentBackgroundIndex((index) => (index + 1) % BACKGROUND_LIST.length);
    }

    function renderColors() {
        return colors.map((color) => {
            const varName = getColorVarName(color.name);
            const copyText = `var(${varName})`;
            const titleStyle = shouldColorizeTitle(color.name)
                ? {color: `var(${varName})`}
                : undefined;

            return (
                <div className={b('item')} key={color.name}>
                    <div className={b('item-content')}>
                        <div
                            className={b('swatch', {bordered: boxBorders})}
                            style={{backgroundColor: `var(${varName})`}}
                        />
                        <div className={b('item-texts')}>
                            <div className={b('item-title-row')}>
                                <div className={b('item-title')} style={titleStyle}>
                                    {color.title}
                                </div>
                                <Label
                                    type="copy"
                                    copyText={copyText}
                                    copyButtonLabel="Copy"
                                    size="s"
                                    theme="unknown"
                                >
                                    {copyText}
                                </Label>
                            </div>
                            <div className={b('item-description')}>{color.description}</div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    const currentBackground = BACKGROUND_LIST[currentBackgroundIndex];
    const switcherView = currentBackground === 'normal' ? 'outlined' : 'outlined-contrast';

    return (
        <div className={b({bg: currentBackground})}>
            <div className={b('header')}>
                <div className={b('header-content')}>
                    <div className={b('title')}>{title}</div>
                    {description && <div className={b('description')}>{description}</div>}
                </div>
                <ActionTooltip title={switchBackgroundTitle}>
                    <Button
                        view={switcherView}
                        size="s"
                        className={b('bg-switcher')}
                        onClick={rotateBackground}
                    >
                        <Icon data={Bulb} />
                    </Button>
                </ActionTooltip>
            </div>
            <div className={b('colors')}>{renderColors()}</div>
        </div>
    );
}
