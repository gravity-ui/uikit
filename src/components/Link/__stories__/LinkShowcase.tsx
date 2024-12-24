import {Showcase} from '../../../demo/Showcase';
import {ShowcaseGrid} from '../../../demo/ShowcaseGrid/ShowcaseGrid';
import {Link} from '../Link';

export function LinkShowcase() {
    return (
        <Showcase title="Link">
            <ShowcaseGrid
                rowKey="target"
                component={Link}
                propsCombinations={{
                    view: [
                        {
                            name: 'View normal',
                            value: 'normal',
                        },
                        {
                            name: 'View primary',
                            value: 'primary',
                        },
                        {
                            name: 'View secondary',
                            value: 'secondary',
                        },
                    ],
                    visitable: [
                        {
                            name: 'Not visitable',
                            value: false,
                        },
                        {
                            name: 'Visitable',
                            value: true,
                        },
                    ],
                    target: [
                        {
                            name: 'blank',
                            value: '_blank',
                        },
                        {
                            name: 'top',
                            value: '_top',
                        },
                    ],
                }}
                staticProps={{
                    children: 'Link',
                    href: '#',
                }}
            />
        </Showcase>
    );
}
