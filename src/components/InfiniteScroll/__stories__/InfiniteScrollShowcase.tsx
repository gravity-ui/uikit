import React, {useState} from 'react';

import {InfiniteScroll} from '../InfiniteScroll';
import {emailsList, delay} from './utils';

export function InfiniteScrollShowcase() {
    const [emails, setEmails] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const isAllEmailsShown = emails.length >= emailsList.length;

    const fetchData = async () => {
        await delay(3000);
        setPage(page + 1);
        setEmails(emailsList.slice(0, (page + 1) * 10));
    };

    return (
        <InfiniteScroll onActivate={fetchData} disabled={isAllEmailsShown}>
            {emails.map((email, index) => (
                <li key={index} style={{lineHeight: '90px', fontSize: '54px'}}>
                    {email}
                </li>
            ))}
        </InfiniteScroll>
    );
}
