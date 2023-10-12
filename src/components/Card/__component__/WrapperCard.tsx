import React from 'react';

import {Card, CardProps} from '../Card';

const qaId = 'card-component';
const cardText = 'Some text';

export const WrapperCard = (props: Omit<CardProps, 'children'>) => {
    return (
        <div style={{padding: 20}}>
            <Card {...props} qa={qaId}>
                {cardText}
            </Card>
        </div>
    );
};
