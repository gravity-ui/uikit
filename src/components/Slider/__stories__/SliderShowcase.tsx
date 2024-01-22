import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {blockNew} from '../../utils/cn';
import {Slider} from '../Slider';
import type {SliderProps} from '../sliderTypes';

import './SliderShowcase.scss';

const b = blockNew('slider-showcase');
const blockCn = b('block');
const rowCn = b('row');

const ShowcaseBlock = ({title, ...sliderProps}: Partial<SliderProps> & {title: string}) => (
    <ShowcaseItem title={title}>
        <div className={rowCn}>
            <div>s:</div>
            <Slider size="s" {...sliderProps} />
        </div>
        <div className={rowCn}>
            <div>m:</div>
            <Slider size="m" {...sliderProps} />
        </div>
        <div className={rowCn}>
            <div>l:</div>
            <Slider size="l" {...sliderProps} />
        </div>
        <div className={rowCn}>
            <div>xl:</div>
            <Slider size="xl" {...sliderProps} />
        </div>
    </ShowcaseItem>
);

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
                <ShowcaseBlock title="error" error={'Error description'} defaultValue={20} />
                <ShowcaseBlock
                    title="Range error"
                    error={'Error description'}
                    defaultValue={[20, 40]}
                />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="tooltip" withTooltip defaultValue={20} />
                <ShowcaseBlock title="Range tooltip" withTooltip defaultValue={[20, 40]} />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="tooltip disabled" withTooltip disabled defaultValue={20} />
                <ShowcaseBlock
                    title="Range tooltip disabled"
                    withTooltip
                    disabled
                    defaultValue={[20, 40]}
                />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock
                    title="tooltip error"
                    withTooltip
                    error={'Error description'}
                    defaultValue={20}
                />
                <ShowcaseBlock
                    title="Range tooltip error"
                    withTooltip
                    error={'Error description'}
                    defaultValue={[20, 40]}
                />
            </div>
            <div className={blockCn}>
                <ShowcaseBlock title="infoPointCount" infoPointCount={11} defaultValue={20} />
                <ShowcaseBlock
                    title="Range infoPointCount"
                    infoPointCount={11}
                    defaultValue={[20, 40]}
                />
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
