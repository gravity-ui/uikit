import {Button} from '../../Button';
import {Flex} from '../../layout';
import {block} from '../../utils/cn';
import {adjust, applyFullOpacity} from '../utils';

import './ColorDisplay.scss';

const b = block('color-display');

export interface ColorDisplayProps {
    color: string;
    withAlpha: boolean;
    onClick: () => void;
}

export const ColorDisplay = ({color, withAlpha, onClick}: ColorDisplayProps) => {
    return (
        <Button
            className={b()}
            style={{
                padding: 0,
                border: `1px solid ${adjust(applyFullOpacity(color), -40)}`,
                overflow: 'hidden',
            }}
            onClick={onClick}
            size={'s'}
            view={'flat'}
        >
            <Flex
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        width: withAlpha ? '50%' : '100%',
                        backgroundColor: applyFullOpacity(color),
                        height: '100%',
                    }}
                ></div>
                {withAlpha && (
                    <div
                        style={{
                            width: withAlpha ? '50%' : '100%',
                            backgroundColor: color,
                            height: '100%',
                        }}
                    ></div>
                )}
            </Flex>
        </Button>
    );
};
