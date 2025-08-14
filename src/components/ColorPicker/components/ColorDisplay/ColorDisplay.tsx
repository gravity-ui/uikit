import * as React from 'react';

import {hsvaToRgbaString} from '@uiw/react-color';
import type {HsvaColor} from '@uiw/react-color';

import {Button} from '../../../Button';
import {Card} from '../../../Card';
import {Flex} from '../../../layout';
import {b} from '../../constants';
import {Modes} from '../../types';
import {getTextValueByMode} from '../../utils';

type ColorDisplayProps = {
    hsva: HsvaColor;
    onClick: () => void;
};
export const ColorDisplay = React.forwardRef<HTMLDivElement, ColorDisplayProps>(
    ({hsva, onClick}, ref) => (
        <Card view={'outlined'} className={b('picker-wrapper')} ref={ref}>
            <Flex alignItems={'center'} gap={2}>
                <Button
                    size={'s'}
                    className={b('underlay')}
                    style={{width: 20, height: 20}}
                    onClick={onClick}
                >
                    <div
                        className={b('overlay')}
                        style={{
                            backgroundColor: hsvaToRgbaString(hsva),
                        }}
                    />
                </Button>
                <div>{getTextValueByMode(hsva, Modes.Hex, false)}</div>
            </Flex>
        </Card>
    ),
);

ColorDisplay.displayName = 'ColorDisplay';
