import * as React from 'react';

// eslint-disable-next-line no-restricted-syntax
export const useLayoutEffect = typeof window === 'undefined' ? () => {} : React.useLayoutEffect;
