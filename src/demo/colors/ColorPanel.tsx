import React from 'react';

import {Bulb} from '@gravity-ui/icons';

import {ActionTooltip, Button, CopyToClipboard, Icon} from '../../components';
import {useUniqId} from '../../hooks';

import './ColorPanel.scss';

interface ColorInfo {
    name: string;
    title: string;
    description: string;
}

interface ColorPanelProps {
    title: string;
    description: string;
    colors: ColorInfo[];
    boxBorders?: boolean;
}

const BACKGROUND_LIST = ['normal', 'brand', 'dark'];
const switchBackgroundTitle = 'Switch background';

export function ColorPanel(props: ColorPanelProps) {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = React.useState(0);
    const tooltipId = useUniqId();

    function rotateBackground() {
        setCurrentBackgroundIndex((index) => (index + 1) % BACKGROUND_LIST.length);
    }

    function renderColors(colors: ColorInfo[]) {
        const boxBorders = props.boxBorders ? 'color-panel__card-box_bordered' : '';
        return colors.map((color) => {
            const varName = `--g-color-${color.name}`;
            const copyText = `var(${varName})`;
            return (
                <div className="color-panel__card" key={color.name}>
                    <CopyToClipboard text={copyText} nativeCopy>
                        {() => (
                            <div
                                className={`color-panel__card-box ${boxBorders}`}
                                style={{background: `var(${varName})`}}
                            />
                        )}
                    </CopyToClipboard>
                    <div className="color-panel__card-texts">
                        <div className="color-panel__card-headline">
                            <div className="color-panel__card-title">{color.title}</div>
                            <CopyToClipboard text={copyText} nativeCopy>
                                {() => <div className="color-panel__card-var">{varName}</div>}
                            </CopyToClipboard>
                        </div>
                        <div className="color-panel__card-description">{color.description}</div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={`color-panel color-panel_bg_${BACKGROUND_LIST[currentBackgroundIndex]}`}>
            <ActionTooltip title={switchBackgroundTitle} id={tooltipId}>
                <Button
                    view={
                        currentBackgroundIndex % BACKGROUND_LIST.length === 0
                            ? 'outlined'
                            : 'outlined-contrast'
                    }
                    className="color-panel__bg-switcher"
                    onClick={() => rotateBackground()}
                    extraProps={{
                        'aria-labelledby': tooltipId,
                    }}
                >
                    <Icon data={Bulb} />
                </Button>
            </ActionTooltip>
            <div className="color-panel__title">{props.title}</div>
            <div className="color-panel__description">{props.description}</div>
            <div className="color-panel__colors">{renderColors(props.colors)}</div>
        </div>
    );
}
