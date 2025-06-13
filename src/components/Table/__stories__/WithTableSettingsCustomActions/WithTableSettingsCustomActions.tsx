import * as React from 'react';

import {ArrowRotateLeft} from '@gravity-ui/icons';
import isEqual from 'lodash/isEqual';

import {Button} from '../../../Button';
import type {ButtonButtonProps} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import type {TableProps} from '../../Table';
import type {TableSettingsData} from '../../hoc/withTableSettings/withTableSettings';
import type {DataItem} from '../utils';
import {TableWithSettings} from '../utils';

interface WithTableSettingsCustomActionsShowcaseProps extends TableProps<DataItem> {
    defaultSettings: TableSettingsData;
}

export const WithTableSettingsCustomActionsShowcase = ({
    defaultSettings,
    ...restTableProps
}: WithTableSettingsCustomActionsShowcaseProps) => {
    const [innerSettings, setInnerSettings] = React.useState<TableSettingsData>(defaultSettings);

    const updateSettings = React.useCallback(
        (updatedSettings: TableSettingsData) => setInnerSettings(updatedSettings),
        [],
    );

    const showSelectAllButton = React.useMemo(
        () => innerSettings.some(({isSelected}) => !isSelected),
        [innerSettings],
    );

    const showResetButton = React.useMemo(
        () => !isEqual(innerSettings, defaultSettings),
        [defaultSettings, innerSettings],
    );

    return (
        <TableWithSettings
            {...restTableProps}
            settings={innerSettings}
            updateSettings={updateSettings}
            renderControls={({DefaultApplyButton, onApply}) => (
                <Flex gapRow="1" direction="column">
                    {showSelectAllButton && (
                        <SelectAllButton
                            onClick={() => {
                                onApply();
                                setInnerSettings((prevState) =>
                                    prevState.map((setting) => ({
                                        ...setting,
                                        isSelected: true,
                                    })),
                                );
                            }}
                        />
                    )}
                    {showResetButton && (
                        <ResetButton
                            onClick={() => {
                                onApply();
                                setInnerSettings(defaultSettings);
                            }}
                        />
                    )}
                    <DefaultApplyButton />
                </Flex>
            )}
        />
    );
};

function SelectAllButton<T extends ButtonButtonProps>({onClick}: T) {
    return <Button onClick={onClick}>Select All</Button>;
}

function ResetButton<T extends ButtonButtonProps>({onClick}: T) {
    return (
        <Button view="outlined-warning" onClick={onClick}>
            <Flex alignItems="center" gap="1">
                <Icon key="icon" data={ArrowRotateLeft} />
                <span>Reset</span>
            </Flex>
        </Button>
    );
}
