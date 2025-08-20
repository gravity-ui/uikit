import * as React from 'react';

import {Button} from '../../Button';
import {Flex} from '../../layout';
import {Select} from '../index';
import type {SelectProps} from '../index';

const options = [
    {value: 'val1', content: 'Value 1'},
    {value: 'val2', content: 'Value 2'},
    {value: 'val3', content: 'Value 3'},
    {value: 'val4', content: 'Value 4'},
];

const SelectWithCustomPopup = ({
    args,
    onApply,
    showCancel,
}: {
    args?: SelectProps;
    onApply: (val: string[]) => void;
    showCancel?: boolean;
}) => {
    const [value, setValue] = React.useState<string[]>([]);

    const [tempValue, setTempValue] = React.useState<string[]>(value);
    const [open, onOpenChange] = React.useState(false);

    const handleCancel = () => {
        setTempValue(value);
        onOpenChange(false);
    };

    const handleApply = () => {
        setValue(tempValue);
        onApply(tempValue);
        onOpenChange(false);
    };

    return (
        <Select
            {...args}
            title="Popup with action buttons"
            value={tempValue}
            options={options}
            filterable
            className="select-example select-width-300"
            multiple={true}
            hasClear={false}
            onClose={handleCancel}
            onUpdate={setTempValue}
            onOpenChange={onOpenChange}
            open={open}
            renderPopup={({renderList, renderFilter}) => {
                return (
                    <React.Fragment>
                        {renderFilter()}
                        {renderList()}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px',
                                borderBlockStart: '1px solid var(--g-color-line-generic)',
                            }}
                        >
                            {showCancel && (
                                <Button size="l" view="normal" onClick={handleCancel} width="max">
                                    Cancel
                                </Button>
                            )}
                            <Button size="l" view="action" onClick={handleApply} width="max">
                                Apply
                            </Button>
                        </div>
                    </React.Fragment>
                );
            }}
        />
    );
};

export const WithActionButtonsShowcase = (args?: SelectProps) => {
    const handleApply = (value: string[]) => {
        alert(JSON.stringify(value));
    };

    return (
        <Flex gap={10}>
            <SelectWithCustomPopup args={args} onApply={handleApply} />
            <SelectWithCustomPopup args={args} onApply={handleApply} showCancel />
        </Flex>
    );
};
