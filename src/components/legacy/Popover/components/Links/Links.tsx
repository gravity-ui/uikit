import * as React from 'react';

import {Link} from '../../../../Link';
import {cnPopover} from '../../Popover.classname';

export type LinksProps = {
    links: Array<{
        text: string;
        href: string;
        target?: '_self' | '_blank';
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    }>;
};

export const Links = ({links}: LinksProps) => {
    if (links.length === 0) {
        return null;
    }

    return (
        <div className={cnPopover('tooltip-links')}>
            {links.map((link, index) => {
                const {text, href, target = '_blank', onClick} = link;

                return (
                    <React.Fragment key={`link-${index}`}>
                        <Link
                            href={href}
                            target={target}
                            onClick={onClick}
                            className={cnPopover('tooltip-link')}
                        >
                            {text}
                        </Link>
                        <br />
                    </React.Fragment>
                );
            })}
        </div>
    );
};
