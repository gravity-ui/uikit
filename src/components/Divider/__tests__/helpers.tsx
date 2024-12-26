import * as React from 'react';

import {Card} from '../../Card';
import {ListItem} from '../../List';
import {Flex} from '../../layout';
import type {DividerProps} from '../Divider';
import {Divider} from '../Divider';

const listItems = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

export const ListWithDivider = (props: DividerProps) => {
    return (
        <Card theme="normal" type="container">
            <Flex direction={props.orientation === 'vertical' ? 'row' : 'column'}>
                {listItems.map((value, index) => (
                    <React.Fragment key={index}>
                        <ListItem
                            item={value}
                            itemIndex={index}
                            active={false}
                            selected={false}
                            onActivate={() => {}}
                        />

                        {index < listItems.length - 1 && <Divider {...props} />}
                    </React.Fragment>
                ))}
            </Flex>
        </Card>
    );
};
