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

export function LinkExampleHref() {
    return (
        <DocsExample>
            <Link href="/">Link</Link>
        </DocsExample>
    );
}
LinkExampleHref.code = `
<Link href="/">Link</Link>
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
<Link href="/" visitable>Visitable link</Link>
<Link href="/" visitable={false}>Non visitable link</Link>
`.trim();

export function LinkExampleUsage() {
    return (
        <ul>
            <li>
                <Link href="/">what roles are active in the service</Link>
            </li>
            <li>
                <Text>
                    Currently, this role can only be assigned to a <Link href="/">folder</Link> or{' '}
                    <Link href="/">cloud</Link>
                </Text>
            </li>
        </ul>
    );
}
LinkExampleUsage.code = `
<Link href="/">what roles are active in the service</Link>
<Text>
    Currently, this role can only be assigned to a <Link href="/">folder</Link> or <Link href="/">cloud</Link>
</Text>
`.trim();
