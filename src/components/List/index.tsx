import React, {FC} from 'react';
import {List, ListProps, listDefaultProps} from './List';

export * from './List';

export const ListWrapper: FC<ListProps<any>> = (props) => <List {...props} />;
ListWrapper.defaultProps = listDefaultProps;
