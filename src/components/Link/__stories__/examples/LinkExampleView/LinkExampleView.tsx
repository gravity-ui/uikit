import React from 'react';

import {Link} from '../../..';
import {DocsExample} from '../../../../../demo/DocsExample/DocsExample';
import {Text} from '../../../../Text';

export function LinkExampleViewNormal() {
    return (
        <DocsExample>
            <Link view="normal" href="/">
                Link
            </Link>
        </DocsExample>
    );
}
LinkExampleViewNormal.code = `
<Link view="normal" href="/">
    Link
</Link>
`.trim();

export function LinkExampleViewPrimary() {
    return (
        <DocsExample>
            <Link view="primary" href="/">
                Link
            </Link>
        </DocsExample>
    );
}
LinkExampleViewPrimary.code = `
<Link view="primary" href="/">
    Link
</Link>
`.trim();

export function LinkExampleViewSecondary() {
    return (
        <DocsExample>
            <Link view="secondary" href="/">
                Link
            </Link>
        </DocsExample>
    );
}
LinkExampleViewSecondary.code = `
<Link view="secondary" href="/">
    Link
</Link>
`.trim();

export function LinkExampleVisitable() {
    return (
        <DocsExample>
            <Link href="/" visitable>
                Visitable link
            </Link>
            <Link href="/" visitable={false}>
                Non visitable link
            </Link>
        </DocsExample>
    );
}
LinkExampleVisitable.code = `
<Link href="https://gravity-ui.com/" visitable>Visitable link</Link>
<Link href="https://gravity-ui.com/" visitable={false}>Non visitable link</Link>
`.trim();

export function LinkExampleHref() {
    return (
        <DocsExample>
            <Link href="/">Link with href</Link>
            <Link>Link without href</Link>
        </DocsExample>
    );
}
LinkExampleHref.code = `
<Link href="/">Link with href</Link>
<Link>Link without href</Link>
`.trim();

export function LinkExampleUsage() {
    return (
        <ul>
            <li>
                <Text>
                    <Link>what roles are active in the service</Link>
                </Text>
            </li>
            <li>
                <Text>
                    Currently, this role can only be assigned to a <Link>folder</Link> or{' '}
                    <Link>cloud</Link>
                </Text>
            </li>
        </ul>
    );
}
LinkExampleUsage.code = `
<Text>
    <Link>what roles are active in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link>folder</Link> or <Link>cloud</Link>
</Text>
`.trim();
