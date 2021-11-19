import React, {Component} from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import './ColorPanel.scss';

export class ColorPanel extends Component {
    state = {
        bg: 'normal',
    };

    switchBackground() {
        switch (this.state.bg) {
            case 'normal':
                this.setState({bg: 'special'});
                break;
            case 'special':
                this.setState({bg: 'dark'});
                break;
            case 'dark':
                this.setState({bg: 'normal'});
                break;
        }
    }

    renderColors(colors) {
        const boxBorders = this.props.boxBorders ? 'color-panel__card-box_bordered' : '';
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

    renderBgSwitcher() {
        return (
            <div className="color-panel__bg-switcher" onClick={() => this.switchBackground()}>
                BG
            </div>
        );
    }

    render() {
        return (
            <div className={`color-panel color-panel_bg_${this.state.bg}`}>
                {this.renderBgSwitcher()}
                <div className="color-panel__title">{this.props.title}</div>
                <div className="color-panel__description">{this.props.description}</div>
                <div className="color-panel__colors">{this.renderColors(this.props.colors)}</div>
            </div>
        );
    }
}
