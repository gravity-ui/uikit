// The complete source of an example for the Code panel: by default Storybook
// shows the body of render only — the examples are extracted into
// self-contained component files, and Code is assembled from their sources
// (the component plus its adapter hook) and can be copied as is
export const exampleSource = (files: Array<[name: string, code: string]>) =>
    files.map(([name, code]) => `// ─────────── ${name} ───────────\n\n${code}`).join('\n');
