import {useEffect} from 'react';

import {EventBrokerSubscription, eventBroker} from './event-broker';

export function useEventBroker(subscription: EventBrokerSubscription, broker = eventBroker) {
    useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}
