import type {SliderProps} from '../Slider';

export interface RangeInputDomain {
    min: number;
    max: number;
    step: number | null;
    marks: number | number[];
    markPoints: number[];
}

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;
const DEFAULT_MARKS = 2;
const FLOATING_POINT_TOLERANCE = 4;

function getMarkPoints(marks: number, min: number, max: number) {
    if (marks === 0) {
        return [];
    }

    if (min === max) {
        return [min];
    }

    if (marks === 1) {
        return [Math.round(((min + max) / 2) * 100) / 100];
    }

    if (marks === 2) {
        return [min, max];
    }

    const distance = (max - min) / (marks - 1);
    return Array.from(
        {length: marks},
        (_, index) => Math.round((min + distance * index) * 100) / 100,
    );
}

export function prepareRangeInputDomain({
    min: minProp = DEFAULT_MIN,
    max: maxProp = DEFAULT_MAX,
    step: stepProp = DEFAULT_STEP,
    marks: marksProp = DEFAULT_MARKS,
}: Pick<SliderProps<number>, 'min' | 'max' | 'step' | 'marks'>): RangeInputDomain {
    const finiteMin = Number.isFinite(minProp) ? minProp : DEFAULT_MIN;
    const finiteMax = Number.isFinite(maxProp) ? maxProp : DEFAULT_MAX;
    const min = Math.min(finiteMin, finiteMax);
    const max = Math.max(finiteMin, finiteMax);
    let step: number | null = null;
    if (stepProp !== null) {
        step = Number.isFinite(stepProp) && stepProp > 0 ? stepProp : DEFAULT_STEP;
    }

    let marks: number | number[];
    if (Array.isArray(marksProp)) {
        marks = Array.from(
            new Set(
                marksProp.filter((point) => Number.isFinite(point) && point >= min && point <= max),
            ),
        ).sort((left, right) => left - right);
    } else {
        marks = Number.isFinite(marksProp) && marksProp > 0 ? Math.floor(marksProp) : 0;
    }

    const markPoints = Array.isArray(marks) ? marks : getMarkPoints(marks, min, max);

    return {min, max, step, marks, markPoints};
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function getDecimalPlaces(value: number) {
    // Keep canonicalization in sync with Slider's step precision.
    return String(value).split('.')[1]?.length ?? 0;
}

function roundToDomainPrecision(value: number, domain: RangeInputDomain) {
    const precision = Math.min(
        100,
        Math.max(
            getDecimalPlaces(domain.min),
            getDecimalPlaces(domain.max),
            getDecimalPlaces(domain.step ?? 0),
        ),
    );

    return Number(value.toFixed(precision));
}

function areClose(left: number, right: number) {
    if (Object.is(left, right)) {
        return true;
    }

    const scale = Math.max(Math.abs(left), Math.abs(right), Number.MIN_VALUE);
    return Math.abs(left - right) <= Number.EPSILON * scale * FLOATING_POINT_TOLERANCE;
}

function getCandidates(value: number, domain: RangeInputDomain) {
    const candidates = [...domain.markPoints];

    if (domain.step !== null) {
        const stepIndex = (value - domain.min) / domain.step;
        const stepValue = roundToDomainPrecision(
            domain.min + Math.round(stepIndex) * domain.step,
            domain,
        );
        if (stepValue >= domain.min && stepValue <= domain.max) {
            candidates.push(stepValue);
        }
    }

    candidates.push(domain.min, domain.max);

    return candidates;
}

export function alignRangeInputValue(value: number, domain: RangeInputDomain) {
    const safeValue = Number.isFinite(value) ? clamp(value, domain.min, domain.max) : domain.min;

    const candidates = getCandidates(safeValue, domain);
    return candidates.reduce((nearest, candidate) => {
        const candidateDistance = Math.abs(candidate - safeValue);
        const nearestDistance = Math.abs(nearest - safeValue);
        return candidateDistance <= nearestDistance ? candidate : nearest;
    }, candidates[0]);
}

export function getAdjacentRangeInputValue(
    value: number,
    direction: 'up' | 'down',
    domain: RangeInputDomain,
) {
    const candidates = new Set([domain.min, domain.max, ...domain.markPoints]);

    if (domain.step !== null) {
        const stepIndex = (value - domain.min) / domain.step;
        const nearestStepIndex = Math.round(stepIndex);
        const normalizedStepIndex = areClose(stepIndex, nearestStepIndex)
            ? nearestStepIndex
            : stepIndex;
        const adjacentIndex =
            direction === 'up'
                ? Math.floor(normalizedStepIndex) + 1
                : Math.ceil(normalizedStepIndex) - 1;
        candidates.add(
            clamp(
                roundToDomainPrecision(domain.min + adjacentIndex * domain.step, domain),
                domain.min,
                domain.max,
            ),
        );
    }

    const orderedCandidates = Array.from(candidates).sort((left, right) => left - right);
    if (direction === 'up') {
        return (
            orderedCandidates.find(
                (candidate) => candidate > value && !areClose(candidate, value),
            ) ?? domain.max
        );
    }

    for (let index = orderedCandidates.length - 1; index >= 0; index -= 1) {
        if (orderedCandidates[index] < value && !areClose(orderedCandidates[index], value)) {
            return orderedCandidates[index];
        }
    }

    return domain.min;
}

export function parseRangeInputDraft(value: string) {
    const normalized = value.trim().replace(',', '.');
    if (!/^[+-]?(?:\d+|\d*\.\d+)$/.test(normalized)) {
        return undefined;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
}
