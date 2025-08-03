import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./formContext";
import { NumberField } from "../components/form/NumberField";
import { MoneyField } from "../components/form/MoneyField";
import { PercentField } from "../components/form/PercentField";
import { FrequencyField } from "../components/form/FrequencyField";
import { GoalTypeField } from "../components/form/GoalTypeField";
import { CheckboxField } from "../components/form/CheckboxField";
import { CalculateButton } from "../components/form/CalculateButton";

export const {
  useAppForm: useMainForm,
  withForm: withMainForm,
  withFieldGroup: withMainFormFieldGroup,
} = createFormHook({
  fieldComponents: {
    NumberField,
    MoneyField,
    PercentField,
    FrequencyField,
    GoalTypeField,
    CheckboxField,
  },
  formComponents: {
    CalculateButton,
  },
  fieldContext,
  formContext,
});
