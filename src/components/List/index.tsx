import React from 'react';

import {List, listDefaultProps} from './List';
import type {ListProps} from './types';

export * from './List';
export * from './types';
export * from './components/ListItem';
export {ListQa} from './constants';

/** @deprecated Use `<List/>` */
export const ListWrapper = (props: ListProps<any>) => <List {...props} />;
ListWrapper.defaultProps = listDefaultProps;
