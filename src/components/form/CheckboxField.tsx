import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../hooks/formContext";

export function CheckboxField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <label className="label">
        <input
          className="checkbox checkbox-sm checkbox-primary"
          type="checkbox"
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
        />
      </label>
      {errors.map((error: { message: string }, i) => (
        <div key={i} className="text-error">
          {error.message}
        </div>
      ))}
    </fieldset>
  );
}
