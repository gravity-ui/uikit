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
                <h1>Demo of idle popovers</h1>
                <Popover
                    initialOpen={true}
                    placement={'bottom'}
                    htmlContent={`You can attach any type of file now, not only images!`}
                    idle={true}
                    idlePriority={1}
                >
                    <Button pin={'round-brick'}>Attach Files</Button>
                </Popover>
                <Popover placement={'bottom'} htmlContent={`Open the edit dialog`}>
                    <Button pin={'brick-brick'}>Edit E-mail</Button>
                </Popover>
                <Popover
                    initialOpen={true}
                    placement={'bottom'}
                    htmlContent={`From now on, you can find deleted emails in Trash bin`}
                    idle={true}
                    idlePriority={2}
                >
                    <Button pin={'brick-round'}>Delete</Button>
                </Popover>
            </div>
        </React.Fragment>
    );
};

export const Default = DefaultTemplate;
