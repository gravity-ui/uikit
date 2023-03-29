import {HTMLAttributes, PropsWithChildren} from 'react';

export type Props = PropsWithChildren<{}> &
    Pick<HTMLAttributes<HTMLParagraphElement>, 'id' | 'className'>;
