import type {AccordionValue} from './Accordion';

export function updateAccordionItemsApi<Multiple extends boolean>(
    value: string,
    onUpdate: (value: AccordionValue<Multiple>) => void,
) {
    function multipleMode(prev: AccordionValue<Multiple>) {
        // can cast to string[] because of multiple
        const castedPrev = (prev || []) as string[];
        const includes = castedPrev.includes(value);
        let newValue: string[] = [];
        if (includes) {
            // clicked on expanded -> close
            newValue = castedPrev.filter((item: string) => item !== value) || [];
        } else {
            // clicked on non-expanded -> open
            newValue = [...castedPrev, value];
        }
        const res = newValue as AccordionValue<Multiple>;
        onUpdate(res);
        return res;
    }

    function singleMode(prev: AccordionValue<Multiple>) {
        let newValue = value as AccordionValue<Multiple>;
        // case: clicked on expanded
        if (value === prev) {
            newValue = undefined as AccordionValue<Multiple>;
        }
        onUpdate(newValue);
        return newValue;
    }

    return {multipleMode, singleMode};
}
