import type {Cases} from '../../../stories/tests-factory/models';
import type {ListProps} from '../types';

export const sizeCases: Cases<ListProps['size']> = ['s', 'm', 'l', 'xl'];

export const sortHandleAlignCases: Cases<ListProps['sortHandleAlign']> = ['left', 'right'];

export const emptyPlaceholderCases: Cases<ListProps['emptyPlaceholder']> = ['Placeholder'];

export const filterPlaceholderCases: Cases<ListProps['filterPlaceholder']> = ['Filter placeholder'];
