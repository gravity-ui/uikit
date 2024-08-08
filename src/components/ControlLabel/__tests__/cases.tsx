import React from 'react';

import type {Props} from '../types';

export const defaultProps: Props = {
    control: <div>control</div>,
};

export const titleCases: Array<Props['title']> = ['title'];
export const disabledCases: Array<Props['disabled']> = [true];
export const sizeCases: Array<Props['size']> = ['m', 'l'];
