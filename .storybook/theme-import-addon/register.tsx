import * as React from 'react';

import {Palette} from '@gravity-ui/icons';
import {decompressFromEncodedURIComponent} from 'lz-string';
import {
    AddonPanel,
    Form,
    IconButton,
    TooltipLinkList,
    WithTooltip,
} from 'storybook/internal/components';
import {addons, types} from 'storybook/manager-api';
import {styled} from 'storybook/theming';

import {
    ADDON_ID,
    APPLY_THEME_EVENT,
    PANEL_ID,
    RESET_THEME_EVENT,
    SET_THEME_SOURCE_EVENT,
    TOOL_ID,
    clearStoredTheme,
    compileTheme,
    getStoredThemeSource,
    storeThemeSource,
} from './shared';

const APPLY_THEME_DEBOUNCE = 500;
const THEME_ERROR_ID = `${ADDON_ID}/parser-error`;
const THEME_QUERY_PARAM = 'theme';

const AddonPanelContainer = styled.div({
    height: '100%',
    minHeight: 0,
    '& > div': {
        height: '100%',
        minHeight: 0,
    },
});

const ThemeTextarea = styled(Form.Textarea)(({theme}) => ({
    flex: 1,
    minHeight: 0,
    maxHeight: 'none',
    overflow: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    resize: 'vertical',
    '&[aria-invalid="true"]': {
        boxShadow: `${theme.color.negative} 0 0 0 2px inset !important`,
        outline: `2px solid ${theme.color.negative}`,
        outlineOffset: -2,
    },
}));

const ThemeError = styled.div(({theme}) => ({
    flex: 'none',
    padding: '8px 10px',
    color: theme.color.negative,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
}));

addons.register(ADDON_ID, () => {
    applyThemeFromUrl();

    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Import theme',
        render: ({active}) => <ThemeImportPanel active={Boolean(active)} />,
    });
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Theme',
        render: () => <ThemeImportTool />,
    });
});

function ThemeImportTool() {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const selectThemeFile = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
        }
    }, []);

    const importThemeFile = React.useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files?.[0];

            if (!file) {
                return;
            }

            addons.getChannel().emit(SET_THEME_SOURCE_EVENT, await file.text());
        },
        [],
    );

    const resetImportedTheme = React.useCallback(() => {
        resetPublishedTheme();
    }, []);

    return (
        <React.Fragment>
            <WithTooltip
                placement="top"
                closeOnOutsideClick
                onVisibleChange={setIsMenuOpen}
                tooltip={({onHide}) => (
                    <TooltipLinkList
                        links={[
                            {
                                id: 'import',
                                title: 'Import theme',
                                onClick: () => {
                                    onHide();
                                    selectThemeFile();
                                },
                            },
                            {
                                id: 'reset',
                                title: 'Reset theme',
                                onClick: () => {
                                    resetImportedTheme();
                                    onHide();
                                },
                            },
                        ]}
                    />
                )}
            >
                <IconButton active={isMenuOpen} aria-label="Theme actions" title="Theme actions">
                    <Palette width={14} height={14} aria-hidden="true" />
                </IconButton>
            </WithTooltip>
            <input
                ref={inputRef}
                type="file"
                accept=".css,.json,text/css,application/json"
                aria-hidden="true"
                tabIndex={-1}
                style={{display: 'none'}}
                onChange={importThemeFile}
            />
        </React.Fragment>
    );
}

const styles = {
    panel: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
    },
} satisfies Record<string, React.CSSProperties>;

function ThemeImportPanel({active}: {active: boolean}) {
    const [source, setSource] = React.useState(() => getStoredThemeSource() ?? '');
    const [parserError, setParserError] = React.useState<string | null>(null);
    const previousSourceRef = React.useRef(source);

    React.useEffect(() => {
        const channel = addons.getChannel();
        const syncImportedTheme = (newSource: string) => {
            setSource(newSource);
            setParserError(null);
        };
        const syncResetTheme = () => {
            previousSourceRef.current = '';
            setSource('');
            setParserError(null);
        };

        channel.on(APPLY_THEME_EVENT, syncImportedTheme);
        channel.on(SET_THEME_SOURCE_EVENT, syncImportedTheme);
        channel.on(RESET_THEME_EVENT, syncResetTheme);

        return () => {
            channel.off(APPLY_THEME_EVENT, syncImportedTheme);
            channel.off(SET_THEME_SOURCE_EVENT, syncImportedTheme);
            channel.off(RESET_THEME_EVENT, syncResetTheme);
        };
    }, []);

    React.useEffect(() => {
        const hadSource = Boolean(previousSourceRef.current.trim());

        previousSourceRef.current = source;

        if (!source.trim() && !hadSource) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            if (!source.trim()) {
                resetPublishedTheme();
                return;
            }

            try {
                publishTheme(source);
                setParserError(null);
            } catch (error) {
                setParserError(getErrorMessage(error));
            }
        }, APPLY_THEME_DEBOUNCE);

        return () => window.clearTimeout(timeoutId);
    }, [source]);

    return (
        <AddonPanelContainer>
            <AddonPanel active={active}>
                <div style={styles.panel}>
                    <ThemeTextarea
                        aria-label="Theme CSS or JSON"
                        value={source}
                        placeholder="Paste an exported theme here"
                        size="flex"
                        valid={parserError ? 'error' : undefined}
                        aria-invalid={parserError ? true : undefined}
                        aria-describedby={parserError ? THEME_ERROR_ID : undefined}
                        onChange={(event) => {
                            setSource(event.currentTarget.value);
                            setParserError(null);
                        }}
                    />
                    {parserError ? (
                        <ThemeError id={THEME_ERROR_ID} role="alert">
                            {parserError}
                        </ThemeError>
                    ) : null}
                </div>
            </AddonPanel>
        </AddonPanelContainer>
    );
}

function publishTheme(source: string) {
    const theme = compileTheme(source);

    storeThemeSource(source);
    addons.getChannel().emit(APPLY_THEME_EVENT, source);

    return theme;
}

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : String(error);
}

function resetPublishedTheme() {
    clearStoredTheme();
    removeThemeFromUrl();
    addons.getChannel().emit(RESET_THEME_EVENT);
}

function applyThemeFromUrl() {
    const compressedTheme = new URL(window.location.href).searchParams.get(THEME_QUERY_PARAM);

    if (!compressedTheme) {
        return;
    }

    const source = decompressFromEncodedURIComponent(compressedTheme);

    if (!source) {
        console.error('Failed to read the imported Gravity UI theme from the URL.');
        return;
    }

    const formattedSource = formatThemeSource(source);

    storeThemeSource(formattedSource);
    removeThemeFromUrl();
    addons.getChannel().emit(APPLY_THEME_EVENT, formattedSource);
}

function formatThemeSource(source: string) {
    try {
        return JSON.stringify(JSON.parse(source), null, 2);
    } catch {
        return source;
    }
}

function removeThemeFromUrl() {
    const url = new URL(window.location.href);

    if (!url.searchParams.has(THEME_QUERY_PARAM)) {
        return;
    }

    url.searchParams.delete(THEME_QUERY_PARAM);
    window.history.replaceState(window.history.state, '', url);
}
