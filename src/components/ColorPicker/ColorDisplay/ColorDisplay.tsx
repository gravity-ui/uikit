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
                border: `1px solid ${adjust(applyFullOpacity(color), -40)}`,
            }}
            onClick={onClick}
            size={'s'}
            view={'flat'}
        >
            <Flex width={'100%'} height={'100%'}>
                <div
                    className={b('color-box', {alpha: withAlpha})}
                    style={{
                        backgroundColor: applyFullOpacity(color),
                    }}
                ></div>
                {withAlpha && (
                    <div
                        className={b('color-box', {alpha: withAlpha})}
                        style={{
                            backgroundColor: color,
                        }}
                    ></div>
                )}
            </Flex>
        </Button>
    );
};
