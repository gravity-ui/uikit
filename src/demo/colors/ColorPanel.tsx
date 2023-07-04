import React from 'react';

import {Bulb} from '@gravity-ui/icons';
import ReactCopyToClipboard from 'react-copy-to-clipboard';

import {Button, Icon, Tooltip} from '../../components';

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

export function ColorPanel(props: ColorPanelProps) {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = React.useState(0);

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
                    <ReactCopyToClipboard text={copyText}>
                        <div
                            className={`color-panel__card-box ${boxBorders}`}
                            style={{background: `var(${varName})`}}
                        />
                    </ReactCopyToClipboard>
                    <div className="color-panel__card-texts">
                        <div className="color-panel__card-headline">
                            <div className="color-panel__card-title">{color.title}</div>
                            <ReactCopyToClipboard text={copyText}>
                                <div className="color-panel__card-var">{varName}</div>
                            </ReactCopyToClipboard>
                        </div>
                        <div className="color-panel__card-description">{color.description}</div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={`color-panel color-panel_bg_${BACKGROUND_LIST[currentBackgroundIndex]}`}>
            <Tooltip content="Switch background">
                <Button
                    view={
                        currentBackgroundIndex % BACKGROUND_LIST.length === 0
                            ? 'outlined'
                            : 'outlined-contrast'
                    }
                    className="color-panel__bg-switcher"
                    onClick={() => rotateBackground()}
                >
                    <Icon data={Bulb} />
                </Button>
            </Tooltip>
            <div className="color-panel__title">{props.title}</div>
            <div className="color-panel__description">{props.description}</div>
            <div className="color-panel__colors">{renderColors(props.colors)}</div>
        </div>
    );
}
