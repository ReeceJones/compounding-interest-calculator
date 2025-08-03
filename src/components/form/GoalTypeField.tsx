import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../hooks/formContext";

export function GoalTypeField({
  label,
  placeholder,
  description,
}: {
  label: string;
  placeholder: string;
  description: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <select
        className="select"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      >
        <option value="retirement">Retirement</option>
        <option value="savings">Savings</option>
        <option value="other">Other</option>
      </select>
      <p className="label whitespace-break-spaces">{description}</p>
      {errors.map((error: { message: string }, i) => (
        <div key={i} className="text-error">
          {error.message}
        </div>
      ))}
    </fieldset>
  );
}
