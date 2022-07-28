import React from 'react';
import block from 'bem-cn-lite';

import {LayoutDirections} from './constants';
import {ShareList, ShareListProps, ShareListDefaultProps} from './ShareList/ShareList';
import {PopupPlacement} from '../Popup';
import {SVGIconData} from '../Icon/types';
import {Popover} from '../Popover';
import {Icon} from '../Icon';
import {Share} from '../icons';

import './ShareTooltip.scss';

const b = block('share-tooltip');

export interface ShareTooltipDefaultProps extends ShareListDefaultProps {
    /** настройка использования [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share). Если включить - по клику будет отображаться дефолтный диалог шарилки (если поддерживается браузером) */
    useWebShareApi: boolean;
    /** направления открытия тултипа */
    placement: PopupPlacement;
    /** настройка открытия тултипа по ховеру */
    openByHover: boolean;
    /** настройка автоматического закрытия тултипа если курсор outside */
    autoclosable: boolean;
    /** настройка задержки скрытия тултипа если курсор outside */
    closeDelay: number;
    /** размер иконки-контрола */
    iconSize: number;
    /** направление расположения элементов */
    direction: LayoutDirections;
}

export interface ShareTooltipProps extends ShareListProps, Partial<ShareTooltipDefaultProps> {
    /** миксин для иконки-контрола */
    iconClass?: string;
    /** миксин для тултипа */
    tooltipClassName?: string;
    /** миксин для sitcher'a */
    switcherClassName?: string;
    /** кастомная иконка */
    customIcon?: SVGIconData;
    /** заголовок рядом с иконкой */
    buttonTitle?: string | React.ReactNode;
    /** функция регистрации достигнутых целей */
    handleMetrika?: () => void;
}

type ShareTooltipInnerProps = Omit<ShareTooltipProps, keyof ShareTooltipDefaultProps> &
    Required<Pick<ShareTooltipProps, keyof ShareTooltipDefaultProps>>;

export const shareTooltipDefaultProps: ShareTooltipDefaultProps = {
    iconSize: 16,
    socialNets: ShareList.defaultProps.socialNets,
    withCopyLink: true,
    useWebShareApi: false,
    placement: ['bottom-end'],
    openByHover: true,
    autoclosable: true,
    closeDelay: 300,
    direction: LayoutDirections.row,
};

export class ShareTooltip extends React.PureComponent<ShareTooltipInnerProps> {
    static defaultProps = shareTooltipDefaultProps;

    render() {
        const {
            url,
            title,
            text,
            socialNets,
            withCopyLink,
            useWebShareApi,
            placement,
            openByHover,
            autoclosable,
            closeDelay,
            iconSize,
            iconClass,
            tooltipClassName,
            switcherClassName,
            className,
            direction,
            customIcon,
            buttonTitle,
        } = this.props;

        const content = (
            <ShareList
                url={url}
                title={title}
                text={text}
                socialNets={socialNets}
                withCopyLink={withCopyLink}
                direction={direction}
            />
        );

        return (
            <Popover
                placement={placement}
                hasArrow={false}
                openOnHover={openByHover && !useWebShareApi}
                autoclosable={autoclosable}
                delayClosing={closeDelay}
                content={content}
                className={b(null, className)}
                tooltipClassName={b('tooltip', tooltipClassName)}
                onClick={this.handleClick}
            >
                <div className={b('container', switcherClassName)}>
                    <div className={b('icon-container')}>
                        <Icon
                            data={customIcon ? customIcon : Share}
                            size={iconSize}
                            className={b('icon', iconClass)}
                        />
                    </div>

                    {Boolean(buttonTitle) && <div className={b('title')}>{buttonTitle}</div>}
                </div>
            </Popover>
        );
    }

    private handleClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        const {url, title, text, useWebShareApi, handleMetrika} = this.props;

        if (handleMetrika) {
            handleMetrika();
        }

        if (useWebShareApi && navigator && typeof navigator.share === 'function') {
            await navigator.share({url, title, text});
            event.preventDefault();
            return false;
        }
        return true;
    };
}
