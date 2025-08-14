type ColorPointerProps = {
    left?: string;
    top?: string;
    transform: string;
};
export const ColorPointer = ({left, top, transform}: ColorPointerProps) => (
    <div
        style={{
            border: '4px solid white',
            borderRadius: '50%',
            width: 8,
            height: 8,
            left,
            top,
            transform,
            position: 'absolute',
            boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
        }}
    />
);
