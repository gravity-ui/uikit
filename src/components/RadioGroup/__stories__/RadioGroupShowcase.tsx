import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {RadioGroup} from '../RadioGroup';
import type {RadioGroupOption} from '../RadioGroup';

export function RadioGroupShowcase() {
    const options: RadioGroupOption[] = [
        {value: 'Value 1', content: 'Value 1'},
        {value: 'Value 2', content: 'Value 2'},
        {value: 'Value 3', content: 'Value 3', disabled: true},
    ];
    return (
        <Showcase>
            <ShowcaseItem title="options">
                <RadioGroup name="group1" defaultValue={options[0].value} options={options} />
            </ShowcaseItem>

            <ShowcaseItem title="options as children">
                <RadioGroup name="group2" defaultValue={options[0].value}>
                    <RadioGroup.Option content={options[0].content} value={options[0].value} />
                    <RadioGroup.Option content={options[1].content} value={options[1].value} />
                    <RadioGroup.Option
                        content={options[2].content}
                        value={options[2].value}
                        disabled
                    />
                </RadioGroup>
            </ShowcaseItem>

            <ShowcaseItem title="disabled">
                <RadioGroup
                    name="group3"
                    defaultValue={options[0].value}
                    options={options}
                    disabled
                />
            </ShowcaseItem>

            <ShowcaseItem title="controlled">
                <RadioGroup name="group4" value={options[0].value} options={options} />
            </ShowcaseItem>
        </Showcase>
    );
}
