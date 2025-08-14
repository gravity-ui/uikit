import {b} from '../../constants';

type ColorPointerProps = {
    left?: string;
    top?: string;
    transform: string;
};
export const ColorPointer = ({left, top, transform}: ColorPointerProps) => (
    <div
        className={b('color-pointer')}
        style={{
            left,
            top,
            transform,
        }}
    />
);
