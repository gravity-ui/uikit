export type CaseName = string;
export type Cases<T> = Array<[CaseName, T]>;

export type ScenarioName = string;
export type ScenarioDetails = {tag: Array<string>};
export type Scenario<T> = [ScenarioName, ScenarioDetails, T];
