'use client';

import * as React from 'react';

import type {EventBrokerData} from './event-broker';
import {eventBroker} from './event-broker';
import {getComponentName} from './getComponentName';

type SupportedEvents = 'onClick' | 'onClickCapture';

export function withEventBrokerDomHandlers<
    T extends Partial<{[k in SupportedEvents]: React.EventHandler<React.SyntheticEvent>}>,
>(
    Component: React.ComponentType<React.PropsWithoutRef<T>>,
    eventTypes: Array<SupportedEvents>,
    eventBrokerData: Omit<EventBrokerData, 'eventId'>,
) {
    const componentName = getComponentName(Component);
    const displayName = `withEventBroker(${componentName})`;

    const LoggedComponent = React.forwardRef<HTMLElement, T>(
        (props: React.PropsWithoutRef<T>, ref) => {
            const decoratedHandlers = eventTypes.reduce((handlers, eventType) => {
                const originalHandler = props[eventType];
                return {
                    ...handlers,
                    [eventType]: (event: React.SyntheticEvent) => {
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
        },
    );
    LoggedComponent.displayName = displayName;

    return LoggedComponent;
}
