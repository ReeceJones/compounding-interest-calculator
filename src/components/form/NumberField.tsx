import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../hooks/formContext";

export function NumberField({
  label,
  placeholder,
  description,
}: {
  label: string;
  placeholder: string;
  description: string;
}) {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        value={
          field.state.value !== undefined && field.state.value !== null
            ? field.state.value.toString()
            : ""
        }
        onChange={(e) => field.handleChange(e.target.valueAsNumber)}
        onBlur={field.handleBlur}
        type="number"
        className="input"
        placeholder={placeholder}
      />
      <p className="label whitespace-break-spaces">{description}</p>
      {errors.map((error: { message: string }, i) => (
        <div key={i} className="text-error">
          {error.message}
        </div>
      ))}
    </fieldset>
  );
}
