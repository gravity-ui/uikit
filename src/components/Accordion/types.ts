import type {QAProps} from '../types';

import type {AccordionItemProps} from './AccordionItem/AccordionItem';

type AccordionSize = 'm' | 'l' | 'xl';
type AccordionView = 'solid' | 'top-bottom';
type AccordionArrowPosition = 'start' | 'end';

export type AccordionValue<Multiple extends boolean> = Multiple extends true
    ? string[]
    : string | null;

export type AccordionProps<Multiple extends boolean = false> = {
    size?: AccordionSize;
    view?: AccordionView;
    multiple?: Multiple;
    className?: string;
    arrowPosition?: AccordionArrowPosition;
    defaultValue?: AccordionValue<Multiple>;
    value?: AccordionValue<Multiple>;
    onUpdate?: (value: AccordionValue<Multiple>) => void;
    children?: React.ReactElement<AccordionItemProps>[] | React.ReactElement<AccordionItemProps>;
    ariaLevel?: number;
    ariaLabel?: string;
} & QAProps;
