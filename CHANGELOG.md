# Changelog

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
