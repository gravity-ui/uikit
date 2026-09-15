/* eslint-disable */
/*
 * High-contrast theme seed (repo-owned; uikit-themer has no HC concept).
 * Typed against uikit-themer GravityTheme. Consumed by scripts/generate-theme-scss.mjs
 * (run `npm run generate:theme` after editing).
 */
import type {GravityTheme} from '@gravity-ui/uikit-themer';

export type HcThemeSeed = Pick<GravityTheme, 'baseColors' | 'privateColors' | 'utilityColors'>;

export const hcTheme: HcThemeSeed = {
    "baseColors": {
        "black": {
            "dark": {
                "value": "rgb(0, 0, 0)"
            },
            "light": {
                "value": "rgb(0, 0, 0)"
            }
        },
        "blue": {
            "dark": {
                "value": "rgb(54, 151, 241)"
            },
            "light": {
                "value": "rgb(54, 151, 241)"
            }
        },
        "cool-grey": {
            "dark": {
                "value": "rgb(96, 128, 156)"
            },
            "light": {
                "value": "rgb(107, 132, 153)"
            }
        },
        "green": {
            "dark": {
                "value": "rgb(77, 176, 155)"
            },
            "light": {
                "value": "rgb(50, 186, 118)"
            }
        },
        "orange": {
            "dark": {
                "value": "rgb(200, 99, 12)"
            },
            "light": {
                "value": "rgb(255, 119, 0)"
            }
        },
        "purple": {
            "dark": {
                "value": "rgb(143, 82, 204)"
            },
            "light": {
                "value": "rgb(143, 82, 204)"
            }
        },
        "red": {
            "dark": {
                "value": "rgb(229, 50, 93)"
            },
            "light": {
                "value": "rgb(255, 0, 61)"
            }
        },
        "white": {
            "dark": {
                "value": "rgb(255, 255, 255)"
            },
            "light": {
                "value": "rgb(255, 255, 255)"
            }
        },
        "yellow": {
            "dark": {
                "value": "rgb(255, 190, 92)"
            },
            "light": {
                "value": "rgb(255, 190, 92)"
            }
        }
    },
    "privateColors": {
        "black": {
            "dark": {
                "20": {
                    "value": "rgba(0, 0, 0, 0.02)"
                },
                "50": {
                    "value": "rgba(0, 0, 0, 0.05)"
                },
                "70": {
                    "value": "rgb(0 0 0 / 0.07)"
                },
                "100": {
                    "value": "rgba(0, 0, 0, 0.1)"
                },
                "150": {
                    "value": "rgba(0, 0, 0, 0.15)"
                },
                "200": {
                    "value": "rgba(0, 0, 0, 0.2)"
                },
                "250": {
                    "value": "rgba(0, 0, 0, 0.25)"
                },
                "300": {
                    "value": "rgba(0, 0, 0, 0.3)"
                },
                "350": {
                    "value": "rgba(0, 0, 0, 0.35)"
                },
                "400": {
                    "value": "rgba(0, 0, 0, 0.4)"
                },
                "450": {
                    "value": "rgba(0, 0, 0, 0.45)"
                },
                "500": {
                    "value": "rgba(0, 0, 0, 0.5)"
                },
                "550": {
                    "value": "rgba(0, 0, 0, 0.55)"
                },
                "600": {
                    "value": "rgba(0, 0, 0, 0.6)"
                },
                "650": {
                    "value": "rgba(0, 0, 0, 0.65)"
                },
                "700": {
                    "value": "rgba(0, 0, 0, 0.7)"
                },
                "750": {
                    "value": "rgba(0, 0, 0, 0.75)"
                },
                "800": {
                    "value": "rgba(0, 0, 0, 0.8)"
                },
                "850": {
                    "value": "rgba(0, 0, 0, 0.85)"
                },
                "900": {
                    "value": "rgba(0, 0, 0, 0.9)"
                },
                "950": {
                    "value": "rgba(0, 0, 0, 0.95)"
                },
                "1000-solid": {
                    "value": "rgb(0, 0, 0)"
                }
            },
            "light": {
                "20": {
                    "value": "rgb(0 0 0 / 0.02)"
                },
                "50": {
                    "value": "rgba(0, 0, 0, 0.05)"
                },
                "70": {
                    "value": "rgb(0 0 0 / 0.07)"
                },
                "100": {
                    "value": "rgba(0, 0, 0, 0.1)"
                },
                "150": {
                    "value": "rgba(0, 0, 0, 0.15)"
                },
                "200": {
                    "value": "rgba(0, 0, 0, 0.2)"
                },
                "250": {
                    "value": "rgba(0, 0, 0, 0.25)"
                },
                "300": {
                    "value": "rgba(0, 0, 0, 0.3)"
                },
                "350": {
                    "value": "rgba(0, 0, 0, 0.35)"
                },
                "400": {
                    "value": "rgba(0, 0, 0, 0.4)"
                },
                "450": {
                    "value": "rgba(0, 0, 0, 0.45)"
                },
                "500": {
                    "value": "rgba(0, 0, 0, 0.5)"
                },
                "550": {
                    "value": "rgba(0, 0, 0, 0.55)"
                },
                "600": {
                    "value": "rgba(0, 0, 0, 0.6)"
                },
                "650": {
                    "value": "rgba(0, 0, 0, 0.65)"
                },
                "700": {
                    "value": "rgba(0, 0, 0, 0.7)"
                },
                "750": {
                    "value": "rgba(0, 0, 0, 0.75)"
                },
                "800": {
                    "value": "rgba(0, 0, 0, 0.8)"
                },
                "850": {
                    "value": "rgba(0, 0, 0, 0.85)"
                },
                "900": {
                    "value": "rgba(0, 0, 0, 0.9)"
                },
                "950": {
                    "value": "rgba(0, 0, 0, 0.95)"
                },
                "1000-solid": {
                    "value": "rgb(0, 0, 0)"
                },
                "950-solid": {
                    "value": "rgb(13, 13, 13)"
                },
                "900-solid": {
                    "value": "rgb(26, 26, 26)"
                },
                "850-solid": {
                    "value": "rgb(38, 38, 38)"
                },
                "800-solid": {
                    "value": "rgb(51, 51, 51)"
                },
                "750-solid": {
                    "value": "rgb(64, 64, 64)"
                },
                "700-solid": {
                    "value": "rgb(76, 76, 76)"
                },
                "650-solid": {
                    "value": "rgb(89, 89, 89)"
                },
                "600-solid": {
                    "value": "rgb(102, 102, 102)"
                },
                "550-solid": {
                    "value": "rgb(115, 115, 115)"
                },
                "500-solid": {
                    "value": "rgb(128, 128, 128)"
                },
                "450-solid": {
                    "value": "rgb(140, 140, 140)"
                },
                "400-solid": {
                    "value": "rgb(153, 153, 153)"
                },
                "350-solid": {
                    "value": "rgb(166, 166, 166)"
                },
                "300-solid": {
                    "value": "rgb(179, 179, 179)"
                },
                "250-solid": {
                    "value": "rgb(191, 191, 191)"
                },
                "200-solid": {
                    "value": "rgb(204, 204, 204)"
                },
                "150-solid": {
                    "value": "rgb(217, 217, 217)"
                },
                "100-solid": {
                    "value": "rgb(229, 229, 229)"
                },
                "50-solid": {
                    "value": "rgb(242, 242, 242)"
                },
                "20-solid": {
                    "value": "rgb(250 250 250)"
                }
            }
        },
        "blue": {
            "dark": {
                "50": {
                    "value": "rgba(54, 151, 241, 0.1)"
                },
                "100": {
                    "value": "rgba(54, 151, 241, 0.15)"
                },
                "150": {
                    "value": "rgba(54, 151, 241, 0.2)"
                },
                "200": {
                    "value": "rgba(54, 151, 241, 0.3)"
                },
                "250": {
                    "value": "rgba(54, 151, 241, 0.4)"
                },
                "300": {
                    "value": "rgba(54, 151, 241, 0.5)"
                },
                "350": {
                    "value": "rgba(54, 151, 241, 0.6)"
                },
                "400": {
                    "value": "rgba(54, 151, 241, 0.7)"
                },
                "450": {
                    "value": "rgba(54, 151, 241, 0.8)"
                },
                "500": {
                    "value": "rgba(54, 151, 241, 0.9)"
                },
                "550": {
                    "value": "rgb(54 151 241)"
                },
                "550-solid": {
                    "value": "rgb(54, 151, 241)"
                },
                "1000-solid": {
                    "value": "rgb(225, 239, 253)"
                },
                "950-solid": {
                    "value": "rgb(215, 234, 252)"
                },
                "900-solid": {
                    "value": "rgb(195, 224, 251)"
                },
                "850-solid": {
                    "value": "rgb(175, 213, 249)"
                },
                "800-solid": {
                    "value": "rgb(155, 203, 248)"
                },
                "750-solid": {
                    "value": "rgb(134, 193, 247)"
                },
                "700-solid": {
                    "value": "rgb(114, 182, 245)"
                },
                "650-solid": {
                    "value": "rgb(94, 172, 244)"
                },
                "600-solid": {
                    "value": "rgb(74, 161, 242)"
                },
                "500-solid": {
                    "value": "rgb(50, 138, 219)"
                },
                "450-solid": {
                    "value": "rgb(47, 124, 196)"
                },
                "400-solid": {
                    "value": "rgb(43, 111, 174)"
                },
                "350-solid": {
                    "value": "rgb(40, 97, 152)"
                },
                "300-solid": {
                    "value": "rgb(36, 84, 130)"
                },
                "250-solid": {
                    "value": "rgb(32, 71, 107)"
                },
                "200-solid": {
                    "value": "rgb(29, 57, 85)"
                },
                "150-solid": {
                    "value": "rgb(25, 44, 63)"
                },
                "100-solid": {
                    "value": "rgb(23, 37, 51)"
                },
                "50-solid": {
                    "value": "rgb(22, 30, 40)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(54, 151, 241, 0.1)"
                },
                "100": {
                    "value": "rgba(54, 151, 241, 0.15)"
                },
                "150": {
                    "value": "rgba(54, 151, 241, 0.2)"
                },
                "200": {
                    "value": "rgba(54, 151, 241, 0.3)"
                },
                "250": {
                    "value": "rgba(54, 151, 241, 0.4)"
                },
                "300": {
                    "value": "rgba(54, 151, 241, 0.5)"
                },
                "350": {
                    "value": "rgba(54, 151, 241, 0.6)"
                },
                "400": {
                    "value": "rgba(54, 151, 241, 0.7)"
                },
                "450": {
                    "value": "rgba(54, 151, 241, 0.8)"
                },
                "500": {
                    "value": "rgba(54, 151, 241, 0.9)"
                },
                "550": {
                    "value": "rgb(54 151 241)"
                },
                "550-solid": {
                    "value": "rgb(54, 151, 241)"
                },
                "1000-solid": {
                    "value": "rgb(23, 37, 51)"
                },
                "950-solid": {
                    "value": "rgb(25, 44, 63)"
                },
                "900-solid": {
                    "value": "rgb(29, 57, 85)"
                },
                "850-solid": {
                    "value": "rgb(32, 71, 107)"
                },
                "800-solid": {
                    "value": "rgb(36, 84, 130)"
                },
                "750-solid": {
                    "value": "rgb(40, 97, 152)"
                },
                "700-solid": {
                    "value": "rgb(43, 111, 174)"
                },
                "650-solid": {
                    "value": "rgb(47, 124, 196)"
                },
                "600-solid": {
                    "value": "rgb(50, 138, 219)"
                },
                "500-solid": {
                    "value": "rgb(74, 161, 242)"
                },
                "450-solid": {
                    "value": "rgb(94, 172, 244)"
                },
                "400-solid": {
                    "value": "rgb(114, 182, 245)"
                },
                "350-solid": {
                    "value": "rgb(134, 193, 247)"
                },
                "300-solid": {
                    "value": "rgb(155, 203, 248)"
                },
                "250-solid": {
                    "value": "rgb(175, 213, 249)"
                },
                "200-solid": {
                    "value": "rgb(195, 224, 251)"
                },
                "150-solid": {
                    "value": "rgb(215, 234, 252)"
                },
                "100-solid": {
                    "value": "rgb(225, 239, 253)"
                },
                "50-solid": {
                    "value": "rgb(235, 245, 254)"
                }
            }
        },
        "cool-grey": {
            "dark": {
                "50": {
                    "value": "rgba(96, 128, 156, 0.1)"
                },
                "100": {
                    "value": "rgba(96, 128, 156, 0.15)"
                },
                "150": {
                    "value": "rgba(96, 128, 156, 0.2)"
                },
                "200": {
                    "value": "rgba(96, 128, 156, 0.3)"
                },
                "250": {
                    "value": "rgba(96, 128, 156, 0.4)"
                },
                "300": {
                    "value": "rgba(96, 128, 156, 0.5)"
                },
                "350": {
                    "value": "rgba(96, 128, 156, 0.6)"
                },
                "400": {
                    "value": "rgba(96, 128, 156, 0.7)"
                },
                "450": {
                    "value": "rgba(96, 128, 156, 0.8)"
                },
                "500": {
                    "value": "rgba(96, 128, 156, 0.9)"
                },
                "550": {
                    "value": "rgb(96 128 156)"
                },
                "550-solid": {
                    "value": "rgb(96, 128, 156)"
                },
                "1000-solid": {
                    "value": "rgb(231, 236, 240)"
                },
                "950-solid": {
                    "value": "rgb(223, 230, 235)"
                },
                "900-solid": {
                    "value": "rgb(207, 217, 225)"
                },
                "850-solid": {
                    "value": "rgb(191, 204, 215)"
                },
                "800-solid": {
                    "value": "rgb(176, 192, 206)"
                },
                "750-solid": {
                    "value": "rgb(160, 179, 196)"
                },
                "700-solid": {
                    "value": "rgb(144, 166, 186)"
                },
                "650-solid": {
                    "value": "rgb(128, 153, 176)"
                },
                "600-solid": {
                    "value": "rgb(112, 141, 166)"
                },
                "500-solid": {
                    "value": "rgb(88, 117, 142)"
                },
                "450-solid": {
                    "value": "rgb(80, 106, 128)"
                },
                "400-solid": {
                    "value": "rgb(73, 95, 115)"
                },
                "350-solid": {
                    "value": "rgb(65, 84, 101)"
                },
                "300-solid": {
                    "value": "rgb(57, 73, 87)"
                },
                "250-solid": {
                    "value": "rgb(49, 61, 73)"
                },
                "200-solid": {
                    "value": "rgb(41, 50, 59)"
                },
                "150-solid": {
                    "value": "rgb(34, 39, 46)"
                },
                "100-solid": {
                    "value": "rgb(30, 34, 39)"
                },
                "50-solid": {
                    "value": "rgb(26, 28, 32)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(107, 132, 153, 0.1)"
                },
                "100": {
                    "value": "rgba(107, 132, 153, 0.15)"
                },
                "150": {
                    "value": "rgba(107, 132, 153, 0.2)"
                },
                "200": {
                    "value": "rgba(107, 132, 153, 0.3)"
                },
                "250": {
                    "value": "rgba(107, 132, 153, 0.4)"
                },
                "300": {
                    "value": "rgba(107, 132, 153, 0.5)"
                },
                "350": {
                    "value": "rgba(107, 132, 153, 0.6)"
                },
                "400": {
                    "value": "rgba(107, 132, 153, 0.7)"
                },
                "450": {
                    "value": "rgba(107, 132, 153, 0.8)"
                },
                "500": {
                    "value": "rgba(107, 132, 153, 0.9)"
                },
                "550": {
                    "value": "rgb(107 132 153)"
                },
                "550-solid": {
                    "value": "rgb(107, 132, 153)"
                },
                "1000-solid": {
                    "value": "rgb(31, 34, 38)"
                },
                "950-solid": {
                    "value": "rgb(36, 40, 45)"
                },
                "900-solid": {
                    "value": "rgb(45, 52, 59)"
                },
                "850-solid": {
                    "value": "rgb(54, 63, 72)"
                },
                "800-solid": {
                    "value": "rgb(63, 75, 86)"
                },
                "750-solid": {
                    "value": "rgb(71, 86, 99)"
                },
                "700-solid": {
                    "value": "rgb(80, 98, 113)"
                },
                "650-solid": {
                    "value": "rgb(89, 109, 126)"
                },
                "600-solid": {
                    "value": "rgb(98, 121, 140)"
                },
                "500-solid": {
                    "value": "rgb(122, 144, 163)"
                },
                "450-solid": {
                    "value": "rgb(137, 157, 173)"
                },
                "400-solid": {
                    "value": "rgb(151, 169, 184)"
                },
                "350-solid": {
                    "value": "rgb(166, 181, 194)"
                },
                "300-solid": {
                    "value": "rgb(181, 194, 204)"
                },
                "250-solid": {
                    "value": "rgb(196, 206, 214)"
                },
                "200-solid": {
                    "value": "rgb(211, 218, 224)"
                },
                "150-solid": {
                    "value": "rgb(225, 230, 235)"
                },
                "100-solid": {
                    "value": "rgb(233, 237, 240)"
                },
                "50-solid": {
                    "value": "rgb(240, 243, 245)"
                }
            }
        },
        "green": {
            "dark": {
                "50": {
                    "value": "rgba(77, 176, 155, 0.1)"
                },
                "100": {
                    "value": "rgba(77, 176, 155, 0.15)"
                },
                "150": {
                    "value": "rgba(77, 176, 155, 0.2)"
                },
                "200": {
                    "value": "rgba(77, 176, 155, 0.3)"
                },
                "250": {
                    "value": "rgba(77, 176, 155, 0.4)"
                },
                "300": {
                    "value": "rgba(77, 176, 155, 0.5)"
                },
                "350": {
                    "value": "rgba(77, 176, 155, 0.6)"
                },
                "400": {
                    "value": "rgba(77, 176, 155, 0.7)"
                },
                "450": {
                    "value": "rgba(77, 176, 155, 0.8)"
                },
                "500": {
                    "value": "rgba(77, 176, 155, 0.9)"
                },
                "550": {
                    "value": "rgb(77 176 155)"
                },
                "550-solid": {
                    "value": "rgb(77, 176, 155)"
                },
                "1000-solid": {
                    "value": "rgb(228, 243, 240)"
                },
                "950-solid": {
                    "value": "rgb(219, 239, 235)"
                },
                "900-solid": {
                    "value": "rgb(202, 231, 225)"
                },
                "850-solid": {
                    "value": "rgb(184, 223, 215)"
                },
                "800-solid": {
                    "value": "rgb(166, 216, 205)"
                },
                "750-solid": {
                    "value": "rgb(148, 208, 195)"
                },
                "700-solid": {
                    "value": "rgb(130, 200, 185)"
                },
                "650-solid": {
                    "value": "rgb(113, 192, 175)"
                },
                "600-solid": {
                    "value": "rgb(95, 184, 165)"
                },
                "500-solid": {
                    "value": "rgb(71, 160, 141)"
                },
                "450-solid": {
                    "value": "rgb(65, 144, 128)"
                },
                "400-solid": {
                    "value": "rgb(59, 128, 114)"
                },
                "350-solid": {
                    "value": "rgb(53, 112, 100)"
                },
                "300-solid": {
                    "value": "rgb(48, 97, 87)"
                },
                "250-solid": {
                    "value": "rgb(42, 81, 73)"
                },
                "200-solid": {
                    "value": "rgb(36, 65, 59)"
                },
                "150-solid": {
                    "value": "rgb(30, 49, 45)"
                },
                "100-solid": {
                    "value": "rgb(27, 41, 39)"
                },
                "50-solid": {
                    "value": "rgb(24, 33, 32)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(50, 186, 118, 0.1)"
                },
                "100": {
                    "value": "rgba(50, 186, 118, 0.15)"
                },
                "150": {
                    "value": "rgba(50, 186, 118, 0.2)"
                },
                "200": {
                    "value": "rgba(50, 186, 118, 0.3)"
                },
                "250": {
                    "value": "rgba(50, 186, 118, 0.4)"
                },
                "300": {
                    "value": "rgba(50, 186, 118, 0.5)"
                },
                "350": {
                    "value": "rgba(50, 186, 118, 0.6)"
                },
                "400": {
                    "value": "rgba(50, 186, 118, 0.7)"
                },
                "450": {
                    "value": "rgba(50, 186, 118, 0.8)"
                },
                "500": {
                    "value": "rgba(50, 186, 118, 0.9)"
                },
                "550": {
                    "value": "rgb(50 186 118)"
                },
                "550-solid": {
                    "value": "rgb(50, 186, 118)"
                },
                "1000-solid": {
                    "value": "rgb(23, 42, 33)"
                },
                "950-solid": {
                    "value": "rgb(24, 51, 38)"
                },
                "900-solid": {
                    "value": "rgb(28, 68, 48)"
                },
                "850-solid": {
                    "value": "rgb(31, 85, 58)"
                },
                "800-solid": {
                    "value": "rgb(34, 102, 68)"
                },
                "750-solid": {
                    "value": "rgb(37, 118, 78)"
                },
                "700-solid": {
                    "value": "rgb(40, 135, 88)"
                },
                "650-solid": {
                    "value": "rgb(44, 152, 98)"
                },
                "600-solid": {
                    "value": "rgb(47, 169, 108)"
                },
                "500-solid": {
                    "value": "rgb(71, 193, 132)"
                },
                "450-solid": {
                    "value": "rgb(91, 200, 145)"
                },
                "400-solid": {
                    "value": "rgb(112, 207, 159)"
                },
                "350-solid": {
                    "value": "rgb(132, 214, 173)"
                },
                "300-solid": {
                    "value": "rgb(153, 221, 187)"
                },
                "250-solid": {
                    "value": "rgb(173, 227, 200)"
                },
                "200-solid": {
                    "value": "rgb(194, 234, 214)"
                },
                "150-solid": {
                    "value": "rgb(214, 241, 228)"
                },
                "100-solid": {
                    "value": "rgb(224, 245, 234)"
                },
                "50-solid": {
                    "value": "rgb(235, 248, 241)"
                }
            }
        },
        "orange": {
            "dark": {
                "50": {
                    "value": "rgba(200, 99, 12, 0.1)"
                },
                "100": {
                    "value": "rgba(200, 99, 12, 0.15)"
                },
                "150": {
                    "value": "rgba(200, 99, 12, 0.2)"
                },
                "200": {
                    "value": "rgba(200, 99, 12, 0.3)"
                },
                "250": {
                    "value": "rgba(200, 99, 12, 0.4)"
                },
                "300": {
                    "value": "rgba(200, 99, 12, 0.5)"
                },
                "350": {
                    "value": "rgba(200, 99, 12, 0.6)"
                },
                "400": {
                    "value": "rgba(200, 99, 12, 0.7)"
                },
                "450": {
                    "value": "rgba(200, 99, 12, 0.8)"
                },
                "500": {
                    "value": "rgba(200, 99, 12, 0.9)"
                },
                "550": {
                    "value": "rgb(200 99 12)"
                },
                "550-solid": {
                    "value": "rgb(200, 99, 12)"
                },
                "1000-solid": {
                    "value": "rgb(247, 232, 219)"
                },
                "950-solid": {
                    "value": "rgb(244, 224, 206)"
                },
                "900-solid": {
                    "value": "rgb(239, 208, 182)"
                },
                "850-solid": {
                    "value": "rgb(233, 193, 158)"
                },
                "800-solid": {
                    "value": "rgb(228, 177, 134)"
                },
                "750-solid": {
                    "value": "rgb(222, 161, 109)"
                },
                "700-solid": {
                    "value": "rgb(217, 146, 85)"
                },
                "650-solid": {
                    "value": "rgb(211, 130, 61)"
                },
                "600-solid": {
                    "value": "rgb(206, 115, 36)"
                },
                "500-solid": {
                    "value": "rgb(182, 91, 13)"
                },
                "450-solid": {
                    "value": "rgb(164, 83, 13)"
                },
                "400-solid": {
                    "value": "rgb(145, 74, 14)"
                },
                "350-solid": {
                    "value": "rgb(127, 66, 14)"
                },
                "300-solid": {
                    "value": "rgb(109, 58, 15)"
                },
                "250-solid": {
                    "value": "rgb(91, 50, 16)"
                },
                "200-solid": {
                    "value": "rgb(73, 42, 16)"
                },
                "150-solid": {
                    "value": "rgb(54, 33, 17)"
                },
                "100-solid": {
                    "value": "rgb(45, 29, 17)"
                },
                "50-solid": {
                    "value": "rgb(36, 25, 17)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(255, 119, 0, 0.1)"
                },
                "100": {
                    "value": "rgba(255, 119, 0, 0.15)"
                },
                "150": {
                    "value": "rgba(255, 119, 0, 0.2)"
                },
                "200": {
                    "value": "rgba(255, 119, 0, 0.3)"
                },
                "250": {
                    "value": "rgba(255, 119, 0, 0.4)"
                },
                "300": {
                    "value": "rgba(255, 119, 0, 0.5)"
                },
                "350": {
                    "value": "rgba(255, 119, 0, 0.6)"
                },
                "400": {
                    "value": "rgba(255, 119, 0, 0.7)"
                },
                "450": {
                    "value": "rgba(255, 119, 0, 0.8)"
                },
                "500": {
                    "value": "rgba(255, 119, 0, 0.9)"
                },
                "550": {
                    "value": "rgb(255 119 0)"
                },
                "550-solid": {
                    "value": "rgb(255, 119, 0)"
                },
                "1000-solid": {
                    "value": "rgb(54, 32, 15)"
                },
                "950-solid": {
                    "value": "rgb(65, 37, 14)"
                },
                "900-solid": {
                    "value": "rgb(89, 48, 13)"
                },
                "850-solid": {
                    "value": "rgb(113, 58, 11)"
                },
                "800-solid": {
                    "value": "rgb(137, 68, 9)"
                },
                "750-solid": {
                    "value": "rgb(160, 78, 7)"
                },
                "700-solid": {
                    "value": "rgb(184, 88, 5)"
                },
                "650-solid": {
                    "value": "rgb(208, 99, 4)"
                },
                "600-solid": {
                    "value": "rgb(231, 109, 2)"
                },
                "500-solid": {
                    "value": "rgb(255, 133, 25)"
                },
                "450-solid": {
                    "value": "rgb(255, 146, 51)"
                },
                "400-solid": {
                    "value": "rgb(255, 160, 77)"
                },
                "350-solid": {
                    "value": "rgb(255, 173, 102)"
                },
                "300-solid": {
                    "value": "rgb(255, 187, 128)"
                },
                "250-solid": {
                    "value": "rgb(255, 201, 153)"
                },
                "200-solid": {
                    "value": "rgb(255, 214, 179)"
                },
                "150-solid": {
                    "value": "rgb(255, 228, 204)"
                },
                "100-solid": {
                    "value": "rgb(255, 235, 217)"
                },
                "50-solid": {
                    "value": "rgb(255, 241, 230)"
                }
            }
        },
        "purple": {
            "dark": {
                "50": {
                    "value": "rgba(143, 82, 204, 0.1)"
                },
                "100": {
                    "value": "rgba(143, 82, 204, 0.15)"
                },
                "150": {
                    "value": "rgba(143, 82, 204, 0.2)"
                },
                "200": {
                    "value": "rgba(143, 82, 204, 0.3)"
                },
                "250": {
                    "value": "rgba(143, 82, 204, 0.4)"
                },
                "300": {
                    "value": "rgba(143, 82, 204, 0.5)"
                },
                "350": {
                    "value": "rgba(143, 82, 204, 0.6)"
                },
                "400": {
                    "value": "rgba(143, 82, 204, 0.7)"
                },
                "450": {
                    "value": "rgba(143, 82, 204, 0.8)"
                },
                "500": {
                    "value": "rgba(143, 82, 204, 0.9)"
                },
                "550": {
                    "value": "rgb(143 82 204)"
                },
                "550-solid": {
                    "value": "rgb(143, 82, 204)"
                },
                "1000-solid": {
                    "value": "rgb(238, 229, 247)"
                },
                "950-solid": {
                    "value": "rgb(233, 220, 245)"
                },
                "900-solid": {
                    "value": "rgb(221, 203, 240)"
                },
                "850-solid": {
                    "value": "rgb(210, 186, 235)"
                },
                "800-solid": {
                    "value": "rgb(199, 169, 230)"
                },
                "750-solid": {
                    "value": "rgb(188, 151, 224)"
                },
                "700-solid": {
                    "value": "rgb(177, 134, 219)"
                },
                "650-solid": {
                    "value": "rgb(165, 117, 214)"
                },
                "600-solid": {
                    "value": "rgb(154, 99, 209)"
                },
                "500-solid": {
                    "value": "rgb(131, 76, 185)"
                },
                "450-solid": {
                    "value": "rgb(118, 69, 167)"
                },
                "400-solid": {
                    "value": "rgb(106, 63, 148)"
                },
                "350-solid": {
                    "value": "rgb(93, 56, 130)"
                },
                "300-solid": {
                    "value": "rgb(81, 50, 111)"
                },
                "250-solid": {
                    "value": "rgb(68, 43, 92)"
                },
                "200-solid": {
                    "value": "rgb(56, 37, 74)"
                },
                "150-solid": {
                    "value": "rgb(43, 30, 55)"
                },
                "100-solid": {
                    "value": "rgb(37, 27, 46)"
                },
                "50-solid": {
                    "value": "rgb(31, 24, 37)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(143, 82, 204, 0.1)"
                },
                "100": {
                    "value": "rgba(143, 82, 204, 0.15)"
                },
                "150": {
                    "value": "rgba(143, 82, 204, 0.2)"
                },
                "200": {
                    "value": "rgba(143, 82, 204, 0.3)"
                },
                "250": {
                    "value": "rgba(143, 82, 204, 0.4)"
                },
                "300": {
                    "value": "rgba(143, 82, 204, 0.5)"
                },
                "350": {
                    "value": "rgba(143, 82, 204, 0.6)"
                },
                "400": {
                    "value": "rgba(143, 82, 204, 0.7)"
                },
                "450": {
                    "value": "rgba(143, 82, 204, 0.8)"
                },
                "500": {
                    "value": "rgba(143, 82, 204, 0.9)"
                },
                "550": {
                    "value": "rgb(143 82 204)"
                },
                "550-solid": {
                    "value": "rgb(143, 82, 204)"
                },
                "1000-solid": {
                    "value": "rgb(37, 27, 46)"
                },
                "950-solid": {
                    "value": "rgb(43, 30, 55)"
                },
                "900-solid": {
                    "value": "rgb(56, 37, 74)"
                },
                "850-solid": {
                    "value": "rgb(68, 43, 92)"
                },
                "800-solid": {
                    "value": "rgb(81, 50, 111)"
                },
                "750-solid": {
                    "value": "rgb(93, 56, 130)"
                },
                "700-solid": {
                    "value": "rgb(106, 63, 148)"
                },
                "650-solid": {
                    "value": "rgb(118, 69, 167)"
                },
                "600-solid": {
                    "value": "rgb(131, 76, 185)"
                },
                "500-solid": {
                    "value": "rgb(154, 99, 209)"
                },
                "450-solid": {
                    "value": "rgb(165, 117, 214)"
                },
                "400-solid": {
                    "value": "rgb(177, 134, 219)"
                },
                "350-solid": {
                    "value": "rgb(188, 151, 224)"
                },
                "300-solid": {
                    "value": "rgb(199, 169, 230)"
                },
                "250-solid": {
                    "value": "rgb(210, 186, 235)"
                },
                "200-solid": {
                    "value": "rgb(221, 203, 240)"
                },
                "150-solid": {
                    "value": "rgb(233, 220, 245)"
                },
                "100-solid": {
                    "value": "rgb(238, 229, 247)"
                },
                "50-solid": {
                    "value": "rgb(244, 238, 250)"
                }
            }
        },
        "red": {
            "dark": {
                "50": {
                    "value": "rgba(229, 50, 93, 0.1)"
                },
                "100": {
                    "value": "rgba(229, 50, 93, 0.15)"
                },
                "150": {
                    "value": "rgba(229, 50, 93, 0.2)"
                },
                "200": {
                    "value": "rgba(229, 50, 93, 0.3)"
                },
                "250": {
                    "value": "rgba(229, 50, 93, 0.4)"
                },
                "300": {
                    "value": "rgba(229, 50, 93, 0.5)"
                },
                "350": {
                    "value": "rgba(229, 50, 93, 0.6)"
                },
                "400": {
                    "value": "rgba(229, 50, 93, 0.7)"
                },
                "450": {
                    "value": "rgba(229, 50, 93, 0.8)"
                },
                "500": {
                    "value": "rgba(229, 50, 93, 0.9)"
                },
                "550": {
                    "value": "rgb(229 50 93)"
                },
                "550-solid": {
                    "value": "rgb(229, 50, 93)"
                },
                "1000-solid": {
                    "value": "rgb(251, 224, 231)"
                },
                "950-solid": {
                    "value": "rgb(250, 214, 223)"
                },
                "900-solid": {
                    "value": "rgb(247, 194, 206)"
                },
                "850-solid": {
                    "value": "rgb(245, 173, 190)"
                },
                "800-solid": {
                    "value": "rgb(242, 153, 174)"
                },
                "750-solid": {
                    "value": "rgb(239, 132, 158)"
                },
                "700-solid": {
                    "value": "rgb(237, 112, 142)"
                },
                "650-solid": {
                    "value": "rgb(234, 91, 125)"
                },
                "600-solid": {
                    "value": "rgb(232, 71, 109)"
                },
                "500-solid": {
                    "value": "rgb(208, 47, 86)"
                },
                "450-solid": {
                    "value": "rgb(187, 43, 78)"
                },
                "400-solid": {
                    "value": "rgb(166, 40, 71)"
                },
                "350-solid": {
                    "value": "rgb(145, 37, 63)"
                },
                "300-solid": {
                    "value": "rgb(124, 34, 56)"
                },
                "250-solid": {
                    "value": "rgb(102, 30, 48)"
                },
                "200-solid": {
                    "value": "rgb(81, 27, 41)"
                },
                "150-solid": {
                    "value": "rgb(60, 24, 33)"
                },
                "100-solid": {
                    "value": "rgb(50, 22, 29)"
                },
                "50-solid": {
                    "value": "rgb(39, 20, 26)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(255, 0, 61, 0.1)"
                },
                "100": {
                    "value": "rgba(255, 0, 61, 0.15)"
                },
                "150": {
                    "value": "rgba(255, 0, 61, 0.2)"
                },
                "200": {
                    "value": "rgba(255, 0, 61, 0.3)"
                },
                "250": {
                    "value": "rgba(255, 0, 61, 0.4)"
                },
                "300": {
                    "value": "rgba(255, 0, 61, 0.5)"
                },
                "350": {
                    "value": "rgba(255, 0, 61, 0.6)"
                },
                "400": {
                    "value": "rgba(255, 0, 61, 0.7)"
                },
                "450": {
                    "value": "rgba(255, 0, 61, 0.8)"
                },
                "500": {
                    "value": "rgba(255, 0, 61, 0.9)"
                },
                "550": {
                    "value": "rgb(255 0 61)"
                },
                "550-solid": {
                    "value": "rgb(255, 0, 61)"
                },
                "1000-solid": {
                    "value": "rgb(54, 14, 24)"
                },
                "950-solid": {
                    "value": "rgb(65, 14, 27)"
                },
                "900-solid": {
                    "value": "rgb(89, 12, 31)"
                },
                "850-solid": {
                    "value": "rgb(113, 10, 35)"
                },
                "800-solid": {
                    "value": "rgb(137, 9, 40)"
                },
                "750-solid": {
                    "value": "rgb(160, 7, 44)"
                },
                "700-solid": {
                    "value": "rgb(184, 5, 48)"
                },
                "650-solid": {
                    "value": "rgb(208, 3, 52)"
                },
                "600-solid": {
                    "value": "rgb(231, 2, 57)"
                },
                "500-solid": {
                    "value": "rgb(255, 25, 80)"
                },
                "450-solid": {
                    "value": "rgb(255, 51, 100)"
                },
                "400-solid": {
                    "value": "rgb(255, 77, 119)"
                },
                "350-solid": {
                    "value": "rgb(255, 102, 139)"
                },
                "300-solid": {
                    "value": "rgb(255, 128, 158)"
                },
                "250-solid": {
                    "value": "rgb(255, 153, 177)"
                },
                "200-solid": {
                    "value": "rgb(255, 179, 197)"
                },
                "150-solid": {
                    "value": "rgb(255, 204, 216)"
                },
                "100-solid": {
                    "value": "rgb(255, 217, 226)"
                },
                "50-solid": {
                    "value": "rgb(255, 230, 236)"
                }
            }
        },
        "white": {
            "dark": {
                "20": {
                    "value": "rgb(255 255 255 / 0.02)"
                },
                "50": {
                    "value": "rgba(255, 255, 255, 0.05)"
                },
                "70": {
                    "value": "rgba(255, 255, 255, 0.07)"
                },
                "100": {
                    "value": "rgba(255, 255, 255, 0.1)"
                },
                "150": {
                    "value": "rgba(255, 255, 255, 0.15)"
                },
                "200": {
                    "value": "rgba(255, 255, 255, 0.2)"
                },
                "250": {
                    "value": "rgba(255, 255, 255, 0.25)"
                },
                "300": {
                    "value": "rgba(255, 255, 255, 0.3)"
                },
                "350": {
                    "value": "rgba(255, 255, 255, 0.35)"
                },
                "400": {
                    "value": "rgba(255, 255, 255, 0.4)"
                },
                "450": {
                    "value": "rgba(255, 255, 255, 0.45)"
                },
                "500": {
                    "value": "rgba(255, 255, 255, 0.5)"
                },
                "550": {
                    "value": "rgba(255, 255, 255, 0.55)"
                },
                "600": {
                    "value": "rgba(255, 255, 255, 0.6)"
                },
                "650": {
                    "value": "rgba(255, 255, 255, 0.65)"
                },
                "700": {
                    "value": "rgba(255, 255, 255, 0.7)"
                },
                "750": {
                    "value": "rgba(255, 255, 255, 0.75)"
                },
                "800": {
                    "value": "rgba(255, 255, 255, 0.8)"
                },
                "850": {
                    "value": "rgba(255, 255, 255, 0.85)"
                },
                "900": {
                    "value": "rgba(255, 255, 255, 0.9)"
                },
                "950": {
                    "value": "rgba(255, 255, 255, 0.95)"
                },
                "1000-solid": {
                    "value": "rgb(255, 255, 255)"
                },
                "950-solid": {
                    "value": "rgb(243, 243, 243)"
                },
                "900-solid": {
                    "value": "rgb(231, 231, 231)"
                },
                "850-solid": {
                    "value": "rgb(208, 207, 208)"
                },
                "800-solid": {
                    "value": "rgb(208, 207, 208)"
                },
                "750-solid": {
                    "value": "rgb(196, 195, 196)"
                },
                "700-solid": {
                    "value": "rgb(184, 184, 184)"
                },
                "650-solid": {
                    "value": "rgb(172, 172, 172)"
                },
                "600-solid": {
                    "value": "rgb(160, 160, 160)"
                },
                "550-solid": {
                    "value": "rgb(148, 148, 148)"
                },
                "500-solid": {
                    "value": "rgb(136, 136, 136)"
                },
                "450-solid": {
                    "value": "rgb(125, 124, 125)"
                },
                "400-solid": {
                    "value": "rgb(113, 112, 113)"
                },
                "350-solid": {
                    "value": "rgb(101, 100, 101)"
                },
                "300-solid": {
                    "value": "rgb(89, 88, 89)"
                },
                "250-solid": {
                    "value": "rgb(77, 77, 77)"
                },
                "200-solid": {
                    "value": "rgb(65, 65, 65)"
                },
                "150-solid": {
                    "value": "rgb(54, 53, 54)"
                },
                "100-solid": {
                    "value": "rgb(42, 41, 42)"
                },
                "50-solid": {
                    "value": "rgb(30, 29, 30)"
                },
                "70-solid": {
                    "value": "rgb(35, 34, 35)"
                },
                "20-solid": {
                    "value": "rgb(38 34 38)"
                },
                "opaque-150": {
                    "value": "rgba(56, 57, 60, 0.97)"
                }
            },
            "light": {
                "20": {
                    "value": "rgb(255 255 255 / 0.02)"
                },
                "50": {
                    "value": "rgba(255, 255, 255, 0.05)"
                },
                "70": {
                    "value": "rgba(255, 255, 255, 0.07)"
                },
                "100": {
                    "value": "rgba(255, 255, 255, 0.1)"
                },
                "150": {
                    "value": "rgba(255, 255, 255, 0.15)"
                },
                "200": {
                    "value": "rgba(255, 255, 255, 0.2)"
                },
                "250": {
                    "value": "rgba(255, 255, 255, 0.25)"
                },
                "300": {
                    "value": "rgba(255, 255, 255, 0.3)"
                },
                "350": {
                    "value": "rgba(255, 255, 255, 0.35)"
                },
                "400": {
                    "value": "rgba(255, 255, 255, 0.4)"
                },
                "450": {
                    "value": "rgba(255, 255, 255, 0.45)"
                },
                "500": {
                    "value": "rgba(255, 255, 255, 0.5)"
                },
                "550": {
                    "value": "rgba(255, 255, 255, 0.55)"
                },
                "600": {
                    "value": "rgba(255, 255, 255, 0.6)"
                },
                "650": {
                    "value": "rgba(255, 255, 255, 0.65)"
                },
                "700": {
                    "value": "rgba(255, 255, 255, 0.7)"
                },
                "750": {
                    "value": "rgba(255, 255, 255, 0.75)"
                },
                "800": {
                    "value": "rgba(255, 255, 255, 0.8)"
                },
                "850": {
                    "value": "rgba(255, 255, 255, 0.85)"
                },
                "900": {
                    "value": "rgba(255, 255, 255, 0.9)"
                },
                "950": {
                    "value": "rgba(255, 255, 255, 0.95)"
                },
                "1000-solid": {
                    "value": "rgb(255, 255, 255)"
                }
            }
        },
        "yellow": {
            "dark": {
                "50": {
                    "value": "rgba(255, 190, 92, 0.1)"
                },
                "100": {
                    "value": "rgba(255, 190, 92, 0.15)"
                },
                "150": {
                    "value": "rgba(255, 190, 92, 0.2)"
                },
                "200": {
                    "value": "rgba(255, 190, 92, 0.3)"
                },
                "250": {
                    "value": "rgba(255, 190, 92, 0.4)"
                },
                "300": {
                    "value": "rgba(255, 190, 92, 0.5)"
                },
                "350": {
                    "value": "rgba(255, 190, 92, 0.6)"
                },
                "400": {
                    "value": "rgba(255, 190, 92, 0.7)"
                },
                "450": {
                    "value": "rgba(255, 190, 92, 0.8)"
                },
                "500": {
                    "value": "rgba(255, 190, 92, 0.9)"
                },
                "550": {
                    "value": "rgb(255 190 92)"
                },
                "550-solid": {
                    "value": "rgb(255, 190, 92)"
                },
                "1000-solid": {
                    "value": "rgb(255, 245, 231)"
                },
                "950-solid": {
                    "value": "rgb(255, 242, 222)"
                },
                "900-solid": {
                    "value": "rgb(255, 236, 206)"
                },
                "850-solid": {
                    "value": "rgb(255, 229, 190)"
                },
                "800-solid": {
                    "value": "rgb(255, 223, 174)"
                },
                "750-solid": {
                    "value": "rgb(255, 216, 157)"
                },
                "700-solid": {
                    "value": "rgb(255, 210, 141)"
                },
                "650-solid": {
                    "value": "rgb(255, 203, 125)"
                },
                "600-solid": {
                    "value": "rgb(255, 197, 108)"
                },
                "500-solid": {
                    "value": "rgb(231, 173, 85)"
                },
                "450-solid": {
                    "value": "rgb(208, 155, 77)"
                },
                "400-solid": {
                    "value": "rgb(184, 138, 70)"
                },
                "350-solid": {
                    "value": "rgb(160, 121, 62)"
                },
                "300-solid": {
                    "value": "rgb(137, 104, 55)"
                },
                "250-solid": {
                    "value": "rgb(113, 86, 48)"
                },
                "200-solid": {
                    "value": "rgb(89, 69, 40)"
                },
                "150-solid": {
                    "value": "rgb(65, 52, 33)"
                },
                "100-solid": {
                    "value": "rgb(54, 43, 29)"
                },
                "50-solid": {
                    "value": "rgb(42, 34, 25)"
                }
            },
            "light": {
                "50": {
                    "value": "rgba(255, 190, 92, 0.1)"
                },
                "100": {
                    "value": "rgba(255, 190, 92, 0.15)"
                },
                "150": {
                    "value": "rgba(255, 190, 92, 0.2)"
                },
                "200": {
                    "value": "rgba(255, 190, 92, 0.3)"
                },
                "250": {
                    "value": "rgba(255, 190, 92, 0.4)"
                },
                "300": {
                    "value": "rgba(255, 190, 92, 0.5)"
                },
                "350": {
                    "value": "rgba(255, 190, 92, 0.6)"
                },
                "400": {
                    "value": "rgba(255, 190, 92, 0.7)"
                },
                "450": {
                    "value": "rgba(255, 190, 92, 0.8)"
                },
                "500": {
                    "value": "rgba(255, 190, 92, 0.9)"
                },
                "550": {
                    "value": "rgb(255 190 92)"
                },
                "550-solid": {
                    "value": "rgb(255, 190, 92)"
                },
                "1000-solid": {
                    "value": "rgb(54, 43, 29)"
                },
                "950-solid": {
                    "value": "rgb(65, 52, 33)"
                },
                "900-solid": {
                    "value": "rgb(89, 69, 40)"
                },
                "850-solid": {
                    "value": "rgb(113, 86, 48)"
                },
                "800-solid": {
                    "value": "rgb(137, 104, 55)"
                },
                "750-solid": {
                    "value": "rgb(160, 121, 62)"
                },
                "700-solid": {
                    "value": "rgb(184, 138, 70)"
                },
                "650-solid": {
                    "value": "rgb(208, 155, 77)"
                },
                "600-solid": {
                    "value": "rgb(231, 173, 85)"
                },
                "500-solid": {
                    "value": "rgb(255, 197, 108)"
                },
                "450-solid": {
                    "value": "rgb(255, 203, 125)"
                },
                "400-solid": {
                    "value": "rgb(255, 210, 141)"
                },
                "350-solid": {
                    "value": "rgb(255, 216, 157)"
                },
                "300-solid": {
                    "value": "rgb(255, 223, 174)"
                },
                "250-solid": {
                    "value": "rgb(255, 229, 190)"
                },
                "200-solid": {
                    "value": "rgb(255, 236, 206)"
                },
                "150-solid": {
                    "value": "rgb(255, 242, 222)"
                },
                "100-solid": {
                    "value": "rgb(255, 245, 231)"
                },
                "50-solid": {
                    "value": "rgb(255, 249, 239)"
                }
            }
        }
    },
    "utilityColors": {
        "base-background": {
            "dark": {
                "value": "rgb(18, 17, 18)"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "private.white.1000-solid"
            }
        },
        "base-brand": {
            "dark": {
                "value": "rgb(255, 190, 92)",
                "ref": "private.yellow.550-solid"
            },
            "light": {
                "value": "rgb(255, 190, 92)",
                "ref": "private.yellow.550-solid"
            }
        },
        "base-brand-hover": {
            "dark": {
                "value": "rgb(255, 210, 141)",
                "ref": "private.yellow.700-solid"
            },
            "light": {
                "value": "rgb(208, 155, 77)",
                "ref": "private.yellow.650-solid"
            }
        },
        "base-danger-heavy": {
            "dark": {
                "value": "rgb(237, 112, 142)",
                "ref": "private.red.700-solid"
            },
            "light": {
                "value": "rgb(184, 5, 48)",
                "ref": "private.red.700-solid"
            }
        },
        "base-danger-heavy-hover": {
            "dark": {
                "value": "rgb(245, 173, 190)",
                "ref": "private.red.850-solid"
            },
            "light": {
                "value": "rgb(137, 9, 40)",
                "ref": "private.red.800-solid"
            }
        },
        "base-danger-light": {
            "dark": {
                "value": "rgba(229, 50, 93, 0.4)",
                "ref": "private.red.250"
            },
            "light": {
                "value": "rgba(255, 0, 61, 0.4)",
                "ref": "private.red.250"
            }
        },
        "base-danger-light-hover": {
            "dark": {
                "value": "rgba(229, 50, 93, 0.7)",
                "ref": "private.red.400"
            },
            "light": {
                "value": "rgba(255, 0, 61, 0.6)",
                "ref": "private.red.350"
            }
        },
        "base-danger-medium": {
            "dark": {
                "value": "rgba(229, 50, 93, 0.8)",
                "ref": "private.red.450"
            },
            "light": {
                "value": "rgba(255, 0, 61, 0.7)",
                "ref": "private.red.400"
            }
        },
        "base-danger-medium-hover": {
            "dark": {
                "value": "rgb(232, 71, 109)",
                "ref": "private.red.600-solid"
            },
            "light": {
                "value": "rgba(255, 0, 61, 0.9)",
                "ref": "private.red.500"
            }
        },
        "base-float": {
            "dark": {
                "value": "rgb(42, 41, 42)",
                "ref": "private.white.100-solid"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "private.white.1000-solid"
            }
        },
        "base-float-accent": {
            "dark": {
                "value": "rgb(89, 88, 89)",
                "ref": "private.white.300-solid"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "private.white.1000-solid"
            }
        },
        "base-float-accent-hover": {
            "dark": {
                "value": "rgb(113, 112, 113)",
                "ref": "private.white.400-solid"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.85)",
                "ref": "private.white.850"
            }
        },
        "base-float-announcement": {
            "dark": {
                "value": "rgb(65, 65, 65)",
                "ref": "private.white.200-solid"
            },
            "light": {
                "value": "rgb(225, 230, 235)",
                "ref": "private.cool-grey.150-solid"
            }
        },
        "base-float-heavy": {
            "dark": {
                "value": "rgb(89, 88, 89)",
                "ref": "private.white.300-solid"
            },
            "light": {
                "value": "rgb(76, 76, 76)",
                "ref": "private.black.700-solid"
            }
        },
        "base-float-hover": {
            "dark": {
                "value": "rgb(65, 65, 65)",
                "ref": "private.white.200-solid"
            },
            "light": {
                "value": "rgb(217, 217, 217)",
                "ref": "private.black.150-solid"
            }
        },
        "base-float-medium": {
            "dark": {
                "value": "rgb(65, 65, 65)",
                "ref": "private.white.200-solid"
            },
            "light": {
                "value": "rgb(115, 115, 115)",
                "ref": "private.black.550-solid"
            }
        },
        "base-generic": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.1)",
                "ref": "private.white.100"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.15)",
                "ref": "private.black.150"
            }
        },
        "base-generic-accent": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.2)",
                "ref": "private.white.200"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.25)",
                "ref": "private.black.250"
            }
        },
        "base-generic-accent-disabled": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.15)",
                "ref": "private.black.150"
            }
        },
        "base-generic-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.25)",
                "ref": "private.white.250"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.3)",
                "ref": "private.black.300"
            }
        },
        "base-generic-medium": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.25)",
                "ref": "private.white.250"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.25)",
                "ref": "private.black.250"
            }
        },
        "base-generic-medium-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.4)",
                "ref": "private.white.400"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.35)",
                "ref": "private.black.350"
            }
        },
        "base-generic-ultralight": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.05)",
                "ref": "private.white.50"
            },
            "light": {
                "value": "rgb(242, 242, 242)",
                "ref": "private.black.50-solid"
            }
        },
        "base-info-heavy": {
            "dark": {
                "value": "rgb(114, 182, 245)",
                "ref": "private.blue.700-solid"
            },
            "light": {
                "value": "rgb(43, 111, 174)",
                "ref": "private.blue.700-solid"
            }
        },
        "base-info-heavy-hover": {
            "dark": {
                "value": "rgb(175, 213, 249)",
                "ref": "private.blue.850-solid"
            },
            "light": {
                "value": "rgb(32, 71, 107)",
                "ref": "private.blue.850-solid"
            }
        },
        "base-info-light": {
            "dark": {
                "value": "rgba(54, 151, 241, 0.4)",
                "ref": "private.blue.250"
            },
            "light": {
                "value": "rgba(54, 151, 241, 0.4)",
                "ref": "private.blue.250"
            }
        },
        "base-info-light-hover": {
            "dark": {
                "value": "rgba(54, 151, 241, 0.7)",
                "ref": "private.blue.400"
            },
            "light": {
                "value": "rgba(54, 151, 241, 0.6)",
                "ref": "private.blue.350"
            }
        },
        "base-info-medium": {
            "dark": {
                "value": "rgba(54, 151, 241, 0.8)",
                "ref": "private.blue.450"
            },
            "light": {
                "value": "rgba(54, 151, 241, 0.7)",
                "ref": "private.blue.400"
            }
        },
        "base-info-medium-hover": {
            "dark": {
                "value": "rgb(74, 161, 242)",
                "ref": "private.blue.600-solid"
            },
            "light": {
                "value": "rgba(54, 151, 241, 0.9)",
                "ref": "private.blue.500"
            }
        },
        "base-light": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.85)",
                "ref": "private.white.850"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "private.white.1000-solid"
            }
        },
        "base-light-accent-disabled": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.3)",
                "ref": "private.white.300"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.3)",
                "ref": "private.white.300"
            }
        },
        "base-light-disabled": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            }
        },
        "base-light-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.7)",
                "ref": "private.white.700"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.85)",
                "ref": "private.white.850"
            }
        },
        "base-light-simple-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.3)",
                "ref": "private.white.300"
            }
        },
        "base-misc-heavy": {
            "dark": {
                "value": "rgb(144, 166, 186)",
                "ref": "private.cool-grey.700-solid"
            },
            "light": {
                "value": "rgb(80, 98, 113)",
                "ref": "private.cool-grey.700-solid"
            }
        },
        "base-misc-heavy-hover": {
            "dark": {
                "value": "rgb(191, 204, 215)",
                "ref": "private.cool-grey.850-solid"
            },
            "light": {
                "value": "rgb(63, 75, 86)",
                "ref": "private.cool-grey.800-solid"
            }
        },
        "base-misc-light": {
            "dark": {
                "value": "rgba(96, 128, 156, 0.4)",
                "ref": "private.cool-grey.250"
            },
            "light": {
                "value": "rgba(107, 132, 153, 0.4)",
                "ref": "private.cool-grey.250"
            }
        },
        "base-misc-light-hover": {
            "dark": {
                "value": "rgba(96, 128, 156, 0.7)",
                "ref": "private.cool-grey.400"
            },
            "light": {
                "value": "rgba(107, 132, 153, 0.6)",
                "ref": "private.cool-grey.350"
            }
        },
        "base-misc-medium": {
            "dark": {
                "value": "rgba(96, 128, 156, 0.8)",
                "ref": "private.cool-grey.450"
            },
            "light": {
                "value": "rgba(107, 132, 153, 0.7)",
                "ref": "private.cool-grey.400"
            }
        },
        "base-misc-medium-hover": {
            "dark": {
                "value": "rgb(112, 141, 166)",
                "ref": "private.cool-grey.600-solid"
            },
            "light": {
                "value": "rgba(107, 132, 153, 0.9)",
                "ref": "private.cool-grey.500"
            }
        },
        "base-modal": {
            "dark": {
                "value": "rgb(18, 17, 18)",
                "ref": "utility.base-background"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "utility.base-background"
            }
        },
        "base-neutral-heavy": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.65)",
                "ref": "private.white.650"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.55)",
                "ref": "private.black.550"
            }
        },
        "base-neutral-heavy-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.75)",
                "ref": "private.white.750"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.65)",
                "ref": "private.black.650"
            }
        },
        "base-neutral-light": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.2)",
                "ref": "private.white.200"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.15)",
                "ref": "private.black.150"
            }
        },
        "base-neutral-light-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.35)",
                "ref": "private.white.350"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.25)",
                "ref": "private.black.250"
            }
        },
        "base-neutral-medium": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.4)",
                "ref": "private.white.400"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.3)",
                "ref": "private.black.300"
            }
        },
        "base-neutral-medium-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.55)",
                "ref": "private.white.550"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.4)",
                "ref": "private.black.400"
            }
        },
        "base-positive-heavy": {
            "dark": {
                "value": "rgb(130, 200, 185)",
                "ref": "private.green.700-solid"
            },
            "light": {
                "value": "rgb(40, 135, 88)",
                "ref": "private.green.700-solid"
            }
        },
        "base-positive-heavy-hover": {
            "dark": {
                "value": "rgb(184, 223, 215)",
                "ref": "private.green.850-solid"
            },
            "light": {
                "value": "rgb(34, 102, 68)",
                "ref": "private.green.800-solid"
            }
        },
        "base-positive-light": {
            "dark": {
                "value": "rgba(77, 176, 155, 0.4)",
                "ref": "private.green.250"
            },
            "light": {
                "value": "rgba(50, 186, 118, 0.4)",
                "ref": "private.green.250"
            }
        },
        "base-positive-light-hover": {
            "dark": {
                "value": "rgba(77, 176, 155, 0.7)",
                "ref": "private.green.400"
            },
            "light": {
                "value": "rgba(50, 186, 118, 0.6)",
                "ref": "private.green.350"
            }
        },
        "base-positive-medium": {
            "dark": {
                "value": "rgba(77, 176, 155, 0.8)",
                "ref": "private.green.450"
            },
            "light": {
                "value": "rgba(50, 186, 118, 0.7)",
                "ref": "private.green.400"
            }
        },
        "base-positive-medium-hover": {
            "dark": {
                "value": "rgb(95, 184, 165)",
                "ref": "private.green.600-solid"
            },
            "light": {
                "value": "rgba(50, 186, 118, 0.9)",
                "ref": "private.green.500"
            }
        },
        "base-selection": {
            "dark": {
                "value": "rgba(255, 190, 92, 0.4)",
                "ref": "private.yellow.250"
            },
            "light": {
                "value": "rgba(255, 190, 92, 0.5)",
                "ref": "private.yellow.300"
            }
        },
        "base-selection-hover": {
            "dark": {
                "value": "rgba(255, 190, 92, 0.7)",
                "ref": "private.yellow.400"
            },
            "light": {
                "value": "rgba(255, 190, 92, 0.7)",
                "ref": "private.yellow.400"
            }
        },
        "base-simple-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.25)",
                "ref": "private.white.250"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.15)",
                "ref": "private.black.150"
            }
        },
        "base-simple-hover-solid": {
            "dark": {
                "value": "rgb(77, 77, 77)",
                "ref": "private.white.250-solid"
            },
            "light": {
                "value": "rgb(217, 217, 217)",
                "ref": "private.black.150-solid"
            }
        },
        "base-utility-heavy": {
            "dark": {
                "value": "rgb(177, 134, 219)",
                "ref": "private.purple.700-solid"
            },
            "light": {
                "value": "rgb(106, 63, 148)",
                "ref": "private.purple.700-solid"
            }
        },
        "base-utility-heavy-hover": {
            "dark": {
                "value": "rgb(210, 186, 235)",
                "ref": "private.purple.850-solid"
            },
            "light": {
                "value": "rgb(81, 50, 111)",
                "ref": "private.purple.800-solid"
            }
        },
        "base-utility-light": {
            "dark": {
                "value": "rgba(143, 82, 204, 0.4)",
                "ref": "private.purple.250"
            },
            "light": {
                "value": "rgba(143, 82, 204, 0.4)",
                "ref": "private.purple.250"
            }
        },
        "base-utility-light-hover": {
            "dark": {
                "value": "rgba(143, 82, 204, 0.7)",
                "ref": "private.purple.400"
            },
            "light": {
                "value": "rgba(143, 82, 204, 0.6)",
                "ref": "private.purple.350"
            }
        },
        "base-utility-medium": {
            "dark": {
                "value": "rgba(143, 82, 204, 0.8)",
                "ref": "private.purple.450"
            },
            "light": {
                "value": "rgba(143, 82, 204, 0.7)",
                "ref": "private.purple.400"
            }
        },
        "base-utility-medium-hover": {
            "dark": {
                "value": "rgb(154, 99, 209)",
                "ref": "private.purple.600-solid"
            },
            "light": {
                "value": "rgba(143, 82, 204, 0.9)",
                "ref": "private.purple.500"
            }
        },
        "base-warning-heavy": {
            "dark": {
                "value": "rgb(255, 210, 141)",
                "ref": "private.yellow.700-solid"
            },
            "light": {
                "value": "rgb(231, 173, 85)",
                "ref": "private.yellow.600-solid"
            }
        },
        "base-warning-heavy-hover": {
            "dark": {
                "value": "rgb(255, 229, 190)",
                "ref": "private.yellow.850-solid"
            },
            "light": {
                "value": "rgb(184, 138, 70)",
                "ref": "private.yellow.700-solid"
            }
        },
        "base-warning-light": {
            "dark": {
                "value": "rgba(255, 190, 92, 0.4)",
                "ref": "private.yellow.250"
            },
            "light": {
                "value": "rgba(255, 190, 92, 0.5)",
                "ref": "private.yellow.300"
            }
        },
        "base-warning-light-hover": {
            "dark": {
                "value": "rgba(255, 190, 92, 0.7)",
                "ref": "private.yellow.400"
            },
            "light": {
                "value": "rgba(255, 190, 92, 0.7)",
                "ref": "private.yellow.400"
            }
        },
        "base-warning-medium": {
            "dark": {
                "value": "rgba(255, 190, 92, 0.8)",
                "ref": "private.yellow.450"
            },
            "light": {
                "value": "rgba(255, 190, 92, 0.7)",
                "ref": "private.yellow.400"
            }
        },
        "base-warning-medium-hover": {
            "dark": {
                "value": "rgb(255, 197, 108)",
                "ref": "private.yellow.600-solid"
            },
            "light": {
                "value": "rgb(255, 190, 92)",
                "ref": "private.yellow.550-solid"
            }
        },
        "infographics-axis": {
            "dark": {
                "value": "rgb(54, 53, 54)",
                "ref": "private.white.150-solid"
            },
            "light": {
                "value": "rgb(217, 217, 217)",
                "ref": "private.black.150-solid"
            }
        },
        "infographics-tooltip-bg": {
            "dark": {
                "value": "rgba(56, 57, 60, 0.97)",
                "ref": "private.white.opaque-150"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.95)",
                "ref": "private.white.950"
            }
        },
        "line-brand": {
            "dark": {
                "value": "rgb(255, 197, 108)",
                "ref": "private.yellow.600-solid"
            },
            "light": {
                "value": "rgb(231, 173, 85)",
                "ref": "private.yellow.600-solid"
            }
        },
        "line-danger": {
            "dark": {
                "value": "rgb(229, 50, 93)",
                "ref": "private.red.550-solid"
            },
            "light": {
                "value": "rgba(255, 0, 61, 0.8)",
                "ref": "private.red.450"
            }
        },
        "line-focus": {
            "dark": {
                "value": "rgb(96, 128, 156)",
                "ref": "private.cool-grey.550-solid"
            },
            "light": {
                "value": "rgba(107, 132, 153, 0.8)",
                "ref": "private.cool-grey.450"
            }
        },
        "line-generic": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.2)",
                "ref": "private.black.200"
            }
        },
        "line-generic-accent": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.35)",
                "ref": "private.white.350"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.3)",
                "ref": "private.black.300"
            }
        },
        "line-generic-accent-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.8)",
                "ref": "private.white.800"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.7)",
                "ref": "private.black.700"
            }
        },
        "line-generic-active": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.6)",
                "ref": "private.white.600"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.7)",
                "ref": "private.black.700"
            }
        },
        "line-generic-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.25)",
                "ref": "private.white.250"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.4)",
                "ref": "private.black.400"
            }
        },
        "line-generic-solid": {
            "dark": {
                "value": "rgb(54, 53, 54)",
                "ref": "private.white.150-solid"
            },
            "light": {
                "value": "rgb(204, 204, 204)",
                "ref": "private.black.200-solid"
            }
        },
        "line-info": {
            "dark": {
                "value": "rgb(54, 151, 241)",
                "ref": "private.blue.550-solid"
            },
            "light": {
                "value": "rgba(54, 151, 241, 0.8)",
                "ref": "private.blue.450"
            }
        },
        "line-light": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.5)",
                "ref": "private.white.500"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.5)",
                "ref": "private.white.500"
            }
        },
        "line-misc": {
            "dark": {
                "value": "rgb(96, 128, 156)",
                "ref": "private.cool-grey.550-solid"
            },
            "light": {
                "value": "rgba(107, 132, 153, 0.8)",
                "ref": "private.cool-grey.450"
            }
        },
        "line-positive": {
            "dark": {
                "value": "rgb(77, 176, 155)",
                "ref": "private.green.550-solid"
            },
            "light": {
                "value": "rgba(50, 186, 118, 0.8)",
                "ref": "private.green.450"
            }
        },
        "line-utility": {
            "dark": {
                "value": "rgb(143, 82, 204)",
                "ref": "private.purple.550-solid"
            },
            "light": {
                "value": "rgba(143, 82, 204, 0.8)",
                "ref": "private.purple.450"
            }
        },
        "line-warning": {
            "dark": {
                "value": "rgb(255, 190, 92)",
                "ref": "private.yellow.550-solid"
            },
            "light": {
                "value": "rgb(231, 173, 85)",
                "ref": "private.yellow.600-solid"
            }
        },
        "scroll-corner": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.1)",
                "ref": "private.black.100"
            }
        },
        "scroll-handle": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.15)",
                "ref": "private.white.150"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.1)",
                "ref": "private.black.100"
            }
        },
        "scroll-handle-hover": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.25)",
                "ref": "private.white.250"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.15)",
                "ref": "private.black.150"
            }
        },
        "scroll-track": {
            "dark": {
                "value": "rgb(18, 17, 18)",
                "ref": "utility.base-background"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "utility.base-background"
            }
        },
        "sfx-fade": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.25)",
                "ref": "private.white.250"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.3)",
                "ref": "private.white.300"
            }
        },
        "sfx-shadow": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.2)",
                "ref": "private.black.200"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.3)",
                "ref": "private.black.300"
            }
        },
        "sfx-shadow-heavy": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.4)",
                "ref": "private.black.400"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.6)",
                "ref": "private.black.600"
            }
        },
        "sfx-shadow-light": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.2)",
                "ref": "private.black.200"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.1)",
                "ref": "private.black.100"
            }
        },
        "sfx-veil": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.7)",
                "ref": "private.black.700"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.45)",
                "ref": "private.black.450"
            }
        },
        "text-brand": {
            "dark": {
                "value": "rgb(255, 197, 108)",
                "ref": "private.yellow.600-solid"
            },
            "light": {
                "value": "rgb(184, 138, 70)",
                "ref": "private.yellow.700-solid"
            }
        },
        "text-brand-contrast": {
            "dark": {
                "value": "rgb(0, 0, 0)",
                "ref": "utility.text-dark-primary"
            },
            "light": {
                "value": "rgb(0, 0, 0)",
                "ref": "utility.text-dark-primary"
            }
        },
        "text-brand-heavy": {
            "dark": {
                "value": "rgb(255, 210, 141)",
                "ref": "private.yellow.700-solid"
            },
            "light": {
                "value": "rgb(89, 48, 13)",
                "ref": "private.orange.900-solid"
            }
        },
        "text-complementary": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.8)",
                "ref": "utility.text-light-complementary"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.85)",
                "ref": "utility.text-dark-complementary"
            }
        },
        "text-danger": {
            "dark": {
                "value": "rgb(234, 91, 125)",
                "ref": "private.red.650-solid"
            },
            "light": {
                "value": "rgb(208, 3, 52)",
                "ref": "private.red.650-solid"
            }
        },
        "text-danger-heavy": {
            "dark": {
                "value": "rgb(245, 173, 190)",
                "ref": "private.red.850-solid"
            },
            "light": {
                "value": "rgb(89, 12, 31)",
                "ref": "private.red.900-solid"
            }
        },
        "text-dark-complementary": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.8)",
                "ref": "private.black.800"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.85)",
                "ref": "private.black.850"
            }
        },
        "text-dark-hint": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.4)",
                "ref": "private.black.400"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.5)",
                "ref": "private.black.500"
            }
        },
        "text-dark-primary": {
            "dark": {
                "value": "rgb(0, 0, 0)",
                "ref": "private.black.1000-solid"
            },
            "light": {
                "value": "rgb(0, 0, 0)",
                "ref": "private.black.1000-solid"
            }
        },
        "text-dark-secondary": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.6)",
                "ref": "private.black.600"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.7)",
                "ref": "private.black.700"
            }
        },
        "text-hint": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.4)",
                "ref": "utility.text-light-hint"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.5)",
                "ref": "utility.text-dark-hint"
            }
        },
        "text-info": {
            "dark": {
                "value": "rgb(94, 172, 244)",
                "ref": "private.blue.650-solid"
            },
            "light": {
                "value": "rgb(47, 124, 196)",
                "ref": "private.blue.650-solid"
            }
        },
        "text-info-heavy": {
            "dark": {
                "value": "rgb(175, 213, 249)",
                "ref": "private.blue.850-solid"
            },
            "light": {
                "value": "rgb(29, 57, 85)",
                "ref": "private.blue.900-solid"
            }
        },
        "text-inverted-complementary": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.8)",
                "ref": "utility.text-dark-complementary"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.85)",
                "ref": "utility.text-light-complementary"
            }
        },
        "text-inverted-hint": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.4)",
                "ref": "utility.text-dark-hint"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.5)",
                "ref": "utility.text-light-hint"
            }
        },
        "text-inverted-primary": {
            "dark": {
                "value": "rgb(0, 0, 0)",
                "ref": "utility.text-dark-primary"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "utility.text-light-primary"
            }
        },
        "text-inverted-secondary": {
            "dark": {
                "value": "rgba(0, 0, 0, 0.6)",
                "ref": "utility.text-dark-secondary"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.7)",
                "ref": "utility.text-light-secondary"
            }
        },
        "text-light-complementary": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.8)",
                "ref": "private.white.800"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.85)",
                "ref": "private.white.850"
            }
        },
        "text-light-hint": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.4)",
                "ref": "private.white.400"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.5)",
                "ref": "private.white.500"
            }
        },
        "text-light-primary": {
            "dark": {
                "value": "rgb(255, 255, 255)",
                "ref": "private.white.1000-solid"
            },
            "light": {
                "value": "rgb(255, 255, 255)",
                "ref": "private.white.1000-solid"
            }
        },
        "text-light-secondary": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.6)",
                "ref": "private.white.600"
            },
            "light": {
                "value": "rgba(255, 255, 255, 0.7)",
                "ref": "private.white.700"
            }
        },
        "text-link": {
            "dark": {
                "value": "rgb(255, 190, 92)",
                "ref": "private.yellow.550-solid"
            },
            "light": {
                "value": "rgb(184, 138, 70)",
                "ref": "private.yellow.700-solid"
            }
        },
        "text-link-hover": {
            "dark": {
                "value": "rgb(200, 99, 12)",
                "ref": "private.orange.550-solid"
            },
            "light": {
                "value": "rgb(184, 88, 5)",
                "ref": "private.orange.700-solid"
            }
        },
        "text-link-visited": {
            "dark": {
                "value": "rgb(165, 117, 214)",
                "ref": "private.purple.650-solid"
            },
            "light": {
                "value": "rgb(131, 76, 185)",
                "ref": "private.purple.600-solid"
            }
        },
        "text-link-visited-hover": {
            "dark": {
                "value": "rgb(199, 169, 230)",
                "ref": "private.purple.800-solid"
            },
            "light": {
                "value": "rgb(68, 43, 92)",
                "ref": "private.purple.850-solid"
            }
        },
        "text-misc": {
            "dark": {
                "value": "rgb(128, 153, 176)",
                "ref": "private.cool-grey.650-solid"
            },
            "light": {
                "value": "rgb(89, 109, 126)",
                "ref": "private.cool-grey.650-solid"
            }
        },
        "text-misc-heavy": {
            "dark": {
                "value": "rgb(191, 204, 215)",
                "ref": "private.cool-grey.850-solid"
            },
            "light": {
                "value": "rgb(45, 52, 59)",
                "ref": "private.cool-grey.900-solid"
            }
        },
        "text-positive": {
            "dark": {
                "value": "rgb(113, 192, 175)",
                "ref": "private.green.650-solid"
            },
            "light": {
                "value": "rgb(44, 152, 98)",
                "ref": "private.green.650-solid"
            }
        },
        "text-positive-heavy": {
            "dark": {
                "value": "rgb(184, 223, 215)",
                "ref": "private.green.850-solid"
            },
            "light": {
                "value": "rgb(28, 68, 48)",
                "ref": "private.green.900-solid"
            }
        },
        "text-primary": {
            "dark": {
                "value": "rgb(255, 255, 255)",
                "ref": "utility.text-light-primary"
            },
            "light": {
                "value": "rgb(0, 0, 0)",
                "ref": "utility.text-dark-primary"
            }
        },
        "text-secondary": {
            "dark": {
                "value": "rgba(255, 255, 255, 0.6)",
                "ref": "utility.text-light-secondary"
            },
            "light": {
                "value": "rgba(0, 0, 0, 0.7)",
                "ref": "utility.text-dark-secondary"
            }
        },
        "text-utility": {
            "dark": {
                "value": "rgb(165, 117, 214)",
                "ref": "private.purple.650-solid"
            },
            "light": {
                "value": "rgb(118, 69, 167)",
                "ref": "private.purple.650-solid"
            }
        },
        "text-utility-heavy": {
            "dark": {
                "value": "rgb(210, 186, 235)",
                "ref": "private.purple.850-solid"
            },
            "light": {
                "value": "rgb(56, 37, 74)",
                "ref": "private.purple.900-solid"
            }
        },
        "text-warning": {
            "dark": {
                "value": "rgb(255, 203, 125)",
                "ref": "private.yellow.650-solid"
            },
            "light": {
                "value": "rgb(184, 138, 70)",
                "ref": "private.yellow.700-solid"
            }
        },
        "text-warning-heavy": {
            "dark": {
                "value": "rgb(255, 229, 190)",
                "ref": "private.yellow.850-solid"
            },
            "light": {
                "value": "rgb(89, 48, 13)",
                "ref": "private.orange.900-solid"
            }
        }
    }
};
