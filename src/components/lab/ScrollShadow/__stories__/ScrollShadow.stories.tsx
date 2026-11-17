import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ScrollShadow} from '../ScrollShadow';

import './ScrollShadow.stories.scss';

const meta = {
    title: 'Lab/ScrollShadow',
    component: ScrollShadow,
    args: {
        axis: 'block',
        position: 'both',
        disabled: false,
    },
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ScrollShadow>;

export default meta;

type Story = StoryObj<typeof meta>;

function VerticalContent() {
    return (
        <div className="scroll-shadow-stories__list">
            {Array.from({length: 20}, (_, index) => (
                <div className="scroll-shadow-stories__item" key={index}>
                    Item {index + 1}
                </div>
            ))}
        </div>
    );
}

export const Default: Story = {
    render: (args) => (
        <div className="scroll-shadow-stories__frame scroll-shadow-stories__vertical">
            <ScrollShadow
                {...args}
                className="scroll-shadow-stories__vertical-scroller"
                aria-label="Scrollable list"
                qa="scroll-shadow-story"
                role="region"
            >
                <VerticalContent />
            </ScrollShadow>
        </div>
    ),
};

export const InlineAxis: Story = {
    args: {
        axis: 'inline',
    },
    render: (args) => (
        <div className="scroll-shadow-stories__frame scroll-shadow-stories__horizontal">
            <ScrollShadow
                {...args}
                className="scroll-shadow-stories__horizontal-scroller"
                aria-label="Horizontal list"
                role="region"
            >
                <div className="scroll-shadow-stories__row">
                    {Array.from({length: 10}, (_, index) => (
                        <div className="scroll-shadow-stories__card" key={index}>
                            Item {index + 1}
                        </div>
                    ))}
                </div>
            </ScrollShadow>
        </div>
    ),
};

export const BothAxes: Story = {
    args: {
        axis: 'both',
    },
    render: (args) => (
        <div className="scroll-shadow-stories__frame scroll-shadow-stories__both">
            <ScrollShadow
                {...args}
                className="scroll-shadow-stories__both-scroller"
                aria-label="Scrollable grid"
                role="region"
            >
                <div className="scroll-shadow-stories__grid">
                    {Array.from({length: 64}, (_, index) => (
                        <div className="scroll-shadow-stories__cell" key={index}>
                            {index + 1}
                        </div>
                    ))}
                </div>
            </ScrollShadow>
        </div>
    ),
};

export const CustomCssApi: Story = {
    render: (args) => (
        <div className="scroll-shadow-stories__frame scroll-shadow-stories__vertical">
            <ScrollShadow
                {...args}
                className="scroll-shadow-stories__vertical-scroller scroll-shadow-stories__custom"
                aria-label="Scrollable list with custom shadow"
                role="region"
            >
                <VerticalContent />
            </ScrollShadow>
        </div>
    ),
};
