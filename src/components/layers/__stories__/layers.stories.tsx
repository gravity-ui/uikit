import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Popover} from '../../Popover';
import {Button} from '../../Button';

export default {
    title: 'Components/LayerManager',
} as Meta;

const DefaultTemplate: Story = () => {
    return (
        <React.Fragment>
            <div style={{marginTop: 0, marginLeft: 30}}>
                <h1>Two buttons with promo-driven popovers</h1>
                <Popover
                    initialOpen={true}
                    placement={'bottom'}
                    htmlContent={`Promo banner!`}
                    category={'promo-driven'}
                >
                    <Button pin={'round-brick'} view={'action'}>
                        Launch
                    </Button>
                </Popover>
                <Popover
                    initialOpen={true}
                    theme={'special'}
                    placement={'bottom'}
                    htmlContent={`Promo 2!`}
                    category={'promo-driven'}
                >
                    <Button pin={'brick-round'}>Details</Button>
                </Popover>
            </div>
        </React.Fragment>
    );
};

export const Default = DefaultTemplate;
