import {Disclosure, DisclosureComposition, DisclosureProps} from './Disclosure';

export const ExportedDisclosure =
    Disclosure as unknown as React.FunctionComponent<DisclosureProps> & DisclosureComposition;

export {DisclosureSize, DisclosureArrowPosition, DisclosureProps} from './Disclosure';
