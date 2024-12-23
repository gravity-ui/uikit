'use client';

import {useEffect} from 'react';

import {eventBroker} from './EventBroker';
import type {EventBrokerSubscription} from './EventBroker';

export function useEventBroker(subscription: EventBrokerSubscription, broker = eventBroker) {
    useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}
