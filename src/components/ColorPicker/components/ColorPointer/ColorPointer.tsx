import {b} from '../../constants';

type ColorPointerProps = {
    left?: string | number;
    top?: string | number;
    transform?: string;
};

export const ColorPointer = ({left, top, transform}: ColorPointerProps) => (
    <button
        className={b('color-pointer')}
        style={{
            left,
            top,
            transform,
        }}
    />
);
