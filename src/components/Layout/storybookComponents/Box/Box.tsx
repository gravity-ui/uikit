import React from 'react';

interface BoxProps {
    children?: React.ReactNode;
    minHeight?: number;
    w?: number;
    h?: number;
    grow?: true;
}

export const Box: React.FC<BoxProps> = ({children, w, h, grow, minHeight}) => {
    return (
        <div
            style={{
                flex: grow ? 1 : undefined,
            }}
        >
            <div
                style={{
                    padding: 5,
                    boxSizing: 'border-box',
                    width: w || '100%',
                    height: h || '100%',
                    minHeight,
                    border: '2px solid',
                    borderColor: 'rgb(229, 231, 235)',
                    backgroundColor: '#DDBEE1',
                }}
            >
                {children}
            </div>
        </div>
    );
};
