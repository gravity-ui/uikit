# Changelog

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
