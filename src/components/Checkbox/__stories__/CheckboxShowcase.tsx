import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Checkbox} from '../Checkbox';

export function CheckboxShowcase() {
    return (
        <Showcase>
            <ShowcaseItem title="Size">
                <div style={{marginBlock: '1em'}}>
                    <Checkbox size="m" checked={false} content="size m" />
                    <span style={{margin: '16px'}} />
                    <Checkbox size="m" checked={true} content="size m" />
                    <span style={{margin: '16px'}} />
                    <Checkbox size="m" indeterminate={true} content="size m" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox size="l" checked={false} content="size l" />
                    <span style={{margin: '16px'}} />
                    <Checkbox size="l" checked={true} content="size l" />
                    <span style={{margin: '16px'}} />
                    <Checkbox size="l" indeterminate={true} content="size l" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox size="xl" checked={false} content="size xl" />
                    <span style={{margin: '8px'}} />
                    <Checkbox size="xl" checked={true} content="size xl" />
                    <span style={{margin: '8px'}} />
                    <Checkbox size="xl" indeterminate={true} content="size xl" />
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="Disabled">
                <div style={{marginBlock: '1em'}}>
                    <Checkbox checked={false} disabled content="unchecked" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox indeterminate={true} disabled content="indeterminate" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox checked={true} disabled content="checked" />
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="Uncontrolled">
                <div style={{marginBlock: '1em'}}>
                    <Checkbox defaultChecked={false} content="unchecked" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox defaultChecked={true} content="checked" />
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="Controlled">
                <div style={{marginBlock: '1em'}}>
                    <Checkbox checked={false} content="unchecked" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox indeterminate={true} content="indeterminate" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Checkbox checked={true} content="checked" />
                </div>
            </ShowcaseItem>
        </Showcase>
    );
}
