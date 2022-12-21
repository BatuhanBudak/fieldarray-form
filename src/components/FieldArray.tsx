import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const emptyDonation = { institution: "", percentage: 0 };

type FormValues = {
  fullName: string;
  donationAmount: number;
  termsAndConditions: boolean;
  donations: typeof emptyDonation[];
};

const FieldArray = () => {
  const {
    register,
    control,
    formState: { isSubmitted, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      donationAmount: 0,
      termsAndConditions: false,
      donations: [emptyDonation],
    },
  });

  const { fields, remove, append } = useFieldArray({
    name: "donations",
    control,
  });

  return (
    <form>
      <input {...register("fullName")} />
      <input
        type={"number"}
        {...(register("donationAmount"), { valueAsNumber: true })}
      />
      <h2>All Donations</h2>
      {fields.map((field, i) => (
        <div key={field.id}>
          <section key={field.id}>
            <input {...register(`donations.${i}.institution` as const)} />
            <input {...register(`donations.${i}.percentage` as const)} />
            <button
              disabled={isSubmitted || isSubmitting}
              onClick={() => remove(i)}
            >
              Delete
            </button>
          </section>
        </div>
      ))}

      <button type="button" onClick={() => append(emptyDonation)}>
        Add donation:
      </button>
      <input type="checkbox" />
      <button>
        {isSubmitting ? "Submitting" : isSubmitted ? "Submited" : "Submit"}
      </button>
    </form>
  );
};
export default FieldArray;
