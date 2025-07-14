import * as React from 'react';

import {Button} from '../../Button';
import {Flex} from '../../layout';
import i18n from '../i18n';
import {Select} from '../index';

const options = [
    {value: 'val1', content: 'Value 1'},
    {value: 'val2', content: 'Value 2'},
    {value: 'val3', content: 'Value 3'},
    {value: 'val4', content: 'Value 4'},
];

const noop = () => {};

const SelectWithCustomPopup = ({
    onApply,
    onCancel,
}: {
    onApply?: () => void;
    onCancel?: () => void;
}) => {
    const [value, setValue] = React.useState<string[]>([]);
    const [open, onOpenChange] = React.useState(false);

    const handleCancel = () => {
        onCancel?.();
        onOpenChange(false);
    };

    const handleApply = () => {
        onApply?.();
        onOpenChange(false);
    };

    return (
        <Select
            title="Popup with action buttons"
            value={value}
            options={options}
            filterable
            hasClear
            className="select-example select-width-300"
            multiple={true}
            onUpdate={setValue}
            onOpenChange={onOpenChange}
            open={open}
            renderPopup={({renderList, renderFilter}) => {
                return (
                    <React.Fragment>
                        {renderFilter()}
                        {renderList()}
                        <div className="popup-actions">
                            {onCancel && (
                                <Button size="l" view="normal" onClick={handleCancel} width="max">
                                    {i18n('action_cancel')}
                                </Button>
                            )}
                            {onApply && (
                                <Button size="l" view="action" onClick={handleApply} width="max">
                                    {i18n('action_apply')}
                                </Button>
                            )}
                        </div>
                    </React.Fragment>
                );
            }}
        />
    );
};

export const CustomPopupShowcase = () => {
    return (
        <Flex gap={10}>
            <SelectWithCustomPopup onApply={noop} />
            <SelectWithCustomPopup onApply={noop} onCancel={noop} />
        </Flex>
    );
};
