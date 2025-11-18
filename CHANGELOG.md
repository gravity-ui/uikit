# Changelog

## [7.26.0](https://github.com/gravity-ui/uikit/compare/v7.25.0...v7.26.0) (2025-11-07)


### Features

* add focus-outline mixin ([#2475](https://github.com/gravity-ui/uikit/issues/2475)) ([3b49eaa](https://github.com/gravity-ui/uikit/commit/3b49eaa8c0559e97378fb08dcb2b288841993966))
* **Select:** extend return type of `renderCounter` prop ([#2476](https://github.com/gravity-ui/uikit/issues/2476)) ([b79f0b0](https://github.com/gravity-ui/uikit/commit/b79f0b0842c399ae639401570ca340b69f0a9ccf))


### Bug Fixes

* **Popover:** ignore click trigger if hover also enabled ([#2485](https://github.com/gravity-ui/uikit/issues/2485)) ([6caddab](https://github.com/gravity-ui/uikit/commit/6caddabfc543426de3edecd1c772abb52c55632e))
* **unstable_Menu:** fix behavior inside floating components ([#2489](https://github.com/gravity-ui/uikit/issues/2489)) ([190ed32](https://github.com/gravity-ui/uikit/commit/190ed322d58d45d5bdc7ba9e010a69bb5ae87a47))

## [7.25.0](https://github.com/gravity-ui/uikit/compare/v7.24.0...v7.25.0) (2025-10-29)


### Features

* **Toaster:** add support for rendering user component in actions ([#2462](https://github.com/gravity-ui/uikit/issues/2462)) ([94ad2d0](https://github.com/gravity-ui/uikit/commit/94ad2d069424ec9c3af6e45a6efe9fc4065fca68))


### Bug Fixes

* **Dialog:** fix broken animation with header tags ([#2465](https://github.com/gravity-ui/uikit/issues/2465)) ([3c9ed9b](https://github.com/gravity-ui/uikit/commit/3c9ed9b8a6c6b8ad334edf4a77c34d6239545870))
* replace usages of `React.useId` with `useUniqId` ([#2472](https://github.com/gravity-ui/uikit/issues/2472)) ([fbeef03](https://github.com/gravity-ui/uikit/commit/fbeef035dbfa7ef820568ca187e794c0bec89ee8))
* **TabList:** respect event default prevention ([#2463](https://github.com/gravity-ui/uikit/issues/2463)) ([3237f1f](https://github.com/gravity-ui/uikit/commit/3237f1f285a7f6cabca4c72020645ef0ddf81e3f))

## [7.24.0](https://github.com/gravity-ui/uikit/compare/v7.23.0...v7.24.0) (2025-10-14)


### Features

* add new hoc withPlatform ([#2431](https://github.com/gravity-ui/uikit/issues/2431)) ([b5e8841](https://github.com/gravity-ui/uikit/commit/b5e8841356f0d34f95ef9510ffcfceaea5ae9bef))
* **Hotkey:** remove mac esc icon ([#2449](https://github.com/gravity-ui/uikit/issues/2449)) ([43c5e9f](https://github.com/gravity-ui/uikit/commit/43c5e9f66130d27e6a683c92f3f73294b0f74936))
* **Switch:** add 's' size option and loading state support ([#2438](https://github.com/gravity-ui/uikit/issues/2438)) ([77143ab](https://github.com/gravity-ui/uikit/commit/77143abf6d355517748e5d1b378104200a6be8c4))


### Bug Fixes

* add 'use client' to lang context ([#2444](https://github.com/gravity-ui/uikit/issues/2444)) ([1d4fe5c](https://github.com/gravity-ui/uikit/commit/1d4fe5c1bb612c2806c28512591588858f5d1c8e))
* **Breadcrumbs:** use disabled prop on BreadcrumbItem inside custom item ([#2454](https://github.com/gravity-ui/uikit/issues/2454)) ([5803cab](https://github.com/gravity-ui/uikit/commit/5803cab159976441934987d5b513459d6d0456ac))
* **Button:** set a tabIndex so that Safari allows focusing buttons ([#2440](https://github.com/gravity-ui/uikit/issues/2440)) ([c60e58d](https://github.com/gravity-ui/uikit/commit/c60e58d1a5924f87c1c9380f45dd867ccd7a5106))

## [7.23.0](https://github.com/gravity-ui/uikit/compare/v7.22.0...v7.23.0) (2025-09-18)


### Features

* **TableColumnSetup:** add hideApplyButton property ([#2435](https://github.com/gravity-ui/uikit/issues/2435)) ([a0e5c1a](https://github.com/gravity-ui/uikit/commit/a0e5c1abb9075b47aa55261b230324138783e6e6))


### Bug Fixes

* **Accordion:** disclosure animation override specificity ([#2412](https://github.com/gravity-ui/uikit/issues/2412)) ([6b71c28](https://github.com/gravity-ui/uikit/commit/6b71c288dc6c5fc93bf431d8df8337c0615ece2a))
* remove [@ts-ignore](https://github.com/ts-ignore) from Menu ([#2427](https://github.com/gravity-ui/uikit/issues/2427)) ([6e7d511](https://github.com/gravity-ui/uikit/commit/6e7d511853d38c9ee58e1686d4495c376630a5c9))

## [7.22.0](https://github.com/gravity-ui/uikit/compare/v7.21.0...v7.22.0) (2025-09-09)


### Features

* add `Accordion` component ([#2334](https://github.com/gravity-ui/uikit/issues/2334)) ([9e71e64](https://github.com/gravity-ui/uikit/commit/9e71e6479c44a121678fbd4ac592ebc85b1db12f))
* **Icon:** add `style` prop ([#2406](https://github.com/gravity-ui/uikit/issues/2406)) ([51a9e1f](https://github.com/gravity-ui/uikit/commit/51a9e1ff97380b6e62166d3203690766ee96fd1f))

## [7.21.0](https://github.com/gravity-ui/uikit/compare/v7.20.0...v7.21.0) (2025-09-05)


### Features

* add max-width to popup table action ([#2311](https://github.com/gravity-ui/uikit/issues/2311)) ([3aeb886](https://github.com/gravity-ui/uikit/commit/3aeb886661cf48f615adf4a272dcf84c23e6828a))
* add useLang hook, allow pass lang via ThemeProvider ([#2387](https://github.com/gravity-ui/uikit/issues/2387)) ([0966e86](https://github.com/gravity-ui/uikit/commit/0966e865fe7486302350dccd330cbda5f74d066d))
* **Label:** add `width` property ([#2348](https://github.com/gravity-ui/uikit/issues/2348)) ([0dd70b8](https://github.com/gravity-ui/uikit/commit/0dd70b8de1184f9ea0e26e5e5e3815d11e2ea547))

## [7.20.0](https://github.com/gravity-ui/uikit/compare/v7.19.0...v7.20.0) (2025-08-15)


### Features

* use `@hello-pangea/dnd` instead of `react-beautiful-dnd` ([#2380](https://github.com/gravity-ui/uikit/issues/2380)) ([eec8953](https://github.com/gravity-ui/uikit/commit/eec8953b5a472a1d21dfc1fafd67b700781ac089))


### Bug Fixes

* **DefinitionList:** should not overflow parent container ([#2384](https://github.com/gravity-ui/uikit/issues/2384)) ([a82e5d2](https://github.com/gravity-ui/uikit/commit/a82e5d2dee9c46b06ab0a3b63a0460bd1eee26d7))
* fix line-height style in font variables ([#2382](https://github.com/gravity-ui/uikit/issues/2382)) ([c4d2769](https://github.com/gravity-ui/uikit/commit/c4d2769bedd0f08ba3afa7af50dae84a6fe20bbc))

## [7.19.0](https://github.com/gravity-ui/uikit/compare/v7.18.1...v7.19.0) (2025-08-08)


### Features

* **PlaceholderContainer:** add pin to props of action ([#2358](https://github.com/gravity-ui/uikit/issues/2358)) ([b25eca1](https://github.com/gravity-ui/uikit/commit/b25eca1c73f4735e6884c46436de7aa64860477e))


### Bug Fixes

* **Select:** add `type=button` in error message button ([#2374](https://github.com/gravity-ui/uikit/issues/2374)) ([723396b](https://github.com/gravity-ui/uikit/commit/723396bf18098754f0f51c918f7abf5d2acb695d))
* **Select:** fix pin styles ([#2371](https://github.com/gravity-ui/uikit/issues/2371)) ([7151ac5](https://github.com/gravity-ui/uikit/commit/7151ac5000a9101f6305fe2393a4d4e482a3c5eb))

## [7.18.1](https://github.com/gravity-ui/uikit/compare/v7.18.0...v7.18.1) (2025-08-04)


### Bug Fixes

* **Breadcrumbs:** fix current item box-sizing ([#2370](https://github.com/gravity-ui/uikit/issues/2370)) ([cdeb3fa](https://github.com/gravity-ui/uikit/commit/cdeb3fa4ac96119a49e221864cd138c98b0908bf))
* **DefinitionList:** fix styles of note alignment ([#2366](https://github.com/gravity-ui/uikit/issues/2366)) ([a959bbc](https://github.com/gravity-ui/uikit/commit/a959bbc55b658a716abebffefbf6535c5e1734da))

## [7.18.0](https://github.com/gravity-ui/uikit/compare/v7.17.0...v7.18.0) (2025-07-31)


### Features

* **Popup:** add `--g-popup-border-radius` CSS API ([#2363](https://github.com/gravity-ui/uikit/issues/2363)) ([43de219](https://github.com/gravity-ui/uikit/commit/43de2199d742ba3f79711a5ba48c5449e442cffe))


### Bug Fixes

* **Breadcrumbs:** use offsetWidth to measure root element ([#2352](https://github.com/gravity-ui/uikit/issues/2352)) ([5d1b0eb](https://github.com/gravity-ui/uikit/commit/5d1b0ebf1775bf2182df7dfec7a67296f4d30b12))
* **Button:** raised button has incorrect background color apperance ([#2355](https://github.com/gravity-ui/uikit/issues/2355)) ([7c34534](https://github.com/gravity-ui/uikit/commit/7c3453452a308826d191490d0175425995f6a049))
* **Modal:** fix closing not nested parent Modals ([#2351](https://github.com/gravity-ui/uikit/issues/2351)) ([f795fbc](https://github.com/gravity-ui/uikit/commit/f795fbce64795d9be627dda6dc6c2d5c772835a6))
* **Toaster:** add vertical gap for wrapped actions ([#2362](https://github.com/gravity-ui/uikit/issues/2362)) ([58ac8b6](https://github.com/gravity-ui/uikit/commit/58ac8b6848a1f905b837a4bb55b9ff19ac97fe2e))

## [7.17.0](https://github.com/gravity-ui/uikit/compare/v7.16.2...v7.17.0) (2025-07-18)


### Features

* **ClipboardButton:** add `icon` prop ([#2237](https://github.com/gravity-ui/uikit/issues/2237)) ([a6f00a3](https://github.com/gravity-ui/uikit/commit/a6f00a31cf2ac0abeef3b5422d92e867b80fa345))
* **CopyToClipboard:** reexport copyText function ([#2340](https://github.com/gravity-ui/uikit/issues/2340)) ([eb5a007](https://github.com/gravity-ui/uikit/commit/eb5a0075bf37b3c162ddf70437e68ae8fd47cccf))
* selectively handle reduced motion setting ([#2345](https://github.com/gravity-ui/uikit/issues/2345)) ([621adf4](https://github.com/gravity-ui/uikit/commit/621adf4f4ca7efd31fdc0b07e9b344e901c1d5bc))
* **Tooltip:** dismiss on ancestor scroll by default ([#2344](https://github.com/gravity-ui/uikit/issues/2344)) ([2dee62f](https://github.com/gravity-ui/uikit/commit/2dee62f16d2f0e85fd1ec596e4dbc3be6d6922e2))


### Bug Fixes

* fix pin mixin generating extra CSS ([#2341](https://github.com/gravity-ui/uikit/issues/2341)) ([4d068a9](https://github.com/gravity-ui/uikit/commit/4d068a9d2bf6390970c904e15bb646ddc7438e1a))
* fix reduced motion behavior ([#2332](https://github.com/gravity-ui/uikit/issues/2332)) ([8075214](https://github.com/gravity-ui/uikit/commit/80752145ce50d914c208b47f551b6a8577534f3d))
* **HelpMark:** fix alignment inside bigger texts ([#2339](https://github.com/gravity-ui/uikit/issues/2339)) ([f40da24](https://github.com/gravity-ui/uikit/commit/f40da2404c4f77332d65ff3823aa5a109d3ea61c))
* **Modal:** fix transition and overflow styles ([#2333](https://github.com/gravity-ui/uikit/issues/2333)) ([bd1b5ba](https://github.com/gravity-ui/uikit/commit/bd1b5ba8b8529dd349124e0be642e9a47324a1a6))

## [7.16.2](https://github.com/gravity-ui/uikit/compare/v7.16.1...v7.16.2) (2025-06-28)


### Bug Fixes

* **build:** treeshaking ([#2324](https://github.com/gravity-ui/uikit/issues/2324)) ([479815a](https://github.com/gravity-ui/uikit/commit/479815a5098e878c94b21907cd0c70262e8854d2))

## [7.16.1](https://github.com/gravity-ui/uikit/compare/v7.16.0...v7.16.1) (2025-06-26)


### Bug Fixes

* **HelpMark:** fix component alignment within the text ([#2316](https://github.com/gravity-ui/uikit/issues/2316)) ([ca692d2](https://github.com/gravity-ui/uikit/commit/ca692d2e6a45454a727909c27ba504e18a5f9000))
* **NumberInput:** controlled behaviour with changed input and unchanged value prop ([#2317](https://github.com/gravity-ui/uikit/issues/2317)) ([8bab288](https://github.com/gravity-ui/uikit/commit/8bab2883b0245da6f439a353338865008b47de30))
* **NumberInput:** fix input pattern in case of using allowDecimal ([#2322](https://github.com/gravity-ui/uikit/issues/2322)) ([4f9dabf](https://github.com/gravity-ui/uikit/commit/4f9dabf2b63c197ddfd10571bb7a1ccae440b4f6))
* **NumberInput:** restrict redefining onInput prop ([#2323](https://github.com/gravity-ui/uikit/issues/2323)) ([f8f45db](https://github.com/gravity-ui/uikit/commit/f8f45db568656c8381473ef4f685e90e002d14b5))

## [7.16.0](https://github.com/gravity-ui/uikit/compare/v7.15.0...v7.16.0) (2025-06-24)


### Features

* **Label:** add loading property ([#2297](https://github.com/gravity-ui/uikit/issues/2297)) ([605fb64](https://github.com/gravity-ui/uikit/commit/605fb646614ad57a5b6c9f4549ed4f965c5ee725))
* **SegmentedRadioGroup:** allow `children` composition ([#2310](https://github.com/gravity-ui/uikit/issues/2310)) ([0f808f7](https://github.com/gravity-ui/uikit/commit/0f808f7f10a6eacab5258d0e94235539823ccbbd))
* **Table:** add `rowActionsIcon` prop ([#2301](https://github.com/gravity-ui/uikit/issues/2301)) ([6fde26d](https://github.com/gravity-ui/uikit/commit/6fde26d47f89649a711959d861c1b90cc5bfbf9f))


### Bug Fixes

* **Breadcrumbs:** сollapsing crumbs for the react 17 ([#2313](https://github.com/gravity-ui/uikit/issues/2313)) ([451c3ec](https://github.com/gravity-ui/uikit/commit/451c3ec212c0701146c3272b8e3f65fef5e00eed))

## [7.15.0](https://github.com/gravity-ui/uikit/compare/v7.14.0...v7.15.0) (2025-06-17)


### Features

* **CopyToClipboard:** add fallback for copyText ([#2304](https://github.com/gravity-ui/uikit/issues/2304)) ([2fcefd7](https://github.com/gravity-ui/uikit/commit/2fcefd7bea8dcf6e1120625ab8ba8717aa444cfc))
* **Label:** allow ReactNode as value ([#2306](https://github.com/gravity-ui/uikit/issues/2306)) ([6c41e0d](https://github.com/gravity-ui/uikit/commit/6c41e0dee0f33574af257cffb54732afc7dc3dad))


### Bug Fixes

* **layout:** add prop to fix breakpoints behavior on "s" media ([#2281](https://github.com/gravity-ui/uikit/issues/2281)) ([b1cd654](https://github.com/gravity-ui/uikit/commit/b1cd65431d6ab1c4b12fc7dce5a52e80ed8feecc))
* next.js RSC ([#2308](https://github.com/gravity-ui/uikit/issues/2308)) ([7e4d3bb](https://github.com/gravity-ui/uikit/commit/7e4d3bb700e403e0f6f7e71837fc094a41b37032))

## [7.14.0](https://github.com/gravity-ui/uikit/compare/v7.13.1...v7.14.0) (2025-06-09)


### Features

* add prop 'maxWidth' to PlaceholderContainer component ([#2296](https://github.com/gravity-ui/uikit/issues/2296)) ([40b9973](https://github.com/gravity-ui/uikit/commit/40b997305a4d7f9c39ad119231a2a6e2f1eab76b))
* **Alert:** add `clear` theme ([#2241](https://github.com/gravity-ui/uikit/issues/2241)) ([3f3fcb6](https://github.com/gravity-ui/uikit/commit/3f3fcb62c2f98dc195ee636a12de95bfa24d5c51))


### Bug Fixes

* **Hotkey:** fix styles ([#2274](https://github.com/gravity-ui/uikit/issues/2274)) ([09dcbdf](https://github.com/gravity-ui/uikit/commit/09dcbdf4b4c7dc87727250e6d77f96f8bf82575a))
* **ThemeProvider:** do not set direction in case of null body ([#2289](https://github.com/gravity-ui/uikit/issues/2289)) ([c4f8e1c](https://github.com/gravity-ui/uikit/commit/c4f8e1c59138ed1baa3c41ef7d947186f77803e2))

## [7.13.1](https://github.com/gravity-ui/uikit/compare/v7.13.0...v7.13.1) (2025-06-02)


### Bug Fixes

* **TextInput:** separate inline padding for error icon ([#2285](https://github.com/gravity-ui/uikit/issues/2285)) ([75cf80d](https://github.com/gravity-ui/uikit/commit/75cf80d323317d2606686b560b25b15376d6558b))

## [7.13.0](https://github.com/gravity-ui/uikit/compare/v7.12.0...v7.13.0) (2025-06-02)


### Features

* **Avatar:** add square shape ([#2275](https://github.com/gravity-ui/uikit/issues/2275)) ([60b9655](https://github.com/gravity-ui/uikit/commit/60b9655a75a5d1884eeb6c69761e8d0f44654331))


### Bug Fixes

* **Dialog:** remove Dialog.Body content node ([#2283](https://github.com/gravity-ui/uikit/issues/2283)) ([e6c43a2](https://github.com/gravity-ui/uikit/commit/e6c43a2ecc02cb333b849b978ba32e49b7f1aee9))
* **TextInput:** padding for error icon when can clear ([#2284](https://github.com/gravity-ui/uikit/issues/2284)) ([c2718d7](https://github.com/gravity-ui/uikit/commit/c2718d7d08558d6e7b913dec01dbe04ed7b7a2d3))

## [7.12.0](https://github.com/gravity-ui/uikit/compare/v7.11.0...v7.12.0) (2025-05-22)


### Features

* add Portal props to more components ([#2267](https://github.com/gravity-ui/uikit/issues/2267)) ([37c383c](https://github.com/gravity-ui/uikit/commit/37c383ced33923c10b9aed7f20b93b733fd90171))
* **Slider:** add inverted property ([#2263](https://github.com/gravity-ui/uikit/issues/2263)) ([62c3c6f](https://github.com/gravity-ui/uikit/commit/62c3c6f9be285769522703580cc8470af021e543))


### Bug Fixes

* **ClipboardButton:** correct types ([#2273](https://github.com/gravity-ui/uikit/issues/2273)) ([c7baeb6](https://github.com/gravity-ui/uikit/commit/c7baeb6e60ea1157f5080e2a58cc0e4aa33bcf53))
* **Dialog:** handle height change mid animation ([#2265](https://github.com/gravity-ui/uikit/issues/2265)) ([6b6ddfc](https://github.com/gravity-ui/uikit/commit/6b6ddfc1b70b916f51e738fc9d1cae33382a80d1))
* **Dialog:** handle ResizeObserver loop error ([#2247](https://github.com/gravity-ui/uikit/issues/2247)) ([f024aad](https://github.com/gravity-ui/uikit/commit/f024aad833b5816487eca105ffbe708574226bb3))
* **unstable_Menu:** tweak paddings and offsets ([#2276](https://github.com/gravity-ui/uikit/issues/2276)) ([0d5d026](https://github.com/gravity-ui/uikit/commit/0d5d026480ebb56731a875824f0f009c69e4ccec))

## [7.11.0](https://github.com/gravity-ui/uikit/compare/v7.10.0...v7.11.0) (2025-05-07)


### Features

* **HelpMark:** add size prop ([#2257](https://github.com/gravity-ui/uikit/issues/2257)) ([7e5cd7f](https://github.com/gravity-ui/uikit/commit/7e5cd7f807c45913c3880c6fcb705344d11c5b9a))
* **Label:** added "info" type label ([#2256](https://github.com/gravity-ui/uikit/issues/2256)) ([e5f5d8e](https://github.com/gravity-ui/uikit/commit/e5f5d8e40d52170655d4a9dd1f1a123faeb8936b))
* new Menu implementation ([#2106](https://github.com/gravity-ui/uikit/issues/2106)) ([07c9bd8](https://github.com/gravity-ui/uikit/commit/07c9bd8d29a71ea7027b4f60c1fea01437d3f589))
* **Skeleton:** add `animation` property ([#2205](https://github.com/gravity-ui/uikit/issues/2205)) ([15ff59d](https://github.com/gravity-ui/uikit/commit/15ff59d5101bffa5c92111a67482a27a5fb70239))


### Bug Fixes

* **DropdownMenu:** make submenu items inherit size ([#2248](https://github.com/gravity-ui/uikit/issues/2248)) ([6730977](https://github.com/gravity-ui/uikit/commit/6730977ff44643468873497c2e3ca8cfe4f83423))
* **Label:** adjust interactive label button height ([#2259](https://github.com/gravity-ui/uikit/issues/2259)) ([e0ac7d1](https://github.com/gravity-ui/uikit/commit/e0ac7d1c5a9eaf00424aa899c0b8edef2affc21a))
* **Label:** fixed hover state for Label with type "copy" ([#2260](https://github.com/gravity-ui/uikit/issues/2260)) ([1743a02](https://github.com/gravity-ui/uikit/commit/1743a02d6e403141d89e54315984e37754e9a102))
* **Select:** fix closing inside Dialog ([#2252](https://github.com/gravity-ui/uikit/issues/2252)) ([2dab74c](https://github.com/gravity-ui/uikit/commit/2dab74c381eff764f15cb4d8c9898c521672590e))
* smaller textinput icons for storybook ([#2250](https://github.com/gravity-ui/uikit/issues/2250)) ([e2b91bf](https://github.com/gravity-ui/uikit/commit/e2b91bf0c6e20f9e2ca7a14539342cc69885ad07))

## [7.10.0](https://github.com/gravity-ui/uikit/compare/v7.9.1...v7.10.0) (2025-04-23)


### Features

* **Popover:** add zIndex to Popover props ([#2239](https://github.com/gravity-ui/uikit/issues/2239)) ([459459e](https://github.com/gravity-ui/uikit/commit/459459e99fb6e830faf18083dce8593441015dcd))
* **Sheet:** add alwaysFullHeight prop ([#2088](https://github.com/gravity-ui/uikit/issues/2088)) ([2c65f8a](https://github.com/gravity-ui/uikit/commit/2c65f8a1c20f3d56f32bece326251906db120f2c))
* **Sheet:** add maxContentHeightCoefficient prop ([#2225](https://github.com/gravity-ui/uikit/issues/2225)) ([f3c307f](https://github.com/gravity-ui/uikit/commit/f3c307f21dcf68b70d0adb768e462e70b4a861e3))
* **Table:** add `meta.displayName` column property ([#2238](https://github.com/gravity-ui/uikit/issues/2238)) ([3fd66c0](https://github.com/gravity-ui/uikit/commit/3fd66c0602310191769c12b1a65ba3fecd4c8236))
* update dependencies ([#2224](https://github.com/gravity-ui/uikit/issues/2224)) ([0e7bef8](https://github.com/gravity-ui/uikit/commit/0e7bef8fc655d5376ce83bc2bafb8f55c6e744b9))


### Bug Fixes

* **Breadcrumbs:** change more button border radius to default --g-border-radius-m ([#2231](https://github.com/gravity-ui/uikit/issues/2231)) ([8a48f52](https://github.com/gravity-ui/uikit/commit/8a48f529b3e7d4b55bd45181a0f1fec5e89a9f07))
* **Dialog:** pass className to `DialogBody` content ([#2242](https://github.com/gravity-ui/uikit/issues/2242)) ([8dd8ed7](https://github.com/gravity-ui/uikit/commit/8dd8ed7e21b1d446f20a008b30a92c18e64ce937))
* **Popover:** remove force safePolygon workaround ([#2228](https://github.com/gravity-ui/uikit/issues/2228)) ([5c6fa9c](https://github.com/gravity-ui/uikit/commit/5c6fa9ccdd251a25faba35e97b4d641a2da87894))
* **Popover:** reuse props types from Popup ([#2227](https://github.com/gravity-ui/uikit/issues/2227)) ([57f66e1](https://github.com/gravity-ui/uikit/commit/57f66e153b832c8d70839c6518fb65456c9154d0))
* replace custom icons examples (stepper, breadcrumbs) to uikit-examples in README for landing ([#2234](https://github.com/gravity-ui/uikit/issues/2234)) ([7df747f](https://github.com/gravity-ui/uikit/commit/7df747ff5162bc6ff2a89a8b30b74a4fb15ca07d))
* **Select:** fix default control hitbox area during scale animation ([#2230](https://github.com/gravity-ui/uikit/issues/2230)) ([44224a3](https://github.com/gravity-ui/uikit/commit/44224a32a4be7dee11f651e945a2b796677b7ea0))
* tree shaking when using configure ([#2232](https://github.com/gravity-ui/uikit/issues/2232)) ([56d73af](https://github.com/gravity-ui/uikit/commit/56d73afa23e82094a6ff1307514e82a5b921da3e))


### Performance Improvements

* **Table:** do not create empty values array in getBodyCellContent ([#2243](https://github.com/gravity-ui/uikit/issues/2243)) ([02cc9f8](https://github.com/gravity-ui/uikit/commit/02cc9f8e32dcb61b37cfd11ea839915f430cc449))

## [7.9.1](https://github.com/gravity-ui/uikit/compare/v7.9.0...v7.9.1) (2025-04-08)


### Bug Fixes

* **Label:** use `body-short` font for text content ([#2220](https://github.com/gravity-ui/uikit/issues/2220)) ([090daea](https://github.com/gravity-ui/uikit/commit/090daea4daefadccdf439146a4bfd97b87769870))

## [7.9.0](https://github.com/gravity-ui/uikit/compare/v7.8.0...v7.9.0) (2025-04-04)


### Features

* **Divider:** use height block as separator ([#2211](https://github.com/gravity-ui/uikit/issues/2211)) ([36f9741](https://github.com/gravity-ui/uikit/commit/36f97415d99fa9e188d34365235774a69abecdaf))
* extract mergeRefs helper from useForkRef ([#2198](https://github.com/gravity-ui/uikit/issues/2198)) ([4efd2bc](https://github.com/gravity-ui/uikit/commit/4efd2bc777ce7a62706157f6819cce310f8a0614))
* **FilePreview:** add export of FilePreviewAction type ([#2209](https://github.com/gravity-ui/uikit/issues/2209)) ([0ae6fdf](https://github.com/gravity-ui/uikit/commit/0ae6fdfe8777a239ab3eb21e06c3626d6e59b38a))
* **Select:** add labeling props for control ([#2171](https://github.com/gravity-ui/uikit/issues/2171)) ([9679c9c](https://github.com/gravity-ui/uikit/commit/9679c9c641d3355cce047dab760188f79842d574))
* **Tabs:** pass all props to the root component ([#2216](https://github.com/gravity-ui/uikit/issues/2216)) ([1053598](https://github.com/gravity-ui/uikit/commit/1053598cd9dd68ab6a3305ae9d573aed96838f9e))


### Bug Fixes

* add export for Stepper component ([#2214](https://github.com/gravity-ui/uikit/issues/2214)) ([826ee67](https://github.com/gravity-ui/uikit/commit/826ee6781e15279b9110d776255551a3e70c6974))
* **FilePreview:** fix actions type for compact view ([#2208](https://github.com/gravity-ui/uikit/issues/2208)) ([9942517](https://github.com/gravity-ui/uikit/commit/9942517c33ced36c3cf4a4cc0f0efcba41e059ac))
* **HelpMark:** icon alignment ([#2153](https://github.com/gravity-ui/uikit/issues/2153)) ([3dc063d](https://github.com/gravity-ui/uikit/commit/3dc063dfa6ac64dd40fd0bfe1ee3c306e8f35021))

## [7.8.0](https://github.com/gravity-ui/uikit/compare/v7.7.1...v7.8.0) (2025-03-31)


### Features

* add link reset mixin ([#2199](https://github.com/gravity-ui/uikit/issues/2199)) ([9f348f7](https://github.com/gravity-ui/uikit/commit/9f348f7bbde9e8713ae5b569ab13d12bf342b113))
* always render Modal and Popup with FloatingTree ([#2200](https://github.com/gravity-ui/uikit/issues/2200)) ([a26c812](https://github.com/gravity-ui/uikit/commit/a26c812ed81d79c766593fae3679a7ecea75626c))
* **Breadcrumbs:** allow to display content after the last breadcrumb item ([#2193](https://github.com/gravity-ui/uikit/issues/2193)) ([6086c01](https://github.com/gravity-ui/uikit/commit/6086c0182b402c58c4e9e0892ac6bd63c7e07122))


### Bug Fixes

* **Breadcrumbs:** do not set `title` property for `BreadcrumbsItem` by default ([#2196](https://github.com/gravity-ui/uikit/issues/2196)) ([18b822a](https://github.com/gravity-ui/uikit/commit/18b822a388653565497f6be5ecfaa0a204f0109d))

## [7.7.1](https://github.com/gravity-ui/uikit/compare/v7.7.0...v7.7.1) (2025-03-28)


### Bug Fixes

* **Popover:** always enable safePolygon to workaround `useHover` issue ([#2190](https://github.com/gravity-ui/uikit/issues/2190)) ([f8c5277](https://github.com/gravity-ui/uikit/commit/f8c52776c9a48ab03a455ac6ca8b86ad47d530bd))
* **Popover:** correct positioning in React 19 ([#2189](https://github.com/gravity-ui/uikit/issues/2189)) ([52de624](https://github.com/gravity-ui/uikit/commit/52de624ca350cac95029fb582ebb3bf30a66c66d))
* **types:** support pass var with type React.CSSProperties to style prop ([#2186](https://github.com/gravity-ui/uikit/issues/2186)) ([9f4ae43](https://github.com/gravity-ui/uikit/commit/9f4ae43324b96117b4d7b30cf39812aeb0c4a6fd))

## [7.7.0](https://github.com/gravity-ui/uikit/compare/v7.6.0...v7.7.0) (2025-03-26)


### Features

* **Disclosure:** dynamic Qa ([#2180](https://github.com/gravity-ui/uikit/issues/2180)) ([f95ced7](https://github.com/gravity-ui/uikit/commit/f95ced731da4952c072dba378d506f52bd2ea1ff))
* **Modal:** add CSS API for width and height ([#2009](https://github.com/gravity-ui/uikit/issues/2009)) ([4924e39](https://github.com/gravity-ui/uikit/commit/4924e39f990d5bac06e3e2eb38180554cd252db2))
* **Modal:** height animation ([#2076](https://github.com/gravity-ui/uikit/issues/2076)) ([a963578](https://github.com/gravity-ui/uikit/commit/a96357836051dcb4f7399085e31ab22a9bb9ae68))
* **Slider:** add startPoint property ([#2158](https://github.com/gravity-ui/uikit/issues/2158)) ([0d1ab19](https://github.com/gravity-ui/uikit/commit/0d1ab191df5afbe61493b6b12877e084dd095d62))


### Bug Fixes

* `disable` prop affects interactions in Tooltip and Popover ([#2183](https://github.com/gravity-ui/uikit/issues/2183)) ([1f86e70](https://github.com/gravity-ui/uikit/commit/1f86e70c69763f43fe2f7cd7b196f230ba66181c))
* **FilePreview:** add export of getFileType utility ([#2185](https://github.com/gravity-ui/uikit/issues/2185)) ([02bf8d9](https://github.com/gravity-ui/uikit/commit/02bf8d958f263b5e76a206454ec261be3c48f800))
* **Tooltip:** correct positioning in React 19 ([#2184](https://github.com/gravity-ui/uikit/issues/2184)) ([b3a9c5c](https://github.com/gravity-ui/uikit/commit/b3a9c5c41dd4f97c7a0fb89c7bf1deedbe30e1d2))
* **useUniqId:** fix build with Webpack and React 17 ([#2182](https://github.com/gravity-ui/uikit/issues/2182)) ([c2cfbea](https://github.com/gravity-ui/uikit/commit/c2cfbeab6078dc141db04ea633e6306be8933c9a))

## [7.6.0](https://github.com/gravity-ui/uikit/compare/v7.5.1...v7.6.0) (2025-03-21)


### Features

* **Checkbox:** add xl size ([#2144](https://github.com/gravity-ui/uikit/issues/2144)) ([9b7858f](https://github.com/gravity-ui/uikit/commit/9b7858f4afdfa8cdb9b40b6225ff25e596a73c28))
* **DefinitionList:** add qa ([#2170](https://github.com/gravity-ui/uikit/issues/2170)) ([8367d6a](https://github.com/gravity-ui/uikit/commit/8367d6ac07d649c364039473afa663c4550c0994))
* **FilePreview:** add compact view ([#2157](https://github.com/gravity-ui/uikit/issues/2157)) ([48f0743](https://github.com/gravity-ui/uikit/commit/48f0743c8e831e20a965ca4165fdf073e45a6b76))
* **FilePreview:** add selected state ([#2174](https://github.com/gravity-ui/uikit/issues/2174)) ([4ad9156](https://github.com/gravity-ui/uikit/commit/4ad9156d6afad34e96c42704b98b0fea2a493326))
* implement Stepper component ([#2098](https://github.com/gravity-ui/uikit/issues/2098)) ([a0b5740](https://github.com/gravity-ui/uikit/commit/a0b574008dcb0be508a2f87458f8d10972c37886))
* **Table:** add qa ([#2169](https://github.com/gravity-ui/uikit/issues/2169)) ([343ba6b](https://github.com/gravity-ui/uikit/commit/343ba6b12e91f44a6cea94f9c1099a16b7ef31f6))


### Bug Fixes

* **Popover:** non modal behavior by default ([#2163](https://github.com/gravity-ui/uikit/issues/2163)) ([40a500f](https://github.com/gravity-ui/uikit/commit/40a500fd68583af15afce31c1ecc480edc3a3f0c))
* style prop type for Button and Link ([#2162](https://github.com/gravity-ui/uikit/issues/2162)) ([2d0db5e](https://github.com/gravity-ui/uikit/commit/2d0db5ec2feba9f1247c282810340634fde4c256))
* **TextArea:** automatic height calculation ([#2166](https://github.com/gravity-ui/uikit/issues/2166)) ([56ce7b3](https://github.com/gravity-ui/uikit/commit/56ce7b3d6ff43dac82b8c3f70e933e4355f76541))

## [7.5.1](https://github.com/gravity-ui/uikit/compare/v7.5.0...v7.5.1) (2025-03-05)


### Bug Fixes

* **DialogFooter:** extend types for propsButtonApply and propsButtonC… ([#2145](https://github.com/gravity-ui/uikit/issues/2145)) ([49d6529](https://github.com/gravity-ui/uikit/commit/49d65297c95e0354312b1f6fbeaf187b08c6a431))
* fix comment subheader 3 ([#2142](https://github.com/gravity-ui/uikit/issues/2142)) ([70790b9](https://github.com/gravity-ui/uikit/commit/70790b971b264699a143620e704177e667328b3f))

## [7.5.0](https://github.com/gravity-ui/uikit/compare/v7.4.0...v7.5.0) (2025-02-26)


### Features

* **Avatar:** add withImageBorder property ([#2138](https://github.com/gravity-ui/uikit/issues/2138)) ([81a3380](https://github.com/gravity-ui/uikit/commit/81a338045381bb8561334bac3424b1bb6d71ab6d))


### Bug Fixes

* add export for legacy Breadcrumbs ([#2131](https://github.com/gravity-ui/uikit/issues/2131)) ([0d5b448](https://github.com/gravity-ui/uikit/commit/0d5b448690af4cb9b93fba4c146a0699a1c99356))
* **Avatar:** add support for cyrillic characters ([#2137](https://github.com/gravity-ui/uikit/issues/2137)) ([c81d148](https://github.com/gravity-ui/uikit/commit/c81d1487750d2a37bdf7143c8b0174cdaaa039a1))
* make `ref` in `renderControl` generic ([#2140](https://github.com/gravity-ui/uikit/issues/2140)) ([142c1e6](https://github.com/gravity-ui/uikit/commit/142c1e67a86f23770ff63257c64142a19806a0d5))
* **ThemeProvider:** do not update class name in case of null body ([#2121](https://github.com/gravity-ui/uikit/issues/2121)) ([5215fe4](https://github.com/gravity-ui/uikit/commit/5215fe4dbac816d0a155bf79407e2d78df73bd31))

## [7.4.0](https://github.com/gravity-ui/uikit/compare/v7.3.0...v7.4.0) (2025-02-17)


### Features

* **Popup:** add `floatingClassName` & `floatingStyles` properties ([#2116](https://github.com/gravity-ui/uikit/issues/2116)) ([2f8abaf](https://github.com/gravity-ui/uikit/commit/2f8abafdd533bf2e194ddfc620a0037822ef6edb))

## [7.3.0](https://github.com/gravity-ui/uikit/compare/v7.2.0...v7.3.0) (2025-02-17)


### Features

* accept text as function in clipboard button ([#2112](https://github.com/gravity-ui/uikit/issues/2112)) ([d8c9461](https://github.com/gravity-ui/uikit/commit/d8c946108f2f0fcd9616a3f492feaaaec1a5697f))
* **FilePreview:** support mobile menu ([#2001](https://github.com/gravity-ui/uikit/issues/2001)) ([98cd6f2](https://github.com/gravity-ui/uikit/commit/98cd6f2a4b464502b95287c3790fe863caf633ac))
* **Popup:** add `disableTransition` property ([#2114](https://github.com/gravity-ui/uikit/issues/2114)) ([32c9c3c](https://github.com/gravity-ui/uikit/commit/32c9c3c7b7b809ab5b0a91fd2dafc142196e00e7))

## [7.2.0](https://github.com/gravity-ui/uikit/compare/v7.1.1...v7.2.0) (2025-02-12)


### Features

* add typography shortcut variables ([#2110](https://github.com/gravity-ui/uikit/issues/2110)) ([39f20a5](https://github.com/gravity-ui/uikit/commit/39f20a550d5c6b587e19ecc1127452c590a428fa))
* **Sheet:** add background css api ([#2105](https://github.com/gravity-ui/uikit/issues/2105)) ([51d1dc2](https://github.com/gravity-ui/uikit/commit/51d1dc206bdfe267c498161173b82d79f4dc4a5d))


### Bug Fixes

* **Popup:** fix animation for nested non portal popups ([#2109](https://github.com/gravity-ui/uikit/issues/2109)) ([ccd3bdc](https://github.com/gravity-ui/uikit/commit/ccd3bdc26531130298135696fd2f9308e6e1a191))
* **Select:** keyboard behavior on mobile ([#2082](https://github.com/gravity-ui/uikit/issues/2082)) ([95a1d20](https://github.com/gravity-ui/uikit/commit/95a1d20c3a0a3f7c54c5e72d5b4d69777d81135b))
* use Popup and Modal as layer ([#2111](https://github.com/gravity-ui/uikit/issues/2111)) ([318bfa2](https://github.com/gravity-ui/uikit/commit/318bfa24b290482c8025861d99a3ebeddb88e899))

## [7.1.1](https://github.com/gravity-ui/uikit/compare/v7.1.0...v7.1.1) (2025-02-10)


### Bug Fixes

* **Tab:** click on tabs should not generate 'submit' event ([#2103](https://github.com/gravity-ui/uikit/issues/2103)) ([dd35766](https://github.com/gravity-ui/uikit/commit/dd3576647b4a1e16b154e07c0105ba8ddc65e2a1))

## [7.1.0](https://github.com/gravity-ui/uikit/compare/v7.0.0...v7.1.0) (2025-02-07)


### Features

* **Table:** add `interactive` descriptor ([#2090](https://github.com/gravity-ui/uikit/issues/2090)) ([09906b2](https://github.com/gravity-ui/uikit/commit/09906b21070863cda3f706a24a252d29dd5e3696))


### Bug Fixes

* fix esm build ([#2099](https://github.com/gravity-ui/uikit/issues/2099)) ([e3e702c](https://github.com/gravity-ui/uikit/commit/e3e702ca7683d92fd56245fcc6b7c5547f8159fa))
* **i18n:** use correct keyset type ([#2085](https://github.com/gravity-ui/uikit/issues/2085)) ([5d34c33](https://github.com/gravity-ui/uikit/commit/5d34c338356d5bb6e84654ab8529ed354e48549c))

## [7.0.0](https://github.com/gravity-ui/uikit/compare/v6.42.0...v7.0.0) (2025-02-04)


### ⚠ BREAKING CHANGES

* rename hidden dismiss prop
* **Toaster:** use single component for Toast render ([#1987](https://github.com/gravity-ui/uikit/issues/1987))
* use native copy method ([#1852](https://github.com/gravity-ui/uikit/issues/1852))
* **FilePreview:** change size of default image preview ([#2074](https://github.com/gravity-ui/uikit/issues/2074))
* **Popup:** rename `modalFocus` prop
* **HelpMark:** use default popover component ([#2051](https://github.com/gravity-ui/uikit/issues/2051))
* **FilePreview:** remove fullscreen mobile image preview ([#2044](https://github.com/gravity-ui/uikit/issues/2044))
* **Sheet:** remove extra wrapper around content ([#2043](https://github.com/gravity-ui/uikit/issues/2043))
* remove old deprications ([#2036](https://github.com/gravity-ui/uikit/issues/2036))
* use target es2022 while TS emit ([#2035](https://github.com/gravity-ui/uikit/issues/2035))
* **NumberInput:** move to components ([#2034](https://github.com/gravity-ui/uikit/issues/2034))
* **Breadcrumbs:** move Breadcrumbs to main entry point ([#2033](https://github.com/gravity-ui/uikit/issues/2033))
* **Popover:** replace legacy Popover with the new one ([#2031](https://github.com/gravity-ui/uikit/issues/2031))
* refactor components to use Floating UI API ([#1979](https://github.com/gravity-ui/uikit/issues/1979))
* **Button:** allow HTML attributes as "top-level" props ([#2015](https://github.com/gravity-ui/uikit/issues/2015))
* rework Avatar, User and UserLabel components ([#1991](https://github.com/gravity-ui/uikit/issues/1991))
* **RadioGroup:** do not have value by default ([#2017](https://github.com/gravity-ui/uikit/issues/2017))
* **Slider:** support form ([#1670](https://github.com/gravity-ui/uikit/issues/1670))
* change disabled state color for Checkbox and Radio ([#1704](https://github.com/gravity-ui/uikit/issues/1704))
* **Link:** allow HTML attributes as "top-level" props ([#2016](https://github.com/gravity-ui/uikit/issues/2016))
* **RadioButton:** rename component to SegmentedRadioGroup ([#1975](https://github.com/gravity-ui/uikit/issues/1975))
* update ControlLabel text offset ([#1973](https://github.com/gravity-ui/uikit/issues/1973))
* **Button:** rename icon-size CSS API ([#1972](https://github.com/gravity-ui/uikit/issues/1972))
* move scrollbar styles to separate mixin ([#1971](https://github.com/gravity-ui/uikit/issues/1971))
* update all deps ([#1963](https://github.com/gravity-ui/uikit/issues/1963))
* **Popup:** migrate to floating-ui ([#1952](https://github.com/gravity-ui/uikit/issues/1952))
* remove typesVersions, adjust exports ([#1957](https://github.com/gravity-ui/uikit/issues/1957))
* **styles:** change monospace fonts order ([#1932](https://github.com/gravity-ui/uikit/issues/1932))

### refactor

* **Toaster:** use single component for Toast render ([#1987](https://github.com/gravity-ui/uikit/issues/1987)) ([355d8e4](https://github.com/gravity-ui/uikit/commit/355d8e4ebda6c80a8cf0efdfd365e8be08f81c64))


### chore

* remove typesVersions, adjust exports ([#1957](https://github.com/gravity-ui/uikit/issues/1957)) ([0fe4232](https://github.com/gravity-ui/uikit/commit/0fe42325db3c576444fa6b67451b78afbf0ef848))


### Features

* add Virtualizer component ([#1968](https://github.com/gravity-ui/uikit/issues/1968)) ([89fbc61](https://github.com/gravity-ui/uikit/commit/89fbc618dc2b1407cda5f2efe114fd62d233b403))
* **Breadcrumbs:** move Breadcrumbs to main entry point ([#2033](https://github.com/gravity-ui/uikit/issues/2033)) ([cfd37c8](https://github.com/gravity-ui/uikit/commit/cfd37c83f68d68f8e6a31d25ca64a0cd14ab75b1))
* **Breadcrumbs:** replace navigate with custom item component ([#2054](https://github.com/gravity-ui/uikit/issues/2054)) ([9a6966e](https://github.com/gravity-ui/uikit/commit/9a6966e51cf82720ba795b1835dd2cb2967fd752))
* **Button:** allow HTML attributes as "top-level" props ([#2015](https://github.com/gravity-ui/uikit/issues/2015)) ([e92ad8e](https://github.com/gravity-ui/uikit/commit/e92ad8ef005b0d9c31c56f4594b395a79322c655))
* **Button:** rename icon-size CSS API ([#1972](https://github.com/gravity-ui/uikit/issues/1972)) ([6323bc5](https://github.com/gravity-ui/uikit/commit/6323bc546ea7a5725b94116afcbe638c5a59c842))
* change disabled state color for Checkbox and Radio ([#1704](https://github.com/gravity-ui/uikit/issues/1704)) ([8b551fb](https://github.com/gravity-ui/uikit/commit/8b551fb77f752fb57aed94c17f9fcd4c9df6892c))
* **FilePreview:** change size of default image preview ([#2074](https://github.com/gravity-ui/uikit/issues/2074)) ([0d88f12](https://github.com/gravity-ui/uikit/commit/0d88f126a782425b3a6cb6747d2124a1cb732bf6))
* **FilePreview:** remove fullscreen mobile image preview ([#2044](https://github.com/gravity-ui/uikit/issues/2044)) ([8f404d4](https://github.com/gravity-ui/uikit/commit/8f404d4bf03b16eca7ece8e6df45679d6db0f51d))
* **HelpMark:** use default popover component ([#2051](https://github.com/gravity-ui/uikit/issues/2051)) ([1b52de5](https://github.com/gravity-ui/uikit/commit/1b52de53f4f794c791d8bfaab45a2c3198bf8011))
* implement new Popover draft ([#1969](https://github.com/gravity-ui/uikit/issues/1969)) ([e173f19](https://github.com/gravity-ui/uikit/commit/e173f198d1cdc48fa18dfb049e98634bf94718b8))
* improve handling aria props ([#1958](https://github.com/gravity-ui/uikit/issues/1958)) ([ecc641e](https://github.com/gravity-ui/uikit/commit/ecc641e1c20d11a6c808c7147516c9410e380bb6))
* **Link:** allow HTML attributes as "top-level" props ([#2016](https://github.com/gravity-ui/uikit/issues/2016)) ([559d534](https://github.com/gravity-ui/uikit/commit/559d534a3fe0e9d69a8cac6479005b2c09803c98))
* **Menu:** update paddings ([#2058](https://github.com/gravity-ui/uikit/issues/2058)) ([d00fedc](https://github.com/gravity-ui/uikit/commit/d00fedc39971f61dbfedbd4dd1275032d550bac3))
* move scrollbar styles to separate mixin ([#1971](https://github.com/gravity-ui/uikit/issues/1971)) ([0137048](https://github.com/gravity-ui/uikit/commit/0137048313fcb0ef346d0cfe8cca5735b8e7568a))
* **NumberInput:** move to components ([#2034](https://github.com/gravity-ui/uikit/issues/2034)) ([24bf889](https://github.com/gravity-ui/uikit/commit/24bf88971d4de7954b1159398c4bc55a0d0099fc))
* **Popover:** add modal prop ([4c00fba](https://github.com/gravity-ui/uikit/commit/4c00fbabce69ce041a84c77712015532e70f44eb))
* **Popover:** replace legacy Popover with the new one ([#2031](https://github.com/gravity-ui/uikit/issues/2031)) ([08ac6da](https://github.com/gravity-ui/uikit/commit/08ac6da5a587691f53c5bf65cc185f758e7455ab))
* **Popup:** add disableFocusOut prop ([2b7819e](https://github.com/gravity-ui/uikit/commit/2b7819ed501276a5a327545089c20c6112a8bba2))
* **Popup:** deprecate anchorRef ([b30e9d1](https://github.com/gravity-ui/uikit/commit/b30e9d1ec1331b625a46f175d52edf8644dec1da))
* **Popup:** migrate to floating-ui ([#1952](https://github.com/gravity-ui/uikit/issues/1952)) ([cde1e99](https://github.com/gravity-ui/uikit/commit/cde1e99be0b318daf14e1ce4aa43bfb8d3f1c20e))
* **Popup:** proxy focus order prop to FloatingFocusManager ([#2049](https://github.com/gravity-ui/uikit/issues/2049)) ([b76b530](https://github.com/gravity-ui/uikit/commit/b76b53071032d77119b455d9a583f451bc601771))
* **Popup:** rename `modalFocus` prop ([677e714](https://github.com/gravity-ui/uikit/commit/677e714f3f6ddd6725487f15ba129bc285c1ef2d))
* **RadioButton:** redesign to increase contrast in component ([#1742](https://github.com/gravity-ui/uikit/issues/1742)) ([9894053](https://github.com/gravity-ui/uikit/commit/9894053152e6cb2d8d11058045b6581c3c030dea))
* **RadioButton:** rename component to SegmentedRadioGroup ([#1975](https://github.com/gravity-ui/uikit/issues/1975)) ([ca3d957](https://github.com/gravity-ui/uikit/commit/ca3d95730c7e51d2c5732ea26aab8cae557bdd63))
* **RadioGroup:** do not have value by default ([#2017](https://github.com/gravity-ui/uikit/issues/2017)) ([94506ee](https://github.com/gravity-ui/uikit/commit/94506eeebdc550e2cb379a4ee0ed4068724e4997))
* refactor components to use Floating UI API ([#1979](https://github.com/gravity-ui/uikit/issues/1979)) ([ac12060](https://github.com/gravity-ui/uikit/commit/ac12060f3561265b1799f81f1b84e9701466e2af))
* remove old deprications ([#2036](https://github.com/gravity-ui/uikit/issues/2036)) ([3a1dccf](https://github.com/gravity-ui/uikit/commit/3a1dccf1bcb734f2a0a8245673ae1836ce2f3bfb))
* rename hidden dismiss prop ([6eb6cb5](https://github.com/gravity-ui/uikit/commit/6eb6cb56be16f098686beeb4f410e58d8f1879e4))
* rework Avatar, User and UserLabel components ([#1991](https://github.com/gravity-ui/uikit/issues/1991)) ([7be5c5a](https://github.com/gravity-ui/uikit/commit/7be5c5ae68cca40ae11ccdafa03c36619d0d6097))
* rewrite usePrevious hook implementation ([07c3d80](https://github.com/gravity-ui/uikit/commit/07c3d80a4422f48eaea50ba68f593d67e45e2b3a))
* **Sheet:** remove extra wrapper around content ([#2043](https://github.com/gravity-ui/uikit/issues/2043)) ([6c51849](https://github.com/gravity-ui/uikit/commit/6c51849c9424d2235a1721c69b308c5f5b475d23))
* **Slider:** remove deprecated fields ([#2052](https://github.com/gravity-ui/uikit/issues/2052)) ([dd47f3f](https://github.com/gravity-ui/uikit/commit/dd47f3f329f08c82b9a720a56b32d5b2ff7ff221))
* **Slider:** support form ([#1670](https://github.com/gravity-ui/uikit/issues/1670)) ([80518f6](https://github.com/gravity-ui/uikit/commit/80518f6b90d3a6129d58af9f9f26afaab43a795c))
* **styles:** change monospace fonts order ([#1932](https://github.com/gravity-ui/uikit/issues/1932)) ([a88e16f](https://github.com/gravity-ui/uikit/commit/a88e16f2e6ebd538068ca437d3a2bc5cd9f3b241))
* **TabList:** use hooks for logic ([#2083](https://github.com/gravity-ui/uikit/issues/2083)) ([f1d8ab8](https://github.com/gravity-ui/uikit/commit/f1d8ab801cdec37cebaef56798f00ac5eda07b7f))
* **tabs:** add new tabs components ([#2002](https://github.com/gravity-ui/uikit/issues/2002)) ([b35e35c](https://github.com/gravity-ui/uikit/commit/b35e35c9bc049f1e67cc2c8fc58a4f989d39ac2f))
* **Toc:** render 6 levels of nested items ([#2010](https://github.com/gravity-ui/uikit/issues/2010)) ([c3ac706](https://github.com/gravity-ui/uikit/commit/c3ac70686eafa1591c7318ba118cd1c101d2818b))
* update all deps ([#1963](https://github.com/gravity-ui/uikit/issues/1963)) ([4a86b57](https://github.com/gravity-ui/uikit/commit/4a86b5776a12d333fbac97939a9a2a733c8456a7))
* update ControlLabel text offset ([#1973](https://github.com/gravity-ui/uikit/issues/1973)) ([05bbc00](https://github.com/gravity-ui/uikit/commit/05bbc004805b95c0c4197026aab8569841d3fb98))
* update deps ([#2048](https://github.com/gravity-ui/uikit/issues/2048)) ([fb14c21](https://github.com/gravity-ui/uikit/commit/fb14c2199639c83bd678bb6e3f6aeaf8b6584737))
* use native copy method ([#1852](https://github.com/gravity-ui/uikit/issues/1852)) ([ef7d46a](https://github.com/gravity-ui/uikit/commit/ef7d46a2c2ba6fb12cbcf94062ee9c011a60a864))
* use target es2022 while TS emit ([#2035](https://github.com/gravity-ui/uikit/issues/2035)) ([c84382e](https://github.com/gravity-ui/uikit/commit/c84382ef5b3aaf03b195c88a8f0c75b68d73a876))


### Bug Fixes

* **build:** compile to esm and commonjs, add sourcemaps ([#2039](https://github.com/gravity-ui/uikit/issues/2039)) ([5df098e](https://github.com/gravity-ui/uikit/commit/5df098e5a4a1c8a3c2e183628165532a1cfff208))
* **Button:** additional to [#2070](https://github.com/gravity-ui/uikit/issues/2070) ([#2072](https://github.com/gravity-ui/uikit/issues/2072)) ([e1dea51](https://github.com/gravity-ui/uikit/commit/e1dea518e5b7c877e69ff6607b59ed7300a6b405))
* **Button:** better type definition of ButtonProps ([#2070](https://github.com/gravity-ui/uikit/issues/2070)) ([dac1c24](https://github.com/gravity-ui/uikit/commit/dac1c244e0a612c61a7705e86b4627309c423e65))
* **ClipboardButton:** do not count tooltip animation ([c710593](https://github.com/gravity-ui/uikit/commit/c710593b648266ab0c73ac60c7a8ea6ee4ffe26e))
* i18n exports ([#2038](https://github.com/gravity-ui/uikit/issues/2038)) ([22f1e8d](https://github.com/gravity-ui/uikit/commit/22f1e8db9123620a8ee7089a8ce053b17f2a7e12))
* **Popover:** fix missing "use client" directive ([3b2fefd](https://github.com/gravity-ui/uikit/commit/3b2fefda165c7de7d8ad81b6bb3639fe2061ff2a))
* **Popup:** anchor and replace floatingProps with floatingInteractions ([#2045](https://github.com/gravity-ui/uikit/issues/2045)) ([41df989](https://github.com/gravity-ui/uikit/commit/41df9892fdb2e6afc7515eb0290c2ca4820b9ef7))
* **Popup:** fix flip + shift behaviour ([2edf776](https://github.com/gravity-ui/uikit/commit/2edf77654a40337f382a6dbdf708a16270e48038))
* **Popup:** remove default placement ([7aab830](https://github.com/gravity-ui/uikit/commit/7aab830f53400d144fa963de27d134aaa14a0509))
* rebase issues ([e561331](https://github.com/gravity-ui/uikit/commit/e561331c84b050a6ca924cc87028262b57d20c2f))
* revert cjs bundle changes ([0c89b82](https://github.com/gravity-ui/uikit/commit/0c89b82ff8119dea2077f176336eddb5c47afc39))
* **Toc:** remove unused forwardRef ([#2050](https://github.com/gravity-ui/uikit/issues/2050)) ([b058c9f](https://github.com/gravity-ui/uikit/commit/b058c9f7ae0c8e0d88dfe0ae1b98ec45a8a5f26f))
* **Tooltip:** fix flip + shift behaviour ([42ba319](https://github.com/gravity-ui/uikit/commit/42ba3199b83ced6e010fb6f580ad0abc351d0487))
* **Tooltip:** remove custom limiter ([1cbfcff](https://github.com/gravity-ui/uikit/commit/1cbfcff41162072e53fb728ecfd41cc655d9a2b3))
* update smoke screenshots after rebase ([8382fdf](https://github.com/gravity-ui/uikit/commit/8382fdf2eba1cd394d64548af004f9a3c514e57e))
* update visual test snapshots ([7754f00](https://github.com/gravity-ui/uikit/commit/7754f0078b00d0d674163d2330e283761ceabee4))

## [6.42.0](https://github.com/gravity-ui/uikit/compare/v6.41.0...v6.42.0) (2025-01-28)


### Features

* **FilePreview:** add support of most types of files uploaded via input ([#2063](https://github.com/gravity-ui/uikit/issues/2063)) ([059643c](https://github.com/gravity-ui/uikit/commit/059643c1d070914dd3480ad3db67495336b092ce))


### Bug Fixes

* **FilePreview:** fix view of image preview ([#2060](https://github.com/gravity-ui/uikit/issues/2060)) ([3f580e1](https://github.com/gravity-ui/uikit/commit/3f580e12c722075204fa3364712994c005121b8a))
* **FilePreview:** fix visual of actions ([#2062](https://github.com/gravity-ui/uikit/issues/2062)) ([978503e](https://github.com/gravity-ui/uikit/commit/978503e6350f5e8efefade6865a44a959b5c0a5a))
* **Sheet:** fix incorrect behavior if allowHideOnContentScroll is enabled ([#2053](https://github.com/gravity-ui/uikit/issues/2053)) ([3075beb](https://github.com/gravity-ui/uikit/commit/3075beb4f7a94db41c3e643386f088b9f4b05eab))

## [6.41.0](https://github.com/gravity-ui/uikit/compare/v6.40.0...v6.41.0) (2025-01-16)


### Features

* migrate to new JSX transform ([#2006](https://github.com/gravity-ui/uikit/issues/2006)) ([300a013](https://github.com/gravity-ui/uikit/commit/300a013920ae21cd55364ebada8e58003cc79381))
* pass event to handler callback in useOutsideClick ([#1998](https://github.com/gravity-ui/uikit/issues/1998)) ([3097c80](https://github.com/gravity-ui/uikit/commit/3097c80137b5531cd9d0e3afa9e414dfbca2d424))
* require React version 16.14.0 or higher ([#2018](https://github.com/gravity-ui/uikit/issues/2018)) ([f90b57b](https://github.com/gravity-ui/uikit/commit/f90b57bdd70480017037569f4af380ab2e090c4f))


### Bug Fixes

* **NumberInput:** disable rounding decimal to integer without passed step ([#2037](https://github.com/gravity-ui/uikit/issues/2037)) ([3a6a6bc](https://github.com/gravity-ui/uikit/commit/3a6a6bc680c8af3a036febc545a6da27607c8b6a))
* **NumberInput:** zero min/max props ([#2046](https://github.com/gravity-ui/uikit/issues/2046)) ([255aa9d](https://github.com/gravity-ui/uikit/commit/255aa9d2a2a68d02e319597c7f6221ab4bb3374e))

## [6.40.0](https://github.com/gravity-ui/uikit/compare/v6.39.0...v6.40.0) (2024-12-24)


### Features

* **Select:** add data for option group ([#2011](https://github.com/gravity-ui/uikit/issues/2011)) ([46c9d28](https://github.com/gravity-ui/uikit/commit/46c9d28b972ad63dd9ce334b1d052b76fa5720ec))

## [6.39.0](https://github.com/gravity-ui/uikit/compare/v6.38.0...v6.39.0) (2024-12-19)


### Features

* **Progress:** change prop text ([#1993](https://github.com/gravity-ui/uikit/issues/1993)) ([92e53a0](https://github.com/gravity-ui/uikit/commit/92e53a088112d41a1fe96f091350f36d0caaa97c))
* **Select:** add title for option ([#1994](https://github.com/gravity-ui/uikit/issues/1994)) ([03b5dbf](https://github.com/gravity-ui/uikit/commit/03b5dbfbe68abf98de3407643140ddb226379d51))
* **styles:** manage animations by user settings ([#1996](https://github.com/gravity-ui/uikit/issues/1996)) ([19ca365](https://github.com/gravity-ui/uikit/commit/19ca365acde4fb5b467e9ac36a373a6ea5def728))
* **Tabs:** allow string for TabItem counter value ([#1989](https://github.com/gravity-ui/uikit/issues/1989)) ([b628086](https://github.com/gravity-ui/uikit/commit/b6280863bb474f9d52fdc1f3f26dd5e0507254df))


### Bug Fixes

* **Icon:** remove redundant color:inherit style ([#1999](https://github.com/gravity-ui/uikit/issues/1999)) ([d6cda6e](https://github.com/gravity-ui/uikit/commit/d6cda6ebf38216da1eac56e3b87343603cf29c63))
* **Sheet:** remove animation lags when closing in some browsers ([#1984](https://github.com/gravity-ui/uikit/issues/1984)) ([555b186](https://github.com/gravity-ui/uikit/commit/555b18687ce431fe78102b0e98fac35464fe7957))

## [6.38.0](https://github.com/gravity-ui/uikit/compare/v6.37.0...v6.38.0) (2024-12-06)


### Features

* **User:** add html titles for elements ([#1982](https://github.com/gravity-ui/uikit/issues/1982)) ([105d43b](https://github.com/gravity-ui/uikit/commit/105d43b0d511e516675e66877fb31c94bf583f91))


### Bug Fixes

* **PinInput:** remove height glitch in Safari ([#1938](https://github.com/gravity-ui/uikit/issues/1938)) ([d6cb1cf](https://github.com/gravity-ui/uikit/commit/d6cb1cfaec89a806b6948f92aa2c12669c110fb8))
* **TextInput:** share font styles between error and note blocks in OuterAdditionalContent ([#1970](https://github.com/gravity-ui/uikit/issues/1970)) ([55737b5](https://github.com/gravity-ui/uikit/commit/55737b5a66dbd975ecbbf84dac95592cd65e3b1a))

## [6.37.0](https://github.com/gravity-ui/uikit/compare/v6.36.0...v6.37.0) (2024-11-27)


### Features

* **Breadcrunbs:** allow items to be disabled independently ([#1962](https://github.com/gravity-ui/uikit/issues/1962)) ([301e4ab](https://github.com/gravity-ui/uikit/commit/301e4ab365639188e010390d5b19da1df13d75fa))
* **Select:** new label and value resize behaviour ([#1896](https://github.com/gravity-ui/uikit/issues/1896)) ([2be5eb8](https://github.com/gravity-ui/uikit/commit/2be5eb8dc21679154bbb924af5e1e1eefa8a7a58))

## [6.36.0](https://github.com/gravity-ui/uikit/compare/v6.35.2...v6.36.0) (2024-11-25)


### Features

* **PasswordInput:** add component ([#1745](https://github.com/gravity-ui/uikit/issues/1745)) ([2e7f2c7](https://github.com/gravity-ui/uikit/commit/2e7f2c731c8cb2fd08993fc30ffed8b06a5f0ea2))


### Bug Fixes

* **Select:** do not reserve space for clear if empty ([#1956](https://github.com/gravity-ui/uikit/issues/1956)) ([11dd537](https://github.com/gravity-ui/uikit/commit/11dd537feaa230133f8051fd6c370e6e3ec7d54f))
* **Toc:** correctly display content of no items.length and add event forward ([#1939](https://github.com/gravity-ui/uikit/issues/1939)) ([8d456c3](https://github.com/gravity-ui/uikit/commit/8d456c3d77d63674f20ebac82913d8a26c14f997))

## [6.35.2](https://github.com/gravity-ui/uikit/compare/v6.35.1...v6.35.2) (2024-11-14)


### Bug Fixes

* **PlaceholderContainer:** remove href attribute fallback in actions ([#1947](https://github.com/gravity-ui/uikit/issues/1947)) ([60a8b92](https://github.com/gravity-ui/uikit/commit/60a8b9240b51d78f0aa5e711a6bed8e30e049814))
* **useBodyScrollLock:** correctly restore styles ([#1950](https://github.com/gravity-ui/uikit/issues/1950)) ([b41a53a](https://github.com/gravity-ui/uikit/commit/b41a53a477d479b925331bbc227862942da04d00))

## [6.35.1](https://github.com/gravity-ui/uikit/compare/v6.35.0...v6.35.1) (2024-11-13)


### Bug Fixes

* fix incorrect scss "use" ([#1943](https://github.com/gravity-ui/uikit/issues/1943)) ([c9506dd](https://github.com/gravity-ui/uikit/commit/c9506dd5cfb78f155ea4e38f09e060233c4f691b))

## [6.35.0](https://github.com/gravity-ui/uikit/compare/v6.34.0...v6.35.0) (2024-11-11)


### Features

* **FilePreview:** add component ([#1880](https://github.com/gravity-ui/uikit/issues/1880)) ([b5de671](https://github.com/gravity-ui/uikit/commit/b5de67126a76467853957df6d8e5436cc460886e))
* **NumberInput:** add new component ([#1826](https://github.com/gravity-ui/uikit/issues/1826)) ([75be05e](https://github.com/gravity-ui/uikit/commit/75be05e42c95226592cdd2139894e9ff791280af))
* **PlaceholderContainer:** add qa prop ([#1925](https://github.com/gravity-ui/uikit/issues/1925)) ([77ad28d](https://github.com/gravity-ui/uikit/commit/77ad28d8aa0af910999e0ed54fce806767241946))


### Bug Fixes

* **PlaceholderContainer:** add component to index file ([#1924](https://github.com/gravity-ui/uikit/issues/1924)) ([cdce171](https://github.com/gravity-ui/uikit/commit/cdce1715a6fe5ceebff7b43c9146c3c1bef9f093))
* **Popover:** use visible title for popup a11y label ([#1941](https://github.com/gravity-ui/uikit/issues/1941)) ([f9d75e8](https://github.com/gravity-ui/uikit/commit/f9d75e8b1d902fd526b4a089d7bf6675299f2584))
* **Toaster:** reveal animation lag ([#1927](https://github.com/gravity-ui/uikit/issues/1927)) ([e16fa1c](https://github.com/gravity-ui/uikit/commit/e16fa1ccc7e1f053f4ff696d24ee6d4bbfd35a6a))

## [6.34.0](https://github.com/gravity-ui/uikit/compare/v6.33.0...v6.34.0) (2024-10-25)


### Features

* **ListItemExandIcon:** added new list component for expanded icon view ([#1762](https://github.com/gravity-ui/uikit/issues/1762)) ([b6516f4](https://github.com/gravity-ui/uikit/commit/b6516f46ce157a1297a5887e25487f621da07b43))


### Bug Fixes

* react 19 compatibility ([#1916](https://github.com/gravity-ui/uikit/issues/1916)) ([29f2558](https://github.com/gravity-ui/uikit/commit/29f255803582d9b6791f11b080b80d36626dd03b))
* **styles:** rules order in block ([#1912](https://github.com/gravity-ui/uikit/issues/1912)) ([2d9c88e](https://github.com/gravity-ui/uikit/commit/2d9c88ee6a7040d33369c1a47d2022ec9f129d7c))

## [6.33.0](https://github.com/gravity-ui/uikit/compare/v6.32.0...v6.33.0) (2024-10-22)


### Features

* **Dialog:** add className property to DialogFooter ([#1909](https://github.com/gravity-ui/uikit/issues/1909)) ([679c537](https://github.com/gravity-ui/uikit/commit/679c537a0a34add7e6dca4a3ba649934a68342e6))
* **Table:** add width property ([#1907](https://github.com/gravity-ui/uikit/issues/1907)) ([7eb5e1e](https://github.com/gravity-ui/uikit/commit/7eb5e1e38cb9e79afaf988480b1b2d5dc998ff04))
* **Toaster:** added onClose callback ([#1902](https://github.com/gravity-ui/uikit/issues/1902)) ([3069194](https://github.com/gravity-ui/uikit/commit/30691949ccce25e54614b5a0b49c7b11f7abf3e9))


### Bug Fixes

* **DefinitionList:** layout fixes ([#1910](https://github.com/gravity-ui/uikit/issues/1910)) ([e5cde3a](https://github.com/gravity-ui/uikit/commit/e5cde3ad58cfb1d8436c2a4ad75e074dfb94a741))

## [6.32.0](https://github.com/gravity-ui/uikit/compare/v6.31.0...v6.32.0) (2024-10-17)


### Features

* add DefinitionList and HelpMark ([#1731](https://github.com/gravity-ui/uikit/issues/1731)) ([c587116](https://github.com/gravity-ui/uikit/commit/c587116b40e79c1ad7a2427f73d031b6efa4109c))
* **AvatarStack:** forward ref to root element of component ([#1904](https://github.com/gravity-ui/uikit/issues/1904)) ([469d935](https://github.com/gravity-ui/uikit/commit/469d93586d6bb82b93a865541d8a974caa67d3b1))


### Bug Fixes

* **ListItemView:** fix type ListItemViewProps ([#1897](https://github.com/gravity-ui/uikit/issues/1897)) ([e49779a](https://github.com/gravity-ui/uikit/commit/e49779a4e519a6e89db3cecfe12ea66e0c720d3f))
* **Toaster:** change spacing before actions ([#1891](https://github.com/gravity-ui/uikit/issues/1891)) ([235ea21](https://github.com/gravity-ui/uikit/commit/235ea21a548d39b6ebf22e31d9037abc83eb9fcd))
* **types:** fix i18n types ([#1898](https://github.com/gravity-ui/uikit/issues/1898)) ([21954db](https://github.com/gravity-ui/uikit/commit/21954db04c9edc5d5068007fd4f137e0732e2b47))
* **useBodyScrollLock:** avoid settings unrelated styles ([#1832](https://github.com/gravity-ui/uikit/issues/1832)) ([9d7fd36](https://github.com/gravity-ui/uikit/commit/9d7fd3649c7c82a1c3d68af7d2f8ceffe7172eef))

## [6.31.0](https://github.com/gravity-ui/uikit/compare/v6.30.1...v6.31.0) (2024-10-09)


### Features

* **TreeSelect:** added error state view and hasClear prop ([#1885](https://github.com/gravity-ui/uikit/issues/1885)) ([9849e4b](https://github.com/gravity-ui/uikit/commit/9849e4bacc6b11bdfef191e31dde28a75a5e723c))


### Bug Fixes

* **Select:** revert [#1694](https://github.com/gravity-ui/uikit/issues/1694) changes ([#1887](https://github.com/gravity-ui/uikit/issues/1887)) ([523caf8](https://github.com/gravity-ui/uikit/commit/523caf8915a5ee7cbb0652886f2ee247baeabb2e))

## [6.30.1](https://github.com/gravity-ui/uikit/compare/v6.30.0...v6.30.1) (2024-10-04)


### Bug Fixes

* **AvatarStack:** remaining avatars calculation ([#1883](https://github.com/gravity-ui/uikit/issues/1883)) ([76943c9](https://github.com/gravity-ui/uikit/commit/76943c9174658be0da60d98ce50c290ef2ca45a1))

## [6.30.0](https://github.com/gravity-ui/uikit/compare/v6.29.0...v6.30.0) (2024-10-03)


### Features

* **ActionsPanel:** add component and showcases ([#1873](https://github.com/gravity-ui/uikit/issues/1873)) ([5ce703f](https://github.com/gravity-ui/uikit/commit/5ce703f9b0da81493262035e8259d0f0aedc3552))
* **ClipboardButton:** delay tooltip's closing animation after copying ([#1735](https://github.com/gravity-ui/uikit/issues/1735)) ([20f19dd](https://github.com/gravity-ui/uikit/commit/20f19ddca63dca4d34b9fd62b4e0b4073fdcd2be))


### Bug Fixes

* **AvatarStack:** correctly display more than 9 remaining avatars ([#1882](https://github.com/gravity-ui/uikit/issues/1882)) ([0abd7f1](https://github.com/gravity-ui/uikit/commit/0abd7f1bc4f01a5616d4cce532e9f9a6cc4f5c53))

## [6.29.0](https://github.com/gravity-ui/uikit/compare/v6.28.0...v6.29.0) (2024-09-27)


### Features

* **Slider:** redesign API to get more control on marks ([#1744](https://github.com/gravity-ui/uikit/issues/1744)) ([2b5c26e](https://github.com/gravity-ui/uikit/commit/2b5c26e6144cc74bd2467ae6f5fe9e6dd3a14197))
* **Table:** add dynamic href support for row actions in withTableActions ([#1874](https://github.com/gravity-ui/uikit/issues/1874)) ([17b9a66](https://github.com/gravity-ui/uikit/commit/17b9a663fea91515b1fa646ddb2003f4e70016a5))


### Bug Fixes

* **Select:** fix tick icon color ([#1878](https://github.com/gravity-ui/uikit/issues/1878)) ([fc82360](https://github.com/gravity-ui/uikit/commit/fc82360a74ae02ce1b22e1861befb8a891679f15))

## [6.28.0](https://github.com/gravity-ui/uikit/compare/v6.27.2...v6.28.0) (2024-09-24)


### Features

* **AvatarStack:** add `total` prop ([#1869](https://github.com/gravity-ui/uikit/issues/1869)) ([29c9084](https://github.com/gravity-ui/uikit/commit/29c9084d1b86df3e0762de9cbeace3cd48a7293d))


### Bug Fixes

* **Button:** selected styles override disabled styles in button ([#1856](https://github.com/gravity-ui/uikit/issues/1856)) ([052889d](https://github.com/gravity-ui/uikit/commit/052889d793128716042f54509d3c22ecf3faa845))

## [6.27.2](https://github.com/gravity-ui/uikit/compare/v6.27.1...v6.27.2) (2024-09-18)


### Bug Fixes

* **User:** fix offset for xs size ([#1867](https://github.com/gravity-ui/uikit/issues/1867)) ([a725abb](https://github.com/gravity-ui/uikit/commit/a725abb98999366f990ab7537fd6a0d01b45c220))

## [6.27.1](https://github.com/gravity-ui/uikit/compare/v6.27.0...v6.27.1) (2024-09-18)


### Bug Fixes

* **Sheet:** take into account margins and padding of content when calculating height ([#1865](https://github.com/gravity-ui/uikit/issues/1865)) ([a796f88](https://github.com/gravity-ui/uikit/commit/a796f88ab0f1fd799c17c3a7dccec07d3f17c2b1))
* **TextInput:** use controlProps only for underlying input ([#1863](https://github.com/gravity-ui/uikit/issues/1863)) ([020b9b0](https://github.com/gravity-ui/uikit/commit/020b9b0265619e740c8de6fb729ce606a6f9b1b8))
* **User:** make font-size 13px for xs size ([#1866](https://github.com/gravity-ui/uikit/issues/1866)) ([54bb231](https://github.com/gravity-ui/uikit/commit/54bb2315f5bc588252a570d5e3815450244789f1))

## [6.27.0](https://github.com/gravity-ui/uikit/compare/v6.26.0...v6.27.0) (2024-09-17)


### Features

* **Avatar:** add 2xs Avatar size ([#1721](https://github.com/gravity-ui/uikit/issues/1721)) ([1698d51](https://github.com/gravity-ui/uikit/commit/1698d51c51227a4c4ebb1b657a4f403036053dc4))
* **i18n:** functionality for adding translations into other languages ([#1859](https://github.com/gravity-ui/uikit/issues/1859)) ([33ad008](https://github.com/gravity-ui/uikit/commit/33ad008285b761c2c9da727d2ef1f77222f7ef7c))
* **withTableSelection:** add indeterminate state ([#1743](https://github.com/gravity-ui/uikit/issues/1743)) ([824164c](https://github.com/gravity-ui/uikit/commit/824164c0d40d9438f4af2728f974a2ad33cdf70c))


### Bug Fixes

* **List:** use Component instead of PureComponent in ListItem ([#1862](https://github.com/gravity-ui/uikit/issues/1862)) ([62072d6](https://github.com/gravity-ui/uikit/commit/62072d6ceb9e22f9c5a2b66f66881d47d1cacefc))
* **Table:** not propagate click in table actions menu ([#1854](https://github.com/gravity-ui/uikit/issues/1854)) ([226fbf0](https://github.com/gravity-ui/uikit/commit/226fbf056e34979fe8f190f714d622d45d93d3d7))
* **useElementSize:** set initial size of the element ([#1857](https://github.com/gravity-ui/uikit/issues/1857)) ([d442a6a](https://github.com/gravity-ui/uikit/commit/d442a6a76b29d2b403a03bf1dc64db1090d9e5cf))

## [6.26.0](https://github.com/gravity-ui/uikit/compare/v6.25.1...v6.26.0) (2024-09-12)


### Features

* **Card:** enable onClick event handler on selected card ([#1840](https://github.com/gravity-ui/uikit/issues/1840)) ([a1678b6](https://github.com/gravity-ui/uikit/commit/a1678b6341fff0b02415485f9b0171aef2260f5b))
* **Select:** pass aria attributes to render functions ([#1841](https://github.com/gravity-ui/uikit/issues/1841)) ([9801d33](https://github.com/gravity-ui/uikit/commit/9801d334b9cb6c8bdc30d982020f447a1185f744))
* **TextInput:** add unstable_endContent prop ([#1845](https://github.com/gravity-ui/uikit/issues/1845)) ([a38b73b](https://github.com/gravity-ui/uikit/commit/a38b73bece9de57ed1668a952c673bf2d49528e3))


### Bug Fixes

* **Select:** correctly scroll to active element ([#1853](https://github.com/gravity-ui/uikit/issues/1853)) ([d6c512a](https://github.com/gravity-ui/uikit/commit/d6c512a0da3cb665697fe0e273d1033433ce876e))

## [6.25.1](https://github.com/gravity-ui/uikit/compare/v6.25.0...v6.25.1) (2024-09-10)


### Bug Fixes

* **List:** deactivate on mouse leave ([#1847](https://github.com/gravity-ui/uikit/issues/1847)) ([cc14563](https://github.com/gravity-ui/uikit/commit/cc14563904e355d3b90ddc3f3a29bbe937ae3970))
* **useFocusWithin:** ignore blur event when window loses focus ([#1836](https://github.com/gravity-ui/uikit/issues/1836)) ([216e700](https://github.com/gravity-ui/uikit/commit/216e7003068c818eca078ff3ae2692439d86f930))

## [6.25.0](https://github.com/gravity-ui/uikit/compare/v6.24.0...v6.25.0) (2024-09-09)


### Features

* **ClipboardButton:** add children and iconPosition ([#1837](https://github.com/gravity-ui/uikit/issues/1837)) ([4c3d070](https://github.com/gravity-ui/uikit/commit/4c3d070a74cee72a5017ac6df37b3f8cf22b2122))
* **Label:** add title attribute ([#1843](https://github.com/gravity-ui/uikit/issues/1843)) ([c8e1ebb](https://github.com/gravity-ui/uikit/commit/c8e1ebb291f5c6d43395b9c18f34960b2dd7248f))
* **PlaceholderContainer:** add component and showcases ([#1741](https://github.com/gravity-ui/uikit/issues/1741)) ([1632acc](https://github.com/gravity-ui/uikit/commit/1632acc82b8d29ee431b0b9b12863dc2571b5231))


### Bug Fixes

* **TreeList:** provide types for renderContainerProps ([#1842](https://github.com/gravity-ui/uikit/issues/1842)) ([90ca9cc](https://github.com/gravity-ui/uikit/commit/90ca9cc820270cca0042eaea3b7c94bbeefbf717))

## [6.24.0](https://github.com/gravity-ui/uikit/compare/v6.23.1...v6.24.0) (2024-09-02)


### Features

* **Divider:** render content inside ([#1701](https://github.com/gravity-ui/uikit/issues/1701)) ([4d28d89](https://github.com/gravity-ui/uikit/commit/4d28d89082ee800c49864aeb46588d5ef4d9710a))
* **Pagination:** add size prop ([#1759](https://github.com/gravity-ui/uikit/issues/1759)) ([12e5597](https://github.com/gravity-ui/uikit/commit/12e559762a25d8c515d0f0b524c40af9914b941a))
* **Popup:** add aria-modal prop ([#1827](https://github.com/gravity-ui/uikit/issues/1827)) ([7d8dff0](https://github.com/gravity-ui/uikit/commit/7d8dff0251533f74ccf76c2d6be585a66681cff3))
* **TextInput, TextArea:** add `readOnly` property ([#1747](https://github.com/gravity-ui/uikit/issues/1747)) ([1c95f75](https://github.com/gravity-ui/uikit/commit/1c95f75c12288c0b866b816045eef901bb5ad34b))


### Bug Fixes

* **Select:** close popup when click on select button (Safari) ([#1828](https://github.com/gravity-ui/uikit/issues/1828)) ([3f5adc5](https://github.com/gravity-ui/uikit/commit/3f5adc5b5584f9417f29b51e0170d86fc75a12b0))
* **Select:** correctly set active item in listbox ([#1829](https://github.com/gravity-ui/uikit/issues/1829)) ([ee2d040](https://github.com/gravity-ui/uikit/commit/ee2d040c5c0653f1854e6a74f4d9277394dc3c3f))
* **Select:** pass disabled prop to renderControl, don't change state if disabled ([#1766](https://github.com/gravity-ui/uikit/issues/1766)) ([24bbb05](https://github.com/gravity-ui/uikit/commit/24bbb052faef9ce4ead5e1c4eb2f6f53bfa011a5))
* **useListFilter:** fixed bug with initial items array change ([#1751](https://github.com/gravity-ui/uikit/issues/1751)) ([b9d2671](https://github.com/gravity-ui/uikit/commit/b9d2671f61ffa342d0d29c09d67f88e2870c6dc1))
* **useList:** support activeItemId in initialState prop ([#1824](https://github.com/gravity-ui/uikit/issues/1824)) ([aa308d8](https://github.com/gravity-ui/uikit/commit/aa308d8eb2a2c381cfd1f635b20e265f2963baad))

## [6.23.1](https://github.com/gravity-ui/uikit/compare/v6.23.0...v6.23.1) (2024-08-14)


### Bug Fixes

* **useList:** fixed expanded controlled state behaviour ([#1749](https://github.com/gravity-ui/uikit/issues/1749)) ([82db00e](https://github.com/gravity-ui/uikit/commit/82db00ef28785237285c1002b38236668530f879))

## [6.23.0](https://github.com/gravity-ui/uikit/compare/v6.22.0...v6.23.0) (2024-08-06)


### Features

* **ListItemView:** ability to pass custom react node as a content prop ([#1726](https://github.com/gravity-ui/uikit/issues/1726)) ([5d5417a](https://github.com/gravity-ui/uikit/commit/5d5417a35357c85a552ee766f6761c5db5e48974))
* **useList:** added migration guide to set of useList components ([#1728](https://github.com/gravity-ui/uikit/issues/1728)) ([69283f1](https://github.com/gravity-ui/uikit/commit/69283f1f681ab79023544ce0fb21e7253e3281d4))


### Bug Fixes

* **Icon:** correctly parse function with default props ([#1713](https://github.com/gravity-ui/uikit/issues/1713)) ([b7eef14](https://github.com/gravity-ui/uikit/commit/b7eef14e0d08ccb81561f111ec544ba9ef6d36f8))
* **TreeSelect:** fix crashes while has selected elements and has no items ([#1727](https://github.com/gravity-ui/uikit/issues/1727)) ([0e22bde](https://github.com/gravity-ui/uikit/commit/0e22bdeed87b8841d8190758df0a6e4cf0bebd15))
* **typography:** use correct variables across the project ([#1712](https://github.com/gravity-ui/uikit/issues/1712)) ([4a9a6d1](https://github.com/gravity-ui/uikit/commit/4a9a6d1896e0e4fc773ac66815fc5fa1418176c1))

## [6.22.0](https://github.com/gravity-ui/uikit/compare/v6.21.0...v6.22.0) (2024-07-27)


### Features

* **AvatarStack:** add component ([#924](https://github.com/gravity-ui/uikit/issues/924)) ([862f4fb](https://github.com/gravity-ui/uikit/commit/862f4fbbaca8d431f0562965b3cad56e21b7130c))


### Bug Fixes

* **Breadcrums:** support react &lt;18 types ([#1722](https://github.com/gravity-ui/uikit/issues/1722)) ([5229e99](https://github.com/gravity-ui/uikit/commit/5229e99731ceef030bd19871d39352081fb4ed69))
* **useList:** fix useList hook for support initialization state ([#1719](https://github.com/gravity-ui/uikit/issues/1719)) ([2b04b18](https://github.com/gravity-ui/uikit/commit/2b04b18e1f1634a358e245b79aa8da65d33a9e95))

## [6.21.0](https://github.com/gravity-ui/uikit/compare/v6.20.1...v6.21.0) (2024-07-16)


### Features

* **PinInput:** form support ([#1686](https://github.com/gravity-ui/uikit/issues/1686)) ([b82262e](https://github.com/gravity-ui/uikit/commit/b82262e6ac3ac656f0d87a6275a081f9990aeb6a))
* **Select:** new label and value resize behaviour ([#1694](https://github.com/gravity-ui/uikit/issues/1694)) ([891fa88](https://github.com/gravity-ui/uikit/commit/891fa886ce5b2d9c8753abbfe49f833ff35619a6))
* **TreeList:** add ListTreeItemType interface export and id argument to renderItem prop ([#1707](https://github.com/gravity-ui/uikit/issues/1707)) ([de544b8](https://github.com/gravity-ui/uikit/commit/de544b871f722fe63f677e17f4272767bebf973e))
* **TreeSelect:** add placeholder prop ([#1705](https://github.com/gravity-ui/uikit/issues/1705)) ([88696a3](https://github.com/gravity-ui/uikit/commit/88696a3f529c44dc9bd17024c926a77fea67acaa))
* **useControlledState:** support update callback with additional params ([#1688](https://github.com/gravity-ui/uikit/issues/1688)) ([8bff882](https://github.com/gravity-ui/uikit/commit/8bff8821b4e8bb20e1bedb01c07a3ba8f22dfe16))
* **useResizeObserver:** support box option ([#1687](https://github.com/gravity-ui/uikit/issues/1687)) ([a178dff](https://github.com/gravity-ui/uikit/commit/a178dffefb2d1cfa481417a2dea6297034ae22a0))


### Bug Fixes

* **Avatar:** update text font weight ([#1684](https://github.com/gravity-ui/uikit/issues/1684)) ([0ae513a](https://github.com/gravity-ui/uikit/commit/0ae513a2e2a595f2cc7f5d0b2fe532a6f7f46b03))
* **ListItemView:** div -&gt; li default list item html tag ([#1698](https://github.com/gravity-ui/uikit/issues/1698)) ([07a16c9](https://github.com/gravity-ui/uikit/commit/07a16c959198bedfa45dbb14b5ad804bd11a6d82))
* **Sheet:** fix incorrect content height calculation ([#1700](https://github.com/gravity-ui/uikit/issues/1700)) ([7e4dd23](https://github.com/gravity-ui/uikit/commit/7e4dd2374cb83f72168e0b2fc416fa76dd6fbe6e))
* **TextArea:** fix content width & height styles ([#1690](https://github.com/gravity-ui/uikit/issues/1690)) ([94979cf](https://github.com/gravity-ui/uikit/commit/94979cf8c43194dd347481929dc1e217ac2bd84b))
* **TreeSelect:** add disabled prop ([#1697](https://github.com/gravity-ui/uikit/issues/1697)) ([f9650da](https://github.com/gravity-ui/uikit/commit/f9650dab0b999e5efa03e2e8f513e62074083f67))
* **TreeSelect:** fix page gap on component focus in some cases ([#1708](https://github.com/gravity-ui/uikit/issues/1708)) ([cd4eb93](https://github.com/gravity-ui/uikit/commit/cd4eb93375ad7a6cfc6e4c87a92e3a20679b3047))
* **useList:** fix disabled elements activate logic ([#1706](https://github.com/gravity-ui/uikit/issues/1706)) ([f12d49f](https://github.com/gravity-ui/uikit/commit/f12d49f125c189ff6ceaba86b5000920a811586d))

## [6.20.1](https://github.com/gravity-ui/uikit/compare/v6.20.0...v6.20.1) (2024-07-01)


### Bug Fixes

* **Dialog:** move QA props to DialogOwnProps ([#1691](https://github.com/gravity-ui/uikit/issues/1691)) ([fc33ba7](https://github.com/gravity-ui/uikit/commit/fc33ba716559db6bfe532b64684f439e930daa89))
* **Text:** style property  ([#1681](https://github.com/gravity-ui/uikit/issues/1681)) ([89048e4](https://github.com/gravity-ui/uikit/commit/89048e45e6f2d3512c5a70ed75ece530885e72da))

## [6.20.0](https://github.com/gravity-ui/uikit/compare/v6.19.0...v6.20.0) (2024-06-26)


### Features

* **List:** add event in item click handler arguments ([#1675](https://github.com/gravity-ui/uikit/issues/1675)) ([b2a19a6](https://github.com/gravity-ui/uikit/commit/b2a19a65d4867173ac4becc31edb4e2d4d4225e7))
* **Overlay:** implement component ([#1474](https://github.com/gravity-ui/uikit/issues/1474)) ([ef47354](https://github.com/gravity-ui/uikit/commit/ef4735495f14c86e5f6172d4fc4ba80b603b8de6))
* **PinInput:** `responsive` prop and CSS API ([#1679](https://github.com/gravity-ui/uikit/issues/1679)) ([24484d2](https://github.com/gravity-ui/uikit/commit/24484d2c968c408fc65ff1489eed6ab8b7569293))
* **PinInput:** implement component API ([#1674](https://github.com/gravity-ui/uikit/issues/1674)) ([72cf90f](https://github.com/gravity-ui/uikit/commit/72cf90f3178297ba6a30cc9f785f7c286b2d49f3))
* **useList:** redesigned api ([#1661](https://github.com/gravity-ui/uikit/issues/1661)) ([ea320f7](https://github.com/gravity-ui/uikit/commit/ea320f7c17ca240cfb1f96297a634d465924b240))
* **UserLabel:** add `size` property ([#1658](https://github.com/gravity-ui/uikit/issues/1658)) ([39cd8ad](https://github.com/gravity-ui/uikit/commit/39cd8ada02a66e43ff4c9a1afa6d4b384c8000b6))

## [6.19.0](https://github.com/gravity-ui/uikit/compare/v6.18.0...v6.19.0) (2024-06-20)


### Features

* **link_underline:** add link underline ([#1648](https://github.com/gravity-ui/uikit/issues/1648)) ([496ca55](https://github.com/gravity-ui/uikit/commit/496ca55d10d9c37202fa87f7c1d9210ff45c5f81))
* **Select:** add filter prop ([#1669](https://github.com/gravity-ui/uikit/issues/1669)) ([98750c6](https://github.com/gravity-ui/uikit/commit/98750c64674abdea031da2fb08761e38bb640505))
* support form reset for inputs ([#1660](https://github.com/gravity-ui/uikit/issues/1660)) ([38fe431](https://github.com/gravity-ui/uikit/commit/38fe43155e7f55d9190ac2bcd405612dec598d5e))


### Bug Fixes

* **Dialog:** render error popup inside the dialog ([#1657](https://github.com/gravity-ui/uikit/issues/1657)) ([edf6473](https://github.com/gravity-ui/uikit/commit/edf647324b84ed75757f14b997976838ad9529a0))
* **select:** connect combobox to listbox ([#1665](https://github.com/gravity-ui/uikit/issues/1665)) ([c61fe11](https://github.com/gravity-ui/uikit/commit/c61fe114c404f1a55db0b8eba02b0a2c48b5e0cb))
* **Select:** fix double scroll in sheet on mobile ([#1672](https://github.com/gravity-ui/uikit/issues/1672)) ([164a1f2](https://github.com/gravity-ui/uikit/commit/164a1f2a0935b771102eaa425435bf3b3d2fd456))
* **Select:** id property ([#1604](https://github.com/gravity-ui/uikit/issues/1604)) ([db15851](https://github.com/gravity-ui/uikit/commit/db1585165abf8a8992b10315b538c8f8be87cb25))
* **Sheet:** fix resizing depending on the size of the window ([#1671](https://github.com/gravity-ui/uikit/issues/1671)) ([9352c99](https://github.com/gravity-ui/uikit/commit/9352c997d5ce3f0e7087f80bbf41e58a95cb5aab))
* **Sheet:** start touch event detection ([#1668](https://github.com/gravity-ui/uikit/issues/1668)) ([b655fec](https://github.com/gravity-ui/uikit/commit/b655fec69628bf53e01dfec63cb8463131e746e8))

## [6.18.0](https://github.com/gravity-ui/uikit/compare/v6.17.0...v6.18.0) (2024-06-14)


### Features

* **Breadcrumbs:** new component ([#1497](https://github.com/gravity-ui/uikit/issues/1497)) ([5cdc675](https://github.com/gravity-ui/uikit/commit/5cdc6753d4461b8e531870bcd9f4724dc6782d80))
* **Select:** support form ([#1644](https://github.com/gravity-ui/uikit/issues/1644)) ([1ad73b6](https://github.com/gravity-ui/uikit/commit/1ad73b69679a55001d50e97db1d40484d3e04c8c))
* support RSC ([#1582](https://github.com/gravity-ui/uikit/issues/1582)) ([770d787](https://github.com/gravity-ui/uikit/commit/770d787ef5952de5ccc45595065fa50b1f1d48f9))
* **Table:** add filter to colum settings ([#1627](https://github.com/gravity-ui/uikit/issues/1627)) ([6eca546](https://github.com/gravity-ui/uikit/commit/6eca54635f8fbbcf6960ff6bb96563273b458700))


### Bug Fixes

* **Button:** remove useless pointer-events style for icon content ([#1641](https://github.com/gravity-ui/uikit/issues/1641)) ([47b9850](https://github.com/gravity-ui/uikit/commit/47b985030df97f46fc16d283e75a4f8b395ff4db))
* **PinInput:** add use client ([#1646](https://github.com/gravity-ui/uikit/issues/1646)) ([d0bdede](https://github.com/gravity-ui/uikit/commit/d0bdede7c79e5102db41b73b0350056c49c67ace))

## [6.17.0](https://github.com/gravity-ui/uikit/compare/v6.16.0...v6.17.0) (2024-06-11)


### Features

* add PinInput component ([#1557](https://github.com/gravity-ui/uikit/issues/1557)) ([7d26272](https://github.com/gravity-ui/uikit/commit/7d26272ed67e7f94f002f501a9ff703f4210a925))


### Bug Fixes

* **Button:** normal-contrast loading view ([#1630](https://github.com/gravity-ui/uikit/issues/1630)) ([bfa2dbf](https://github.com/gravity-ui/uikit/commit/bfa2dbfa85c2c01e0fcd8c5f07d6e93fa31660ff))
* **Slider:** export function for preparing initial value ([#1637](https://github.com/gravity-ui/uikit/issues/1637)) ([434949e](https://github.com/gravity-ui/uikit/commit/434949e4f608cde2330cca02cbd0ab99244fd0fb))
* **Text:** return missing props to TextProps type ([#1631](https://github.com/gravity-ui/uikit/issues/1631)) ([6a70f17](https://github.com/gravity-ui/uikit/commit/6a70f17c04f4af52e49ea5bcbe9c1f886d9c3969))
* **theme:** bring back root classname helper and fix docs ([#1633](https://github.com/gravity-ui/uikit/issues/1633)) ([ba08c66](https://github.com/gravity-ui/uikit/commit/ba08c66d83dac2d8ff9d44c27f2739f192d68e92))
* **Toc:** unify item line height ([#1635](https://github.com/gravity-ui/uikit/issues/1635)) ([4612a77](https://github.com/gravity-ui/uikit/commit/4612a7713ee04590a8e4073d831a42ba2e03d9fe))
* **useList:** add qa property to container ([#1625](https://github.com/gravity-ui/uikit/issues/1625)) ([05c1fc2](https://github.com/gravity-ui/uikit/commit/05c1fc2df61226cc070c007388c1aeb5e5744799))

## [6.16.0](https://github.com/gravity-ui/uikit/compare/v6.15.0...v6.16.0) (2024-05-24)


### Features

* **Text, Flex, Box:** typed html attributes ([#1583](https://github.com/gravity-ui/uikit/issues/1583)) ([3345489](https://github.com/gravity-ui/uikit/commit/33454890d7c2bcc422aa77dba7072193c61ba8b7))


### Bug Fixes

* **Button:** do not shrink button when there is only one icon ([#1577](https://github.com/gravity-ui/uikit/issues/1577)) ([98fd95f](https://github.com/gravity-ui/uikit/commit/98fd95f8f1ef9c7148883f978bcae7ec41398f14))
* **Flex,ListItemView:** return ref drilling by React.forwardRef ([#1612](https://github.com/gravity-ui/uikit/issues/1612)) ([9b8f4f8](https://github.com/gravity-ui/uikit/commit/9b8f4f897bfe1919f165029ea7865654f808367f))
* **Link:** change href property type description ([#1574](https://github.com/gravity-ui/uikit/issues/1574)) ([#1593](https://github.com/gravity-ui/uikit/issues/1593)) ([0aec983](https://github.com/gravity-ui/uikit/commit/0aec98306d8534e7e48c1bf050b17dfa7e0ac500))
* **Text:** fix custom html tag inheritance ([#1584](https://github.com/gravity-ui/uikit/issues/1584)) ([fcd2ff3](https://github.com/gravity-ui/uikit/commit/fcd2ff33a7875c84a76fdab757a474d42f900b3e))
* **Tooltip:** use more reasonable animation delay ([#1586](https://github.com/gravity-ui/uikit/issues/1586)) ([fe14706](https://github.com/gravity-ui/uikit/commit/fe147066d128749650ca71ad6ccee3d831cc6ad6))

## [6.15.0](https://github.com/gravity-ui/uikit/compare/v6.14.1...v6.15.0) (2024-05-08)


### Features

* add new css variable `--g-color-base-float-medium` ([#1572](https://github.com/gravity-ui/uikit/issues/1572)) ([aeda6fe](https://github.com/gravity-ui/uikit/commit/aeda6fee49a184ba84fa77bbe65c1827f76c353d))


### Bug Fixes

* **Select:** fix focus state on control click in Safari ([#1132](https://github.com/gravity-ui/uikit/issues/1132)) ([80730cc](https://github.com/gravity-ui/uikit/commit/80730cc0dff90f86976b10198878a1ca369e239f))
* **Sheet:** resize sheet if image in content is loaded ([#1566](https://github.com/gravity-ui/uikit/issues/1566)) ([8b56abd](https://github.com/gravity-ui/uikit/commit/8b56abdc46f66a6eb1eb0e0fcde765857a170a83))

## [6.14.1](https://github.com/gravity-ui/uikit/compare/v6.14.0...v6.14.1) (2024-05-02)


### Bug Fixes

* **TextInput:** fix `handleAdditionalContentClick` handler ([#1558](https://github.com/gravity-ui/uikit/issues/1558)) ([911624f](https://github.com/gravity-ui/uikit/commit/911624f7c9a411ae57d417f5e81f13a4a671a4a0))
* **utils:** correctly check type of element ([#1560](https://github.com/gravity-ui/uikit/issues/1560)) ([c854f4f](https://github.com/gravity-ui/uikit/commit/c854f4f42ed0294907114e07cf0d6c07f149c975))

## [6.14.0](https://github.com/gravity-ui/uikit/compare/v6.13.0...v6.14.0) (2024-04-27)


### Features

* **Portal:** take in consideration parent theme ([#1506](https://github.com/gravity-ui/uikit/issues/1506)) ([8c7ca2d](https://github.com/gravity-ui/uikit/commit/8c7ca2dca5a4a52cf9714b25aa8c8d85d4394f39))
* **Sheet:** add aria attributes ([#1555](https://github.com/gravity-ui/uikit/issues/1555)) ([b71ea01](https://github.com/gravity-ui/uikit/commit/b71ea0111c56f577fc88aa64bc292c95d0be67c7))
* **Table:** close table actions popup after click ([#1546](https://github.com/gravity-ui/uikit/issues/1546)) ([0ab21bb](https://github.com/gravity-ui/uikit/commit/0ab21bbc204f5e26dccfaea865331d3f984af8ed))
* **withTableSettings:** add a reset action ([#1526](https://github.com/gravity-ui/uikit/issues/1526)) ([9e93c91](https://github.com/gravity-ui/uikit/commit/9e93c917e3aa13b262dc3c33b960fa39e84902b7))


### Bug Fixes

* **Alert:** fix close button width ([#1542](https://github.com/gravity-ui/uikit/issues/1542)) ([f916681](https://github.com/gravity-ui/uikit/commit/f91668105abdb06a59891872b3202f5d0152bb9e))
* **layout:** update layout docs ([#1550](https://github.com/gravity-ui/uikit/issues/1550)) ([575477a](https://github.com/gravity-ui/uikit/commit/575477a1901d3dbd4c84d8320bad5a0201b6c589))
* **Select:** add onLoadMore to useCallback deps in SelectList ([#1041](https://github.com/gravity-ui/uikit/issues/1041)) ([c34590e](https://github.com/gravity-ui/uikit/commit/c34590e40fa49333f990271ec70dbbd290c51b86))
* **Select:** fix examples in docs and storybook ([#1553](https://github.com/gravity-ui/uikit/issues/1553)) ([3a46421](https://github.com/gravity-ui/uikit/commit/3a464218a54f524f490f91cbe5a1c3d6132b44e6))
* **Select:** show invalid state without passing error message ([#1554](https://github.com/gravity-ui/uikit/issues/1554)) ([882c9a9](https://github.com/gravity-ui/uikit/commit/882c9a9dbdae0d9bb0002b0a8a15515de42c48dc))
* **TreeList:** added missed initial state for elements ([#1524](https://github.com/gravity-ui/uikit/issues/1524)) ([5d3b154](https://github.com/gravity-ui/uikit/commit/5d3b1544a8dea0b8464a0e0d5148509f43e7a415))
* **useList:** remove debug dev only information ([#1552](https://github.com/gravity-ui/uikit/issues/1552)) ([02bf33c](https://github.com/gravity-ui/uikit/commit/02bf33c1cb277e29866c86c4e7264b618feebfe1))

## [6.13.0](https://github.com/gravity-ui/uikit/compare/v6.12.0...v6.13.0) (2024-04-22)


### Features

* **layout:** unification of Theme and Layout Providers ([#1518](https://github.com/gravity-ui/uikit/issues/1518)) ([d89610a](https://github.com/gravity-ui/uikit/commit/d89610a8c7bc952ecf0db4c2548c8c5dde9bc710))


### Bug Fixes

* **Card:** reset box shadow styles for the root ([#1537](https://github.com/gravity-ui/uikit/issues/1537)) ([39b7fe8](https://github.com/gravity-ui/uikit/commit/39b7fe801593151094759503e4f8c706cece38c8))
* **ListItemView:** fix bg color ([#1488](https://github.com/gravity-ui/uikit/issues/1488)) ([2ae45ef](https://github.com/gravity-ui/uikit/commit/2ae45ef9a997f8d0cdd8687116044239e1ba710c))
* **ListItemView:** removed max identation ([#1535](https://github.com/gravity-ui/uikit/issues/1535)) ([d7d45db](https://github.com/gravity-ui/uikit/commit/d7d45db53338b5e623bb81b59e7b66a588c18e28))
* **ThemeProvider:** changed theme to config prop name ([#1528](https://github.com/gravity-ui/uikit/issues/1528)) ([62431ca](https://github.com/gravity-ui/uikit/commit/62431ca72c220f9a434d065c87b33cf060cd7f7a))

## [6.12.0](https://github.com/gravity-ui/uikit/compare/v6.11.0...v6.12.0) (2024-04-18)


### Features

* **useList:** added ability to define initial value to useListState ([#1483](https://github.com/gravity-ui/uikit/issues/1483)) ([7f66d28](https://github.com/gravity-ui/uikit/commit/7f66d28d9e3b43ebe388b90b6bc8e2799962d0c0))


### Bug Fixes

* do not call warnOnce function in production ([#1520](https://github.com/gravity-ui/uikit/issues/1520)) ([9ab7d7c](https://github.com/gravity-ui/uikit/commit/9ab7d7c86a06a6f94126a87acfb23033709ec8a1))

## [6.11.0](https://github.com/gravity-ui/uikit/compare/v6.10.2...v6.11.0) (2024-04-17)


### Features

* **Button:** refactor to flex and center icons ([#1452](https://github.com/gravity-ui/uikit/issues/1452)) ([31c22e8](https://github.com/gravity-ui/uikit/commit/31c22e8418f67cb2df3354350f19e44471918aa4))


### Bug Fixes

* add load more functionallity to virtualized list ([#1490](https://github.com/gravity-ui/uikit/issues/1490)) ([#1513](https://github.com/gravity-ui/uikit/issues/1513)) ([8de1653](https://github.com/gravity-ui/uikit/commit/8de16536b7541835d58cc651a3ab4248f0e1ebf0))
* **Breadcrumbs:** unset more item alignment ([#1505](https://github.com/gravity-ui/uikit/issues/1505)) ([7d9797a](https://github.com/gravity-ui/uikit/commit/7d9797ad0b1389b2e732ebeafcae312f750ae9d8))
* **Dialog:** correct width's vars order ([#1510](https://github.com/gravity-ui/uikit/issues/1510)) ([f54da2d](https://github.com/gravity-ui/uikit/commit/f54da2de711e738a2089f26833be4dc2fa01ec6b))
* **Label:** isolate inner z-indexes ([#1519](https://github.com/gravity-ui/uikit/issues/1519)) ([200c052](https://github.com/gravity-ui/uikit/commit/200c0522dfeedd637f0656fa27c23a2cb9f844bf))
* **layout:** ability to override breakpoint during theme ([#1512](https://github.com/gravity-ui/uikit/issues/1512)) ([bad4fa9](https://github.com/gravity-ui/uikit/commit/bad4fa9e8336cd4b06a9875aef948fc8caaaf293))
* **ListItemView:** fix indentation in depth more than 10 ([#1517](https://github.com/gravity-ui/uikit/issues/1517)) ([2cde017](https://github.com/gravity-ui/uikit/commit/2cde017be22a58b331a4aecff40ca3e83cb23e26))
* **ListItemView:** some changes after feedback ([#1516](https://github.com/gravity-ui/uikit/issues/1516)) ([b274498](https://github.com/gravity-ui/uikit/commit/b2744989b4398ae7755e8ea9ae6fed0516bf8618))
* prevent deselection of required table column items ([#1508](https://github.com/gravity-ui/uikit/issues/1508)) ([a69050c](https://github.com/gravity-ui/uikit/commit/a69050cd7213dacce7868a0259359d59e52a1743))
* return `--g-color-private-white-20-solid` css variable ([#1511](https://github.com/gravity-ui/uikit/issues/1511)) ([4a366be](https://github.com/gravity-ui/uikit/commit/4a366be252609c1369262a2e76101e82b6d87a67))
* **theme:** add option for controlling :root color-scheme ([#1468](https://github.com/gravity-ui/uikit/issues/1468)) ([f6237e1](https://github.com/gravity-ui/uikit/commit/f6237e1356248668693f1cc34c7515a8e6a52e41))

## [6.10.2](https://github.com/gravity-ui/uikit/compare/v6.10.1...v6.10.2) (2024-04-10)


### Bug Fixes

* **TableColumnSetup:** switcher wrapper styles ([#1500](https://github.com/gravity-ui/uikit/issues/1500)) ([d871319](https://github.com/gravity-ui/uikit/commit/d871319789d52cb4075025748ee9ad980d617659))

## [6.10.1](https://github.com/gravity-ui/uikit/compare/v6.10.0...v6.10.1) (2024-04-10)


### Bug Fixes

* **TableColumnSetup:** uniq i18n keysets, styles ([#1498](https://github.com/gravity-ui/uikit/issues/1498)) ([271ae3f](https://github.com/gravity-ui/uikit/commit/271ae3f6b138e9a3e23fb29e8e652c5cece246e9))

## [6.10.0](https://github.com/gravity-ui/uikit/compare/v6.9.0...v6.10.0) (2024-04-09)


### Features

* **Select:** add selected elements counter on multiple selection ([#1368](https://github.com/gravity-ui/uikit/issues/1368)) ([9f6aa9c](https://github.com/gravity-ui/uikit/commit/9f6aa9cadd3821f3aa8501f705a5980171d1d98c))
* **Text:** add variant inherit ([#1492](https://github.com/gravity-ui/uikit/issues/1492)) ([7157c70](https://github.com/gravity-ui/uikit/commit/7157c70a9817470db6a8643a6c9c7f713361b8f5))
* userLabel  text depends on vars ([#1493](https://github.com/gravity-ui/uikit/issues/1493)) ([d826ca7](https://github.com/gravity-ui/uikit/commit/d826ca7f2db7166cc39542ae4e67c4f8630f3b7b))


### Bug Fixes

* **Dialog:** fix header paddings without close button ([#1495](https://github.com/gravity-ui/uikit/issues/1495)) ([820dd60](https://github.com/gravity-ui/uikit/commit/820dd605b71df426c2df178dc247caad3a9dbdd6))
* **Label:** correctly work with keyboard ([#1485](https://github.com/gravity-ui/uikit/issues/1485)) ([1e5380f](https://github.com/gravity-ui/uikit/commit/1e5380f4300f2c872fa6c55b6bdd3d8435d38499))
* **Label:** do not inherit parent's font weight ([#1496](https://github.com/gravity-ui/uikit/issues/1496)) ([8a8c2e5](https://github.com/gravity-ui/uikit/commit/8a8c2e51e74ec4e6555953033f27d078a711d1b0))
* **List:** fix `Home` & `End` keys handle ([#1491](https://github.com/gravity-ui/uikit/issues/1491)) ([77156ff](https://github.com/gravity-ui/uikit/commit/77156ffacb5860551cc255c5f10b4c3bd69a11a0))
* **List:** fix `SimpleContainer` dimensions handle ([#1479](https://github.com/gravity-ui/uikit/issues/1479)) ([68243be](https://github.com/gravity-ui/uikit/commit/68243be3827b9e6aa9ebed7d45b49609d7f7500f))
* **Popover:** remove flex gap workaround ([#1489](https://github.com/gravity-ui/uikit/issues/1489)) ([ad997e5](https://github.com/gravity-ui/uikit/commit/ad997e5cc2ac861f50d527b00d9742e4642cda65))
* **withTableSettings:** isSelected -&gt; selected, isRequired -> required ([#1478](https://github.com/gravity-ui/uikit/issues/1478)) ([cf1dfb0](https://github.com/gravity-ui/uikit/commit/cf1dfb08ae2a23106eac3f18169b2f47bd690b8d))
* **withTableSettings:** renderClone for dnd ([#1463](https://github.com/gravity-ui/uikit/issues/1463)) ([76409f4](https://github.com/gravity-ui/uikit/commit/76409f4c382bf9a73a9619cde84f11d77e78f3d7))

## [6.9.0](https://github.com/gravity-ui/uikit/compare/v6.8.0...v6.9.0) (2024-04-03)


### Features

* **DropdownMenu:** add class name for submenu parents ([#1465](https://github.com/gravity-ui/uikit/issues/1465)) ([a314081](https://github.com/gravity-ui/uikit/commit/a3140811d9c80fb1e61e315c838f4209d7a23459))
* **useList:** update codeowners ([#1473](https://github.com/gravity-ui/uikit/issues/1473)) ([d8b71e9](https://github.com/gravity-ui/uikit/commit/d8b71e937d113d6a291849e9515b922083702f18))


### Bug Fixes

* **Breadcrumbs:** fix recalculate method ([#1475](https://github.com/gravity-ui/uikit/issues/1475)) ([2f8acf7](https://github.com/gravity-ui/uikit/commit/2f8acf7f8278d704a6cbb5351ef73dd4774c1d5d))
* **List:** fix `onSortEnd` method ([#1476](https://github.com/gravity-ui/uikit/issues/1476)) ([1567248](https://github.com/gravity-ui/uikit/commit/156724825d12c4e3c185fa766c74c212838ead8c))
* **TextInput:** fix control line height ([#1477](https://github.com/gravity-ui/uikit/issues/1477)) ([e5438ed](https://github.com/gravity-ui/uikit/commit/e5438ed8fb9b8ae9e9497b8448a67512e9e0983c))
* **TreeList:** add getId prop drilling to list container ([#1469](https://github.com/gravity-ui/uikit/issues/1469)) ([484cac7](https://github.com/gravity-ui/uikit/commit/484cac79bfa6f408d833cfdd33c20dac33bf66ac))
* **TreeList:** fixes + documentation ([#1447](https://github.com/gravity-ui/uikit/issues/1447)) ([46b2850](https://github.com/gravity-ui/uikit/commit/46b2850731b1699c517c2787a6b370a219323e52))
* **useList:** add export of computeItemSize to useList ([#1472](https://github.com/gravity-ui/uikit/issues/1472)) ([c6c8ed4](https://github.com/gravity-ui/uikit/commit/c6c8ed428053e7f18634d827990ef97dabf5700f))
* **useList:** added dragging property to ListItemView docs ([#1470](https://github.com/gravity-ui/uikit/issues/1470)) ([750e5ba](https://github.com/gravity-ui/uikit/commit/750e5ba829fbfea798412f3192406b400007bdfc))
* **useList:** added missing imports to docs ([#1466](https://github.com/gravity-ui/uikit/issues/1466)) ([4940a9a](https://github.com/gravity-ui/uikit/commit/4940a9adc0fb036aa2b39b0c67283ac75443be53))

## [6.8.0](https://github.com/gravity-ui/uikit/compare/v6.7.0...v6.8.0) (2024-03-29)


### Features

* **TreeSelect:** rework popup border radius ([#1456](https://github.com/gravity-ui/uikit/issues/1456)) ([0cf2f95](https://github.com/gravity-ui/uikit/commit/0cf2f95907ba1a6164086578d239f905bd15a445))


### Bug Fixes

* **Divider:** add export of Divider to Components/index ([#1461](https://github.com/gravity-ui/uikit/issues/1461)) ([bdab522](https://github.com/gravity-ui/uikit/commit/bdab522a06429d935cc3a4fb5a9b785c3eb8330d))
* **TextInput:** turn off event onBlur on input when use clear button ([#1458](https://github.com/gravity-ui/uikit/issues/1458)) ([3274c04](https://github.com/gravity-ui/uikit/commit/3274c042f27af6ee39ef77b14ac45289a0b2f1a2))

## [6.7.0](https://github.com/gravity-ui/uikit/compare/v6.6.0...v6.7.0) (2024-03-28)


### Features

* **Divider:** add the Divider component ([#1322](https://github.com/gravity-ui/uikit/issues/1322)) ([9a19806](https://github.com/gravity-ui/uikit/commit/9a198065d40466f43eedb4f479140f43e231ee8f))


### Bug Fixes

* **Tooltip:** fix appearing & disappearing ([#1460](https://github.com/gravity-ui/uikit/issues/1460)) ([b0b3ec8](https://github.com/gravity-ui/uikit/commit/b0b3ec8bc18713dd782f477429182ed65c527a04))

## [6.6.0](https://github.com/gravity-ui/uikit/compare/v6.5.0...v6.6.0) (2024-03-26)


### Features

* improve focus outline styles for text/select inputs ([#1318](https://github.com/gravity-ui/uikit/issues/1318)) ([ce75de8](https://github.com/gravity-ui/uikit/commit/ce75de8899488f0e98a4c0d4e10a593d44b6fe61))


### Bug Fixes

* **Breadcrumbs:** fix gravity-ui doc generation ([#1446](https://github.com/gravity-ui/uikit/issues/1446)) ([ce4bca5](https://github.com/gravity-ui/uikit/commit/ce4bca5ec548ad09df9c992a4cca6885a6d4e485))
* **DropdownMenu:** fix hiding group subitems ([#1444](https://github.com/gravity-ui/uikit/issues/1444)) ([4cf7d39](https://github.com/gravity-ui/uikit/commit/4cf7d39e0334087fc54d7c509312121aabd9ed2c))
* **TreeList:** refactor item styles ([#1439](https://github.com/gravity-ui/uikit/issues/1439)) ([fdbb052](https://github.com/gravity-ui/uikit/commit/fdbb0525bf9991baa68ff0d3786050cac480f78f))

## [6.5.0](https://github.com/gravity-ui/uikit/compare/v6.4.0...v6.5.0) (2024-03-21)


### Features

* **Breadcrumbs:** export `LinkBreadcrumbsItem` & `ButtonBreadcrumbsItem` types ([#1435](https://github.com/gravity-ui/uikit/issues/1435)) ([e5fde1b](https://github.com/gravity-ui/uikit/commit/e5fde1bb07c440e155dd51af3b2853dfab8c5b78))
* **Pagination:** add qa attributes ([#1438](https://github.com/gravity-ui/uikit/issues/1438)) ([785079a](https://github.com/gravity-ui/uikit/commit/785079a91d5a6fe0b1bfd2fe76e5cfbf321f9502))


### Bug Fixes

* **Breadcrumbs:** renamed `LinkBreadcrumbsItem` and `ButtonBreadcrumbsItem` types ([#1437](https://github.com/gravity-ui/uikit/issues/1437)) ([db09f93](https://github.com/gravity-ui/uikit/commit/db09f93624b3cdeaaa72498a7dea73c5b5416844))
* **UserLabel:** replace text to children in README ([#1432](https://github.com/gravity-ui/uikit/issues/1432)) ([b8c79e1](https://github.com/gravity-ui/uikit/commit/b8c79e1b444e46f240425bf9942642fdab02259f))

## [6.4.0](https://github.com/gravity-ui/uikit/compare/v6.3.0...v6.4.0) (2024-03-20)


### Features

* **TreeList:** new useList family component ([#1417](https://github.com/gravity-ui/uikit/issues/1417)) ([5e7d8b9](https://github.com/gravity-ui/uikit/commit/5e7d8b9af214ecc084375e681e0f8d64dc933c2c))
* **User:** added qa attribute for name and description nodes ([#1429](https://github.com/gravity-ui/uikit/issues/1429)) ([ef6143a](https://github.com/gravity-ui/uikit/commit/ef6143a2b5247904b57c4c60fb718f47c6550f20))


### Bug Fixes

* **Palette:** fixed README.md for the landing ([#1431](https://github.com/gravity-ui/uikit/issues/1431)) ([c15f2e3](https://github.com/gravity-ui/uikit/commit/c15f2e342dd2c90fcc1703c6f713180b23d135e2))
* **withTableSettings:** deprecate the renderControls prop ([#1427](https://github.com/gravity-ui/uikit/issues/1427)) ([27be674](https://github.com/gravity-ui/uikit/commit/27be6742fca41cac2f74b23f1db84276cdb7933d))

## [6.3.0](https://github.com/gravity-ui/uikit/compare/v6.2.0...v6.3.0) (2024-03-18)


### Features

* add Palette component ([#1304](https://github.com/gravity-ui/uikit/issues/1304)) ([e731838](https://github.com/gravity-ui/uikit/commit/e731838318635659183a05feb0ef630683ec7d67))
* **Alert:** added ability to pass null as icon prop value ([#1407](https://github.com/gravity-ui/uikit/issues/1407)) ([180edd0](https://github.com/gravity-ui/uikit/commit/180edd0dd703e96ae13120a332573f92af34f7d0))
* **Breadcrumbs:** add `renderItem` property ([#1413](https://github.com/gravity-ui/uikit/issues/1413)) ([d1c800f](https://github.com/gravity-ui/uikit/commit/d1c800fed670563a2fff12cb5b51da1f74045042))
* **Text:** added `break-word` to `wordBreak` property ([#1424](https://github.com/gravity-ui/uikit/issues/1424)) ([607c3ea](https://github.com/gravity-ui/uikit/commit/607c3eac7c6f70a61fd68350bfe65227d2d3b9cc))


### Bug Fixes

* adding new classes in rootClassName before removing ([#1411](https://github.com/gravity-ui/uikit/issues/1411)) ([e29cde1](https://github.com/gravity-ui/uikit/commit/e29cde168077652d217585cd30bae10ee7e2747e))
* **DropdownMenu:** fix opening from keyboard ([#1404](https://github.com/gravity-ui/uikit/issues/1404)) ([9251714](https://github.com/gravity-ui/uikit/commit/9251714e4aae50f91d4e5082f2f7151a71321c30))
* prevent event bubbling for table item action ([#1399](https://github.com/gravity-ui/uikit/issues/1399)) ([d2e9d41](https://github.com/gravity-ui/uikit/commit/d2e9d411fd268d6628b2eef2bd3f8abd5f3da7b0))
* **ThemeProvider:** always set CSS class when scoped ([#1423](https://github.com/gravity-ui/uikit/issues/1423)) ([c787b5b](https://github.com/gravity-ui/uikit/commit/c787b5b30cdedad6e466fa0bbfc46b51313ee114))
* **Toc:** set aria-current attribute to selected item ([#1426](https://github.com/gravity-ui/uikit/issues/1426)) ([682444a](https://github.com/gravity-ui/uikit/commit/682444a2bd792936735275f73781f3e853597d0a))

## [6.2.0](https://github.com/gravity-ui/uikit/compare/v6.1.1...v6.2.0) (2024-03-05)


### Features

* **Popup:** add transition callbacks ([#1388](https://github.com/gravity-ui/uikit/issues/1388)) ([089beac](https://github.com/gravity-ui/uikit/commit/089beac6f98bf7a81b111fe4316cf8fd26a3f063))
* update i18n pkg ([#1402](https://github.com/gravity-ui/uikit/issues/1402)) ([2fbf2c9](https://github.com/gravity-ui/uikit/commit/2fbf2c96f01d25db1fcf4150e57a63cf057e6cd0))


### Bug Fixes

* **Slider:** add export for Slider ([#1390](https://github.com/gravity-ui/uikit/issues/1390)) ([8eb741f](https://github.com/gravity-ui/uikit/commit/8eb741fc45b4c02e340eda82b492394f4d9d0daa))
* **Toc:** add component import ([#1396](https://github.com/gravity-ui/uikit/issues/1396)) ([f737c0c](https://github.com/gravity-ui/uikit/commit/f737c0cb41117f862aea98ff1e6c5571ff8d3667))

## [6.1.1](https://github.com/gravity-ui/uikit/compare/v6.1.0...v6.1.1) (2024-02-26)


### Bug Fixes

* **breadcrumbs:** fix adaptive more view and define ResizeObserver in ssr apps ([#1364](https://github.com/gravity-ui/uikit/issues/1364)) ([dc6e514](https://github.com/gravity-ui/uikit/commit/dc6e514d058268f2ea482e4d78383a44e400d5e2))
* **controls:** allow disable input via controlProps ([#1371](https://github.com/gravity-ui/uikit/issues/1371)) ([3228dca](https://github.com/gravity-ui/uikit/commit/3228dcab413a5dff9e3dc2353f1ddfa6235643e8))
* **CopyToClipboard:** return CopyToClipboardProps type ([#1367](https://github.com/gravity-ui/uikit/issues/1367)) ([43599c2](https://github.com/gravity-ui/uikit/commit/43599c2d435b51e73bd581b73ac9ab3d72584adb))

## [6.1.0](https://github.com/gravity-ui/uikit/compare/v6.0.0...v6.1.0) (2024-02-21)


### Features

* **Disclosure:** possibility to use DefaultDisclosureSummary inside … ([#1359](https://github.com/gravity-ui/uikit/issues/1359)) ([f8b52b9](https://github.com/gravity-ui/uikit/commit/f8b52b92c854dc65206106fa2d3ed40ee21157ac))
* **Select:** add useSelectOptions hook ([#1356](https://github.com/gravity-ui/uikit/issues/1356)) ([456ffaa](https://github.com/gravity-ui/uikit/commit/456ffaacbf20e1e0b5150d86abee1201d9ac3dad))
* **Slider:** introduce Slider component ([#1243](https://github.com/gravity-ui/uikit/issues/1243)) ([a1bf754](https://github.com/gravity-ui/uikit/commit/a1bf75495902b67750660620ea0e8e90c7a50f63))
* **Table:** add renderRowActions property ([#1353](https://github.com/gravity-ui/uikit/issues/1353)) ([e074b1a](https://github.com/gravity-ui/uikit/commit/e074b1a6913c2f3ec9773974672b17e7d35c9006))
* **withTableSettings:** add the renderControls prop ([#1357](https://github.com/gravity-ui/uikit/issues/1357)) ([b3f0d78](https://github.com/gravity-ui/uikit/commit/b3f0d789b131e9b5677e134eee668361ce50fcf6))


### Bug Fixes

* **List:** fix virtualized list items rerender ([#1314](https://github.com/gravity-ui/uikit/issues/1314)) ([8c45f7c](https://github.com/gravity-ui/uikit/commit/8c45f7c55784a4eac88747b4a9db1745d53f0e6c))
* **Select:** do not call onFilterChange on mount ([#1321](https://github.com/gravity-ui/uikit/issues/1321)) ([0bb7c66](https://github.com/gravity-ui/uikit/commit/0bb7c661212630c993574d7f82392e7e9c3c1dad))
* **TextInput:** unequal text alignment in textinput ([#1306](https://github.com/gravity-ui/uikit/issues/1306)) ([c9cdbd0](https://github.com/gravity-ui/uikit/commit/c9cdbd0bba86573d35ec03b1766af4e0c8f5253b))
* **TreeSelect:** fix render container method ([#1344](https://github.com/gravity-ui/uikit/issues/1344)) ([1ab9d59](https://github.com/gravity-ui/uikit/commit/1ab9d591c271d4a9c922b3b1aecbb734338e1f98))
* **TreeSelect:** fixed dnd examples with selected values ([#1329](https://github.com/gravity-ui/uikit/issues/1329)) ([14d6ceb](https://github.com/gravity-ui/uikit/commit/14d6cebe875fef88c9066dbf5aa186aeb615d5f2))
* **TreeSelect:** remove default popup width ([#1350](https://github.com/gravity-ui/uikit/issues/1350)) ([84044f0](https://github.com/gravity-ui/uikit/commit/84044f0f41e9caae4812563ab690e13067d82aad))

## [6.0.0](https://github.com/gravity-ui/uikit/compare/v5.30.1...v6.0.0) (2024-02-06)


### ⚠ BREAKING CHANGES

* rename onClose to onCloseClick ([#1295](https://github.com/gravity-ui/uikit/issues/1295))
* **Persona:** refactored and renamed to UserLabel ([#1292](https://github.com/gravity-ui/uikit/issues/1292))
* **Link:** the "href" property is required ([#1270](https://github.com/gravity-ui/uikit/issues/1270))
* **Breadcrumbs:** use gap property for gaps between breadcrumbs items instead of paddings ([#1185](https://github.com/gravity-ui/uikit/issues/1185))
* rename .yc class prefix ([#1260](https://github.com/gravity-ui/uikit/issues/1260))
* **Table:** update cell paddings ([#1271](https://github.com/gravity-ui/uikit/issues/1271))
* remove setters from mobile hooks ([#1262](https://github.com/gravity-ui/uikit/issues/1262))
* remove remaining `--yc-*` variables ([#1256](https://github.com/gravity-ui/uikit/issues/1256))
* **Table:** update SortIndicator view ([#1220](https://github.com/gravity-ui/uikit/issues/1220))
* delete deprecated hooks ([#1213](https://github.com/gravity-ui/uikit/issues/1213))
* update avatar and user components ([#1221](https://github.com/gravity-ui/uikit/issues/1221))
* **Table:** remove uppercase heading style ([#1222](https://github.com/gravity-ui/uikit/issues/1222))
* merge old Tooltip with ActionTooltip and introduce new Tooltip ([#1189](https://github.com/gravity-ui/uikit/issues/1189))
* **Toaster:** use theme prop instead of type ([#1198](https://github.com/gravity-ui/uikit/issues/1198))
* add CSS API instead of `--yc-*` variables ([#1127](https://github.com/gravity-ui/uikit/issues/1127))
* **Button:** use logical properties ([#1119](https://github.com/gravity-ui/uikit/issues/1119))
* support RTL direction ([#1111](https://github.com/gravity-ui/uikit/issues/1111))
* **Link:** Remove normal-visitable view ([#905](https://github.com/gravity-ui/uikit/issues/905))
* rename theme prop `positive` -> `success` ([#1093](https://github.com/gravity-ui/uikit/issues/1093))
* add css imports to cjs files ([#1101](https://github.com/gravity-ui/uikit/issues/1101))
* remove old theme variables fallback ([#1092](https://github.com/gravity-ui/uikit/issues/1092))
* remove focus visible fallback ([#1086](https://github.com/gravity-ui/uikit/issues/1086))
* **Button:** add CSS API ([#1066](https://github.com/gravity-ui/uikit/issues/1066))

### refactor

* **Breadcrumbs:** use gap property for gaps between breadcrumbs items instead of paddings ([#1185](https://github.com/gravity-ui/uikit/issues/1185)) ([a31d7a1](https://github.com/gravity-ui/uikit/commit/a31d7a10ca9a4c8bbfca286c932f8611800b4d85))
* **Link:** Remove normal-visitable view ([#905](https://github.com/gravity-ui/uikit/issues/905)) ([82f8afa](https://github.com/gravity-ui/uikit/commit/82f8afa0cd5dfce77a781b65798855e7172e415b))
* remove remaining `--yc-*` variables ([#1256](https://github.com/gravity-ui/uikit/issues/1256)) ([69efabe](https://github.com/gravity-ui/uikit/commit/69efabe5416f89b841e093781ea33e53685b6038))
* rename .yc class prefix ([#1260](https://github.com/gravity-ui/uikit/issues/1260)) ([c879bba](https://github.com/gravity-ui/uikit/commit/c879bba29b1d4ad0d78aa8953e36c2a395ea1ecb))


### Features

* add CSS API instead of `--yc-*` variables ([#1127](https://github.com/gravity-ui/uikit/issues/1127)) ([1250ba2](https://github.com/gravity-ui/uikit/commit/1250ba2e810fcb68b29c4b7151681a0fb055fa25))
* add css imports to cjs files ([#1101](https://github.com/gravity-ui/uikit/issues/1101)) ([f10d616](https://github.com/gravity-ui/uikit/commit/f10d616a54f72d2208b1d0e5aca41bb2444699c7))
* add new layout component `Box` ([#1121](https://github.com/gravity-ui/uikit/issues/1121)) ([cedc20b](https://github.com/gravity-ui/uikit/commit/cedc20b3da38c7530da0f80c56847c233bee1fd1))
* add useControlledState hook ([#1276](https://github.com/gravity-ui/uikit/issues/1276)) ([9493062](https://github.com/gravity-ui/uikit/commit/94930620e0bb8bd6f31c1dfceace1912bc8e0ada))
* added css api for TextInput TextArea and Select components ([#1269](https://github.com/gravity-ui/uikit/issues/1269)) ([75c3fd5](https://github.com/gravity-ui/uikit/commit/75c3fd514a5eb20d40469eab4024b93fd1aa53c2))
* added CSS custom properties for RTL ([#1227](https://github.com/gravity-ui/uikit/issues/1227)) ([150204d](https://github.com/gravity-ui/uikit/commit/150204dac9958175664cfe7836273bedba90c806))
* **Alert:** support RTL ([#1167](https://github.com/gravity-ui/uikit/issues/1167)) ([a5bf8eb](https://github.com/gravity-ui/uikit/commit/a5bf8eb3668c98905189931bc3772a880acf41d4))
* **Box:** fix some unnecessary typings ([#1252](https://github.com/gravity-ui/uikit/issues/1252)) ([2229f37](https://github.com/gravity-ui/uikit/commit/2229f37be3cf4ffa97ede438efcd1f14c1d7143b))
* **Button:** add CSS API ([#1066](https://github.com/gravity-ui/uikit/issues/1066)) ([7f70693](https://github.com/gravity-ui/uikit/commit/7f706935c2d10c821a8afbdd800e48f4665a0106))
* **Button:** use logical properties ([#1119](https://github.com/gravity-ui/uikit/issues/1119)) ([b6d4200](https://github.com/gravity-ui/uikit/commit/b6d4200f93be2d4045402840b30a98f52585490f))
* delete deprecated hooks ([#1213](https://github.com/gravity-ui/uikit/issues/1213)) ([2c16005](https://github.com/gravity-ui/uikit/commit/2c16005ce7d351d73656be656d0845803752392c))
* **Dialog:** add prop contentOverflow to control overflow behaviour ([#1251](https://github.com/gravity-ui/uikit/issues/1251)) ([2b223d5](https://github.com/gravity-ui/uikit/commit/2b223d565e1f4345d36361dff34ef847f3d6f94a))
* **Disclosure:** use logical properties ([#1140](https://github.com/gravity-ui/uikit/issues/1140)) ([345ce4d](https://github.com/gravity-ui/uikit/commit/345ce4d97aa0b84c655139500e07cf1a20b37b15))
* **Link:** the "href" property is required ([#1270](https://github.com/gravity-ui/uikit/issues/1270)) ([347c64d](https://github.com/gravity-ui/uikit/commit/347c64d23dba1b07803b4efa97200fe7015479c0))
* **List:** support RTL ([#1145](https://github.com/gravity-ui/uikit/issues/1145)) ([dd554bb](https://github.com/gravity-ui/uikit/commit/dd554bb5a31b86e1ca6a733af70b9193faca171e))
* merge old Tooltip with ActionTooltip and introduce new Tooltip ([#1189](https://github.com/gravity-ui/uikit/issues/1189)) ([c2719ae](https://github.com/gravity-ui/uikit/commit/c2719ae7160ecb7cac756351b9d2f11e77eb9719))
* **Persona:** refactored and renamed to UserLabel ([#1292](https://github.com/gravity-ui/uikit/issues/1292)) ([ef6762a](https://github.com/gravity-ui/uikit/commit/ef6762a473bf6f92d2e39ac08e8667d159edf07b))
* **Progress:** support customization ([#1193](https://github.com/gravity-ui/uikit/issues/1193)) ([0c67d85](https://github.com/gravity-ui/uikit/commit/0c67d85fb0a2c5397e7d3b5bc2ce868b49ebaf02))
* **Progress:** support rtl ([#1141](https://github.com/gravity-ui/uikit/issues/1141)) ([caaf06b](https://github.com/gravity-ui/uikit/commit/caaf06b0adf1aec853a4f0a67e8a7de7474eb029))
* remove focus visible fallback ([#1086](https://github.com/gravity-ui/uikit/issues/1086)) ([193d856](https://github.com/gravity-ui/uikit/commit/193d85694f0fabf5d34da8f757262b43b18c7112))
* remove old theme variables fallback ([#1092](https://github.com/gravity-ui/uikit/issues/1092)) ([ecdd1aa](https://github.com/gravity-ui/uikit/commit/ecdd1aab498e4563c50a315bfc62e865c73b2641))
* remove setters from mobile hooks ([#1262](https://github.com/gravity-ui/uikit/issues/1262)) ([07c9f4f](https://github.com/gravity-ui/uikit/commit/07c9f4f02c4ebe08325f3626d1221d23c36c18a7))
* rename onClose to onCloseClick ([#1295](https://github.com/gravity-ui/uikit/issues/1295)) ([00531ad](https://github.com/gravity-ui/uikit/commit/00531ad1e6626812e74d6beb8a456abfc00e76ea))
* rename theme prop `positive` -&gt; `success` ([#1093](https://github.com/gravity-ui/uikit/issues/1093)) ([bf6f77d](https://github.com/gravity-ui/uikit/commit/bf6f77de0c44c6f64afdda7bfc90c09cf8e28c9f))
* **Sheet:** support RTL ([#1138](https://github.com/gravity-ui/uikit/issues/1138)) ([815f5a8](https://github.com/gravity-ui/uikit/commit/815f5a85729d31c11e5f6c1786ed8bf5038b9823))
* **Skeleton:** support RTL ([#1136](https://github.com/gravity-ui/uikit/issues/1136)) ([bdf4d5b](https://github.com/gravity-ui/uikit/commit/bdf4d5b5a6a4fe9ff932c82981ebc50882cad6b2))
* support RTL direction ([#1111](https://github.com/gravity-ui/uikit/issues/1111)) ([a28abcf](https://github.com/gravity-ui/uikit/commit/a28abcf12e057e45daef78e3488096494442a14f))
* support RTL in components ([#1125](https://github.com/gravity-ui/uikit/issues/1125)) ([47f7b84](https://github.com/gravity-ui/uikit/commit/47f7b84ff94f21e8802f616f7dea1f077a34a310))
* **Switch:** support RTL ([#1120](https://github.com/gravity-ui/uikit/issues/1120)) ([3cdca3d](https://github.com/gravity-ui/uikit/commit/3cdca3df19f75da09d5bf270557e930c4f1787d8))
* **Table:** remove uppercase heading style ([#1222](https://github.com/gravity-ui/uikit/issues/1222)) ([92fe12f](https://github.com/gravity-ui/uikit/commit/92fe12f1b52ddcf3449da89510e9fbda764a426f))
* **Table:** support rtl ([#1152](https://github.com/gravity-ui/uikit/issues/1152)) ([52b2794](https://github.com/gravity-ui/uikit/commit/52b2794fdd680f357fa1dcbf4f348e7898e9dcc6))
* **Table:** update cell paddings ([#1271](https://github.com/gravity-ui/uikit/issues/1271)) ([4f3be2d](https://github.com/gravity-ui/uikit/commit/4f3be2d27712cc6ce504aedb27c1bfa622d47e02))
* **Table:** update SortIndicator view ([#1220](https://github.com/gravity-ui/uikit/issues/1220)) ([6749bb8](https://github.com/gravity-ui/uikit/commit/6749bb8e7ac3905213eb69ef0caf654c6176ae39))
* **Table:** use uikit icons ([#1151](https://github.com/gravity-ui/uikit/issues/1151)) ([a08f03c](https://github.com/gravity-ui/uikit/commit/a08f03cdaba2c0be9fe6747c2d69be78f949eb66))
* **TextInput:** support rtl ([#1207](https://github.com/gravity-ui/uikit/issues/1207)) ([343b94c](https://github.com/gravity-ui/uikit/commit/343b94c33eecd1277d6c5fb72984f0991dd4d779))
* **Text:** rtl support ([#1143](https://github.com/gravity-ui/uikit/issues/1143)) ([a82ad0a](https://github.com/gravity-ui/uikit/commit/a82ad0a7d0804cfca72958f28e90145d7987f049))
* **Text:** support multiline and fixed width ellipsis ([#1122](https://github.com/gravity-ui/uikit/issues/1122)) ([bc63378](https://github.com/gravity-ui/uikit/commit/bc633783102b2d4bfaeaf759d3abcc134f58529c))
* **Toaster:** use theme prop instead of type ([#1198](https://github.com/gravity-ui/uikit/issues/1198)) ([cdabe24](https://github.com/gravity-ui/uikit/commit/cdabe246a33d21b8c624b5d3662ac2fc39cc01ed))
* **TreeSelect:** added TreeSelect unstable component and new list hooks ([#1090](https://github.com/gravity-ui/uikit/issues/1090)) ([07a2009](https://github.com/gravity-ui/uikit/commit/07a200903176ca34163e5e0dcfef42b8c530bbc9))
* update avatar and user components ([#1221](https://github.com/gravity-ui/uikit/issues/1221)) ([fbf41d3](https://github.com/gravity-ui/uikit/commit/fbf41d32820ba26b86a48457b2361832a937f387))
* updated TextInput "type" property to allow using only well-know… ([#1158](https://github.com/gravity-ui/uikit/issues/1158)) ([5a44a5f](https://github.com/gravity-ui/uikit/commit/5a44a5f151703c60801826fe1772a08676060703))


### Bug Fixes

* **Button:** fix disabled raised view style ([#1226](https://github.com/gravity-ui/uikit/issues/1226)) ([fb62985](https://github.com/gravity-ui/uikit/commit/fb62985081d9a3dd999f3e9fc3a7563cf3df39ac))
* **DropdownMenu:** fix rtl behaviour ([3f3a805](https://github.com/gravity-ui/uikit/commit/3f3a805025d46de651f86a648fe2e6cea0043e9e))
* fix controls css api ([#1289](https://github.com/gravity-ui/uikit/issues/1289)) ([9882c53](https://github.com/gravity-ui/uikit/commit/9882c532e6c503e053790cd6816421f28a17b2b5))
* fix unit tests ([99e454f](https://github.com/gravity-ui/uikit/commit/99e454fa2762c304c5812ec5d88f362b390bf6c1))
* fix visual tests ([4baeef9](https://github.com/gravity-ui/uikit/commit/4baeef9693082ac8b15619f454781c2019f975d8))
* **Popover:** fix rtl placement ([62405d5](https://github.com/gravity-ui/uikit/commit/62405d5811f626c3cc40e93ffad9f6775c649beb))
* rebase fixes ([b272b72](https://github.com/gravity-ui/uikit/commit/b272b7291ef0f214b059de0d5898d1926608cad1))
* rebase issues ([4f9d2ec](https://github.com/gravity-ui/uikit/commit/4f9d2ec3c688272b687de957c28219bf8ab1261c))
* rebase issues ([39b4694](https://github.com/gravity-ui/uikit/commit/39b4694dbea58a1f02d593706f3a7efd99ec4a07))
* rework new ListItemView text crop behaviour ([#1301](https://github.com/gravity-ui/uikit/issues/1301)) ([5f123e9](https://github.com/gravity-ui/uikit/commit/5f123e99c93cb65c48ec04165e0ded6ae1ee6138))
* **ThemeProvider:** inner provider should overwrite specified props and only them ([#1235](https://github.com/gravity-ui/uikit/issues/1235)) ([aaf9b0f](https://github.com/gravity-ui/uikit/commit/aaf9b0f0c9356748040984fc89013edf0e761dcc))
* **Toaster:** use logical css values in stories ([#1142](https://github.com/gravity-ui/uikit/issues/1142)) ([6dcbdae](https://github.com/gravity-ui/uikit/commit/6dcbdae9cea330afd7de4869140ec422f91236ed))
* TreeSelect component after useMobile refactoring ([#1265](https://github.com/gravity-ui/uikit/issues/1265)) ([9c23dae](https://github.com/gravity-ui/uikit/commit/9c23dae0c257f81e9b97076e4131ffeff747c35d))
* **TreeSelect:** removed select indentation from group items ([#1303](https://github.com/gravity-ui/uikit/issues/1303)) ([e0471d6](https://github.com/gravity-ui/uikit/commit/e0471d6fcdbeb924ab65402b39fbbad5cd739a5e))
* use ActionTooltip in components ([1042ac3](https://github.com/gravity-ui/uikit/commit/1042ac35f1f89c3f6cd4e3ceec6336bc1e3d7340))

## [5.30.1](https://github.com/gravity-ui/uikit/compare/v5.30.0...v5.30.1) (2024-02-06)


### Bug Fixes

* **Dropdown:** opening sub menus in dropdown menu with using keyboard ([#1298](https://github.com/gravity-ui/uikit/issues/1298)) ([1aed302](https://github.com/gravity-ui/uikit/commit/1aed30299889c658e55461318d43f94c2eb7241a))
* **MenuItem:** fix non interactive MenuItem style ([#1307](https://github.com/gravity-ui/uikit/issues/1307)) ([b1a386d](https://github.com/gravity-ui/uikit/commit/b1a386d9552d98bd3c2f8e74518ac580c7ce4394))
* **TextInput:** add overflow hidden to text-input__content wrapper ([#1293](https://github.com/gravity-ui/uikit/issues/1293)) ([d52a7bd](https://github.com/gravity-ui/uikit/commit/d52a7bdf3e4ca99b1902b0341468eb975f036f36))

## [5.30.0](https://github.com/gravity-ui/uikit/compare/v5.29.0...v5.30.0) (2024-01-31)


### Features

* **Select:** added errorMessage, errorPlacement and validationType props ([#1291](https://github.com/gravity-ui/uikit/issues/1291)) ([8f2f07b](https://github.com/gravity-ui/uikit/commit/8f2f07b798b5776adc94a4442fd6a725911b8048))
* **Table:** added link as Table action element ([#1290](https://github.com/gravity-ui/uikit/issues/1290)) ([de63cef](https://github.com/gravity-ui/uikit/commit/de63cef2b043e835c6663dfa79a9c99424998ae1))


### Bug Fixes

* **Label:** missing text overflow ([#1206](https://github.com/gravity-ui/uikit/issues/1206)) ([60357cd](https://github.com/gravity-ui/uikit/commit/60357cd34c04c1b6f1af04125d5cea77319dea65))
* **List:** calling onLoadMore function while using keyboard ([#1284](https://github.com/gravity-ui/uikit/issues/1284)) ([1760166](https://github.com/gravity-ui/uikit/commit/176016620612b3c6a120a0dea770b5fc5927c964))
* **Pagination:** stories controls ([#1281](https://github.com/gravity-ui/uikit/issues/1281)) ([a6fac44](https://github.com/gravity-ui/uikit/commit/a6fac442b82ac585397d0b5cf5f59ec5df625deb))
* **Table:** sticky column ([#1283](https://github.com/gravity-ui/uikit/issues/1283)) ([7366c9b](https://github.com/gravity-ui/uikit/commit/7366c9bdf7fd3e7f526c8a3d60e49191f7385539))
* **Table:** withTableSorting can get sort value using column's ID written as path ([#640](https://github.com/gravity-ui/uikit/issues/640)) ([d5bb68b](https://github.com/gravity-ui/uikit/commit/d5bb68bcbc9ebca4f54d501aa34b597e92ee3702))

## [5.29.0](https://github.com/gravity-ui/uikit/compare/v5.28.0...v5.29.0) (2024-01-19)


### Features

* **Disclosure:** added qa attribute for details and summary nodes ([#1253](https://github.com/gravity-ui/uikit/issues/1253)) ([b1bbcd1](https://github.com/gravity-ui/uikit/commit/b1bbcd17203b7cad13eeed77c4aee937dbd0717a))


### Bug Fixes

* **Select:** add type="button" to SelectClear ([#1255](https://github.com/gravity-ui/uikit/issues/1255)) ([6a9e189](https://github.com/gravity-ui/uikit/commit/6a9e189561d986f1d498b610c0aeb2e5072348eb))

## [5.28.0](https://github.com/gravity-ui/uikit/compare/v5.27.0...v5.28.0) (2024-01-16)


### Features

* **Alert:** changed default Alert actions background ([#1240](https://github.com/gravity-ui/uikit/issues/1240)) ([9693147](https://github.com/gravity-ui/uikit/commit/96931475fb59e8e9c6da96bae361165d38f6dec5))
* **Text:** add `id` prop ([#1246](https://github.com/gravity-ui/uikit/issues/1246)) ([252229e](https://github.com/gravity-ui/uikit/commit/252229e6498effe9628d193103d9e5117b2bd79b))


### Bug Fixes

* revert [#831](https://github.com/gravity-ui/uikit/issues/831) ([#1244](https://github.com/gravity-ui/uikit/issues/1244)) ([79f7e07](https://github.com/gravity-ui/uikit/commit/79f7e07a3c155ba34a240250aa06860bf795abcc))

## [5.27.0](https://github.com/gravity-ui/uikit/compare/v5.26.0...v5.27.0) (2024-01-10)


### Features

* **Disclosure:** allow use React.Node as summary ([#1233](https://github.com/gravity-ui/uikit/issues/1233)) ([3180060](https://github.com/gravity-ui/uikit/commit/31800603eaf6eaaab4c9849b1af12e9e6a53b5f7))


### Bug Fixes

* **Disclosure:** component size should not be used for its content ([#1234](https://github.com/gravity-ui/uikit/issues/1234)) ([c721640](https://github.com/gravity-ui/uikit/commit/c721640074baf0f5ae04ba4efaa2e187fa590e9c))
* **Pagination:** fix total page calculation ([#1237](https://github.com/gravity-ui/uikit/issues/1237)) ([8f1af66](https://github.com/gravity-ui/uikit/commit/8f1af66dd7de4dc13c33cc58e4f73715802c02cb))
* **Select:** activate first clickable item ([#1228](https://github.com/gravity-ui/uikit/issues/1228)) ([13b921e](https://github.com/gravity-ui/uikit/commit/13b921e8384108bf1ca71941e0a5908191cb325e))
* **Select:** add 100% width to default labels ([#1239](https://github.com/gravity-ui/uikit/issues/1239)) ([5bd5edd](https://github.com/gravity-ui/uikit/commit/5bd5edd63c5755a52003967b4d3e822983f5033a))
* **ThemeProvider:** fix rootClassName update ([#1231](https://github.com/gravity-ui/uikit/issues/1231)) ([4f0f099](https://github.com/gravity-ui/uikit/commit/4f0f09946023d039b8d1fed3c198d1888959f7a5))

## [5.26.0](https://github.com/gravity-ui/uikit/compare/v5.25.0...v5.26.0) (2023-12-26)


### Features

* calculate body class names seperately ([#1197](https://github.com/gravity-ui/uikit/issues/1197)) ([3dcf03d](https://github.com/gravity-ui/uikit/commit/3dcf03d46b6834c3d0fd6f43a9208d234c730405))
* **Popup:** add `aria-label` & `aria-labelledby` attributes ([#1202](https://github.com/gravity-ui/uikit/issues/1202)) ([f68183a](https://github.com/gravity-ui/uikit/commit/f68183ad27c025c736164b72ee38a908afb7dc67))


### Bug Fixes

* **Pagination:** fix wrong behaviour in case of 0 total ([#1208](https://github.com/gravity-ui/uikit/issues/1208)) ([cda2349](https://github.com/gravity-ui/uikit/commit/cda2349c699b5e11fe79aa79fdbb4f5b647277bc))
* **Select:** fix wrong view "clear" styles ([#1224](https://github.com/gravity-ui/uikit/issues/1224)) ([4f4e13e](https://github.com/gravity-ui/uikit/commit/4f4e13ec7286dc1611755899b30429f1cf4b5b7f))
* **Table:** columns change throws ([#1219](https://github.com/gravity-ui/uikit/issues/1219)) ([20756bc](https://github.com/gravity-ui/uikit/commit/20756bcd27d8577d399e39f7d86189d7cb3d4d14))

## [5.25.0](https://github.com/gravity-ui/uikit/compare/v5.24.0...v5.25.0) (2023-12-12)


### Features

* **Select:** add popupPlacement prop ([#1195](https://github.com/gravity-ui/uikit/issues/1195)) ([ba0e1a1](https://github.com/gravity-ui/uikit/commit/ba0e1a1a28b98b519c59b040ab53671aa178341a))

## [5.24.0](https://github.com/gravity-ui/uikit/compare/v5.23.0...v5.24.0) (2023-12-08)


### Features

* **Table:** use `&lt;colgroup/&gt;` to set cells width ([#831](https://github.com/gravity-ui/uikit/issues/831)) ([c33b330](https://github.com/gravity-ui/uikit/commit/c33b3308b68ce92626e995a99821eede74a3b196))

## [5.23.0](https://github.com/gravity-ui/uikit/compare/v5.22.0...v5.23.0) (2023-12-06)


### Features

* **Progress:** make contrast ([#1129](https://github.com/gravity-ui/uikit/issues/1129)) ([e1ce48f](https://github.com/gravity-ui/uikit/commit/e1ce48fefef9a510f6867e627018a0d2f04cc5ff))
* **RadioButton:** allow an extended value other than a string ([#1177](https://github.com/gravity-ui/uikit/issues/1177)) ([77eb5a0](https://github.com/gravity-ui/uikit/commit/77eb5a0c7a9ca29c273854e9c13868f610735218))


### Bug Fixes

* **a11y:** make a short text for the clear button ([#1172](https://github.com/gravity-ui/uikit/issues/1172)) ([d767727](https://github.com/gravity-ui/uikit/commit/d76772724264da02e132eb63a9ec0860446e8b71))
* add qa property for some components ([#1173](https://github.com/gravity-ui/uikit/issues/1173)) ([0f2a491](https://github.com/gravity-ui/uikit/commit/0f2a4911b30e4bd0f20b7d52be90531058ff2070))
* export TableColumnSetupItem type from index ([#1169](https://github.com/gravity-ui/uikit/issues/1169)) ([21e21a3](https://github.com/gravity-ui/uikit/commit/21e21a33f8e6c163013e6f4951e34605700e8d5b))
* **Select:** proper filter updates when closing the popup ([#1180](https://github.com/gravity-ui/uikit/issues/1180)) ([7d12e86](https://github.com/gravity-ui/uikit/commit/7d12e8642368e6fa95359a9a69a554be85e0b034))
* **Select:** update keyboard interaction to correspond with specification ([#1176](https://github.com/gravity-ui/uikit/issues/1176)) ([504b05c](https://github.com/gravity-ui/uikit/commit/504b05caed8300c8f550c7dc36cd6ef0e6b22064))
* **Table:** fixed checkbox max width ([#1174](https://github.com/gravity-ui/uikit/issues/1174)) ([ed68043](https://github.com/gravity-ui/uikit/commit/ed6804379abd88c7b13ffc5034bf7d90f108aee5))

## [5.22.0](https://github.com/gravity-ui/uikit/compare/v5.21.1...v5.22.0) (2023-11-28)


### Features

* **List:** use `Grip` icon from `@gravity-ui/icons` ([#1164](https://github.com/gravity-ui/uikit/issues/1164)) ([625679a](https://github.com/gravity-ui/uikit/commit/625679a8c18769dbfbf82b77b8154ad176a30a69))


### Bug Fixes

* **Select:** add onLoadMore to the list of dependencies to avoid closures ([#1168](https://github.com/gravity-ui/uikit/issues/1168)) ([a804684](https://github.com/gravity-ui/uikit/commit/a8046846662be94b64f6d0c10f84beefeaec0644))

## [5.21.1](https://github.com/gravity-ui/uikit/compare/v5.21.0...v5.21.1) (2023-11-27)


### Bug Fixes

* align checkbox when there is more than 1 line of text in any cell ([#1149](https://github.com/gravity-ui/uikit/issues/1149)) ([8011430](https://github.com/gravity-ui/uikit/commit/8011430102d3fda764711d3003be2b9c953f586d))

## [5.21.0](https://github.com/gravity-ui/uikit/compare/v5.20.0...v5.21.0) (2023-11-24)


### Features

* change react-sortable-hoc with react-beautiful-dnd ([#1159](https://github.com/gravity-ui/uikit/issues/1159)) ([1f7ab68](https://github.com/gravity-ui/uikit/commit/1f7ab68a74deedcd6dd091c8a9bc7d5a5b913006))
* lazy loading for userAvatar ([#1124](https://github.com/gravity-ui/uikit/issues/1124)) ([e76fd7c](https://github.com/gravity-ui/uikit/commit/e76fd7ce9ab4a6adff05f5e816f385e1b5afc316))

## [5.20.0](https://github.com/gravity-ui/uikit/compare/v5.19.1...v5.20.0) (2023-11-14)


### Features

* add id converter for getXpath ([#1117](https://github.com/gravity-ui/uikit/issues/1117)) ([75fb80c](https://github.com/gravity-ui/uikit/commit/75fb80cb7d55d18a850d4b521de2e020cd95b25b))
* introduce new utility semantic colors ([#1094](https://github.com/gravity-ui/uikit/issues/1094)) ([7c3938c](https://github.com/gravity-ui/uikit/commit/7c3938cacabaff9a2eadae17d0b288780502bcd8))
* **Tooltip:** add `disablePortal` prop ([#1115](https://github.com/gravity-ui/uikit/issues/1115)) ([496916e](https://github.com/gravity-ui/uikit/commit/496916e820ec125a7cdea0a481c2d7e1a19d892e))
* **useAsyncActionHandler:** add useAsyncActionHandler hook ([#1095](https://github.com/gravity-ui/uikit/issues/1095)) ([66a25b3](https://github.com/gravity-ui/uikit/commit/66a25b3b1c6241c10fa0db24c19dd9911cb51214))


### Bug Fixes

* **DropdownMenu:** fix inner usages of switcher prop ([#1116](https://github.com/gravity-ui/uikit/issues/1116)) ([2a3eccc](https://github.com/gravity-ui/uikit/commit/2a3eccc3225695dfc98b6a53a989bbf652e888d4))
* improve a11y on some components ([#1045](https://github.com/gravity-ui/uikit/issues/1045)) ([c6c6138](https://github.com/gravity-ui/uikit/commit/c6c6138472055ecd77dea990afb3f271b7c30085))
* **Label:** fix utility theme declaration ([#1106](https://github.com/gravity-ui/uikit/issues/1106)) ([ed8230d](https://github.com/gravity-ui/uikit/commit/ed8230df4b4f89adba271b226ef872d74e1a3f5d))
* **Tabs:** tab outline focus is stripped ([#1071](https://github.com/gravity-ui/uikit/issues/1071)) ([c47f641](https://github.com/gravity-ui/uikit/commit/c47f64189e50a7191c1c2d1313227821452e8414))
* **Toast:** fix overflows ([#1079](https://github.com/gravity-ui/uikit/issues/1079)) ([2205fde](https://github.com/gravity-ui/uikit/commit/2205fde429bf0efce7500e3282c331186415d780))

## [5.19.1](https://github.com/gravity-ui/uikit/compare/v5.19.0...v5.19.1) (2023-11-07)


### Bug Fixes

* **Icon:** correct prepareStringData ([#1096](https://github.com/gravity-ui/uikit/issues/1096)) ([8e4817e](https://github.com/gravity-ui/uikit/commit/8e4817e39d4591a65b7782770f50fef594606b36))
* return EventBroker constructor in export ([#1098](https://github.com/gravity-ui/uikit/issues/1098)) ([f22bc27](https://github.com/gravity-ui/uikit/commit/f22bc273648bcdebd1d627f59d1f1d7a818722e8))

## [5.19.0](https://github.com/gravity-ui/uikit/compare/v5.18.1...v5.19.0) (2023-11-03)


### Features

* improving a11y ([#1070](https://github.com/gravity-ui/uikit/issues/1070)) ([146ff4f](https://github.com/gravity-ui/uikit/commit/146ff4f3dfd6e9debb1d28ca72485734d1e08cf7))
* **Menu:** add support for item icon on the end of the item ([#965](https://github.com/gravity-ui/uikit/issues/965)) ([55885d0](https://github.com/gravity-ui/uikit/commit/55885d0d7956a93eb33ffade8be535fa7f2b7f6e))
* **Popover:** prevent closing by click in case of using openOnHover property ([#1085](https://github.com/gravity-ui/uikit/issues/1085)) ([2c17a06](https://github.com/gravity-ui/uikit/commit/2c17a06bd3bb52f730a8dc810bcfc22a3a9c163c))


### Bug Fixes

* **Popover:** pass classname to html content ([#1073](https://github.com/gravity-ui/uikit/issues/1073)) ([c0a725a](https://github.com/gravity-ui/uikit/commit/c0a725ab73ca74f9f051a9e2db27e5456427f972))
* **Select:** fix SelectRenderControlProps.onClick type ([#1075](https://github.com/gravity-ui/uikit/issues/1075)) ([9dbfc3a](https://github.com/gravity-ui/uikit/commit/9dbfc3a2d5118f51944494edb02c137bcc67c1fc))

## [5.18.1](https://github.com/gravity-ui/uikit/compare/v5.18.0...v5.18.1) (2023-10-24)


### Bug Fixes

* **Sheet:** fix Sheet resize when viewport size changes ([#1055](https://github.com/gravity-ui/uikit/issues/1055)) ([35a7b74](https://github.com/gravity-ui/uikit/commit/35a7b749493ec0377f5e013619d312f087801141))

## [5.18.0](https://github.com/gravity-ui/uikit/compare/v5.17.0...v5.18.0) (2023-10-19)


### Features

* **Table:** expand checkbox click area ([#654](https://github.com/gravity-ui/uikit/issues/654)) ([0534cf8](https://github.com/gravity-ui/uikit/commit/0534cf8f973c4737f137078a6978df8f201a4f3f))


### Bug Fixes

* **Sheet:** fix Sheet intermediate hanging when touch ends above it ([#1052](https://github.com/gravity-ui/uikit/issues/1052)) ([38e6308](https://github.com/gravity-ui/uikit/commit/38e63088433798193d3eea267548ac1e7422e0a6))

## [5.17.0](https://github.com/gravity-ui/uikit/compare/v5.16.0...v5.17.0) (2023-10-05)


### Features

* **List:** extend `emptyPlaceholder` type to `ReactNode` ([#1013](https://github.com/gravity-ui/uikit/issues/1013)) ([56437e6](https://github.com/gravity-ui/uikit/commit/56437e6e4782eebf4040d6f1e2bc70bc6b5b61ec))
* synced codeowners with sharepoint table ([#1034](https://github.com/gravity-ui/uikit/issues/1034)) ([5bdfa75](https://github.com/gravity-ui/uikit/commit/5bdfa75bbae36827dd74b9b67a24fa2e2dd6fcdb))
* **withTableSorting:** add control the use of data sorting ([#1032](https://github.com/gravity-ui/uikit/issues/1032)) ([53248c9](https://github.com/gravity-ui/uikit/commit/53248c967e32bba6cb5f4451f9ee5bf00d963163))


### Bug Fixes

* start refactor hooks: useOutsideClick ([#1035](https://github.com/gravity-ui/uikit/issues/1035)) ([6ad4a78](https://github.com/gravity-ui/uikit/commit/6ad4a78ca202ecc6e843d14f0c71f922d0845828))
* use correct font-size through component styles ([#1036](https://github.com/gravity-ui/uikit/issues/1036)) ([44d7160](https://github.com/gravity-ui/uikit/commit/44d71608af59eb04350d830dd2d19c1a5ce922b2))

## [5.16.0](https://github.com/gravity-ui/uikit/compare/v5.15.0...v5.16.0) (2023-09-29)


### Features

* **Table:** add options for WithTableSettings HOC ([#1029](https://github.com/gravity-ui/uikit/issues/1029)) ([b338bf9](https://github.com/gravity-ui/uikit/commit/b338bf9c3b77aba5471e143ce58495d55ec94cfe))

## [5.15.0](https://github.com/gravity-ui/uikit/compare/v5.14.0...v5.15.0) (2023-09-22)


### Features

* **UserAvatar:** add fallbackImgUrl prop ([#1025](https://github.com/gravity-ui/uikit/issues/1025)) ([9a4bd59](https://github.com/gravity-ui/uikit/commit/9a4bd597cc0db62f905d6972eb317faffd8cb672))


### Bug Fixes

* **DocsDecorator:** add new css prefix support ([#1027](https://github.com/gravity-ui/uikit/issues/1027)) ([6ff4c1c](https://github.com/gravity-ui/uikit/commit/6ff4c1c3c040b72abae6ad82c3868a447df039d3))

## [5.14.0](https://github.com/gravity-ui/uikit/compare/v5.13.0...v5.14.0) (2023-09-20)


### Features

* **Select:** add onClear argument to renderControl method ([#1022](https://github.com/gravity-ui/uikit/issues/1022)) ([d3af988](https://github.com/gravity-ui/uikit/commit/d3af988a18adbb285269955dfef3c44df78043bf))

## [5.13.0](https://github.com/gravity-ui/uikit/compare/v5.12.2...v5.13.0) (2023-09-19)


### Features

* add hook useOnClickOutside ([#1006](https://github.com/gravity-ui/uikit/issues/1006)) ([6e83459](https://github.com/gravity-ui/uikit/commit/6e8345974c98ab3a949d6741ea38f807e1652ade))
* **LayerManager:** add type to layer ([#1018](https://github.com/gravity-ui/uikit/issues/1018)) ([3fb7de9](https://github.com/gravity-ui/uikit/commit/3fb7de912e144a84a0d169b0be65e6e440c886a0))
* **Toc:** add component ([#858](https://github.com/gravity-ui/uikit/issues/858)) ([bafed78](https://github.com/gravity-ui/uikit/commit/bafed78dcea0dbedf892763da864d193f18d6421))

## [5.12.2](https://github.com/gravity-ui/uikit/compare/v5.12.1...v5.12.2) (2023-09-15)


### Bug Fixes

* **Select:** fix filtering in case of using grouped options ([#1011](https://github.com/gravity-ui/uikit/issues/1011)) ([096d404](https://github.com/gravity-ui/uikit/commit/096d404d8a1734b9a40ca5e4fedcb66e78cf1b5d))

## [5.12.1](https://github.com/gravity-ui/uikit/compare/v5.12.0...v5.12.1) (2023-09-13)


### Bug Fixes

* **TextInput:** fix inside error display ([#1004](https://github.com/gravity-ui/uikit/issues/1004)) ([1fcab4e](https://github.com/gravity-ui/uikit/commit/1fcab4e83d777bf4a9e38ab919425f502d7080ff))

## [5.12.0](https://github.com/gravity-ui/uikit/compare/v5.11.0...v5.12.0) (2023-09-13)


### Features

* **List:** improve a11y ([#960](https://github.com/gravity-ui/uikit/issues/960)) ([67c35a2](https://github.com/gravity-ui/uikit/commit/67c35a217db3cc4cf8bfd05d606776c57684d9b7))


### Bug Fixes

* **Menu:** make menu item content width limited by a container ([#1001](https://github.com/gravity-ui/uikit/issues/1001)) ([f3943c9](https://github.com/gravity-ui/uikit/commit/f3943c919d163d809754d8eb49fefe4d75558fbd))
* **Select:** fix control border radius in case of using `xl` size ([#998](https://github.com/gravity-ui/uikit/issues/998)) ([8084778](https://github.com/gravity-ui/uikit/commit/80847789edb172b3bee11ebe39714094ce8b62d2))
* **Tabs:** show focused state if focus-visible only ([#1000](https://github.com/gravity-ui/uikit/issues/1000)) ([88b89f7](https://github.com/gravity-ui/uikit/commit/88b89f777a665d80974815611d58dbd7eb04ac41))
* **ThemeProvider:** fix scoped CSS classes ([#1003](https://github.com/gravity-ui/uikit/issues/1003)) ([9fe15e3](https://github.com/gravity-ui/uikit/commit/9fe15e35e18f7ebbc455f76f7de762d5a3df7225))

## [5.11.0](https://github.com/gravity-ui/uikit/compare/v5.10.0...v5.11.0) (2023-09-07)


### Features

* **Alert, Card:** deprecate `positive` theme ([#986](https://github.com/gravity-ui/uikit/issues/986)) ([e4758d4](https://github.com/gravity-ui/uikit/commit/e4758d408151554ec2946a8cdb07a0e431ce6b85))
* **Breadcrumbs:** add `title` prop to item ([#863](https://github.com/gravity-ui/uikit/issues/863)) ([0146f5f](https://github.com/gravity-ui/uikit/commit/0146f5f0052bc7c23fd45b7df9452d5b9c639acf))
* **Popover:** add popper modifiers to popover props ([#993](https://github.com/gravity-ui/uikit/issues/993)) ([fdce64a](https://github.com/gravity-ui/uikit/commit/fdce64ae8e9af2dc9b6142cd05fb18e285c2de7c))
* **TextArea, TextInput:** use aria-describedby for error and note ([#904](https://github.com/gravity-ui/uikit/issues/904)) ([d51039b](https://github.com/gravity-ui/uikit/commit/d51039bb0fd4129ac511681e7fa23f051d1c3397))

## [5.10.0](https://github.com/gravity-ui/uikit/compare/v5.9.1...v5.10.0) (2023-09-05)


### Features

* add CSS variables to control focus outline ([#973](https://github.com/gravity-ui/uikit/issues/973)) ([d926ef8](https://github.com/gravity-ui/uikit/commit/d926ef870b4daef03ed0970f9b97fbc85b93f5d0))
* **Card:** update README ([#976](https://github.com/gravity-ui/uikit/issues/976)) ([60bf6cc](https://github.com/gravity-ui/uikit/commit/60bf6cc13f3fcda6b03e1de0e152c3b0a5f10ac0))
* **Flex:** add alignContent, justifyItems and justifySelf css props ([#974](https://github.com/gravity-ui/uikit/issues/974)) ([0be31c9](https://github.com/gravity-ui/uikit/commit/0be31c94a2290b6787b88cdb15fa5d048faf4134))
* **Menu:** improve MenuItem a11y ([#959](https://github.com/gravity-ui/uikit/issues/959)) ([338f907](https://github.com/gravity-ui/uikit/commit/338f9070c558cd7ce85b99f6ef5539ad0e63a57b))
* **Popover:** accept function as a children ([#900](https://github.com/gravity-ui/uikit/issues/900)) ([ca5bcc7](https://github.com/gravity-ui/uikit/commit/ca5bcc708598d69270a8645c2fa6a00dc0c9397b))
* **Table:** update README ([#985](https://github.com/gravity-ui/uikit/issues/985)) ([cc95a33](https://github.com/gravity-ui/uikit/commit/cc95a3372d781aae95f7516cb2e2a2744eca570b))
* **TextInput:** add an option to display error via tooltip ([#821](https://github.com/gravity-ui/uikit/issues/821)) ([f883f01](https://github.com/gravity-ui/uikit/commit/f883f0126371339e0b0ad46365c29bf1980bdbe7))
* **Toast:** update icons according to design ([#984](https://github.com/gravity-ui/uikit/issues/984)) ([d10d2c9](https://github.com/gravity-ui/uikit/commit/d10d2c9e1d3d1394786a1105d0d3806de07bce08))


### Bug Fixes

* **Disclosure:** explicit type export ([#983](https://github.com/gravity-ui/uikit/issues/983)) ([eeba89d](https://github.com/gravity-ui/uikit/commit/eeba89d4ee2f6a849c0621e96817c00461b2d20f))
* **Pagination:** increase priority over input styles ([#989](https://github.com/gravity-ui/uikit/issues/989)) ([bbfa6a5](https://github.com/gravity-ui/uikit/commit/bbfa6a5a5ba87dcba31121ccefbb9d05d2f6f60d))
* **Toast:** don't render empty actions array ([#979](https://github.com/gravity-ui/uikit/issues/979)) ([e19d0b9](https://github.com/gravity-ui/uikit/commit/e19d0b9344ee3f8cbec3e0ee107fcb244b1e26c9))

## [5.9.1](https://github.com/gravity-ui/uikit/compare/v5.9.0...v5.9.1) (2023-08-28)


### Bug Fixes

* downgrade tslib to 2.6.1 ([#963](https://github.com/gravity-ui/uikit/issues/963)) ([87c62d3](https://github.com/gravity-ui/uikit/commit/87c62d3c8034a48bc278999f38e9911c3b54be23))

## [5.9.0](https://github.com/gravity-ui/uikit/compare/v5.8.0...v5.9.0) (2023-08-24)


### Features

* update deps ([#943](https://github.com/gravity-ui/uikit/issues/943)) ([57547c7](https://github.com/gravity-ui/uikit/commit/57547c7fce715e6dcb4adc80029892ab7ebbeff5))


### Bug Fixes

* **List:** item type validation ([#949](https://github.com/gravity-ui/uikit/issues/949)) ([1aef5b5](https://github.com/gravity-ui/uikit/commit/1aef5b592761d6b9a471cdcd92274f7367da4e6b))

## [5.8.0](https://github.com/gravity-ui/uikit/compare/v5.7.0...v5.8.0) (2023-08-24)


### Features

* create useViewportSize hook ([#933](https://github.com/gravity-ui/uikit/issues/933)) ([637f88d](https://github.com/gravity-ui/uikit/commit/637f88d3f70084d9c7dbe7191e6cdee6c7380bd7))
* **List:** add loading and onLoadMore props ([#934](https://github.com/gravity-ui/uikit/issues/934)) ([5eab30f](https://github.com/gravity-ui/uikit/commit/5eab30f8e4b8c7517e7d4963762961c0f4743ebb))


### Bug Fixes

* **ClearButton:** increase selector specificity ([#945](https://github.com/gravity-ui/uikit/issues/945)) ([edee285](https://github.com/gravity-ui/uikit/commit/edee285af48e8817184fb2214916f09159ca545d))
* **Table:** fix copying the array from getRowClassNames ([#923](https://github.com/gravity-ui/uikit/issues/923)) ([3f123b7](https://github.com/gravity-ui/uikit/commit/3f123b7feb90ddeb123d06ef42f947fe9f85264d))

## [5.7.0](https://github.com/gravity-ui/uikit/compare/v5.6.0...v5.7.0) (2023-08-22)


### Features

* **Table:** add `wordWrap` option to prevent text cut ([#919](https://github.com/gravity-ui/uikit/issues/919)) ([52d6efb](https://github.com/gravity-ui/uikit/commit/52d6efbfc405cd156ae1b62d4532cb22a96f649f))


### Bug Fixes

* **Table:** calculate column styles on mount ([#926](https://github.com/gravity-ui/uikit/issues/926)) ([e51a73b](https://github.com/gravity-ui/uikit/commit/e51a73b66e576a641cdc2218e873a622e3ba5e98))

## [5.6.0](https://github.com/gravity-ui/uikit/compare/v5.5.1...v5.6.0) (2023-08-22)


### Features

* **Icon:** forward `ref` ([#929](https://github.com/gravity-ui/uikit/issues/929)) ([28d023d](https://github.com/gravity-ui/uikit/commit/28d023dc14b05adada4e78d7dfcd3f725bcef2db))
* **TextArea:** add gravity documentation ([#920](https://github.com/gravity-ui/uikit/issues/920)) ([56f0796](https://github.com/gravity-ui/uikit/commit/56f0796dce851016895f23efd0946fd2c5b93894))
* **TextInput:** add gravity documentation ([#912](https://github.com/gravity-ui/uikit/issues/912)) ([641e424](https://github.com/gravity-ui/uikit/commit/641e424cf8a21ee99b270472971aff980ea55cf9))

## [5.5.1](https://github.com/gravity-ui/uikit/compare/v5.5.0...v5.5.1) (2023-08-18)


### Bug Fixes

* **Button:** fix maxWidth property in case of using button only with icon node ([#914](https://github.com/gravity-ui/uikit/issues/914)) ([15dde1a](https://github.com/gravity-ui/uikit/commit/15dde1abaa497ad270626e3702e684c7be921a89))
* **MobileProvider:** fix SSR compatibility ([#897](https://github.com/gravity-ui/uikit/issues/897)) ([9c6f5a7](https://github.com/gravity-ui/uikit/commit/9c6f5a7f770225228f88bd9b7a1dfcf059a73f05))

## [5.5.0](https://github.com/gravity-ui/uikit/compare/v5.4.1...v5.5.0) (2023-08-17)


### Features

* **Link:** add visitable prop ([#872](https://github.com/gravity-ui/uikit/issues/872)) ([62903e5](https://github.com/gravity-ui/uikit/commit/62903e50e18d3ce17faa148b966dae757f57d735))
* **Select:** add onLoadMore prop ([#901](https://github.com/gravity-ui/uikit/issues/901)) ([e191c0b](https://github.com/gravity-ui/uikit/commit/e191c0b5a2fb59ca915066bffd080660d472d48a))
* **TextArea|TextInput:** add note prop into TextArea and TextInput ([#895](https://github.com/gravity-ui/uikit/issues/895)) ([ad959e4](https://github.com/gravity-ui/uikit/commit/ad959e4d0f518f2655713099e43b91b4cb74f286))
* use "Inter" as main font ([#893](https://github.com/gravity-ui/uikit/issues/893)) ([13ed356](https://github.com/gravity-ui/uikit/commit/13ed356b1f8eaf82816f0f6e0ec3f6437b364c41))


### Bug Fixes

* **Toaster:** add min-height ([#882](https://github.com/gravity-ui/uikit/issues/882)) ([a254e1b](https://github.com/gravity-ui/uikit/commit/a254e1ba09f0da2d0ba724aac6cf2fde588844f5))

## [5.4.1](https://github.com/gravity-ui/uikit/compare/v5.4.0...v5.4.1) (2023-08-11)


### Bug Fixes

* **Disclosure:** add displayName ([#891](https://github.com/gravity-ui/uikit/issues/891)) ([81a71ae](https://github.com/gravity-ui/uikit/commit/81a71ae1da5d299af65aca156f98595bf16e789c))
* **focusTrap:** do not create focusTrap during render ([#888](https://github.com/gravity-ui/uikit/issues/888)) ([2a6bb83](https://github.com/gravity-ui/uikit/commit/2a6bb8346784e9405ed19c01b9ef5d7f86cc080b))
* **Popup:** set tabIndex on focusTrap root element ([#889](https://github.com/gravity-ui/uikit/issues/889)) ([4941880](https://github.com/gravity-ui/uikit/commit/49418800125bb5640e49cac21a3dd8b5c11cb6d5))
* **Tooltip:** set default open delay, focus/blur ignores delay ([#892](https://github.com/gravity-ui/uikit/issues/892)) ([625f4f4](https://github.com/gravity-ui/uikit/commit/625f4f4d0b3bc7ee2847753d85f6e020f2e158ea))

## [5.4.0](https://github.com/gravity-ui/uikit/compare/v5.3.0...v5.4.0) (2023-08-10)


### Features

* **Toaster:** make title optional ([#879](https://github.com/gravity-ui/uikit/issues/879)) ([37a434d](https://github.com/gravity-ui/uikit/commit/37a434d35bf806e861765ae0da70c5a129b558ad))

## [5.3.0](https://github.com/gravity-ui/uikit/compare/v5.2.0...v5.3.0) (2023-08-10)


### Features

* use useId from React 18 to generate uniq ids ([#883](https://github.com/gravity-ui/uikit/issues/883)) ([2b83656](https://github.com/gravity-ui/uikit/commit/2b836560d6c35601b9c9f2507e377975cfac4d07))


### Bug Fixes

* add Disclosure to imports ([#886](https://github.com/gravity-ui/uikit/issues/886)) ([a1d052e](https://github.com/gravity-ui/uikit/commit/a1d052e09039412f00ed4c44a83a81fbe7afcd44))

## [5.2.0](https://github.com/gravity-ui/uikit/compare/v5.1.0...v5.2.0) (2023-08-10)


### Features

* add Disclosure component ([#796](https://github.com/gravity-ui/uikit/issues/796)) ([df1eefd](https://github.com/gravity-ui/uikit/commit/df1eefd606f0db0e4392dc4c2f0a7a5144175f33))
* export hook useActionHandlers ([#836](https://github.com/gravity-ui/uikit/issues/836)) ([1ee8f3c](https://github.com/gravity-ui/uikit/commit/1ee8f3ca925f18e10f3eb0f7cd9c751791a240f8))
* **hooks:** export `useUniqId` hook ([#880](https://github.com/gravity-ui/uikit/issues/880)) ([a329789](https://github.com/gravity-ui/uikit/commit/a3297895262d8eddc2cd807b0de5879010f93e21))
* **Pagination:** add className prop ([#803](https://github.com/gravity-ui/uikit/issues/803)) ([b0cc6cd](https://github.com/gravity-ui/uikit/commit/b0cc6cdcc18553a6308a3ddecfdde82f3ab14d35))
* **Persona:** add style prop ([#855](https://github.com/gravity-ui/uikit/issues/855)) ([5d455e6](https://github.com/gravity-ui/uikit/commit/5d455e6c533e8901ae9fc36258f070ef64bc06d0))
* **Persona:** extend text property ([#876](https://github.com/gravity-ui/uikit/issues/876)) ([84f31df](https://github.com/gravity-ui/uikit/commit/84f31df469ea8fad8d37b5e3cfac666cf9ebe1f6))
* **Popover:** add props to improve accessibility ([#868](https://github.com/gravity-ui/uikit/issues/868)) ([8d2bf81](https://github.com/gravity-ui/uikit/commit/8d2bf81b59b396d30244934c6888bd97fcd1529b))
* **Select.SelectPopup:** add width modes ([#854](https://github.com/gravity-ui/uikit/issues/854)) ([d4ccfcf](https://github.com/gravity-ui/uikit/commit/d4ccfcfd706b78b908acddd5cea529f44fc15ebf))
* **Select:** add renderOptionGroup, getOptionGroupHeight props ([#828](https://github.com/gravity-ui/uikit/issues/828)) ([7f93637](https://github.com/gravity-ui/uikit/commit/7f9363773e0a8ff22d7dba102e5d56298a9c5729))
* **Select:** loading indicator ([#761](https://github.com/gravity-ui/uikit/issues/761)) ([aa1a963](https://github.com/gravity-ui/uikit/commit/aa1a963ea1440fe8b6209c872e7adc7217bf0209))
* **Select:** selected values appearance ([#848](https://github.com/gravity-ui/uikit/issues/848)) ([17e11f6](https://github.com/gravity-ui/uikit/commit/17e11f643fe4d84fcb7a2b8c6681e64e888241e0))


### Bug Fixes

* add menu-item-content-children class name ([#839](https://github.com/gravity-ui/uikit/issues/839)) ([4519ea5](https://github.com/gravity-ui/uikit/commit/4519ea5b3baa3a0e665a8b477e73ef8ea5cb44a3))
* **Disclosure:** readme ([#852](https://github.com/gravity-ui/uikit/issues/852)) ([6065c56](https://github.com/gravity-ui/uikit/commit/6065c56042be2650d27c7f99de6e115d2cf6691c))
* **Label:** actions icon size fix ([#851](https://github.com/gravity-ui/uikit/issues/851)) ([1bce6e4](https://github.com/gravity-ui/uikit/commit/1bce6e4777e7282c251649e79fbd3b11d4994f3a))
* **Menu:** set properly QA attributes names ([#844](https://github.com/gravity-ui/uikit/issues/844)) ([b3a9f1e](https://github.com/gravity-ui/uikit/commit/b3a9f1e3472608d0a3865604219be3477fd770d8))
* **Select:** disable option selection ([#870](https://github.com/gravity-ui/uikit/issues/870)) ([09c2e7d](https://github.com/gravity-ui/uikit/commit/09c2e7d4d47e801a4d4f1eed301828a07ee594bf))
* **Select:** do not show cursor:pointer on control when Select is disabled ([#874](https://github.com/gravity-ui/uikit/issues/874)) ([5d7c8b4](https://github.com/gravity-ui/uikit/commit/5d7c8b4af927dc38a24dda0b9ef24c94178e5823))
* **Select:** popup width fit mode with identation ([#873](https://github.com/gravity-ui/uikit/issues/873)) ([61a4c9a](https://github.com/gravity-ui/uikit/commit/61a4c9ae0bc551e188b9a7f4875a00db447aecf2))
* **TextArea:** fix incorrect type ([#867](https://github.com/gravity-ui/uikit/issues/867)) ([831bf5f](https://github.com/gravity-ui/uikit/commit/831bf5fbefa73a3f1a78fce3148e7fcf2849926e))
* **useRestoreFocus:** correctly set current restore element ([#865](https://github.com/gravity-ui/uikit/issues/865)) ([35bc0d5](https://github.com/gravity-ui/uikit/commit/35bc0d554664115a5a82c4c6bc9730c65de9070f))

## [5.1.0](https://github.com/gravity-ui/uikit/compare/v5.0.2...v5.1.0) (2023-07-20)


### Features

* **LayerManager:** export getLayersCount ([#830](https://github.com/gravity-ui/uikit/issues/830)) ([2ce4304](https://github.com/gravity-ui/uikit/commit/2ce43049d039e65c8927ec87e058c6472888e5c9))


### Bug Fixes

* **Table:** remove redundant height with enabled sorting ([#826](https://github.com/gravity-ui/uikit/issues/826)) ([c5c09b6](https://github.com/gravity-ui/uikit/commit/c5c09b63af641513e4ddfaee0740ad13fdcaa6a7))

## [5.0.2](https://github.com/gravity-ui/uikit/compare/v5.0.1...v5.0.2) (2023-07-18)


### Bug Fixes

* **Card:** prevent keyboard handler form abort ([#825](https://github.com/gravity-ui/uikit/issues/825)) ([273d316](https://github.com/gravity-ui/uikit/commit/273d3161e22cf8f1b1f269861dcf0e01b0e2a8a1))

## [5.0.1](https://github.com/gravity-ui/uikit/compare/v5.0.0...v5.0.1) (2023-07-17)


### Bug Fixes

* fix color palette ([#823](https://github.com/gravity-ui/uikit/issues/823)) ([bb77d87](https://github.com/gravity-ui/uikit/commit/bb77d87a1785f92f52949bf441ca79710c7aa3a9))

## [5.0.0](https://github.com/gravity-ui/uikit/compare/v4.24.0...v5.0.0) (2023-07-14)


### ⚠ BREAKING CHANGES

* new brand color ([#815](https://github.com/gravity-ui/uikit/issues/815))
* update colors ([#794](https://github.com/gravity-ui/uikit/issues/794))
* remove moved components ([#795](https://github.com/gravity-ui/uikit/issues/795))
* **TextInput:** separate into 2 components TextInput & TextArea ([#764](https://github.com/gravity-ui/uikit/issues/764))
* customization refactor ([#773](https://github.com/gravity-ui/uikit/issues/773))
* remove popup wrapper class, use content classes for popover… ([#711](https://github.com/gravity-ui/uikit/issues/711))
* update `xs` border radius ([#775](https://github.com/gravity-ui/uikit/issues/775))
* rename CSS vars ([#767](https://github.com/gravity-ui/uikit/issues/767))
* themization update ([#758](https://github.com/gravity-ui/uikit/issues/758))
* refactor theme context data flow ([#745](https://github.com/gravity-ui/uikit/issues/745))
* **Button:** add selected state for all views ([#755](https://github.com/gravity-ui/uikit/issues/755))
* **Button:** update paddings ([#636](https://github.com/gravity-ui/uikit/issues/636))
* **Progress:** rename `view` prop to `size` ([#747](https://github.com/gravity-ui/uikit/issues/747))
* remove `resize-observer-polyfill` ([#744](https://github.com/gravity-ui/uikit/issues/744))
* **Label:** remove `style` prop ([#733](https://github.com/gravity-ui/uikit/issues/733))
* removed migrated components ([#743](https://github.com/gravity-ui/uikit/issues/743))
* **Toaster:** remove deprecated `isOverride` prop ([#734](https://github.com/gravity-ui/uikit/issues/734))
* use icons from Gravity ([#735](https://github.com/gravity-ui/uikit/issues/735))
* **SharePopover:** remove deprecated `handleMetrika` prop ([#739](https://github.com/gravity-ui/uikit/issues/739))

### Features

* add hook useFocusWithin ([#804](https://github.com/gravity-ui/uikit/issues/804)) ([0ec0195](https://github.com/gravity-ui/uikit/commit/0ec0195d1a5122d56543865328497dec4782fe58))
* basic branding docs ([#789](https://github.com/gravity-ui/uikit/issues/789)) ([9535094](https://github.com/gravity-ui/uikit/commit/95350947efd57df45072eac4fa60738fceb741e5))
* **Button:** add selected state for all views ([#755](https://github.com/gravity-ui/uikit/issues/755)) ([8658b39](https://github.com/gravity-ui/uikit/commit/8658b395a612b091e525ff3222ebcef137155865))
* **Button:** added new views ([#805](https://github.com/gravity-ui/uikit/issues/805)) ([1ffc818](https://github.com/gravity-ui/uikit/commit/1ffc81871f3a7ee326f28410bd8a657865f88016))
* **Button:** update paddings ([#636](https://github.com/gravity-ui/uikit/issues/636)) ([eb36999](https://github.com/gravity-ui/uikit/commit/eb36999362feb834e86945359da914505ecfeecc))
* customization refactor ([#773](https://github.com/gravity-ui/uikit/issues/773)) ([3c1a33e](https://github.com/gravity-ui/uikit/commit/3c1a33e88c98dba3cd698eaa3fc01323e618567a))
* **Label:** remove `style` prop ([#733](https://github.com/gravity-ui/uikit/issues/733)) ([bc906e4](https://github.com/gravity-ui/uikit/commit/bc906e4923e734eff796aa917c5a8bf8c3ecb1a4))
* new brand color ([#815](https://github.com/gravity-ui/uikit/issues/815)) ([42e75ef](https://github.com/gravity-ui/uikit/commit/42e75eff24b6af9b12264a50e3406e7fafc85139))
* **Progress:** rename `view` prop to `size` ([#747](https://github.com/gravity-ui/uikit/issues/747)) ([f2a567e](https://github.com/gravity-ui/uikit/commit/f2a567e6069b3b61065489b40eb646cd9e12276c))
* remove `resize-observer-polyfill` ([#744](https://github.com/gravity-ui/uikit/issues/744)) ([f73e221](https://github.com/gravity-ui/uikit/commit/f73e22104bd4c76a7f951d3592096d5a862e46e5))
* removed migrated components ([#743](https://github.com/gravity-ui/uikit/issues/743)) ([75fea15](https://github.com/gravity-ui/uikit/commit/75fea15f2a0b18cf0c3b17aedf0f964dc8207fdf))
* rename CSS vars ([#767](https://github.com/gravity-ui/uikit/issues/767)) ([ff74eaa](https://github.com/gravity-ui/uikit/commit/ff74eaa1b232554610cf0f2ddb4c36717b5f4fe3))
* **SharePopover:** remove deprecated `handleMetrika` prop ([#739](https://github.com/gravity-ui/uikit/issues/739)) ([08fe894](https://github.com/gravity-ui/uikit/commit/08fe8941ecbd6512bb8e51f457d540071aa5c433))
* **TextInput:** separate into 2 components TextInput & TextArea ([#764](https://github.com/gravity-ui/uikit/issues/764)) ([e9aff63](https://github.com/gravity-ui/uikit/commit/e9aff632b924307e7700e76855ba15abc905be3b))
* **Toaster:** remove deprecated `isOverride` prop ([#734](https://github.com/gravity-ui/uikit/issues/734)) ([be97e59](https://github.com/gravity-ui/uikit/commit/be97e59adec6cde04c013073b3a3eeab0ec257cd))
* **Tooltip:** show/hide tooltip on focus/blur ([#797](https://github.com/gravity-ui/uikit/issues/797)) ([7f67a36](https://github.com/gravity-ui/uikit/commit/7f67a36cba7105c9dafc6369dd2fa1f4e15a0421))
* update `xs` border radius ([#775](https://github.com/gravity-ui/uikit/issues/775)) ([70dece4](https://github.com/gravity-ui/uikit/commit/70dece4300261d8a4d19f0ed90424d454fc0590c))
* update colors ([#794](https://github.com/gravity-ui/uikit/issues/794)) ([6c67fef](https://github.com/gravity-ui/uikit/commit/6c67fef7176f19322c472203e38428e34ffd4663))
* use icons from Gravity ([#735](https://github.com/gravity-ui/uikit/issues/735)) ([6c5d098](https://github.com/gravity-ui/uikit/commit/6c5d098b1a35ea4f661b34446e759d9867a1f786))


### Bug Fixes

* brand colors ([c4f91a1](https://github.com/gravity-ui/uikit/commit/c4f91a1c1ef28e7619375a78b600fa3d889b243b))
* **Button:** remove min-width ([8a0a58a](https://github.com/gravity-ui/uikit/commit/8a0a58a0e0c0b73acf111293c76776188fca47e2))
* change display from inline to inline-block ([#756](https://github.com/gravity-ui/uikit/issues/756)) ([49418ab](https://github.com/gravity-ui/uikit/commit/49418ab9eadb66a0fbfbbf45519f2daa06506cf4))
* change span to div in Trigger, the problem with semantic error ([#754](https://github.com/gravity-ui/uikit/issues/754)) ([8309193](https://github.com/gravity-ui/uikit/commit/83091938dc17daa4705ed7aead10b000c52031eb))
* rebase issues ([9e08632](https://github.com/gravity-ui/uikit/commit/9e0863215ad9ca924823c0d2df229ac76de116d3))
* **TextArea:** fix minRows property behaviour on initial render ([#814](https://github.com/gravity-ui/uikit/issues/814)) ([fe3e5d0](https://github.com/gravity-ui/uikit/commit/fe3e5d0bf917660e3f11fa8778a1b6b6ab0feeb8))
* **TextInput:** do not shrink clear button size ([#810](https://github.com/gravity-ui/uikit/issues/810)) ([82808d8](https://github.com/gravity-ui/uikit/commit/82808d86116c7124aac61272ecaf2418057f8866))
* variables ([#808](https://github.com/gravity-ui/uikit/issues/808)) ([042a982](https://github.com/gravity-ui/uikit/commit/042a9825008089a639e3399a7a8a6f890afca33d))
* various fixes ([#793](https://github.com/gravity-ui/uikit/issues/793)) ([f80682e](https://github.com/gravity-ui/uikit/commit/f80682e69721c8cc60fe68aa2f4c62d8d110b758))
* wrong deprecated color ([a68ffb2](https://github.com/gravity-ui/uikit/commit/a68ffb2de5de9aef5b314d813b61896bd65aa6c1))


### refactor

* refactor theme context data flow ([#745](https://github.com/gravity-ui/uikit/issues/745)) ([4a12982](https://github.com/gravity-ui/uikit/commit/4a1298204d14006ae8ec7a57077549b90a852c62))
* remove moved components ([#795](https://github.com/gravity-ui/uikit/issues/795)) ([20ed66d](https://github.com/gravity-ui/uikit/commit/20ed66d7c164908a35e47687077fc88ed1ae3b0c))
* remove popup wrapper class, use content classes for popover… ([#711](https://github.com/gravity-ui/uikit/issues/711)) ([e5346f9](https://github.com/gravity-ui/uikit/commit/e5346f90b74f61d67bffe4ed4c72842cecdd48cb))
* themization update ([#758](https://github.com/gravity-ui/uikit/issues/758)) ([265af0c](https://github.com/gravity-ui/uikit/commit/265af0c06773dbcb2e1148dc4b6f5159ad3b70b6))

## [4.24.0](https://github.com/gravity-ui/uikit/compare/v4.23.0...v4.24.0) (2023-07-14)


### Features

* **ArrowToggle:** use icon from gravity-ui/icons ([#811](https://github.com/gravity-ui/uikit/issues/811)) ([7113923](https://github.com/gravity-ui/uikit/commit/7113923f2d7c9a7541ede0a74b6ed75b382243f6))


### Bug Fixes

* **Hotkey:** setting a key property of a span in Hotkey's content ([#813](https://github.com/gravity-ui/uikit/issues/813)) ([d7aa609](https://github.com/gravity-ui/uikit/commit/d7aa6099529e351b79aedadcad54b3f4c273599e))
* **LayerManager:** ignore clicks on Toast ([#792](https://github.com/gravity-ui/uikit/issues/792)) ([ba7d7b0](https://github.com/gravity-ui/uikit/commit/ba7d7b0662a46f3ea9e52ddc126c53449c69685c))
* **useListNavigation:** remove navigation with right and left arrows ([#817](https://github.com/gravity-ui/uikit/issues/817)) ([0aab910](https://github.com/gravity-ui/uikit/commit/0aab9102db6af9265363f135b1d445b1efc48a58))

## [4.23.0](https://github.com/gravity-ui/uikit/compare/v4.22.1...v4.23.0) (2023-07-07)


### Features

* **Button:** use `aria-pressed` attribute for selected ([#799](https://github.com/gravity-ui/uikit/issues/799)) ([36490a9](https://github.com/gravity-ui/uikit/commit/36490a95ab7c17b04087410da45b7ade0c1cdb22))
* **Card:** added accessibility via keyboard ([#771](https://github.com/gravity-ui/uikit/issues/771)) ([24113e3](https://github.com/gravity-ui/uikit/commit/24113e312d094a0d0668fb3f9334dc2b2c459959))
* **Toaster:** new look ([#746](https://github.com/gravity-ui/uikit/issues/746)) ([5a9054e](https://github.com/gravity-ui/uikit/commit/5a9054ebba053d656b677c979fb1b99b77cb5113))

## [4.22.1](https://github.com/gravity-ui/uikit/compare/v4.22.0...v4.22.1) (2023-07-03)


### Bug Fixes

* **Label:** use proper Button size ([#776](https://github.com/gravity-ui/uikit/issues/776)) ([81395ad](https://github.com/gravity-ui/uikit/commit/81395adf0a0defe07bbc51ff5162e58e213e8878))
* **Select:** fix vertical align for SelectControl ([#790](https://github.com/gravity-ui/uikit/issues/790)) ([0abdc4a](https://github.com/gravity-ui/uikit/commit/0abdc4aa67184bf864a1ecbfdb8589d958353eb6))

## [4.22.0](https://github.com/gravity-ui/uikit/compare/v4.21.4...v4.22.0) (2023-06-30)


### Features

* **SelectFilter:** pass styles to renderFilter and remove wrapper ([#786](https://github.com/gravity-ui/uikit/issues/786)) ([29a6d3b](https://github.com/gravity-ui/uikit/commit/29a6d3bd640c3c0339fa842795632821fcdc5fc7))

## [4.21.4](https://github.com/gravity-ui/uikit/compare/v4.21.3...v4.21.4) (2023-06-29)


### Bug Fixes

* **Select:** fix selectControl height & bg hover style ([#784](https://github.com/gravity-ui/uikit/issues/784)) ([f2fa9e9](https://github.com/gravity-ui/uikit/commit/f2fa9e97ad15f155fc6e07d6af57dd2c4f5c0d4b))

## [4.21.3](https://github.com/gravity-ui/uikit/compare/v4.21.2...v4.21.3) (2023-06-29)


### Bug Fixes

* **Select:** fix qa & selectControl bg hover style ([#781](https://github.com/gravity-ui/uikit/issues/781)) ([f12a08e](https://github.com/gravity-ui/uikit/commit/f12a08eb28a93b48b78b467a082510625a85160f))

## [4.21.2](https://github.com/gravity-ui/uikit/compare/v4.21.1...v4.21.2) (2023-06-29)


### Bug Fixes

* **Select:** fix selectControl block style ([#777](https://github.com/gravity-ui/uikit/issues/777)) ([fb146de](https://github.com/gravity-ui/uikit/commit/fb146de90875cf92ae1aec38f8062cafc3199723))

## [4.21.1](https://github.com/gravity-ui/uikit/compare/v4.21.0...v4.21.1) (2023-06-28)


### Bug Fixes

* **Select:** fix SelectControl hover and border-radius styles ([#772](https://github.com/gravity-ui/uikit/issues/772)) ([9d6ef59](https://github.com/gravity-ui/uikit/commit/9d6ef59bc722335abb38e21b9f16a50487f29738))

## [4.21.0](https://github.com/gravity-ui/uikit/compare/v4.20.0...v4.21.0) (2023-06-26)


### Features

* **Select:** add hasClear ([#668](https://github.com/gravity-ui/uikit/issues/668)) ([93a2a00](https://github.com/gravity-ui/uikit/commit/93a2a00881db4d37e0cee72690c5475de7dcae0a))

## [4.20.0](https://github.com/gravity-ui/uikit/compare/v4.19.0...v4.20.0) (2023-06-23)


### Features

* **Menu:** change extra pseudo classes in markup to padding's ([#703](https://github.com/gravity-ui/uikit/issues/703)) ([24cfc5b](https://github.com/gravity-ui/uikit/commit/24cfc5bf81a48a80afc35f77a831cde39d02d1b5))


### Bug Fixes

* **Popover:** no left-side overflow due to negative margins ([#736](https://github.com/gravity-ui/uikit/issues/736)) ([c113920](https://github.com/gravity-ui/uikit/commit/c113920660665dc2b5b813cd609b65bd73dd8b82))
* **Select:** add [type="button"] to control node ([#762](https://github.com/gravity-ui/uikit/issues/762)) ([adc01f0](https://github.com/gravity-ui/uikit/commit/adc01f04a13b540dc8cb861171d4db3f7246b2ef))

## [4.19.0](https://github.com/gravity-ui/uikit/compare/v4.18.0...v4.19.0) (2023-06-21)


### Features

* **ClipboardButton:** added tooltip to clipboard button ([#667](https://github.com/gravity-ui/uikit/issues/667)) ([0508268](https://github.com/gravity-ui/uikit/commit/0508268f7b00b76ed037b17d21d3dd50d1266bda))


### Bug Fixes

* revert "fix: change span to div in popover" ([#750](https://github.com/gravity-ui/uikit/issues/750)) ([e0ff9f5](https://github.com/gravity-ui/uikit/commit/e0ff9f5af019aec0fca1b392556e0efaf9e192f6))

## [4.18.0](https://github.com/gravity-ui/uikit/compare/v4.17.0...v4.18.0) (2023-06-21)


### Features

* **Alert:** added new component Alert ([#724](https://github.com/gravity-ui/uikit/issues/724)) ([17caf7e](https://github.com/gravity-ui/uikit/commit/17caf7ed990344309ddaf143acf26c55a088bb85))


### Bug Fixes

* **Button:** use `--yc-color-text-special` var for all themes ([#732](https://github.com/gravity-ui/uikit/issues/732)) ([712e91b](https://github.com/gravity-ui/uikit/commit/712e91b63202ef994f28e4ad5f22ab971bd57bf3))
* change span to div in popover ([#748](https://github.com/gravity-ui/uikit/issues/748)) ([01d9d5b](https://github.com/gravity-ui/uikit/commit/01d9d5bd548333325bc312b1ea6f7d0d8d317bd8))
* **Label:** fix rounded style ([#728](https://github.com/gravity-ui/uikit/issues/728)) ([8a57148](https://github.com/gravity-ui/uikit/commit/8a571487e97137029fd21cea074b14372e43660e))
* **Persona:** avatar background ([#741](https://github.com/gravity-ui/uikit/issues/741)) ([785c412](https://github.com/gravity-ui/uikit/commit/785c412b47a4f6284a5a122ad533f6db6d612f70))

## [4.17.0](https://github.com/gravity-ui/uikit/compare/v4.16.0...v4.17.0) (2023-06-15)


### Features

* **Select:** design improvements (control & options) ([#727](https://github.com/gravity-ui/uikit/issues/727)) ([6526c86](https://github.com/gravity-ui/uikit/commit/6526c869dda259e943132b4e19369326ea76b20d))

## [4.16.0](https://github.com/gravity-ui/uikit/compare/v4.15.1...v4.16.0) (2023-06-09)


### Features

* add new component Pagination ([#655](https://github.com/gravity-ui/uikit/issues/655)) ([5b1ed4e](https://github.com/gravity-ui/uikit/commit/5b1ed4efe10aab39013b50f2feddbea871eb7aec))
* **Label:** added value prop for "key:value" labels ([#665](https://github.com/gravity-ui/uikit/issues/665)) ([5c979aa](https://github.com/gravity-ui/uikit/commit/5c979aaa29d884693187e55b52bb3ee7fae31ed2))
* **Persona:** deprecate `theme` in favour of `hasBorder` ([#720](https://github.com/gravity-ui/uikit/issues/720)) ([14eef03](https://github.com/gravity-ui/uikit/commit/14eef03a54386f1e2070f58490a7ff02b5129c6f))
* **UserAvatar:** forward `ref` ([#723](https://github.com/gravity-ui/uikit/issues/723)) ([e84f7c0](https://github.com/gravity-ui/uikit/commit/e84f7c044a6d0a2b8eddc008af22fefba8cddadb))

## [4.15.1](https://github.com/gravity-ui/uikit/compare/v4.15.0...v4.15.1) (2023-06-05)


### Bug Fixes

* add var for light shadows ([#704](https://github.com/gravity-ui/uikit/issues/704)) ([d12134c](https://github.com/gravity-ui/uikit/commit/d12134ca12a1edbfcc8ac691ce06c6fec318416a))
* **types:** add typings for i18n export ([#706](https://github.com/gravity-ui/uikit/issues/706)) ([8c68e0e](https://github.com/gravity-ui/uikit/commit/8c68e0eb47a7a9b7048d1951e3826257a5a900ad))

## [4.15.0](https://github.com/gravity-ui/uikit/compare/v4.14.0...v4.15.0) (2023-06-01)


### Features

* **18n:** export addComponentKeysets ([#676](https://github.com/gravity-ui/uikit/issues/676)) ([da2c12f](https://github.com/gravity-ui/uikit/commit/da2c12fcb60d429c0e3496dfba03b23e6c7ffa66))
* **Layout:** stable version ([#666](https://github.com/gravity-ui/uikit/issues/666)) ([6fc0459](https://github.com/gravity-ui/uikit/commit/6fc04590dabcc0e968ebdd0d13fedf6d0b6d1bc9))


### Bug Fixes

* **Menu:** group label style ([#680](https://github.com/gravity-ui/uikit/issues/680)) ([029974b](https://github.com/gravity-ui/uikit/commit/029974beafa49c3dfdb154dd2e16f4a64755d434))

## [4.14.0](https://github.com/gravity-ui/uikit/compare/v4.13.0...v4.14.0) (2023-05-22)


### Features

* **LayerManager:** add a way to subscribe to stack changes ([#652](https://github.com/gravity-ui/uikit/issues/652)) ([84f6b46](https://github.com/gravity-ui/uikit/commit/84f6b460c7cb4190642149c2a77e13cf2e2a01e0))


### Bug Fixes

* **Select:** fixed behaviour of isOptionMatchedByFilter ([#673](https://github.com/gravity-ui/uikit/issues/673)) ([823fb09](https://github.com/gravity-ui/uikit/commit/823fb09acc8c2e66f948d9986c0c19aebc5d49f2))

## [4.13.0](https://github.com/gravity-ui/uikit/compare/v4.12.0...v4.13.0) (2023-05-18)


### Features

* **TextInput:** add leftContent props ([#653](https://github.com/gravity-ui/uikit/issues/653)) ([e6cbfd6](https://github.com/gravity-ui/uikit/commit/e6cbfd623194b1196f1fe2e08dc0819eca61e6c1))

## [4.12.0](https://github.com/gravity-ui/uikit/compare/v4.11.1...v4.12.0) (2023-05-17)


### Features

* **Button:** add xs Button size ([#663](https://github.com/gravity-ui/uikit/issues/663)) ([efbe9fc](https://github.com/gravity-ui/uikit/commit/efbe9fc70e48466961830994269ecc60ea03400e))

## [4.11.1](https://github.com/gravity-ui/uikit/compare/v4.11.0...v4.11.1) (2023-05-12)


### Bug Fixes

* **Select:** align items by baseline for label and values ([#661](https://github.com/gravity-ui/uikit/issues/661)) ([b25734f](https://github.com/gravity-ui/uikit/commit/b25734f94a0837f2c5857f3609e45e317fbcb99b))

## [4.11.0](https://github.com/gravity-ui/uikit/compare/v4.10.0...v4.11.0) (2023-05-11)


### Features

* **TextInput:** add rightContent props ([#649](https://github.com/gravity-ui/uikit/issues/649)) ([fd29127](https://github.com/gravity-ui/uikit/commit/fd29127d30df8659da3785fc1417cae778846842))
* **UserAvatar:** add `srcset` support ([#641](https://github.com/gravity-ui/uikit/issues/641)) ([fe05925](https://github.com/gravity-ui/uikit/commit/fe05925d6b47ff9cc0d4786c5cb435089e3a7987))


### Bug Fixes

* **Tooltip:** increase selector specificity ([#660](https://github.com/gravity-ui/uikit/issues/660)) ([1f53d8d](https://github.com/gravity-ui/uikit/commit/1f53d8dbd75b01c3c621d4696e4d0317d06b3a82))

## [4.10.0](https://github.com/gravity-ui/uikit/compare/v4.9.0...v4.10.0) (2023-04-26)


### Features

* **Popover:** let action and cancel buttons to wrap on long text ([#631](https://github.com/gravity-ui/uikit/issues/631)) ([f22f9b5](https://github.com/gravity-ui/uikit/commit/f22f9b5ed2b864fbccb19118b142b6e03285296a))

## [4.9.0](https://github.com/gravity-ui/uikit/compare/v4.8.1...v4.9.0) (2023-04-20)


### Features

* **Select:** remove pointer cursor for disabled option ([#638](https://github.com/gravity-ui/uikit/issues/638)) ([d1dd601](https://github.com/gravity-ui/uikit/commit/d1dd60117b03c5c3c6c55ca38f9cee6a6c44e7fc))
* **Text:** add reference ([#628](https://github.com/gravity-ui/uikit/issues/628)) ([922b390](https://github.com/gravity-ui/uikit/commit/922b390d92747d55b9ca2521f4de78a5754ca263))


### Bug Fixes

* **Card:** update border-radius ([#639](https://github.com/gravity-ui/uikit/issues/639)) ([a05df9e](https://github.com/gravity-ui/uikit/commit/a05df9e1c8ddc4f697634296b10aac9aa264b204))

## [4.8.1](https://github.com/gravity-ui/uikit/compare/v4.8.0...v4.8.1) (2023-04-17)


### Bug Fixes

* **FocusTrap:** deactivate focusTrap before clear root node ([#627](https://github.com/gravity-ui/uikit/issues/627)) ([7a5abf1](https://github.com/gravity-ui/uikit/commit/7a5abf1e1e83fbb1fc33e2a774af9d95afc9633b))
* **usePopper:** return flip modifier ([#625](https://github.com/gravity-ui/uikit/issues/625)) ([03239bf](https://github.com/gravity-ui/uikit/commit/03239bfe4a969573366a1d4fdd2f07cc8ff217f9))

## [4.8.0](https://github.com/gravity-ui/uikit/compare/v4.7.0...v4.8.0) (2023-04-14)


### Features

* add useFileInput hook ([#624](https://github.com/gravity-ui/uikit/issues/624)) ([eb47759](https://github.com/gravity-ui/uikit/commit/eb47759bb41be8c3c104b93339225b2fa99e302f))
* added xpath utils ([#614](https://github.com/gravity-ui/uikit/issues/614)) ([20c72ac](https://github.com/gravity-ui/uikit/commit/20c72ac5175542f0e8328ddd0d7cf284ceda8986))
* **Layout:** changed letter designation of the spacings to a digital ([#615](https://github.com/gravity-ui/uikit/issues/615)) ([2aae0d2](https://github.com/gravity-ui/uikit/commit/2aae0d2bb09844be225040b6eae4014dfab6e107))


### Bug Fixes

* **Label:** Increase priority over button styles ([#622](https://github.com/gravity-ui/uikit/issues/622)) ([e67ce4d](https://github.com/gravity-ui/uikit/commit/e67ce4dfb01a36ec7339ef99cff55d59bf04cd1c))

## [4.7.0](https://github.com/gravity-ui/uikit/compare/v4.6.1...v4.7.0) (2023-04-11)


### Features

* **Select:** add itemHeight to renderOption  ([#618](https://github.com/gravity-ui/uikit/issues/618)) ([4f46baa](https://github.com/gravity-ui/uikit/commit/4f46baa69da0c3ef9e8a7f2eef1fbdaebe8099c3))
* **Stories:** support single page story ([#591](https://github.com/gravity-ui/uikit/issues/591)) ([e5ceb5a](https://github.com/gravity-ui/uikit/commit/e5ceb5a174c7f2cdfa772b172f537315e8bb7dfd))


### Bug Fixes

* **ControlLabel:** allow control text to be stretched ([#619](https://github.com/gravity-ui/uikit/issues/619)) ([5193fc4](https://github.com/gravity-ui/uikit/commit/5193fc41aad9d90702685cbf68479da2470b3952))

## [4.6.1](https://github.com/gravity-ui/uikit/compare/v4.6.0...v4.6.1) (2023-04-07)


### Bug Fixes

* **Icon:** use href attribute in &lt;use&gt; element ([#580](https://github.com/gravity-ui/uikit/issues/580)) ([aaaa900](https://github.com/gravity-ui/uikit/commit/aaaa90045800cc360abc41ec6ea735a1e998995b))
* **Table:** add export for TableSortIndicator ([#612](https://github.com/gravity-ui/uikit/issues/612)) ([5072097](https://github.com/gravity-ui/uikit/commit/5072097f9c97beff9a30c036d357418cb4d4755c))

## [4.6.0](https://github.com/gravity-ui/uikit/compare/v4.5.0...v4.6.0) (2023-04-06)


### Features

* **Card:** add size Card and add new sfx style ([#550](https://github.com/gravity-ui/uikit/issues/550)) ([d1dbea6](https://github.com/gravity-ui/uikit/commit/d1dbea6161ae4430280a9052f38f2434366076e7))
* export LayoutDirection ([#586](https://github.com/gravity-ui/uikit/issues/586)) ([c1b3375](https://github.com/gravity-ui/uikit/commit/c1b33757263c1c7fe8c491e1ed6d4ee843a2b04f))
* **FocusTrap:** automatically add popup content to parent focus-trap ([#594](https://github.com/gravity-ui/uikit/issues/594)) ([7de4a6f](https://github.com/gravity-ui/uikit/commit/7de4a6fb03e088313df2daf3b54b49f66a975652))
* **SharePopover:** add an onClick prop, deprecate a handleMetrika prop ([#606](https://github.com/gravity-ui/uikit/issues/606)) ([f5c5c16](https://github.com/gravity-ui/uikit/commit/f5c5c16e79c126d9db5f1d60c63b8535da4bb4c6))


### Bug Fixes

* table component resize observer loop error ([#610](https://github.com/gravity-ui/uikit/issues/610)) ([4962e47](https://github.com/gravity-ui/uikit/commit/4962e47fdf0cbdb5a96c2e97992621bf143d55c4))

## [4.5.0](https://github.com/gravity-ui/uikit/compare/v4.4.3...v4.5.0) (2023-04-04)


### Features

* **Persona:** add component ([#599](https://github.com/gravity-ui/uikit/issues/599)) ([5190c9d](https://github.com/gravity-ui/uikit/commit/5190c9d2d21aa622a6e5b5350bd22695120bb321))
* **Tabs:** add support for tabs via `children` ([#597](https://github.com/gravity-ui/uikit/issues/597)) ([8546901](https://github.com/gravity-ui/uikit/commit/854690192016a43c6f6d11038694321fdc6d8712))

## [4.4.3](https://github.com/gravity-ui/uikit/compare/v4.4.2...v4.4.3) (2023-04-03)


### Bug Fixes

* **layout/Flex:** fix gap size values and remove default theme spacin… ([#592](https://github.com/gravity-ui/uikit/issues/592)) ([42aea11](https://github.com/gravity-ui/uikit/commit/42aea11b3a8bfb729457d2eb2eea0fd24a78ba9e))
* **Select:** fix empty group label render ([#601](https://github.com/gravity-ui/uikit/issues/601)) ([548c81c](https://github.com/gravity-ui/uikit/commit/548c81c4cd911fcde3b3f33334b33e64a8504bbe))

## [4.4.2](https://github.com/gravity-ui/uikit/compare/v4.4.1...v4.4.2) (2023-03-29)


### Bug Fixes

* **Select:** fix scroll when virtualization disabled ([#593](https://github.com/gravity-ui/uikit/issues/593)) ([e78e7ad](https://github.com/gravity-ui/uikit/commit/e78e7ade595570f0207bae3939f88e1e49a1311c))

## [4.4.1](https://github.com/gravity-ui/uikit/compare/v4.4.0...v4.4.1) (2023-03-29)


### Bug Fixes

* **layout/Flex:** remove wrappers around null children elements ([#588](https://github.com/gravity-ui/uikit/issues/588)) ([6c6c62f](https://github.com/gravity-ui/uikit/commit/6c6c62f3c4e13025f299c9019d700ce22f0bc1ec))
* **layout:** fixed flex gap properties and replaced api with complex … ([#583](https://github.com/gravity-ui/uikit/issues/583)) ([8686fbb](https://github.com/gravity-ui/uikit/commit/8686fbbfe0c633184a8dbf1cebfebfffb6de4943))

## [4.4.0](https://github.com/gravity-ui/uikit/compare/v4.3.0...v4.4.0) (2023-03-27)


### Features

* added wrappers to Flex children components if spacing enabled ([#573](https://github.com/gravity-ui/uikit/issues/573)) ([0a44309](https://github.com/gravity-ui/uikit/commit/0a44309ba66ee5b63a0f364d5a037bfb1f2dcce8))
* **List:** add autoFocus ([#570](https://github.com/gravity-ui/uikit/issues/570)) ([3b96d37](https://github.com/gravity-ui/uikit/commit/3b96d372e115ce283c3a601a1db7a051b6e80f7a))
* **Select:** add generic type for select option data ([#569](https://github.com/gravity-ui/uikit/issues/569)) ([21819cb](https://github.com/gravity-ui/uikit/commit/21819cbbf80a0052d33a78bc9e5ba9415472f586))
* **Select:** add support mobile view ([#579](https://github.com/gravity-ui/uikit/issues/579)) ([0c0df4a](https://github.com/gravity-ui/uikit/commit/0c0df4a58aa81a81bcd14477c584dec77b6cb171))


### Bug Fixes

* **SheetContent:** fix setting height for content ([#572](https://github.com/gravity-ui/uikit/issues/572)) ([e749230](https://github.com/gravity-ui/uikit/commit/e74923009c2c233c0d74c7c19733dd17a20c617d))

## [4.3.0](https://github.com/gravity-ui/uikit/compare/v4.2.0...v4.3.0) (2023-03-16)


### Features

* **Select:** add support selected value in renderControl ([#566](https://github.com/gravity-ui/uikit/issues/566)) ([f987fb3](https://github.com/gravity-ui/uikit/commit/f987fb39f448d45bdd3638e64eef874835e35d00))
* unstable layout components set ([#551](https://github.com/gravity-ui/uikit/issues/551)) ([dc2ffad](https://github.com/gravity-ui/uikit/commit/dc2ffad72e967ff41edb64c2f3e0567c73b52527))


### Bug Fixes

* **DropdownMenu:** remove required path from DropdownMenuItemProps, fix navigation ([#567](https://github.com/gravity-ui/uikit/issues/567)) ([e7470c3](https://github.com/gravity-ui/uikit/commit/e7470c3e8f1d65d2480eb1eafba7963f627cbd7c))
* only known names are now exported from the package ([#565](https://github.com/gravity-ui/uikit/issues/565)) ([203653d](https://github.com/gravity-ui/uikit/commit/203653ddf07fd7a9d6bba1f3ecac18b55208136f))
* **storybook:** remove RE_RENDER event from theme addon ([#562](https://github.com/gravity-ui/uikit/issues/562)) ([305aa38](https://github.com/gravity-ui/uikit/commit/305aa38039511e8c36cf1069736267ae20304946))

## [4.2.0](https://github.com/gravity-ui/uikit/compare/v4.1.0...v4.2.0) (2023-03-07)


### Features

* **Progress:** add loading state ([#540](https://github.com/gravity-ui/uikit/issues/540)) ([a76aee0](https://github.com/gravity-ui/uikit/commit/a76aee088efb61abf470660a6e49e323af225467))
* **Select:** add "open", "toggleOpen" props ([#558](https://github.com/gravity-ui/uikit/issues/558)) ([43d130f](https://github.com/gravity-ui/uikit/commit/43d130f2cdc67c7eba04bcc7cf1e02d811d77de5))
* **Table:** add row actions size control prop ([#557](https://github.com/gravity-ui/uikit/issues/557)) ([a045e12](https://github.com/gravity-ui/uikit/commit/a045e129163360b1c8ce5e9ace67cbf768ed6f29))
* **Toaster:** add "has" method ([#439](https://github.com/gravity-ui/uikit/issues/439)) ([ea2b2d8](https://github.com/gravity-ui/uikit/commit/ea2b2d8dbd5ba04304b16859b1c1392952a955bc))
* **Toaster:** add ability to customize icon ([#440](https://github.com/gravity-ui/uikit/issues/440)) ([1fefa17](https://github.com/gravity-ui/uikit/commit/1fefa17ab0fd9717ac243d4b97bee08746168d65))


### Bug Fixes

* **Toaster:** fix animation when toast is updated ([#441](https://github.com/gravity-ui/uikit/issues/441)) ([9e25c8b](https://github.com/gravity-ui/uikit/commit/9e25c8bdc52754ec7d4ba2a2ae21a72813f0d94a))

## [4.1.0](https://github.com/gravity-ui/uikit/compare/v4.0.7...v4.1.0) (2023-03-01)


### Features

* **Select:** add error property ([#548](https://github.com/gravity-ui/uikit/issues/548)) ([061a8df](https://github.com/gravity-ui/uikit/commit/061a8df8b87d82c5f0185e7271bcedfe7fa33fb5))
* **Select:** add opportunity to apply maxHeight style to popup via popupClassName property ([#537](https://github.com/gravity-ui/uikit/issues/537)) ([16786e0](https://github.com/gravity-ui/uikit/commit/16786e0cd58b155774ca746db9e6e4f486b0cc82))
* **Table:** add onMouseDown action for Table tr ([#534](https://github.com/gravity-ui/uikit/issues/534)) ([4f287b3](https://github.com/gravity-ui/uikit/commit/4f287b3ac45f2cb648db1789efe517f035191df8))
* **Table:** add table action icon ([#510](https://github.com/gravity-ui/uikit/issues/510)) ([a265b34](https://github.com/gravity-ui/uikit/commit/a265b34a0885eb8ca365776d7d1dc4868c203958))
* **typography:** do not use SF Mono ([#541](https://github.com/gravity-ui/uikit/issues/541)) ([6f4f0d6](https://github.com/gravity-ui/uikit/commit/6f4f0d6f59c2cc68b8d84f521b324c91b6cfba5c))


### Bug Fixes

* base-generic-ultralight color in dark-hc theme ([#545](https://github.com/gravity-ui/uikit/issues/545)) ([6e23eac](https://github.com/gravity-ui/uikit/commit/6e23eac3d69ee7de155d27b6c42bfe1f6d861e3e))
* **Button:** change border for outlined view ([#546](https://github.com/gravity-ui/uikit/issues/546)) ([f47bdfb](https://github.com/gravity-ui/uikit/commit/f47bdfb44ffe5ac76c8c0f6aa5d7302503c9fe98))
* fix exports object ([#555](https://github.com/gravity-ui/uikit/issues/555)) ([68dd2bd](https://github.com/gravity-ui/uikit/commit/68dd2bd500f216167ba74b677b14bc322425b52b))
* **LayerManager:** check click outside event on the same layer where the  mousedown event happened ([#549](https://github.com/gravity-ui/uikit/issues/549)) ([63637b2](https://github.com/gravity-ui/uikit/commit/63637b213a43fc94353e4d47db5178c59d3cc565))
* **TextInput:** no unexpected autocomplete when label prop present ([#509](https://github.com/gravity-ui/uikit/issues/509)) ([0a81ce2](https://github.com/gravity-ui/uikit/commit/0a81ce2f0d0017db2256fc71bd317d26aee7f0b5))

## [4.0.7](https://github.com/gravity-ui/uikit/compare/v4.0.6...v4.0.7) (2023-02-10)


### Bug Fixes

* **Tabs:** typo readme types fix ([#529](https://github.com/gravity-ui/uikit/issues/529)) ([8cbfff2](https://github.com/gravity-ui/uikit/commit/8cbfff2db260f1dd848ddf496b70c243f4534d71))

## [4.0.6](https://github.com/gravity-ui/uikit/compare/v4.0.5...v4.0.6) (2023-02-08)


### Bug Fixes

* add explicitly used deps to package.json ([#530](https://github.com/gravity-ui/uikit/issues/530)) ([72c134d](https://github.com/gravity-ui/uikit/commit/72c134d97013c39e069c39f31d7e70e33446096a))
* **Label:** the Label with the close button style fix ([#524](https://github.com/gravity-ui/uikit/issues/524)) ([b7963be](https://github.com/gravity-ui/uikit/commit/b7963be65054816fa0f49f650cbf612faf699f9c))

## [4.0.5](https://github.com/gravity-ui/uikit/compare/v4.0.4...v4.0.5) (2023-02-01)


### Bug Fixes

* **Icon:** add type for icon's data ([#522](https://github.com/gravity-ui/uikit/issues/522)) ([1fb9eff](https://github.com/gravity-ui/uikit/commit/1fb9eff8d82098b07cdb66631ade284e25a16ecb))

## [4.0.4](https://github.com/gravity-ui/uikit/compare/v4.0.3...v4.0.4) (2023-01-31)


### Bug Fixes

* **Select:** filter options when filter text is empty ([#517](https://github.com/gravity-ui/uikit/issues/517)) ([9fd57d5](https://github.com/gravity-ui/uikit/commit/9fd57d55761c9975ddfe35e62be33895f47c5a56))

## [4.0.3](https://github.com/gravity-ui/uikit/compare/v4.0.2...v4.0.3) (2023-01-31)


### Bug Fixes

* old exports should work with the new ones ([#515](https://github.com/gravity-ui/uikit/issues/515)) ([fe7790c](https://github.com/gravity-ui/uikit/commit/fe7790cda3beb6866e847edb0877dd5b78bfc84e))

## [4.0.2](https://github.com/gravity-ui/uikit/compare/v4.0.1...v4.0.2) (2023-01-30)


### Bug Fixes

* package exports fixes ([#512](https://github.com/gravity-ui/uikit/issues/512)) ([b1579f7](https://github.com/gravity-ui/uikit/commit/b1579f7123495628c5831c76db2ab54cba335343))

## [4.0.1](https://github.com/gravity-ui/uikit/compare/v4.0.0...v4.0.1) (2023-01-26)


### Bug Fixes

* **TextInput:** do not auto generate id for input if not needed ([#505](https://github.com/gravity-ui/uikit/issues/505)) ([26b24df](https://github.com/gravity-ui/uikit/commit/26b24dfeecd8ab427215cd4b48e9b508cffbea9f))

## [4.0.0](https://github.com/gravity-ui/uikit/compare/v3.20.0...v4.0.0) (2023-01-26)


### ⚠ BREAKING CHANGES

* text semantic colors update ([#484](https://github.com/gravity-ui/uikit/issues/484))
* remove deprecated props ([#486](https://github.com/gravity-ui/uikit/issues/486))
* **ShareTooltip:** rename to SharePopover ([#488](https://github.com/gravity-ui/uikit/issues/488))
* **Popover:** make `forceLinksAppearance` false by default ([#472](https://github.com/gravity-ui/uikit/issues/472))
* **Icon:** remove `onClick` handler ([#473](https://github.com/gravity-ui/uikit/issues/473))
* **Toaster:** rename `timeout` to `autoHiding` ([#248](https://github.com/gravity-ui/uikit/issues/248))
* **ShareTooltip:** socialNets props renamed to shareOptions ([#411](https://github.com/gravity-ui/uikit/issues/411))
* **HelpPopup:** remove default ofset ([#304](https://github.com/gravity-ui/uikit/issues/304))
* **TextInput:** remove incorrect resize attribute styles ([#266](https://github.com/gravity-ui/uikit/issues/266))
* **Toaster:** remove singleton instantiation ([#225](https://github.com/gravity-ui/uikit/issues/225))
* **Label:** new xs size and click action for more custom label ([#380](https://github.com/gravity-ui/uikit/issues/380))
* **DropdownMenu:** custom popup props, controlled popup visibility, submenus, keyboard navigation ([#409](https://github.com/gravity-ui/uikit/issues/409))

### Features

* add focus trap ([#482](https://github.com/gravity-ui/uikit/issues/482)) ([e091ee0](https://github.com/gravity-ui/uikit/commit/e091ee0d442f2d5e1997003ea0dc5a1891846a96))
* **DropdownMenu:** custom popup props, controlled popup visibility, submenus, keyboard navigation ([#409](https://github.com/gravity-ui/uikit/issues/409)) ([a6db9f8](https://github.com/gravity-ui/uikit/commit/a6db9f83fa797fdb7012c29a0e16a646c10d8321))
* **HelpPopup:** remove default ofset ([#304](https://github.com/gravity-ui/uikit/issues/304)) ([c150cb2](https://github.com/gravity-ui/uikit/commit/c150cb229f9c623dde83cdf4b35564f1bce4763d))
* **Icon:** remove `onClick` handler ([#473](https://github.com/gravity-ui/uikit/issues/473)) ([50faf8f](https://github.com/gravity-ui/uikit/commit/50faf8f43999176894dcf6a5693cd9db7b3677cb))
* **Label:** new xs size and click action for more custom label ([#380](https://github.com/gravity-ui/uikit/issues/380)) ([c9f7c36](https://github.com/gravity-ui/uikit/commit/c9f7c36692705b644e0e103fd64c2fbb67d1312a))
* **Popover:** make `forceLinksAppearance` false by default ([#472](https://github.com/gravity-ui/uikit/issues/472)) ([65f44ec](https://github.com/gravity-ui/uikit/commit/65f44ec491598f0fd2284bbbc8d6d5e5f52cca09))
* **ShareTooltip:** socialNets props renamed to shareOptions ([#411](https://github.com/gravity-ui/uikit/issues/411)) ([c3b1aeb](https://github.com/gravity-ui/uikit/commit/c3b1aeb16cc0c19aaad5f15fcc1752657a809a9b))
* support React 18 ([#469](https://github.com/gravity-ui/uikit/issues/469)) ([e54108d](https://github.com/gravity-ui/uikit/commit/e54108db248a4850ed42d3c42acd82754b1d84c7))
* text semantic colors update ([#484](https://github.com/gravity-ui/uikit/issues/484)) ([dbbf04a](https://github.com/gravity-ui/uikit/commit/dbbf04a43ae978450b26385a72377ad8b6233310))
* **Toaster:** remove singleton instantiation ([#225](https://github.com/gravity-ui/uikit/issues/225)) ([60933f8](https://github.com/gravity-ui/uikit/commit/60933f8ccacc28da6bd66960a86c801fdfda6052))
* **Toaster:** rename `timeout` to `autoHiding` ([#248](https://github.com/gravity-ui/uikit/issues/248)) ([ed0585a](https://github.com/gravity-ui/uikit/commit/ed0585a24ce3889a139be84bdb2b16b81256b453))


### Bug Fixes

* **TextInput:** remove incorrect resize attribute styles ([#266](https://github.com/gravity-ui/uikit/issues/266)) ([85ef55a](https://github.com/gravity-ui/uikit/commit/85ef55a60c02a0891378d8fa44fbd6f6fcdb77b1))
* **Toaster:** pre 18 react fix ([#494](https://github.com/gravity-ui/uikit/issues/494)) ([0f0877a](https://github.com/gravity-ui/uikit/commit/0f0877a4ba74ffb9c35ce6b8c5b03dc5cf880486))
* **Toaster:** swap namings in singletons ([440ed7e](https://github.com/gravity-ui/uikit/commit/440ed7ebc8dee1f1159cf608018c34cb69f4a8f7))
* **Tooltip:** hide Popup border ([252f2f3](https://github.com/gravity-ui/uikit/commit/252f2f353c02a69af451b5f99d724fd94bd746e0))


### refactor

* remove deprecated props ([#486](https://github.com/gravity-ui/uikit/issues/486)) ([89c8885](https://github.com/gravity-ui/uikit/commit/89c88850599c03325a5cc825f2009c0b8e70475f))
* **ShareTooltip:** rename to SharePopover ([#488](https://github.com/gravity-ui/uikit/issues/488)) ([32db8b2](https://github.com/gravity-ui/uikit/commit/32db8b25c5ba16faf787473708f39ca86bc402af))

## [3.20.0](https://github.com/gravity-ui/uikit/compare/v3.19.2...v3.20.0) (2023-01-25)


### Features

* **eventBroker:** eventBroker acts in the bubbling phase ([#489](https://github.com/gravity-ui/uikit/issues/489)) ([ef2c901](https://github.com/gravity-ui/uikit/commit/ef2c9013b67e14170ebdc4eb9e6b182b298fde7c))

## [3.19.2](https://github.com/gravity-ui/uikit/compare/v3.19.1...v3.19.2) (2023-01-23)


### Bug Fixes

* **Portal:** add condition for default container for Portal ([#497](https://github.com/gravity-ui/uikit/issues/497)) ([da21d63](https://github.com/gravity-ui/uikit/commit/da21d6398ba2020d5b9d47d13a63bbb3d9959b92))

## [3.19.1](https://github.com/gravity-ui/uikit/compare/v3.19.0...v3.19.1) (2023-01-22)


### Bug Fixes

* **Select:** use theme font-family ([#495](https://github.com/gravity-ui/uikit/issues/495)) ([4615c46](https://github.com/gravity-ui/uikit/commit/4615c46e7f74010c5b6c283de54ed635e34efdd5))

## [3.19.0](https://github.com/gravity-ui/uikit/compare/v3.18.2...v3.19.0) (2023-01-20)


### Features

* **RadioGroup:** improve radio-group components a11y ([#196](https://github.com/gravity-ui/uikit/issues/196)) ([70f36ea](https://github.com/gravity-ui/uikit/commit/70f36eaceebb4e8b9dfdd6ec056896b07bd8f89c))
* **TextInput:** ability to show innerLabel in InputControl ([#426](https://github.com/gravity-ui/uikit/issues/426)) ([8a5e3c5](https://github.com/gravity-ui/uikit/commit/8a5e3c594eb2e4c5d9505d078a44e5cd495bb435))


### Bug Fixes

* lighter colors for base-neutral ([#490](https://github.com/gravity-ui/uikit/issues/490)) ([64e7278](https://github.com/gravity-ui/uikit/commit/64e72785c6c3f7f68bf075921a70b5cbbb400a63))

## [3.18.2](https://github.com/gravity-ui/uikit/compare/v3.18.1...v3.18.2) (2023-01-19)


### Bug Fixes

* **Modal:** fix close animation ([#483](https://github.com/gravity-ui/uikit/issues/483)) ([e4df040](https://github.com/gravity-ui/uikit/commit/e4df0407cbb4d5694932f124e536a765bfc1df06))

## [3.18.1](https://github.com/gravity-ui/uikit/compare/v3.18.0...v3.18.1) (2023-01-16)


### Bug Fixes

* **Popup:** return shadow on root element ([#479](https://github.com/gravity-ui/uikit/issues/479)) ([5a4098d](https://github.com/gravity-ui/uikit/commit/5a4098d75b43f030b876c3deb78a680e18b2a4e9))

## [3.18.0](https://github.com/gravity-ui/uikit/compare/v3.17.0...v3.18.0) (2023-01-13)


### Features

* add Hotkey and ActionTooltip components ([#398](https://github.com/gravity-ui/uikit/issues/398)) ([76cf9dd](https://github.com/gravity-ui/uikit/commit/76cf9dd2e45abb006a73e72f41a8776fea985bf7))
* **Select:** add prop renderSelectedOption ([#474](https://github.com/gravity-ui/uikit/issues/474)) ([6449e31](https://github.com/gravity-ui/uikit/commit/6449e31886daa9cbc86608e187b7118275fcc078))
* **ThemeProvider:** add props scoped and rootClassName ([#478](https://github.com/gravity-ui/uikit/issues/478)) ([763af7b](https://github.com/gravity-ui/uikit/commit/763af7b1afbb3b0bcd48c7c00437c0517574ad53))

## [3.17.0](https://github.com/gravity-ui/uikit/compare/v3.16.0...v3.17.0) (2023-01-12)


### Features

* **RadioGroup:** add optionClassName prop ([#462](https://github.com/gravity-ui/uikit/issues/462)) ([1104078](https://github.com/gravity-ui/uikit/commit/1104078c6d3dd4a0630a5f43e19ec4b2a2ff972d))
* **Tabs:** add `className` to `&lt;TabItem/&gt;` ([#471](https://github.com/gravity-ui/uikit/issues/471)) ([66817c8](https://github.com/gravity-ui/uikit/commit/66817c8e9c77f2e521e0384e25047ec71fcb4fe9))
* **Tabs:** new features ([#450](https://github.com/gravity-ui/uikit/issues/450)) ([6bcdfbf](https://github.com/gravity-ui/uikit/commit/6bcdfbf7b5568a78c472d88fd37ce3f37c998034))

## [3.16.0](https://github.com/gravity-ui/uikit/compare/v3.15.0...v3.16.0) (2023-01-11)


### Features

* **Select:** add popupClassName property ([#468](https://github.com/gravity-ui/uikit/issues/468)) ([f0184a8](https://github.com/gravity-ui/uikit/commit/f0184a87cbfe4f09c07bf0851f8e84876e75b9d8))
* **Table:** pass click event to action handler ([#461](https://github.com/gravity-ui/uikit/issues/461)) ([620c0e1](https://github.com/gravity-ui/uikit/commit/620c0e1a156da9de452ce5f46f2ace96f23a947c))
* use react-transition in Modal and Popup ([#453](https://github.com/gravity-ui/uikit/issues/453)) ([9edec4a](https://github.com/gravity-ui/uikit/commit/9edec4ad0068872fea499b6822edf71bbe185971))


### Bug Fixes

* **Label:** various fixes ([#451](https://github.com/gravity-ui/uikit/issues/451)) ([e28f92f](https://github.com/gravity-ui/uikit/commit/e28f92fd559e19f587f678ee04abe702c2cbe948))
* **StoriesGroup:** fix click area ([#446](https://github.com/gravity-ui/uikit/issues/446)) ([cf898d4](https://github.com/gravity-ui/uikit/commit/cf898d448ed729457c343a1ddad6a6e8da7483b8))

## [3.15.0](https://github.com/gravity-ui/uikit/compare/v3.14.1...v3.15.0) (2023-01-10)


### Features

* **Select:** add defaultOpen prop ([#459](https://github.com/gravity-ui/uikit/issues/459)) ([775f857](https://github.com/gravity-ui/uikit/commit/775f857b694c56cf0bdcbb59f04899afe52277b2))
* **Text:** add text break common properties ([#438](https://github.com/gravity-ui/uikit/issues/438)) ([c879e0a](https://github.com/gravity-ui/uikit/commit/c879e0aca7af2a105482a5a62023bd51e3ae1959))
* **Text:** replace titleAttribute with native title ([#437](https://github.com/gravity-ui/uikit/issues/437)) ([cf9d42e](https://github.com/gravity-ui/uikit/commit/cf9d42e27cb2bbb7b3c9112e9f60c7646c7db244))


### Bug Fixes

* **List:** remove focus from list on Tab key ([#444](https://github.com/gravity-ui/uikit/issues/444)) ([78a8a60](https://github.com/gravity-ui/uikit/commit/78a8a6017e4a5b0c1f2922f76b76ad3c5f01969b))

## [3.14.1](https://github.com/gravity-ui/uikit/compare/v3.14.0...v3.14.1) (2022-12-30)


### Bug Fixes

* add `getComponentName` reexport ([#447](https://github.com/gravity-ui/uikit/issues/447)) ([99df0fb](https://github.com/gravity-ui/uikit/commit/99df0fb021e48884247e85782224aec67e7a650b))

## [3.14.0](https://github.com/gravity-ui/uikit/compare/v3.13.1...v3.14.0) (2022-12-22)


### Features

* new component Sheet & PromoSheet ([#420](https://github.com/gravity-ui/uikit/issues/420)) ([ec24c90](https://github.com/gravity-ui/uikit/commit/ec24c901387c2a8f35426d8b791bdb42b62c6f45))

## [3.13.1](https://github.com/gravity-ui/uikit/compare/v3.13.0...v3.13.1) (2022-12-20)


### Bug Fixes

* **DropdownMenu.Item:** allow usage w/out `text` ([#406](https://github.com/gravity-ui/uikit/issues/406)) ([54def67](https://github.com/gravity-ui/uikit/commit/54def671bc2598e6ba68247c4b929730f6c7ff8a))

## [3.13.0](https://github.com/gravity-ui/uikit/compare/v3.12.0...v3.13.0) (2022-12-20)


### Features

* **Select:** add virtualizationThreshold property ([#431](https://github.com/gravity-ui/uikit/issues/431)) ([6bd9751](https://github.com/gravity-ui/uikit/commit/6bd975184fd9bbf83eb6e4c6fbd76c6f2df6bd2e))

## [3.12.0](https://github.com/gravity-ui/uikit/compare/v3.11.0...v3.12.0) (2022-12-19)


### Features

* **Table:** add row mouse events ([#427](https://github.com/gravity-ui/uikit/issues/427)) ([f7701c7](https://github.com/gravity-ui/uikit/commit/f7701c7347863c800d585f2fa7074d2b3fa48ed3))


### Bug Fixes

* **Table:** typo in README.md ([#429](https://github.com/gravity-ui/uikit/issues/429)) ([972f764](https://github.com/gravity-ui/uikit/commit/972f76486038764e7c09086d9e16a625f4f79d89))

## [3.11.0](https://github.com/gravity-ui/uikit/compare/v3.10.2...v3.11.0) (2022-12-14)


### Features

* add linkedin color ([#424](https://github.com/gravity-ui/uikit/issues/424)) ([8b09fc1](https://github.com/gravity-ui/uikit/commit/8b09fc16355eea5c5e33962300c01dbce6b99e0e))


### Bug Fixes

* **ArrowToggle:** normal flip behavior [#115](https://github.com/gravity-ui/uikit/issues/115) ([#419](https://github.com/gravity-ui/uikit/issues/419)) ([081292f](https://github.com/gravity-ui/uikit/commit/081292fa0e2d84e29a1199fd9501172abaa3b644))
* use native scrollbar on mobile devices ([#395](https://github.com/gravity-ui/uikit/issues/395)) ([83c5851](https://github.com/gravity-ui/uikit/commit/83c5851b901935834295831cdc13fca20142d816))

## [3.10.2](https://github.com/gravity-ui/uikit/compare/v3.10.1...v3.10.2) (2022-12-13)


### Bug Fixes

* **Tooltip:** preserve child ref ([#421](https://github.com/gravity-ui/uikit/issues/421)) ([a0aa070](https://github.com/gravity-ui/uikit/commit/a0aa070006ee12c3404c095e92d17e17f196abae))

## [3.10.1](https://github.com/gravity-ui/uikit/compare/v3.10.0...v3.10.1) (2022-12-12)


### Bug Fixes

* **ShareTooltip:** fix link for email share option ([#415](https://github.com/gravity-ui/uikit/issues/415)) ([4a5eed0](https://github.com/gravity-ui/uikit/commit/4a5eed018398d20b0703629ac3b39aa649d9038c))

## [3.10.0](https://github.com/gravity-ui/uikit/compare/v3.9.2...v3.10.0) (2022-12-12)


### Features

* new component StoriesGroup ([#387](https://github.com/gravity-ui/uikit/issues/387)) ([e19c711](https://github.com/gravity-ui/uikit/commit/e19c711ad5ae0b97f6e82d5c61f13b03a291ffea))


### Bug Fixes

* **ShareTooltip:** popup default options container width ([#410](https://github.com/gravity-ui/uikit/issues/410)) ([7cf7435](https://github.com/gravity-ui/uikit/commit/7cf7435e84cba1c3015f9c7f3cbda7c46e44254b))
* **Tooltip:** fix transition glitch on nearby tooltips ([#408](https://github.com/gravity-ui/uikit/issues/408)) ([7f7f752](https://github.com/gravity-ui/uikit/commit/7f7f7521fc18ac089458814f8e1c6da1de1be065))
* **Tooltip:** tooltip sometimes gets stuck on an element ([#413](https://github.com/gravity-ui/uikit/issues/413)) ([2fdab3f](https://github.com/gravity-ui/uikit/commit/2fdab3fbb3771c0df713b0f792787dce5a75ad11))
* **withTableSelection:** range select must ignore disabled lines ([#414](https://github.com/gravity-ui/uikit/issues/414)) ([5b50237](https://github.com/gravity-ui/uikit/commit/5b502376eaa968b6451ddff9c2766b15ce992775))

## [3.9.2](https://github.com/gravity-ui/uikit/compare/v3.9.1...v3.9.2) (2022-12-07)


### Bug Fixes

* **DialogFooter:** updated button style ([#405](https://github.com/gravity-ui/uikit/issues/405)) ([956fcf9](https://github.com/gravity-ui/uikit/commit/956fcf90d9b7b4c43f810fc48065c584360ae5ad))

## [3.9.1](https://github.com/gravity-ui/uikit/compare/v3.9.0...v3.9.1) (2022-12-06)


### Bug Fixes

* **DropdownMenu.Item:** allow `children` ([#402](https://github.com/gravity-ui/uikit/issues/402)) ([253e291](https://github.com/gravity-ui/uikit/commit/253e291cbc220362a94255456d5c775639314f39))
* **Menu.Item:** remove `onClick` from disabled items ([#404](https://github.com/gravity-ui/uikit/issues/404)) ([1394457](https://github.com/gravity-ui/uikit/commit/1394457638fd2775448f46921f1a1b0c642c7a66))

## [3.9.0](https://github.com/gravity-ui/uikit/compare/v3.8.0...v3.9.0) (2022-12-06)


### Features

* **ShareTooltip:** add Email as one of default sharing options and r… ([#399](https://github.com/gravity-ui/uikit/issues/399)) ([48bfbcb](https://github.com/gravity-ui/uikit/commit/48bfbcb17567860ce6b1983826549aada2207032))

## [3.8.0](https://github.com/gravity-ui/uikit/compare/v3.7.0...v3.8.0) (2022-12-05)


### Features

* **DropdownMenu:** allow `&lt;DropdownMenu.Item/&gt;` w/out `action` ([#392](https://github.com/gravity-ui/uikit/issues/392)) ([a606920](https://github.com/gravity-ui/uikit/commit/a606920f30b9cb6656da5a90e5f9ddc706382fb0))
* **DropdownMenu:** extract `&lt;DropdownMenu.Item/&gt;` ([#397](https://github.com/gravity-ui/uikit/issues/397)) ([1307f87](https://github.com/gravity-ui/uikit/commit/1307f87b28c4a8d5c3fbe95940b0b43e0fcbd4ec))
* **ShareTooltip:** add LinkedIn as one of default SM sharing option ([#383](https://github.com/gravity-ui/uikit/issues/383)) ([5aacc1a](https://github.com/gravity-ui/uikit/commit/5aacc1a8d76379b496d374328d68ba300de4cb32))


### Bug Fixes

* **DropdownMenu:** close opened menu on disable ([#393](https://github.com/gravity-ui/uikit/issues/393)) ([14ba916](https://github.com/gravity-ui/uikit/commit/14ba91606da9ac7c659f78cd2bf505c44b46653f))
* **DropdownMenu:** trigger callback on each state change ([#394](https://github.com/gravity-ui/uikit/issues/394)) ([a70b248](https://github.com/gravity-ui/uikit/commit/a70b248bd33d543a805de814080716584a2180e6))

## [3.7.0](https://github.com/gravity-ui/uikit/compare/v3.6.0...v3.7.0) (2022-12-01)


### Features

* **Select:** add filter section ([#386](https://github.com/gravity-ui/uikit/issues/386)) ([f2b8660](https://github.com/gravity-ui/uikit/commit/f2b866057ed15eeefe3977064583613595c74b1d))

## [3.6.0](https://github.com/gravity-ui/uikit/compare/v3.5.0...v3.6.0) (2022-11-18)


### Features

* **CopyToClipboard:** add options ([#378](https://github.com/gravity-ui/uikit/issues/378)) ([80c5329](https://github.com/gravity-ui/uikit/commit/80c5329eb59ea7a7cce486a814bcf51ade9ecdb2))
* **Label:** support action button in all themes ([#381](https://github.com/gravity-ui/uikit/issues/381)) ([7bdcce9](https://github.com/gravity-ui/uikit/commit/7bdcce9465526ca8150fa090a4e1a0f33376a329))
* **List:** remove pointer-events from disabled items ([#382](https://github.com/gravity-ui/uikit/issues/382)) ([c6367cf](https://github.com/gravity-ui/uikit/commit/c6367cfd64de46decfaef98d50539c9331a60108))


### Bug Fixes

* **Label:** change hover style for label with copy, fix label with single icon ([#351](https://github.com/gravity-ui/uikit/issues/351)) ([786e706](https://github.com/gravity-ui/uikit/commit/786e706e15e1de8661c182f45d97b0783869789d))

## [3.5.0](https://github.com/gravity-ui/uikit/compare/v3.4.0...v3.5.0) (2022-11-09)


### Features

* **Select:** move selection logic to useSelect ([#370](https://github.com/gravity-ui/uikit/issues/370)) ([dcf97a4](https://github.com/gravity-ui/uikit/commit/dcf97a42b2d16feba05383fdf9d8c1d50a2a85ab))
* **Table:** add possibility to range select with shift key pressed ([#374](https://github.com/gravity-ui/uikit/issues/374)) ([d76407f](https://github.com/gravity-ui/uikit/commit/d76407f57ecefd0fca09da60ccec51b9ad73b39c))


### Bug Fixes

* **Button:** correctly show focused state for raised button ([#377](https://github.com/gravity-ui/uikit/issues/377)) ([dbcfa97](https://github.com/gravity-ui/uikit/commit/dbcfa97cf379b4783b040555a9fddb5f43a64ea0))

## [3.4.0](https://github.com/gravity-ui/uikit/compare/v3.3.0...v3.4.0) (2022-11-01)


### Features

* **Popover:** updated anchorRef prop, added strategy prop to Popover ([#372](https://github.com/gravity-ui/uikit/issues/372)) ([22021c9](https://github.com/gravity-ui/uikit/commit/22021c9cfbcd88f0162e31378ea09c4bc34b1161))

## [3.3.0](https://github.com/gravity-ui/uikit/compare/v3.2.0...v3.3.0) (2022-10-20)


### Features

* share tooltip component copy button customization ([#350](https://github.com/gravity-ui/uikit/issues/350)) ([3d608b2](https://github.com/gravity-ui/uikit/commit/3d608b2813bf7cc4402c2fe6db0ee0c07e9b575a))

## [3.2.0](https://github.com/gravity-ui/uikit/compare/v3.1.3...v3.2.0) (2022-10-19)


### Features

* added React.forwardRef for Card ([#363](https://github.com/gravity-ui/uikit/issues/363)) ([9c22988](https://github.com/gravity-ui/uikit/commit/9c22988df4f212921f9c2cc57f88f692385a4b41))

## [3.1.3](https://github.com/gravity-ui/uikit/compare/v3.1.2...v3.1.3) (2022-10-18)


### Bug Fixes

* **Select:** prevent page scrolling after first click ([#364](https://github.com/gravity-ui/uikit/issues/364)) ([3320a7e](https://github.com/gravity-ui/uikit/commit/3320a7e0bff6559272158f7e52907ba44ed90e01))
* use directly import from lodash ([#359](https://github.com/gravity-ui/uikit/issues/359)) ([490cf20](https://github.com/gravity-ui/uikit/commit/490cf20f5339199882a2fd462d6b362a3092a4e9))

## [3.1.2](https://github.com/gravity-ui/uikit/compare/v3.1.1...v3.1.2) (2022-10-14)


### Bug Fixes

* update hc colors for labels, buttons and brand-text ([#356](https://github.com/gravity-ui/uikit/issues/356)) ([8d6d596](https://github.com/gravity-ui/uikit/commit/8d6d596e8b3de4ee6d5153c2e358968733eaaa68))

## [3.1.1](https://github.com/gravity-ui/uikit/compare/v3.1.0...v3.1.1) (2022-10-13)


### Bug Fixes

* Add missing --yc-color-base-modal for light-hc ([#352](https://github.com/gravity-ui/uikit/issues/352)) ([db14312](https://github.com/gravity-ui/uikit/commit/db14312ec1cca190cf353e166a5efd0439fee64e))
* update hc colors for generic-accent-disabled ([#355](https://github.com/gravity-ui/uikit/issues/355)) ([2760749](https://github.com/gravity-ui/uikit/commit/2760749640e0068db81f7b97f2e71a22f5da9ec6))

## [3.1.0](https://github.com/gravity-ui/uikit/compare/v3.0.2...v3.1.0) (2022-10-03)


### Features

* **Tooltip:** add ability to disable display of the tooltip ([#348](https://github.com/gravity-ui/uikit/issues/348)) ([5d32afe](https://github.com/gravity-ui/uikit/commit/5d32afee7fa9b6f2c7640934e2759509c711d1c4))


### Bug Fixes

* **Tooltip:** correctly set ref ([#347](https://github.com/gravity-ui/uikit/issues/347)) ([a4de6f5](https://github.com/gravity-ui/uikit/commit/a4de6f59c21aa7e0ad62b54c91a0cf44f86f156f))

## [3.0.2](https://github.com/gravity-ui/uikit/compare/v3.0.1...v3.0.2) (2022-09-26)


### Bug Fixes

* loose i18n typings ([#345](https://github.com/gravity-ui/uikit/issues/345)) ([5612aee](https://github.com/gravity-ui/uikit/commit/5612aee42ab81d4f0d83157e47cd8bc2cb050453))
* **RadioButton:** fix option icon styles ([#339](https://github.com/gravity-ui/uikit/issues/339)) ([ea9e31f](https://github.com/gravity-ui/uikit/commit/ea9e31f39f4ed71bebd708e948f80e034d08e821))
* use background-size as percent value for loading button for safari ([#342](https://github.com/gravity-ui/uikit/issues/342)) ([c0ec61b](https://github.com/gravity-ui/uikit/commit/c0ec61bc98fed17e365fedc981d7ea6efe413319))

## [3.0.1](https://github.com/gravity-ui/uikit/compare/v3.0.0...v3.0.1) (2022-09-09)


### Bug Fixes

* build errors ([#334](https://github.com/gravity-ui/uikit/issues/334)) ([9de0727](https://github.com/gravity-ui/uikit/commit/9de0727c228f58f877ca0a0a7bc6f76e9d2027e2))

## [3.0.0](https://github.com/gravity-ui/uikit/compare/v2.15.0...v3.0.0) (2022-09-08)


### ⚠ BREAKING CHANGES

* transfer package from yandex-cloud (#331)
* updated i18n, and remove it from peer deps
* **Popover:** refactored to functional component, use `PopoverInstanceProps` type as ref type for public methods

#### Setting language in uikit

**v2**
```js
import {I18N} from '@yandex-cloud/i18n';

I18N.setDefaultLang('en');
```

**v3**
```js
import {configure} from '@gravity-ui/uikit';

configure({lang: 'en'});
```

### Features

* transfer package from yandex-cloud ([#331](https://github.com/gravity-ui/uikit/issues/331)) ([2df769d](https://github.com/gravity-ui/uikit/commit/2df769df109e882e8d0e8c25810c6c1bfcc16b2c))

## [2.15.0](https://github.com/yandex-cloud/uikit/compare/v2.14.0...v2.15.0) (2022-09-07)


### Features

* **Button:** added content and view to eventBroker meta ([#319](https://github.com/yandex-cloud/uikit/issues/319)) ([19a3463](https://github.com/yandex-cloud/uikit/commit/19a3463571229b513bb841d2aea48913cdb55451))


### Bug Fixes

* relax RealTheme type for compatibility ([#329](https://github.com/yandex-cloud/uikit/issues/329)) ([a716448](https://github.com/yandex-cloud/uikit/commit/a71644803ffe551bb393202fdb26e3a08544d2ed))

## [2.14.0](https://github.com/yandex-cloud/uikit/compare/v2.13.4...v2.14.0) (2022-09-01)


### Features

* added event broker to form components ([#294](https://github.com/yandex-cloud/uikit/issues/294)) ([c71d4ce](https://github.com/yandex-cloud/uikit/commit/c71d4ce20c188924a70e1988ae8b40883fc07b3d))
* high-contrast themes ([#316](https://github.com/yandex-cloud/uikit/issues/316)) ([cfaf211](https://github.com/yandex-cloud/uikit/commit/cfaf211c44aa4763e36008b0ba9c9abbdec982df))

## [2.13.4](https://github.com/yandex-cloud/uikit/compare/v2.13.3...v2.13.4) (2022-08-22)


### Bug Fixes

* **ChangelogModal:** fix sizes and margins ([#310](https://github.com/yandex-cloud/uikit/issues/310)) ([d6e0cae](https://github.com/yandex-cloud/uikit/commit/d6e0cae0d69183c8a421c5ace7e9de130d6377f6))

## [2.13.3](https://github.com/yandex-cloud/uikit/compare/v2.13.2...v2.13.3) (2022-08-18)


### Bug Fixes

* **Select:** calculate tick size from content ([#313](https://github.com/yandex-cloud/uikit/issues/313)) ([f40144e](https://github.com/yandex-cloud/uikit/commit/f40144ea9cfb87e3960ccb37f26ca2a80776e3f6))

## [2.13.2](https://github.com/yandex-cloud/uikit/compare/v2.13.1...v2.13.2) (2022-08-11)


### Bug Fixes

* **TextInput:** increase css specificity to rewrite Button styles ([#301](https://github.com/yandex-cloud/uikit/issues/301)) ([def1da0](https://github.com/yandex-cloud/uikit/commit/def1da0717911b89d63062cb4005f446a18886f8))

## [2.13.1](https://github.com/yandex-cloud/uikit/compare/v2.13.0...v2.13.1) (2022-08-10)


### Bug Fixes

* **StoreBadge:** content image for StoreBadge with url ([#299](https://github.com/yandex-cloud/uikit/issues/299)) ([194fa66](https://github.com/yandex-cloud/uikit/commit/194fa6695db08d6d399da3b900eeef6dbaa3da67))

## [2.13.0](https://github.com/yandex-cloud/uikit/compare/v2.12.0...v2.13.0) (2022-08-08)


### Features

* **Label:** add `closeButtonLabel` prop ([#292](https://github.com/yandex-cloud/uikit/issues/292)) ([5b6499d](https://github.com/yandex-cloud/uikit/commit/5b6499d6aa7d9916b3ae4e07d88586628a70c5b6))
* **Modal:** add contentClassName prop to the Modal component ([#289](https://github.com/yandex-cloud/uikit/issues/289)) ([79caad6](https://github.com/yandex-cloud/uikit/commit/79caad659a08a3c35be9bddebc65251a1ec84ae1))

## [2.12.0](https://github.com/yandex-cloud/uikit/compare/v2.11.0...v2.12.0) (2022-08-02)


### Features

* add `ShareTooltip` and `StoreBadge` components ([#275](https://github.com/yandex-cloud/uikit/issues/275)) ([8c38211](https://github.com/yandex-cloud/uikit/commit/8c38211503ca6c761982641288e9039f6dc07804))

## [2.11.0](https://github.com/yandex-cloud/uikit/compare/v2.10.3...v2.11.0) (2022-08-01)


### Features

* add ChangelogDialog component ([#267](https://github.com/yandex-cloud/uikit/issues/267)) ([4c51c2d](https://github.com/yandex-cloud/uikit/commit/4c51c2da9bbd8773342931b48d56ebc7acd5b63d))
* **Popover:** add prop to disable link styles ([#280](https://github.com/yandex-cloud/uikit/issues/280)) ([9ebb795](https://github.com/yandex-cloud/uikit/commit/9ebb7952088efce21e51e27465e02d922481f64c))


### Bug Fixes

* **Button:** do not reduce clickable area on click ([#247](https://github.com/yandex-cloud/uikit/issues/247)) ([8214da4](https://github.com/yandex-cloud/uikit/commit/8214da419de91f4263ea7400ad19820dc96bfc62))
* **Text:** fixed warning-heavy textColor variant ([#264](https://github.com/yandex-cloud/uikit/issues/264)) ([fb7efdc](https://github.com/yandex-cloud/uikit/commit/fb7efdc8dde66c334b8eb4addfe5c7165df48fde))
* **withTableSettings:** updateSettings can be a not async function ([#256](https://github.com/yandex-cloud/uikit/issues/256)) ([918a87b](https://github.com/yandex-cloud/uikit/commit/918a87be93b0cf8a72d4887c1c6ffa936d5142e6))

## [2.10.3](https://github.com/yandex-cloud/uikit/compare/v2.10.2...v2.10.3) (2022-07-28)


### Bug Fixes

* **Button:** add contrast for selected state in dark theme ([#262](https://github.com/yandex-cloud/uikit/issues/262)) ([cbb86ac](https://github.com/yandex-cloud/uikit/commit/cbb86acdfe06bc54f39832d9243ebfd4b1b177d1))

## [2.10.2](https://github.com/yandex-cloud/uikit/compare/v2.10.1...v2.10.2) (2022-07-28)


### Bug Fixes

* **Breadcrumbs:** revert data pass to `<Breadcrumbs.Item/>` ([#276](https://github.com/yandex-cloud/uikit/issues/276)) ([5b4bc4b](https://github.com/yandex-cloud/uikit/commit/5b4bc4bacad64e266919c36171f537f95ed5158e))

## [2.10.1](https://github.com/yandex-cloud/uikit/compare/v2.10.0...v2.10.1) (2022-07-27)


### Bug Fixes

* **Breadcrumbs:** i18n must be used inside component ([#271](https://github.com/yandex-cloud/uikit/issues/271)) ([ec479a2](https://github.com/yandex-cloud/uikit/commit/ec479a2862493d0aaff7b6783ba0f85436f03582))
* **Breadcrumbs:** render custom divider before more button ([#272](https://github.com/yandex-cloud/uikit/issues/272)) ([353d13e](https://github.com/yandex-cloud/uikit/commit/353d13e4b4e0b0993c7405dbdcf2f8c7f6b04ffc))

## [2.10.0](https://github.com/yandex-cloud/uikit/compare/v2.9.0...v2.10.0) (2022-07-21)


### Features

* **Link:** add color scheme for a visited link ([#243](https://github.com/yandex-cloud/uikit/issues/243)) ([857e434](https://github.com/yandex-cloud/uikit/commit/857e434b4cd619992a900156ebcfd39d5668a187))

## [2.9.0](https://github.com/yandex-cloud/uikit/compare/v2.8.0...v2.9.0) (2022-07-20)


### Features

* **Icon:** deprecate `onClick` ([#240](https://github.com/yandex-cloud/uikit/issues/240)) ([6936469](https://github.com/yandex-cloud/uikit/commit/6936469eab408896c6e4c783f71d29c877659026))
* **Select:** add `type=button` for `<SelectControl/>` ([#227](https://github.com/yandex-cloud/uikit/issues/227)) ([47e0aeb](https://github.com/yandex-cloud/uikit/commit/47e0aeb3892787be5378569f21620a7cf411915a))
* **Toaster:** move logic to React context ([#211](https://github.com/yandex-cloud/uikit/issues/211)) ([346cb95](https://github.com/yandex-cloud/uikit/commit/346cb95a3e6a5ae5cb941af42c5595d31ed3afc3))
* **Toaster:** replace `<Link/>` in actions with `<Button/>` ([#254](https://github.com/yandex-cloud/uikit/issues/254)) ([f603711](https://github.com/yandex-cloud/uikit/commit/f6037112e7fb47ed7c85b7639f15169f1e0fd314))


### Bug Fixes

* correct target detection for shadow-dom ([#213](https://github.com/yandex-cloud/uikit/issues/213)) ([9a285be](https://github.com/yandex-cloud/uikit/commit/9a285be9599a8bacba9892b754e81e2d27768a2f))
* **Popover:** add overflow-wrap ([#226](https://github.com/yandex-cloud/uikit/issues/226)) ([3bb01de](https://github.com/yandex-cloud/uikit/commit/3bb01de0ca18f81096cbfbbdafd152e6781cf6b4))
* **Toast:** padding animation ([#234](https://github.com/yandex-cloud/uikit/issues/234)) ([8f9a750](https://github.com/yandex-cloud/uikit/commit/8f9a750eee5d65dc975132ac2b4dec6097cac756))
* **Toast:** remove on close ([#218](https://github.com/yandex-cloud/uikit/issues/218)) ([fad37d8](https://github.com/yandex-cloud/uikit/commit/fad37d8e0790eb45c8dcc7ff681972475f9fd1e4))
* **Toast:** return `height` transition ([#235](https://github.com/yandex-cloud/uikit/issues/235)) ([8887881](https://github.com/yandex-cloud/uikit/commit/8887881c068c6c169febd10aaa70a2fdc7fb49f8))

## [2.8.0](https://github.com/yandex-cloud/uikit/compare/v2.7.0...v2.8.0) (2022-06-24)


### Features

* popover applies actual visibility on autoclosable true ([#206](https://github.com/yandex-cloud/uikit/issues/206)) ([151273b](https://github.com/yandex-cloud/uikit/commit/151273be77fbf89e008f9542698068f968635a1d))
* **Table:** add ability to set className of all cells in a column ([#205](https://github.com/yandex-cloud/uikit/issues/205)) ([b5e6608](https://github.com/yandex-cloud/uikit/commit/b5e66088e1b384ee16b7700bf03cf331f3b5236a))


### Bug Fixes

* **Tabs:** center tab content for horizontal tabs ([#210](https://github.com/yandex-cloud/uikit/issues/210)) ([af73379](https://github.com/yandex-cloud/uikit/commit/af733792eda359196dec309bbf178f800a8efc1f))
* **textinput:** set paddings for clear cross depending on size ([#208](https://github.com/yandex-cloud/uikit/issues/208)) ([0428ca2](https://github.com/yandex-cloud/uikit/commit/0428ca22d2c601f2b52040268d9d6b07bb52f3e1))
* ThemeProvider theme updating ([#202](https://github.com/yandex-cloud/uikit/issues/202)) ([4b0962d](https://github.com/yandex-cloud/uikit/commit/4b0962decd51afaef0c9d21e8821c14a93b08b46))

## [2.7.0](https://github.com/yandex-cloud/uikit/compare/v2.6.0...v2.7.0) (2022-06-20)


### Features

* allow use layers for Dialog/Modal/Popup with different root ([#120](https://github.com/yandex-cloud/uikit/issues/120)) ([b2782e6](https://github.com/yandex-cloud/uikit/commit/b2782e60a533680b64a0c832cf628c6c40273247))
* **Modal:** color updates ([#195](https://github.com/yandex-cloud/uikit/issues/195)) ([be004a6](https://github.com/yandex-cloud/uikit/commit/be004a6e482b9d0d8d58be72638864dc1fe648ed))
* **Text:** a new component for working with typography ([#141](https://github.com/yandex-cloud/uikit/issues/141)) ([7837ee8](https://github.com/yandex-cloud/uikit/commit/7837ee868bcfe8caa06808f47d22f502701e188e))


### Bug Fixes

* **List:** fix getContainer for sortable container ([#190](https://github.com/yandex-cloud/uikit/issues/190)) ([efb9257](https://github.com/yandex-cloud/uikit/commit/efb92578ad10a62d35a49961c42c2b6ebc4f0d35))
* **Popover:** should be no empty space above links block if no other content provided ([#191](https://github.com/yandex-cloud/uikit/issues/191)) ([8432fc1](https://github.com/yandex-cloud/uikit/commit/8432fc1bca482033ea303a44d3c9eac5bc86e096))
* **Tabs:** fix styles for vertical tabs ([#177](https://github.com/yandex-cloud/uikit/issues/177)) ([27b809f](https://github.com/yandex-cloud/uikit/commit/27b809f4423277617e81946e10f5745a3d7a26e3))
* **Tabs:** return missing spacing when `wrapTo` used ([#198](https://github.com/yandex-cloud/uikit/issues/198)) ([48ef89d](https://github.com/yandex-cloud/uikit/commit/48ef89d984ac7d4b21b6defb87ba8da82827a46a))

## [2.6.0](https://github.com/yandex-cloud/uikit/compare/v2.5.0...v2.6.0) (2022-06-15)


### Features

* **Popover:** use "Delayed" as default behaviour ([#193](https://github.com/yandex-cloud/uikit/issues/193)) ([f9ade6f](https://github.com/yandex-cloud/uikit/commit/f9ade6faa0b176791244331eb96fd080d4ca742d))

## [2.5.0](https://github.com/yandex-cloud/uikit/compare/v2.4.2...v2.5.0) (2022-06-07)


### Features

* **I18N:** add configure function for manage internal variables like language ([#186](https://github.com/yandex-cloud/uikit/issues/186)) ([bc3ee55](https://github.com/yandex-cloud/uikit/commit/bc3ee55ca5a5fe5413d9d7b44b8f212514975d79))


### Bug Fixes

* default cursor on disabled popover ([#182](https://github.com/yandex-cloud/uikit/issues/182)) ([2f3f19c](https://github.com/yandex-cloud/uikit/commit/2f3f19ce4b4665128e1f3888bac8c7545a7fba09))
* menu item qa prop ([#181](https://github.com/yandex-cloud/uikit/issues/181)) ([22a88ae](https://github.com/yandex-cloud/uikit/commit/22a88ae7db22b97eefc291042280bc0c148ed1e5))

### [2.4.2](https://github.com/yandex-cloud/uikit/compare/v2.4.1...v2.4.2) (2022-05-30)


### Bug Fixes

* **Toaster:** fix toast paddings ([#172](https://github.com/yandex-cloud/uikit/issues/172)) ([a762a01](https://github.com/yandex-cloud/uikit/commit/a762a0199aa63f1ad17dd14938f172059fdd89b7))

### [2.4.1](https://github.com/yandex-cloud/uikit/compare/v2.4.0...v2.4.1) (2022-05-27)


### Bug Fixes

* **List:** rerender list after changing activeItemIndex prop ([#173](https://github.com/yandex-cloud/uikit/issues/173)) ([23f9945](https://github.com/yandex-cloud/uikit/commit/23f9945f97a8329a0f1695e89c5edc9e677588c1))

## [2.4.0](https://github.com/yandex-cloud/uikit/compare/v2.3.1...v2.4.0) (2022-05-25)


### Features

* update blue color ([#170](https://github.com/yandex-cloud/uikit/issues/170)) ([2991b26](https://github.com/yandex-cloud/uikit/commit/2991b26637c2c19f672bdd46412add19cd570e8a))

### [2.3.1](https://github.com/yandex-cloud/uikit/compare/v2.3.0...v2.3.1) (2022-05-19)


### Bug Fixes

* replace font-weight usages with mixin ([#167](https://github.com/yandex-cloud/uikit/issues/167)) ([b38318f](https://github.com/yandex-cloud/uikit/commit/b38318ff10c86387253fa917e8cb83aeab45802c))

## [2.3.0](https://github.com/yandex-cloud/uikit/compare/v2.2.2...v2.3.0) (2022-05-18)


### Features

* new typography variables and mixins ([#165](https://github.com/yandex-cloud/uikit/issues/165)) ([c86012f](https://github.com/yandex-cloud/uikit/commit/c86012f097d2665ab3bb0386df4c6450d7e75514))

### [2.2.2](https://github.com/yandex-cloud/uikit/compare/v2.2.1...v2.2.2) (2022-05-17)


### Bug Fixes

* **Toaster:** increase css specificity of close button mixin ([#163](https://github.com/yandex-cloud/uikit/issues/163)) ([17b4637](https://github.com/yandex-cloud/uikit/commit/17b4637c5791f7b88ca53466a193bc84e3e14ef9))

### [2.2.1](https://github.com/yandex-cloud/uikit/compare/v2.2.0...v2.2.1) (2022-05-16)


### Bug Fixes

* **RadioButton:** fixed types ([#160](https://github.com/yandex-cloud/uikit/issues/160)) ([c5bd67a](https://github.com/yandex-cloud/uikit/commit/c5bd67a31fa1d1f5e46664b097548acb39c5b55f))

## [2.2.0](https://github.com/yandex-cloud/uikit/compare/v2.1.1...v2.2.0) (2022-05-16)


### Features

* **tests:** replace enzyme with react testing library ([#157](https://github.com/yandex-cloud/uikit/issues/157)) ([403b303](https://github.com/yandex-cloud/uikit/commit/403b3037320f494c5447a0149c533092d5dfd819))


### Bug Fixes

* **Popover:** fix max-width css variable ([#156](https://github.com/yandex-cloud/uikit/issues/156)) ([7859c95](https://github.com/yandex-cloud/uikit/commit/7859c95ffe5076e204d04d3a9ecdb3eb21025401))
* **Toaster:** fix toasts bg color ([#158](https://github.com/yandex-cloud/uikit/issues/158)) ([76023b7](https://github.com/yandex-cloud/uikit/commit/76023b76bfe617bf35583184e808511ca8871c37))

### [2.1.1](https://www.github.com/yandex-cloud/uikit/compare/v2.1.0...v2.1.1) (2022-04-29)


### Bug Fixes

* **Select:** fix readme ([#152](https://www.github.com/yandex-cloud/uikit/issues/152)) ([78b7194](https://www.github.com/yandex-cloud/uikit/commit/78b7194abcbf5e3100d5041e8b96744c384d6257))
* **Tabs:** add white-space property ([#155](https://www.github.com/yandex-cloud/uikit/issues/155)) ([5a07d9b](https://www.github.com/yandex-cloud/uikit/commit/5a07d9b288ae1d74b38edb2ddd131782fb8dce56))

## [2.1.0](https://www.github.com/yandex-cloud/uikit/compare/v2.0.0...v2.1.0) (2022-04-27)


### Features

* add Stories component ([#127](https://www.github.com/yandex-cloud/uikit/issues/127)) ([74e45ba](https://www.github.com/yandex-cloud/uikit/commit/74e45ba2c55705973bd348e6eaeb1291eb3cb570))
* **List:** add eventBroker for List ([#132](https://www.github.com/yandex-cloud/uikit/issues/132)) ([40e64b1](https://www.github.com/yandex-cloud/uikit/commit/40e64b17b6ece539631779416f4c1f46941ecd1d))
* **Select:** improvements ([#136](https://www.github.com/yandex-cloud/uikit/issues/136)) ([46affd3](https://www.github.com/yandex-cloud/uikit/commit/46affd339528d2f5f48047324736fc6c25282f0c))
* **Stories:** add props "disableOutsideClick" ([#151](https://www.github.com/yandex-cloud/uikit/issues/151)) ([358d0d9](https://www.github.com/yandex-cloud/uikit/commit/358d0d9d3a6bb1a3fd4d4d7d247a565ca7558253))
* **Toaster:** refresh design ([#144](https://www.github.com/yandex-cloud/uikit/issues/144)) ([b5996ef](https://www.github.com/yandex-cloud/uikit/commit/b5996ef84545deed055cfbc5b1bf6e5f5cf080c8))
* **Tooltip:** add delay before opening/closing ([#140](https://www.github.com/yandex-cloud/uikit/issues/140)) ([b3da68c](https://www.github.com/yandex-cloud/uikit/commit/b3da68cf09a95845c6bf323fc8f8f5120aa2fb5d))
* translated DropdownMenu stories ([#138](https://www.github.com/yandex-cloud/uikit/issues/138)) ([5b1d083](https://www.github.com/yandex-cloud/uikit/commit/5b1d083a09e3e272346eeac8645bdfa7e0445383))


### Bug Fixes

* checked components types ([#129](https://www.github.com/yandex-cloud/uikit/issues/129)) ([ba65eb4](https://www.github.com/yandex-cloud/uikit/commit/ba65eb4cac14d38f7babb5057bd3ab12c5bcbe33))
* **Dialog:** fix README ([#139](https://www.github.com/yandex-cloud/uikit/issues/139)) ([99c584a](https://www.github.com/yandex-cloud/uikit/commit/99c584a8532cd0760bac201ec846329e65055b42))
* **Stories:** add video looping ([#149](https://www.github.com/yandex-cloud/uikit/issues/149)) ([be7cb8c](https://www.github.com/yandex-cloud/uikit/commit/be7cb8c752ad668246cc6354898860749f7bd62e))
* **Stories:** fix right pane style ([#147](https://www.github.com/yandex-cloud/uikit/issues/147)) ([ad23e37](https://www.github.com/yandex-cloud/uikit/commit/ad23e377c04845238ad36ef21bcac0b8321eec80))
* **Stories:** fixed styles according to the design ([#143](https://www.github.com/yandex-cloud/uikit/issues/143)) ([0cb5691](https://www.github.com/yandex-cloud/uikit/commit/0cb56917c205434bfa8af85a745b5515f9ebab47))

## [2.0.0](https://www.github.com/yandex-cloud/uikit/compare/v1.10.0...v2.0.0) (2022-04-08)


### Typography

#### BREAKING

- CSS var renamed: `--yc-font-family` → `--yc-text-body-font-family`
- CSS var renamed: `--yc-text-body-font-size` → `--yc-text-body-1-font-size`
- CSS var renamed: `--yc-text-body-line-height` → `--yc-text-body-1-line-height`
- CSS var renamed: `--yc-text-body2-font-size` → `--yc-text-body-2-font-size`
- CSS var renamed: `--yc-text-body2-line-height` → `--yc-text-body-2-line-height`
- CSS var renamed: `--yc-text-body3-font-size` → `--yc-text-body-3-font-size`
- CSS var renamed: `--yc-text-body3-line-height` → `--yc-text-body-3-line-height`
- CSS var removed: `--yc-text-lead-font-size` (possible replacement - `--yc-text-subheader-3-font-size`)
- CSS var removed: `--yc-text-lead-line-height` (possible replacement - `--yc-text-subheader-3-line-height`)
- CSS var renamed: `--yc-text-header-font-size` → `--yc-text-header-1-font-size`
- CSS var renamed: `--yc-text-header-line-height` → `--yc-text-header-1-line-height`
- CSS var renamed: `--yc-text-title-font-size` → `--yc-text-header-2-font-size`
- CSS var renamed: `--yc-text-title-line-height` → `--yc-text-header-2-line-height`
- CSS var renamed: `--yc-text-display1-font-size` → `--yc-text-display-1-font-size`
- CSS var renamed: `--yc-text-display1-line-height` → `--yc-text-display-1-line-height`
- CSS var renamed: `--yc-text-display2-font-size` → `--yc-text-display-2-font-size`
- CSS var renamed: `--yc-text-display2-line-height` → `--yc-text-display-2-line-height`
- CSS var renamed: `--yc-text-display3-font-size` → `--yc-text-display-3-font-size`
- CSS var renamed: `--yc-text-display3-line-height` → `--yc-text-display-3-line-height`
- CSS var renamed: `--yc-text-code-1-inline-font-size` → `--yc-text-code-inline-1-font-size`
- CSS var renamed: `--yc-text-code-1-inline-line-height` → `--yc-text-code-inline-1-line-height`
- CSS var renamed: `--yc-text-code-2-inline-font-size` → `--yc-text-code-inline-2-font-size`
- CSS var renamed: `--yc-text-code-2-inline-line-height` → `--yc-text-code-inline-2-line-height`
- CSS var renamed: `--yc-text-code-3-inline-font-size` → `--yc-text-code-inline-3-font-size`
- CSS var renamed: `--yc-text-code-3-inline-line-height` → `--yc-text-code-inline-3-line-height`
- CSS var removed: `--yc-text-code-font-size` (possible replacement - `--yc-text-code-1-font-size`)
- CSS var removed: `--yc-text-code-line-height` (possible replacement - `--yc-text-code-1-line-height`)
- Body line-height: `16px` → `18px`

#### New

- CSS var added: `--yc-text-body-short-font-size`
- CSS var added: `--yc-text-body-short-line-height`
- CSS var added: `--yc-text-header-font-weight`
- CSS var added: `--yc-text-subheader-font-weight`
- CSS var added: `--yc-text-display-font-weight`
- CSS var added: `--yc-text-display-4-font-size`
- CSS var added: `--yc-text-display-4-line-height`
- CSS var added: `--yc-text-subheader-1-font-size`
- CSS var added: `--yc-text-subheader-1-line-height`
- CSS var added: `--yc-text-subheader-2-font-size`
- CSS var added: `--yc-text-subheader-2-line-height`
- CSS var added: `--yc-text-subheader-3-font-size`
- CSS var added: `--yc-text-subheader-3-line-height`
- CSS var added: `--yc-text-caption-1-font-size`
- CSS var added: `--yc-text-caption-1-line-height`
- CSS var added: `--yc-text-caption-2-font-size`
- CSS var added: `--yc-text-caption-2-line-height`
- Mixins added: `text-body-1`, `text-body-2`, `text-body-3`, `text-body-short`, `text-caption-1`, `text-caption-2`, `text-header-1`, `text-header-2`, `text-subheader-1`, `text-subheader-2`, `text-subheader-3`, `text-display-1`, `text-display-2`, `text-display-3`, `text-display-4`, `text-code-1`, `text-code-2`, `text-code-3`, `text-code-inline-1`, `text-code-inline-2`, `text-code-inline-3`

### Styles

#### BREAKING

- CSS var removed: `--yc-color-loader-active`
- CSS var removed: `--yc-color-loader-inactive`
- CSS var removed: `--yc-color-base-selection-solid`, use `--yc-color-base-selection`
- CSS var removed: `--yc-color-base-selection-hover-solid`, use `--yc-color-base-selection-hover`
- CSS var renamed: `--yc-tooltip-max-width` → `--yc-popover-max-width`
- CSS var removed: `--yc-tabs-space-between`, use different sizes of Tabs
- CSS var removed: `--yc-tab-item-horizontal-border-width`, use different sizes of Tabs
- CSS var removed: `--yc-tab-item-horizontal-height`, use different sizes of Tabs

#### New

Some CSS variables are now available for overwrite. Every `-yc-my-*` variable can be set to redefine base theme. Here full list of such variables:

- `--yc-my-scrollbar-width`
- `--yc-my-border-radius-s`
- `--yc-my-border-radius-m`
- `--yc-my-border-radius-l`
- `--yc-my-border-radius-xl`
- `--yc-my-color-brand-normal`
- `--yc-my-color-brand-normal-hover`
- `--yc-my-color-brand-light`
- `--yc-my-color-brand-selection`
- `--yc-my-color-brand-selection-hover`
- `--yc-my-color-brand-link`
- `--yc-my-color-brand-link-hover`
- `--yc-my-color-brand-text-contrast`

### Components

#### BREAKING

- DropdownMenu: default switcher size changed from `s` to `m`
- Button: `clear` view was removed, consider using `flat-secondary` instead
- Tooltip: component was renamed to `Popover`
- HelpTooltip: component was renamed to `HelpPopover`

#### New

- New `Tooltip` component
- Tabs: icon, counter and label can be set on TabsItem

### Other

- Removed `react-router-dom` dependency

## [1.10.0](https://www.github.com/yandex-cloud/uikit/compare/v1.9.0...v1.10.0) (2022-03-25)


### Features

* **Skeleton:** inline styles ([#116](https://www.github.com/yandex-cloud/uikit/issues/116)) ([bfbde83](https://www.github.com/yandex-cloud/uikit/commit/bfbde83d327a1ed9e1420a2ade9e4095e242c593))

## [1.9.0](https://www.github.com/yandex-cloud/uikit/compare/v1.8.1...v1.9.0) (2022-03-22)


### Features

* add Modal border-radius css var ([#104](https://www.github.com/yandex-cloud/uikit/issues/104)) ([34c5794](https://www.github.com/yandex-cloud/uikit/commit/34c5794e52279267f3b069c1aef7ca98e4e0ded8))


### Bug Fixes

* change Readme title for Breadcrumbs ([#101](https://www.github.com/yandex-cloud/uikit/issues/101)) ([93a2130](https://www.github.com/yandex-cloud/uikit/commit/93a21302eee3b7500ec71d44160c90027cc39b83))

### [1.8.1](https://www.github.com/yandex-cloud/uikit/compare/v1.8.0...v1.8.1) (2022-03-18)


### Bug Fixes

* freeze deps ([eca3184](https://www.github.com/yandex-cloud/uikit/commit/eca3184b29b2298c42a1a7b47358b517a5a0ab8f))

## [1.8.0](https://www.github.com/yandex-cloud/uikit/compare/v1.7.0...v1.8.0) (2022-03-10)


### Features

* add eventBroker for Menu ([#90](https://www.github.com/yandex-cloud/uikit/issues/90)) ([8fbedce](https://www.github.com/yandex-cloud/uikit/commit/8fbedce66a56fb0b751b2cb7e1d99c470856b31d))
* **ClipboardButton:** improve a11y ([#86](https://www.github.com/yandex-cloud/uikit/issues/86)) ([907cadc](https://www.github.com/yandex-cloud/uikit/commit/907cadcd2a6750ccfc38f8a2642f954b0b759851))
* **Tabs:** improve a11y ([#94](https://www.github.com/yandex-cloud/uikit/issues/94)) ([da9f256](https://www.github.com/yandex-cloud/uikit/commit/da9f256ac9fa521fe616bfa2b1d013068db74a2a))


### Bug Fixes

* restore `package-lock.json` ([#89](https://www.github.com/yandex-cloud/uikit/issues/89)) ([7add961](https://www.github.com/yandex-cloud/uikit/commit/7add961c67af1d51a8f4460bd7ff2bd37f809f34))
* **TextInput:** pass className to control ([#99](https://www.github.com/yandex-cloud/uikit/issues/99)) ([55fd5af](https://www.github.com/yandex-cloud/uikit/commit/55fd5af341d1d5cecb05efe89d619d48b73569b3))

## [1.7.0](https://www.github.com/yandex-cloud/uikit/compare/v1.6.0...v1.7.0) (2022-02-04)


### Features

* add Select component ([#72](https://www.github.com/yandex-cloud/uikit/issues/72)) ([3b9246a](https://www.github.com/yandex-cloud/uikit/commit/3b9246a3178319f2fb2887fafbe7afdd3b23e9c1))

## [1.6.0](https://www.github.com/yandex-cloud/uikit/compare/v1.5.0...v1.6.0) (2022-01-27)


### Features

* border-radius tokens ([#65](https://www.github.com/yandex-cloud/uikit/issues/65)) ([d73c8ee](https://www.github.com/yandex-cloud/uikit/commit/d73c8eee31226cd6efcfe483e4fb66ec4b8824e8))
* migrate Progress component ([#42](https://www.github.com/yandex-cloud/uikit/issues/42)) ([d0afc5e](https://www.github.com/yandex-cloud/uikit/commit/d0afc5ec229987d3f854be2f8570216644f1effc))
* migrate Tooltip and HelpTooltip components ([#60](https://www.github.com/yandex-cloud/uikit/issues/60)) ([c3128c8](https://www.github.com/yandex-cloud/uikit/commit/c3128c83473eb1490e2b4713602f7c93ebdd06df))


### Bug Fixes

* **List:** clear timeout for delayed setState ([#67](https://www.github.com/yandex-cloud/uikit/issues/67))  ([217e72f](https://www.github.com/yandex-cloud/uikit/commit/217e72f6c5813eba7be97cb5984a460d56c13c0b))

## [1.5.0](https://www.github.com/yandex-cloud/uikit/compare/v1.4.2...v1.5.0) (2022-01-25)


### Features

* migrate ArrowToggle component ([#61](https://www.github.com/yandex-cloud/uikit/issues/61)) ([558bb2c](https://www.github.com/yandex-cloud/uikit/commit/558bb2c171a910f31163ea257c94a079a42c6c9c))
* migrate Dialog component ([#43](https://www.github.com/yandex-cloud/uikit/issues/43)) ([894cab3](https://www.github.com/yandex-cloud/uikit/commit/894cab3add422b1e6ab562cf87ec331b1dd88438))
* migrate Toaster component ([#46](https://www.github.com/yandex-cloud/uikit/issues/46)) ([5ec2569](https://www.github.com/yandex-cloud/uikit/commit/5ec2569e6be4cff89deb14c01011f805e44454a0))


### Bug Fixes

* **List:** remove type cast for getItemHeight ([#59](https://www.github.com/yandex-cloud/uikit/issues/59)) ([a352b21](https://www.github.com/yandex-cloud/uikit/commit/a352b21c5f7245ec2fea6ad6c1cd08d167a123fc))
* remove Yandex proprietary fonts ([#52](https://www.github.com/yandex-cloud/uikit/issues/52)) ([5017d43](https://www.github.com/yandex-cloud/uikit/commit/5017d4332ef464f31640ac8bf576c301c727b38d))
* **Table:** actions button click triggers row action ([#62](https://www.github.com/yandex-cloud/uikit/issues/62)) ([00ba47d](https://www.github.com/yandex-cloud/uikit/commit/00ba47d4a232bb3d0318e07aff2da6a6b29b01b3))

### [1.4.2](https://www.github.com/yandex-cloud/uikit/compare/v1.4.1...v1.4.2) (2022-01-21)


### Bug Fixes

* allow not to set a fixed height for non-virtualized lists ([#54](https://www.github.com/yandex-cloud/uikit/issues/54)) ([df17e41](https://www.github.com/yandex-cloud/uikit/commit/df17e41348d0f065e14b4504187f80b064970a40))

### [1.4.1](https://www.github.com/yandex-cloud/uikit/compare/v1.4.0...v1.4.1) (2022-01-20)


### Bug Fixes

* should export ListItem ([#49](https://www.github.com/yandex-cloud/uikit/issues/49)) ([10a9550](https://www.github.com/yandex-cloud/uikit/commit/10a955019d72e3fe0e62d3bdea6a45c3a5d0b085))

## [1.4.0](https://www.github.com/yandex-cloud/uikit/compare/v1.3.0...v1.4.0) (2022-01-18)


### Features

* add Loader component ([#37](https://www.github.com/yandex-cloud/uikit/issues/37)) ([7d02c80](https://www.github.com/yandex-cloud/uikit/commit/7d02c8081cea52d25235a3d26c101f35d3a25f1c))
* migrate Card component ([#32](https://www.github.com/yandex-cloud/uikit/issues/32)) ([bd52a23](https://www.github.com/yandex-cloud/uikit/commit/bd52a232dbcf913d5101a45ce5bed01873a46a69))


### Bug Fixes

* **ClipboardButton:** correctly handle click event ([b170ac0](https://www.github.com/yandex-cloud/uikit/commit/b170ac02ed839ca658b9ef90f4533f04008e6176)), closes [#45](https://www.github.com/yandex-cloud/uikit/issues/45)
* **ClipboardButton:** should work properly ([#47](https://www.github.com/yandex-cloud/uikit/issues/47)) ([5c00db3](https://www.github.com/yandex-cloud/uikit/commit/5c00db37f14af0a521e90f1265f3227d3737bb13))
* correctly show textarea resize control ([#33](https://www.github.com/yandex-cloud/uikit/issues/33)) ([bed5a23](https://www.github.com/yandex-cloud/uikit/commit/bed5a2364d71b2a3f635b98b14a39361e379fd09))


### Performance Improvements

* small Table performance fixes ([#40](https://www.github.com/yandex-cloud/uikit/issues/40)) ([36bb4b4](https://www.github.com/yandex-cloud/uikit/commit/36bb4b4421d91954df82b298c32d89f539ea09cb))

## [1.3.0](https://www.github.com/yandex-cloud/uikit/compare/v1.2.1...v1.3.0) (2021-12-24)


### Features

* migrate Table changes ([9fc7627](https://www.github.com/yandex-cloud/uikit/commit/9fc7627b9a41e0e42e541c04e603a9b0016b8592))

### [1.2.1](https://www.github.com/yandex-cloud/uikit/compare/v1.2.0...v1.2.1) (2021-12-23)


### Bug Fixes

* reexport common types ([e1af8ed](https://www.github.com/yandex-cloud/uikit/commit/e1af8ed165aea90df8bb7b673edcfe6045b7707f))
* reexport event-broker hooks ([b76fe70](https://www.github.com/yandex-cloud/uikit/commit/b76fe70a8b2227b4a00c2a35f2a0cd36b5e9f5a8))

## [1.2.0](https://www.github.com/yandex-cloud/uikit/compare/v1.1.4...v1.2.0) (2021-12-23)


### Features

* add interactive prop to Label ([#25](https://www.github.com/yandex-cloud/uikit/issues/25)) ([926d0c5](https://www.github.com/yandex-cloud/uikit/commit/926d0c5ca31dc8a3a33261d03fd0449fd7e2d2fe))


### Bug Fixes

* export useLayer hook ([#23](https://www.github.com/yandex-cloud/uikit/issues/23)) ([10e3380](https://www.github.com/yandex-cloud/uikit/commit/10e3380db7a68c77337b63a4c7bd033d8283eefe))
* remove unnecessary pointer-events of Label ([#27](https://www.github.com/yandex-cloud/uikit/issues/27)) ([3e18385](https://www.github.com/yandex-cloud/uikit/commit/3e183854f1a440e146bc903ad37d7352f3245fa8))
* root scss variable ([#22](https://www.github.com/yandex-cloud/uikit/issues/22)) ([dfb9131](https://www.github.com/yandex-cloud/uikit/commit/dfb91311dd387354421dba195313ba4e93a7556b))

### [1.1.4](https://www.github.com/yandex-cloud/uikit/compare/v1.1.3...v1.1.4) (2021-12-22)


### Bug Fixes

* compile js files via tsc aswell ([efa9914](https://www.github.com/yandex-cloud/uikit/commit/efa9914a544514d8c2ef85ab7dbfb0996802ce94))

### [1.1.3](https://www.github.com/yandex-cloud/uikit/compare/v1.1.2...v1.1.3) (2021-12-16)


### Bug Fixes

* correctly copy js files to build ([54a63ba](https://www.github.com/yandex-cloud/uikit/commit/54a63bae8a9686fbe9229cdde06cdf79f7cd624b))
* reexport ThemeValueContext ([b972b95](https://www.github.com/yandex-cloud/uikit/commit/b972b95b1b1dd0a4c392999588eab3c1ecc19da2))

### [1.1.2](https://www.github.com/yandex-cloud/uikit/compare/v1.1.1...v1.1.2) (2021-12-16)


### Bug Fixes

* reexport List and Table from index ([6e5379f](https://www.github.com/yandex-cloud/uikit/commit/6e5379fe84a280087730719040c32c003b511f86))

### [1.1.1](https://www.github.com/yandex-cloud/uikit/compare/v1.1.0...v1.1.1) (2021-12-16)


### Bug Fixes

* reexport RadioGroup from index ([f45339a](https://www.github.com/yandex-cloud/uikit/commit/f45339ad06340a7f2b6105962fb572e72dd77562))

## [1.1.0](https://www.github.com/yandex-cloud/uikit/compare/v1.0.1...v1.1.0) (2021-12-16)


### Features

* migrate current code ([#6](https://www.github.com/yandex-cloud/uikit/issues/6)) ([7e729f2](https://www.github.com/yandex-cloud/uikit/commit/7e729f2948edba225a3fefd4976b91640b0d6c00))
* migrate RadioGroup component ([#3](https://www.github.com/yandex-cloud/uikit/issues/3)) ([c3508f3](https://www.github.com/yandex-cloud/uikit/commit/c3508f34eb51ca8aff3136a93f49b86dc6e35e99))
