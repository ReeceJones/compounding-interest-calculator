import { withMainForm } from "../hooks/useMainForm";
import { mainFormOptions } from "../schemas/mainForm";

export const MainFormFields = withMainForm({
  ...mainFormOptions,
  render: ({ form }) => {
    return (
      <div className="p-6 bg-base-200 border-base-300 rounded-md mt-1">
        <form.AppField
          name="principal"
          children={(field) => (
            <field.MoneyField
              label="Principal"
              placeholder="200"
              description="The amount of money you're starting with"
            />
          )}
        />
        <form.AppField
          name="interestRate"
          children={(field) => (
            <field.PercentField
              label="Interest Rate"
              placeholder="8"
              description="The interest rate you're expecting to earn"
            />
          )}
        />
        <form.AppField
          name="compoundingFrequency"
          children={(field) => (
            <field.FrequencyField
              label="Compounding Frequency"
              placeholder="Yearly"
              description="How often the interest is compounded"
            />
          )}
        />
        <form.AppField
          name="years"
          children={(field) => (
            <field.NumberField
              label="Years"
              placeholder="10"
              description="The number of years you're expecting to invest"
            />
          )}
        />
        <form.AppField
          name="contributionAmount"
          children={(field) => (
            <field.MoneyField
              label="Contribution Amount"
              placeholder="100"
              description="The amount of money you're contributing each year"
            />
          )}
        />
        <form.AppField
          name="contributionFrequency"
          children={(field) => (
            <field.FrequencyField
              label="Contribution Frequency"
              placeholder="Monthly"
              description="How often you're contributing to your investment"
            />
          )}
        />
        <form.AppField
          name="expectedContributionGrowth"
          children={(field) => (
            <field.PercentField
              label="Expected Contribution Growth (Yearly)"
              placeholder="0"
              description="The expected growth rate of your contributions each year. For example, if you receive a 5% raise, you may wish to contribute 5% more to your investments."
            />
          )}
        />
        <form.AppField
          name="expectedInflationRate"
          children={(field) => (
            <field.PercentField
              label="Expected Inflation Rate"
              placeholder="2"
              description="The expected inflation rate"
            />
          )}
        />
      </div>
    );
  },
});
