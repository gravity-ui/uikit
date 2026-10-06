import {Disclosure} from '../Disclosure';

export function DisclosureAnimationTest() {
    return (
        <div data-qa="animation-test">
            <Disclosure summary="Toggle" keepMounted={false}>
                <div data-qa="animation-content" style={{height: 24}}>
                    Content
                </div>
            </Disclosure>
        </div>
    );
}
