declare module '*.scss';

declare module '*?raw' {
    const content: string;
    export default content;
}
