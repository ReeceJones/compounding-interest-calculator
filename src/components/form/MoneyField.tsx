import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../hooks/formContext";
import { IMaskInput } from "react-imask";

export function MoneyField({
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
      <IMaskInput
        mask="$num"
        unmask={true}
        blocks={{
          num: {
            mask: Number,
            thousandsSeparator: ",",
            scale: 2,
            normalizeZeros: true,
            radix: ".",
            padFractionalZeros: true,
          },
        }}
        value={field.state.value?.toString() ?? undefined}
        onAccept={(value) =>
          field.handleChange(value ? Number(value) : Number.NaN)
        }
        onBlur={field.handleBlur}
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
