import {Select} from '../Select';

const OPTIONS = Array.from({length: 1000}, (_, index) => ({
    value: String(index + 1),
    content: `Option ${index + 1}`,
}));

export interface HoverStandProps {
    /** Far from the top: the popup opens scrolled to it */
    selected: number;
}

export function HoverStand({selected}: HoverStandProps) {
    return (
        <div style={{padding: 20, width: 300}}>
            <Select options={OPTIONS} defaultValue={[String(selected)]} width="max" />
        </div>
    );
}
