'use client';

import * as React from 'react';

import {eventBroker} from './EventBroker';
import type {EventBrokerSubscription} from './EventBroker';

export function useEventBroker(subscription: EventBrokerSubscription, broker = eventBroker) {
    React.useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}
