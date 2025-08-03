import { IconCalculator } from "@tabler/icons-react";
import { useFormContext } from "../../hooks/formContext";

export function CalculateButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isValid}>
      {(isValid) => (
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-full"
        >
          <IconCalculator />
          Calculate
        </button>
      )}
    </form.Subscribe>
  );
}
