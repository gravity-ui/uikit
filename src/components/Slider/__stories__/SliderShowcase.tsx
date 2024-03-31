import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {block} from '../../utils/cn';
import {Slider} from '../Slider';
import type {SliderProps} from '../types';

import './SliderShowcase.scss';

const b = block('slider-showcase');
const blockCn = b('block');
const rowCn = b('row');

const ShowcaseBlock = ({title, ...sliderProps}: Partial<SliderProps> & {title: string}) => {
    const sliderLabel = `${title} slider example`;

    return (
        <ShowcaseItem title={title}>
            <div className={rowCn}>
                <div>s:</div>
                <Slider size="s" aria-label={sliderLabel} {...sliderProps} />
            </div>
            <div className={rowCn}>
                <div>m:</div>
                <Slider size="m" aria-label={sliderLabel} {...sliderProps} />
            </div>
            <div className={rowCn}>
                <div>l:</div>
                <Slider size="l" aria-label={sliderLabel} {...sliderProps} />
            </div>
            <div className={rowCn}>
                <div>xl:</div>
                <Slider size="xl" aria-label={sliderLabel} {...sliderProps} />
            </div>
        </ShowcaseItem>
    );
};

export const SliderShowcase = () => {
    return (
        <Showcase className={b()}>
            <div className={blockCn}>
                <ShowcaseBlock title="size" defaultValue={20} />
                <ShowcaseBlock title="Range size" defaultValue={[20, 40]} />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="disabled" disabled defaultValue={20} />
                <ShowcaseBlock title="Range disabled" disabled defaultValue={[20, 40]} />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock
                    title="error"
                    errorMessage="Error description"
                    validationState="invalid"
                    defaultValue={20}
                />
                <ShowcaseBlock
                    title="Range error"
                    errorMessage="Error description"
                    validationState="invalid"
                    defaultValue={[20, 40]}
                />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="tooltip" hasTooltip defaultValue={20} />
                <ShowcaseBlock title="Range tooltip" hasTooltip defaultValue={[20, 40]} />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="tooltip disabled" hasTooltip disabled defaultValue={20} />
                <ShowcaseBlock
                    title="Range tooltip disabled"
                    hasTooltip
                    disabled
                    defaultValue={[20, 40]}
                />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock
                    title="tooltip error"
                    hasTooltip
                    errorMessage="Error description"
                    validationState="invalid"
                    defaultValue={20}
                />
                <ShowcaseBlock
                    title="Range tooltip error"
                    hasTooltip
                    errorMessage="Error description"
                    validationState="invalid"
                    defaultValue={[20, 40]}
                />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="marksCount" marksCount={11} defaultValue={20} />
                <ShowcaseBlock title="Range marksCount" marksCount={11} defaultValue={[20, 40]} />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock
                    title="availableValues"
                    availableValues={[10, 20, 50, 55, 65, 80]}
                    defaultValue={20}
                />
                <ShowcaseBlock
                    title="Range availableValues"
                    availableValues={[10, 20, 50, 55, 65, 80]}
                    defaultValue={[20, 50]}
                />
            </div>
        </Showcase>
    );
};
