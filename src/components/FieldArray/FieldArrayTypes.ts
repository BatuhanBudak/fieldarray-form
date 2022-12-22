import { emptyDonationType } from "./emptyDonation";

export type FormValues = {
  fullName: string;
  donationAmount: number;
  termsAndConditions: boolean;
  donations: emptyDonationType[];
};
export type FieldArrayFormProps = {
  onSubmit: (formValue: FormValues) => void;
};
