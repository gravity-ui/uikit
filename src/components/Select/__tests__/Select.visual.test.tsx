import { smokeTest, test } from "~playwright/core";

import { createSmokeScenarios } from "../../../stories/tests-factory/create-smoke-scenarios";
import { Select } from "../Select";
import type { SelectProps } from "../types";

import {
    hasClearCases,
    labelCases,
    pinCases,
    popupPlacementCases,
    popupWidthCases,
    sizeCases,
    validationStateCases,
    viewCases,
    widthCases
} from "./cases";
import { getSelectOptionTestQA, SelectTestQA } from "./constants";
import { SelectQa } from "../constants";
import { expect } from "@playwright/experimental-ct-react";

test.describe("Select", { tag: "@Select" }, () => {
    smokeTest("trigger with value", async ({ mount, expectScreenshot }) => {
        const smokeScenarios = createSmokeScenarios<SelectProps<string>>({
            value: ["val1"],
            qa: SelectTestQA.trigger
        }, {
            size: sizeCases,
            view: viewCases,
            pin: pinCases,
            width: widthCases,
            validationState: validationStateCases,
            label: labelCases,
            hasClear: hasClearCases
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props}>
                                <Select.Option
                                    value="val1"
                                    content="Value1"
                                    qa={getSelectOptionTestQA("val1")}
                                />
                            </Select>
                        </div>
                    </div>
                ))}
            </div>
        );

        await expectScreenshot({
            themes: ["light"]
        });
    });

    smokeTest("empty trigger", async ({ mount, expectScreenshot }) => {
        const smokeScenarios = createSmokeScenarios<SelectProps<string>>({
            qa: SelectTestQA.trigger,
            placeholder: "Placeholder"
        }, {
            size: sizeCases,
            view: viewCases,
            pin: pinCases,
            width: widthCases,
            validationState: validationStateCases,
            label: labelCases,
            hasClear: hasClearCases,
            placeholder: [["without", undefined]]
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props}>
                                <Select.Option
                                    value="val1"
                                    content="Value1"
                                    qa={getSelectOptionTestQA("val1")}
                                />
                            </Select>
                        </div>
                    </div>
                ))}
            </div>
        );

        await expectScreenshot({
            themes: ["light"]
        });
    });

    createSmokeScenarios<SelectProps<string>>(
        {
            value: ['val1'],
            width: 200,
            qa: SelectTestQA.trigger,
            popupWidth: 100,
        },
        {
            popupPlacement: popupPlacementCases,
            popupWidth: popupWidthCases,
        },
        {
            scenarioName: "popup placement"
        }
    ).forEach(([title, props]) => {
        smokeTest(title, async ({ mount, page, expectScreenshot }) => {
            await page.setViewportSize({ width: 600, height: 600 });

            const root = await mount(
                <div style={{ padding: 200 }}>
                    <div>
                        <h4>{title}</h4>
                    </div>
                    <Select {...props}>
                        <Select.Option
                            value="val1"
                            content="Value 1"
                            qa={getSelectOptionTestQA("val1")}
                        />
                        <Select.Option
                            value="val2"
                            content="Value2"
                            qa={getSelectOptionTestQA("val2")}
                            disabled
                        />
                        <Select.OptionGroup label="Group 1">
                            <Select.Option
                                value="val5"
                                content="Value5"
                                qa={getSelectOptionTestQA("val5")}
                            />
                            <Select.Option
                                value="val6"
                                content="Value6"
                                qa={getSelectOptionTestQA("val6")}
                                disabled
                            />
                        </Select.OptionGroup>
                    </Select>
                </div>
            );

            await root.getByTestId(SelectTestQA.trigger).click();
            // await expect(page.getByTestId(SelectQa.LIST)).toBeVisible();

            await expectScreenshot({
                themes: ["light"],
                component: page,
            });
        });
    });

    /*
    // save errorr
    createSmokeScenarios<SelectProps<string>>(
        {
            ...defaultProps,
            errorMessage: "Error message",
            validationState: "invalid"
        },
        {
            errorPlacement: errorPlacementCases
        },
        {
            scenarioName: "error state"
        }
    ).forEach(([title, props]) => {
        smokeTest(title, async ({ mount, page, expectScreenshot }) => {
            await page.setViewportSize({ width: 500, height: 500 });

            await mount(
                <Select {...props}>
                    <Select.Option
                        value="val1"
                        content="Value 1"
                        qa={getSelectOptionTestQA("val1")}
                    />
                    <Select.Option
                        value="val2"
                        content="Value 2"
                        qa={getSelectOptionTestQA("val2")}
                    />
                </Select>
            );

            await expectScreenshot({
                themes: ["light"]
            });
        });
    });

    // kekw
    createSmokeScenarios<SelectProps<string>>(
        {
            value: ["val1", "val5"],
            qa: SelectTestQA.trigger,
            multiple: true
        },
        {
            hasCounter: hasCounterCases,
            validationState: validationStateCases
        },
        {
            scenarioName: "multiple"
        }
    ).forEach(([title, props]) => {
        smokeTest(title, async ({ mount, page, expectScreenshot }) => {
            await page.setViewportSize({ width: 500, height: 500 });

            const root = await mount(
                <div style={{ width: 300 }}>
                    <Select {...props}>
                        <Select.Option
                            value="val1"
                            content="Value1"
                            qa={getSelectOptionTestQA("val1")}
                        />
                        <Select.Option
                            value="val2"
                            content="Value2"
                            qa={getSelectOptionTestQA("val2")}
                        />
                        <Select.Option
                            value="val3"
                            content="Value3"
                            qa={getSelectOptionTestQA("val3")}
                        />
                        <Select.Option
                            value="val4"
                            content="Value4"
                            qa={getSelectOptionTestQA("val4")}
                            disabled
                        />
                        <Select.OptionGroup label="Group 1">
                            <Select.Option
                                value="val5"
                                content="Value5"
                                qa={getSelectOptionTestQA("val5")}
                            />
                            <Select.Option
                                value="val6"
                                content="Value6"
                                qa={getSelectOptionTestQA("val6")}
                                disabled
                            />
                        </Select.OptionGroup>
                    </Select>
                </div>
            );

            await expectScreenshot({
                themes: ["light"]
            });

            await root.getByTestId(SelectTestQA.trigger).click();

            await expectScreenshot({
                themes: ["light"],
                component: page,
                nameSuffix: "after click on trigger"
            });
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            filterPlaceholder: filterPlaceholderCases
        },
        {
            scenarioName: "with filter"
        }
    ).forEach(([title, props]) => {
        smokeTest(title, async ({ mount, page, expectScreenshot }) => {
            await page.setViewportSize({ width: 500, height: 500 });

            const root = await mount(<TestSelectWithFilter {...props} />);

            await root.getByTestId(SelectTestQA.trigger).click();

            await expectScreenshot({
                themes: ["light"],
                component: page
            });
        });
    });

*/

});
