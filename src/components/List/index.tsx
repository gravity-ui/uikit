import React, {FC} from 'react';
import {List, listDefaultProps} from './List';
import {ListProps} from './types';

export * from './List';
export * from './types';

export const ListWrapper: FC<ListProps<any>> = (props) => <List {...props} />;
ListWrapper.defaultProps = listDefaultProps;
