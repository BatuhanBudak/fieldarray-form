import * as yup from "yup";

export const fieldArraySchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Your name is required")
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .min(3, "Your name must be at lest 3 characters long")
    .max(15, "Your name must be 15 characters at the most"),
  donationAmount: yup
    .number()
    .required("Donation amount is required")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .min(10, "Donation amount must be greater than or equal to 10"),
  termsAndConditions: yup.boolean().required().isTrue(),
  donations: yup
    .array()
    .of(
      yup.object().shape({
        institution: yup
          .string()
          .required("Institution name is needed")
          .min(3, "Institution name needs to be at least 3 characters long")
          .max(10, "Institution name needs to be at most 10 characters long"),
        percentage: yup
          .number()
          .required("Percentage is needed")
          .min(1, "Percentage needs to be at least 1%")
          .max(100, "Percentage can be at most 100%"),
      })
    )
    .min(1, "You need to provide at least 1 instution")
    .max(3, "You can provide 3 instutions at max")
    .test((donations, ctx) => {
      const sum = donations?.reduce(
        (acc, curr) => acc + (curr.percentage || 0),
        0
      );

      if (sum !== 100) {
        return new yup.ValidationError(
          `Percentage should be 100%, but you have ${sum}%`,
          undefined,
          "donations.donations"
        );
        // return ctx.createError({ message: "SKU missing correct prefix" });
      }

      return true;
    }),
});
