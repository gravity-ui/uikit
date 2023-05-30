import React from 'react';

import ReactCopyToClipboard from 'react-copy-to-clipboard';

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

const BACKGROUND_LIST = ['normal', 'special', 'dark'];

export function ColorPanel(props: ColorPanelProps) {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = React.useState(0);

    function rotateBackground() {
        setCurrentBackgroundIndex((index) => (index + 1) % BACKGROUND_LIST.length);
    }

    function renderColors(colors: ColorInfo[]) {
        const boxBorders = props.boxBorders ? 'color-panel__card-box_bordered' : '';
        return colors.map((color) => {
            const varName = `--yc-color-${color.name}`;
            return (
                <div className="color-panel__card" key={color.name}>
                    <ReactCopyToClipboard text={varName}>
                        <div
                            className={`color-panel__card-box ${boxBorders}`}
                            style={{background: `var(${varName})`}}
                        />
                    </ReactCopyToClipboard>
                    <div className="color-panel__card-texts">
                        <div className="color-panel__card-headline">
                            <div className="color-panel__card-title">{color.title}</div>
                            <ReactCopyToClipboard text={varName}>
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
            <div className="color-panel__bg-switcher" onClick={() => rotateBackground()}>
                BG
            </div>
            <div className="color-panel__title">{props.title}</div>
            <div className="color-panel__description">{props.description}</div>
            <div className="color-panel__colors">{renderColors(props.colors)}</div>
        </div>
    );
}
