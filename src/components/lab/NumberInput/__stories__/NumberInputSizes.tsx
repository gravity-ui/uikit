import React from 'react';

import {ArrowShapeUpToLine, CircleDollar} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Checkbox} from '../../../Checkbox';
import {Icon} from '../../../Icon';
import {mapTextInputSizeToButtonSize} from '../../../controls/common';
import type {InputControlSize} from '../../../controls/types';
import {Flex} from '../../../layout';
import {cn} from '../../../utils/cn';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import './NumberInputSizes.scss';

const b = cn('number-input-sizes');

const SIZES: InputControlSize[] = ['s', 'm', 'l', 'xl'];

export function NumberInputSizes(args: NumberInputProps) {
    const [value, setValue] = React.useState<number | undefined>(undefined);
    const [showStartContent, setShowStartContent] = React.useState(true);
    const [showEndContent, setShowEndContent] = React.useState(true);

    const handleCeilButtonClick = () => {
        if (value) {
            setValue(Math.ceil(value));
        }
    };

    const numberInputProps: NumberInputProps = {
        ...args,
        className: b('input'),
        onUpdate: setValue,
        value,
        startContent: showStartContent ? <Icon data={CircleDollar} /> : undefined,
    };

    return (
        <div className={b()}>
            <Flex direction="column" className={b('inputs-column')} gap={5}>
                {SIZES.map((size) => (
                    <NumberInput
                        key={size}
                        {...numberInputProps}
                        {...{
                            endContent: showEndContent ? (
                                <CeilButton size={size} onClick={handleCeilButtonClick} />
                            ) : undefined,
                        }}
                        size={size}
                        placeholder={size}
                    />
                ))}
            </Flex>
            <Flex direction="column" gap={2}>
                <Checkbox
                    checked={showStartContent}
                    onUpdate={setShowStartContent}
                    content="show startContent"
                />
                <Checkbox
                    checked={showEndContent}
                    onUpdate={setShowEndContent}
                    content="show endContent"
                />
            </Flex>
        </div>
    );
}

function CeilButton(props: {
    size?: NumberInputProps['size'];
    disabled?: boolean;
    onClick: () => void;
}) {
    const {size = 'm', disabled, onClick} = props;

    return (
        <Button
            size={mapTextInputSizeToButtonSize(size)}
            view="flat"
            disabled={disabled}
            onClick={onClick}
            extraProps={{'aria-label': 'Ceil value'}}
        >
            <Icon data={ArrowShapeUpToLine} />
        </Button>
    );
}
