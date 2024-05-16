import React from 'react';

import {render} from '../../../../test-utils/utils';
import {Button} from '../../Button';
import {Text} from '../Text';

describe('Text', () => {
    describe('should return expected html', () => {
        test('if no props passed', () => {
            const {container} = render(<Text>Hello World!</Text>);

            expect(container).toMatchSnapshot();
        });

        test('if qa attr passed and variant changed', () => {
            const {container} = render(
                <Text qa="test" variant={'caption-1'}>
                    Hello World!
                </Text>,
            );

            expect(container).toMatchSnapshot();
        });

        test('if html attributes passed and changed default html tag and with typed ref', () => {
            const ComponentWithRef = () => {
                const ref = React.useRef<HTMLLabelElement>(null);

                return (
                    <Text as="label" htmlFor="some-id" ref={ref}>
                        Hello World!
                    </Text>
                );
            };

            const {container} = render(<ComponentWithRef />);

            expect(container).toMatchSnapshot();
        });

        test('if passed props what converted to classNames and styles', () => {
            const {container} = render(
                <Text
                    style={{width: 200}}
                    ellipsisLines={2}
                    ellipsis={true}
                    whiteSpace="break-spaces"
                    wordBreak="break-word"
                >
                    Hello World!
                </Text>,
            );

            expect(container).toMatchSnapshot();
        });

        test('with another component substitution', () => {
            const {container} = render(
                <Text as={Button} size={'m'} view="action">
                    Hello World!
                </Text>,
            );

            expect(container).toMatchSnapshot();
        });
    });
});
