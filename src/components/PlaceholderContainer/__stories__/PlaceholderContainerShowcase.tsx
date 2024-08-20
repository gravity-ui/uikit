import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {DropdownMenu} from '../../DropdownMenu';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import type {PlaceholderContainerActionProps, PlaceholderContainerProps} from '../index';
import {PlaceholderContainer} from '../index';

import './PlaceholderContainerShowcase.scss';

const b = block('placeholder-container-showcase');

const ImageComponentTest = () => {
    return (
        <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
                <text
                    fill="#999999"
                    fontFamily="Sans-serif"
                    fontSize="26"
                    strokeWidth="0"
                    textAnchor="middle"
                    transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
                    x="86.49"
                    y="114"
                >
                    1:1
                </text>
            </g>
        </svg>
    );
};

const ContentComponentTest = () => {
    return (
        <div>
            <h3>There is any custom title here</h3>
            <p>
                You can add <strong>here</strong> any long text with custom content and use custom
                content size for displaying very long texts.
            </p>
        </div>
    );
};

const actionComponentTest = (
    <div className={b('custom-action')}>
        <DropdownMenu
            defaultSwitcherProps={{view: 'flat-secondary'}}
            items={[
                {text: 'text 1', action: () => {}},
                {text: 'text 2', action: () => {}},
            ]}
            onSwitcherClick={(e) => e?.stopPropagation()}
            switcher={
                <Button>
                    Text
                    <Icon data={ChevronDown} size={16} />
                </Button>
            }
        />
    </div>
);

const actionMainProps: PlaceholderContainerActionProps = {
    text: 'Main button',
    view: 'normal',
    onClick: () => alert('Click by main button'),
};

const actionAdditionalBtnProps: PlaceholderContainerActionProps = {
    text: 'Additional button',
    view: 'flat-secondary',
    onClick: () => alert('Click by additional button'),
};

const baseProps = {
    title: 'Container with one button & image component',
    image: <ImageComponentTest />,
    className: 'placeholder-container',
};

const placeholderContainerProps: PlaceholderContainerProps = {
    ...baseProps,
    actions: [actionMainProps],
    align: 'center',
};

const actionsProps = {
    actions: [actionMainProps, actionAdditionalBtnProps],
};

const placeholderContainerCustomRenderedProps: PlaceholderContainerProps = {
    ...placeholderContainerProps,
    renderContent: () => <ContentComponentTest />,
};

const placeholderContainerCustomActionProps: PlaceholderContainerProps = {
    ...placeholderContainerProps,
    actions: actionComponentTest,
};

const descriptionProps = {
    description:
        'Some long descriptionProps text that can contain of long long very long text etc. It can be repeated like this. Some long descriptionProps text that can contain of long long very long text etc.',
};

const imageProps = {
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFklEQVR4nO2Y6U4iQRSF5/3fwAX3aGKMonHBHVFxxy3unmfpyalYpGlAZeJ4Sjw/btIWt6Tq+27dbvoPgMyBZBj8US/AAQtBwoXgEwK9BAuBHryFQA/bQqAHbCHQQ7UQ6EFaCPTwLAR6YBYCPSQLgR6MhSQAAwmEX51AL8FCoAdvIdDDthDoAVsI9FAtBHqQFgI9PAuBHpiFQA/JQqAHYyEJwEAC4Vcn0EuwEOjBWwj0sC0EesAWAj1UC4EepIVAD89CoAdmIdBDshDowVhIAjCQQPjVCfQSLAR68BYCPWwLgR6whUAP1UKgB2kh0MOzEOiB/SghNzc32fb2dnZ1ddX22evra3Z4eJhtbGxke3t72cPDQ1vO/f19Vq1WQ069Xg9z/sem7+7uwjovLi46rvP4+DisgWthbjHn8fExq9VqIefg4CB7fn5OT8jp6WlWKpWygYGBALy4genp6fBZDOY2Go1mDq9Lb/NjzMzMZE9PT18qg98zOjoa/v/m5mbLZwQ7Ozvbsobh4eGwt3zRxfkxpqamQjElI4QCBgcHmwssClleXg7ja2trAfDR0VHIn5iYCBXJGB8fz4aGhkJ1Moe5nLOysvJlMnjqCDiusyiEFc/xpaWlsIazs7OQPzIy0iyMWFjxZGxtbYW/FxYW0hDC9sQFcaGVSqVNyMvLS3NTvI7j5XI55J6cnITgdblcbpnHOZybnxeDc+bm5lraBdvI4uJix1bH1sMimJycbEIsChkbGws5PNFxbHV1NeTu7+8398pTlJ/HwuK8Tm1YckIIh2B2d3fbhFxeXoYxwsvPYX/mOKsyVma1Wm3J4RyO838UvzO2OMLhd1MGcwmw2zpZ8ax03suKQigsFlbxVHGcp5z7imvO5/BExeJKQkiMTkJi9XPR3TbKtsTrer3e00ajFPbwj2Tko5OQboVzfn4exufn50N+p8KJnYFF8auFAMjW19dDDtvNZ592frWQz7Ssbhude6dlMWKb4r0n377+RcivaVkf3dT5SMno9aZeK9wziveUXoV8dFPnU9WPuam/J+Szj728HurhsZd5bBX5MUrhd330g7KbkL547M0f2WJw0d1+GHKT3/3DsPLW64uxs7PTXz8MeeNjCynG7e1tUq9OGo1Gx3VeX1/336sTBywEfVgIPiHQS7AQ6MFbCPSwLQR6wBYCPVQLgR6khUAPz0KgB2Yh0EOyEOjBWEgCMJBA+NUJ9BIsBHrwFgI9bAuBHrCFQA/VQqAHaSHQw7MQ6IFZCPSQLAR6MBaSAAwkEH51Ar0EC4EevIVAD9tCoAdsIdBDtRDoQVoI9PAsBHpgFgI9JAuBHoyFJAADCYRfnUAvwUKgB28h0MO2EOgBWwj0UC0EepAWAj08C4EemIVAD+k7hfwFjRtJ9Zn/PDYAAAAASUVORK5CYII=',
    alt: 'image alt text',
};

export const PlaceholderContainerShowcase = () => {
    return (
        <div className={b()}>
            <div className={b('placeholder-examples')}>
                <h2 className={b('title')}>PlaceholderContainer</h2>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>Sizes:</h3>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="s"
                            title="Size s"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="s"
                            title="Size s"
                        />
                    </div>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="m"
                            title="Size m"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="m"
                            title="Size m"
                        />
                    </div>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="l"
                            title="Size l"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="l"
                            title="Size l"
                        />
                    </div>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="promo"
                            title="Size promo"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="promo"
                            title="Size promo"
                        />
                    </div>
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>With buttons:</h3>
                    <PlaceholderContainer
                        className={b('single')}
                        {...placeholderContainerProps}
                        {...actionsProps}
                        direction="row"
                        size="s"
                        title="With buttons"
                    />
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>With image props:</h3>
                    <PlaceholderContainer
                        className={b('single')}
                        {...placeholderContainerProps}
                        image={imageProps}
                        direction="row"
                        size="s"
                        title="With image props"
                    />
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>Custom content:</h3>
                    <PlaceholderContainer
                        {...placeholderContainerCustomRenderedProps}
                        direction="row"
                        size="s"
                        title="Size s"
                    />
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>Custom action:</h3>
                    <PlaceholderContainer
                        {...placeholderContainerCustomActionProps}
                        {...descriptionProps}
                        direction="row"
                        size="m"
                        title="Size m"
                    />
                </div>
            </div>
        </div>
    );
};
