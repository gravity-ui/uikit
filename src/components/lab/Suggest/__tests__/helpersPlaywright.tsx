import * as React from 'react';

import {composeStories} from '@storybook/react-webpack5';

import {ListVirtualizer} from '../../../../virtualizer';
import {LangProvider} from '../../../theme/LangProvider';
import {Suggest} from '../Suggest';
import * as SuggestStoriesModule from '../__stories__/Suggest.stories';

export const SuggestStories = composeStories(SuggestStoriesModule);

const OPTIONS = [{value: 'earth', content: 'Earth'}];

export function SuggestForm({empty = false}: {empty?: boolean}) {
    const [submitCount, setSubmitCount] = React.useState(0);
    const [selectedValue, setSelectedValue] = React.useState('');

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitCount((count) => count + 1);
            }}
        >
            <Suggest
                options={empty ? [] : OPTIONS}
                onOptionAction={(_value, option) => setSelectedValue(option.value)}
            />
            <button type="submit">Search</button>
            <output data-qa="submit-count">{submitCount}</output>
            <output data-qa="selected-value">{selectedValue}</output>
        </form>
    );
}

const PAGINATED_OPTIONS = Array.from({length: 80}, (_, index) => ({
    value: String(index),
    content: `Option ${index}`,
}));

export function SuggestPagination({virtualized}: {virtualized: boolean}) {
    const [loading, setLoading] = React.useState(false);
    const [count, setCount] = React.useState(40);
    const [requests, setRequests] = React.useState(0);
    const suggest = (
        <Suggest
            open
            options={PAGINATED_OPTIONS.slice(0, count)}
            loading={loading}
            onLoadMore={() => setRequests((value) => value + 1)}
            getOptionHeight={() => 32}
        />
    );
    return (
        <div style={{height: 500}}>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setLoading(true)}
            >
                Start loading
            </button>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                    setCount(80);
                    setLoading(false);
                }}
            >
                Finish loading
            </button>
            <output data-qa="load-requests">{requests}</output>
            {virtualized ? <ListVirtualizer>{suggest}</ListVirtualizer> : suggest}
        </div>
    );
}

export function SuggestWithLabel() {
    return (
        <Suggest
            open
            defaultValue="earth"
            options={OPTIONS}
            label="Planet"
            placeholder="Type to search"
        />
    );
}

export function SuggestInitiallyOpen() {
    return (
        <div style={{width: 320, margin: 40, height: 300}}>
            <Suggest defaultOpen options={OPTIONS} qa="initial-input" aria-label="Planets" />
        </div>
    );
}

export function SuggestWithPopupLayout({virtualized}: {virtualized: boolean}) {
    const suggest = (
        <Suggest
            open
            options={PAGINATED_OPTIONS}
            popupClassName="suggest-layout-popup"
            aria-label="Options"
            renderPopup={({renderList}) => (
                <div style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
                    <div data-qa="layout-header" style={{height: 48, flexShrink: 0}}>
                        Header
                    </div>
                    {renderList()}
                    <div data-qa="layout-footer" style={{height: 48, flexShrink: 0}}>
                        Footer
                    </div>
                </div>
            )}
        />
    );
    return (
        <div style={{width: 320, height: 500}}>
            <style>{'.suggest-layout-popup { max-height: 240px; }'}</style>
            {virtualized ? <ListVirtualizer>{suggest}</ListVirtualizer> : suggest}
        </div>
    );
}

export function SuggestStatus({lang}: {lang: 'en' | 'ru'}) {
    const [state, setState] = React.useState('loading');
    return (
        <LangProvider lang={lang}>
            <div style={{height: 400}}>
                {['loading', 'results', 'empty', 'error'].map((value) => (
                    <button key={value} onClick={() => setState(value)}>
                        {value}
                    </button>
                ))}
                <Suggest
                    open
                    aria-label="Planets"
                    loading={state === 'loading'}
                    options={state === 'results' ? OPTIONS : []}
                    renderPopup={
                        state === 'error'
                            ? () => <div role="status">Request failed</div>
                            : undefined
                    }
                />
            </div>
        </LangProvider>
    );
}
