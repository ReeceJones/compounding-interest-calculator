import { mainFormOptions, mainFormSchema } from "../schemas/mainForm";
import { useMainForm } from "../hooks/useMainForm";
import { MainFormFields } from "./MainFormFields";
import { InterestGraph } from "./InterestGraph";
import { useState } from "react";
import z from "zod";

export function MainForm() {
  const form = useMainForm({
    ...mainFormOptions,
    onSubmit: ({ value }) => {
      setData(value as z.infer<typeof mainFormSchema>);
    },
  });
  const [data, setData] = useState<z.infer<typeof mainFormSchema> | undefined>(
    undefined
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="space-y-4">
        <MainFormFields form={form} />
        <form.AppForm>
          <form.CalculateButton />
        </form.AppForm>
      </div>
      {data && <InterestGraph data={data} />}
      {!data && (
        <div className="prose max-w-none bg-base-200 border-base-300 rounded-lg px-4 py-16 text-center h-fit col-span-2">
          <h3>
            Press "<span className="underline">Calculate</span>" to see your
            investments grow!
          </h3>
        </div>
      )}
    </form>
  );
}
