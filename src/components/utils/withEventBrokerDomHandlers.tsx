import React, {SyntheticEvent} from 'react';
import {eventBroker, EventBrokerData} from './event-broker';

type SupportedEvents = 'onClick';

export function withEventBrokerDomHandlers<
    T extends Partial<{[k in SupportedEvents]: React.EventHandler<SyntheticEvent>}>,
>(
    Component: React.ComponentType<T>,
    eventTypes: Array<SupportedEvents>,
    eventBrokerData: Omit<EventBrokerData, 'eventId'>,
) {
    const componentName = Component.displayName || Component.name || 'Component';
    const displayName = `withEventBroker(${componentName})`;

    const LoggedComponent = React.forwardRef<HTMLElement, T>((props: T, ref) => {
        const decoratedHandlers = eventTypes.reduce((handlers, eventType) => {
            const originalHandler = props[eventType];
            return {
                ...handlers,
                [eventType]: (event: SyntheticEvent) => {
                    eventBroker.publish({
                        eventId: eventType.replace(/^on/, '').toLowerCase(),
                        domEvent: event,
                        ...eventBrokerData,
                    });
                    return originalHandler && originalHandler(event);
                },
            };
        }, {});
        return <Component {...props} {...decoratedHandlers} ref={ref} />;
    });
    LoggedComponent.displayName = displayName;

    return LoggedComponent;
}
