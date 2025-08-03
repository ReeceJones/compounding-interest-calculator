import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

const frequencySchema = z.enum(["daily", "monthly", "quarterly", "yearly"]);

export const mainFormSchema = z.object({
  principal: z.number("Number is required").min(0),
  interestRate: z.number("Number is required").min(0),
  years: z.number("Number is required").min(0).max(150),
  compoundingFrequency: frequencySchema,
  contributionAmount: z.number("Number is required").min(0),
  contributionFrequency: frequencySchema,
  expectedContributionGrowth: z.number("Number is required").min(0),
  expectedInflationRate: z.number("Number is required").min(0),
});

export const mainFormOptions = formOptions({
  canSubmitWhenInvalid: false,
  validators: {
    onMount: mainFormSchema,
    onChangeAsync: mainFormSchema,
    onSubmit: mainFormSchema,
    onBlurAsync: mainFormSchema,
  },
  defaultValues: {
    principal: 0,
    interestRate: 8,
    years: 10,
    compoundingFrequency: "yearly",
    contributionAmount: 0,
    contributionFrequency: "monthly",
    expectedContributionGrowth: 0,
    expectedInflationRate: 2,
  },
});
