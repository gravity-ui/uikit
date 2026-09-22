import * as React from 'react';

import {Card} from '../../Card';
import {Flex} from '../../layout';
import type {DividerProps} from '../Divider';
import {Divider} from '../Divider';

const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

export const ContentWithDivider = (props: DividerProps) => {
    return (
        <Card theme="normal" type="container">
            <Flex direction={props.orientation === 'vertical' ? 'row' : 'column'}>
                {items.map((value, index) => (
                    <React.Fragment key={index}>
                        <div style={{padding: '4px 8px'}}>{value}</div>

                        {index < items.length - 1 && <Divider {...props} />}
                    </React.Fragment>
                ))}
            </Flex>
        </Card>
    );
};
