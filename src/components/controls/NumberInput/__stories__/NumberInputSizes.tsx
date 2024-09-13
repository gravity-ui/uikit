import React from 'react';

import {ArrowShapeUpToLine, CircleDollar} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Checkbox} from '../../../Checkbox';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {cn} from '../../../utils/cn';
import {mapTextInputSizeToButtonSize} from '../../common';
import type {InputControlSize} from '../../types';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import './NumberInputSizes.scss';

const b = cn('number-input-sizes');

const SIZES: InputControlSize[] = ['s', 'm', 'l', 'xl'];

export function NumberInputSizes(args: NumberInputProps) {
    const [value, setValue] = React.useState('');
    const [showStartContent, setShowStartContent] = React.useState(true);
    const [showEndContent, setShowEndContent] = React.useState(true);

    const handleCeilButtonClick = () => {
        if (value) {
            setValue(String(Math.ceil(Number(value))));
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
                ))}{' '}
                {/* <NumberInput {...numberInputProps('s')} size="s" placeholder="s" />
                <NumberInput {...numberInputProps('m')} size="m" placeholder="m" />
                <NumberInput {...numberInputProps('l')} size="l" placeholder="l" />
                <NumberInput {...numberInputProps('xl')} size="xl" placeholder="xl" /> */}
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
