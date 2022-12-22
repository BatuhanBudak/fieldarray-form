import { screen, waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FieldArray from "../../src/components/FieldArray/FieldArray";
import { FormValues } from "../../src/components/FieldArray/FieldArrayTypes";

const onSubmit = jest.fn((data: FormValues) => {
  return Promise.resolve(data);
});

describe("Fieldarray form", () => {
  const fullName = "Batuhan";
  const donationAmount = "100";
  const institutionName = "Red Cross";
  const donationPercentage = "100";
  const user = userEvent.setup();
  beforeEach(() => {
    onSubmit.mockClear();
    render(<FieldArray onSubmit={onSubmit} />);
  });

  test("All fields are in the document", () => {
    expect(getFullName()).toBeInTheDocument();
    expect(getDonationAmount()).toBeInTheDocument();
    expect(getInstitutionByIndex(0)).toBeInTheDocument();
    expect(getPercentageByIndex(0)).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
    expect(getAddDonationButton()).toBeInTheDocument();
    expect(getDeleteButtonByIndex(0)).toBeInTheDocument();
    expect(getCheckbox()).toBeInTheDocument();
  });
  test("Fullname field shows error if it's blank when submitting", async () => {
    await user.click(getSubmitButton());
    await waitFor(() => {
      expect(screen.getByText(/Your name is required/i)).toBeInTheDocument();
    });
  });

  test("Donation amount field shows error if it's blank when submitting", async () => {
    await user.click(getSubmitButton());
    await waitFor(() => {
      expect(
        screen.getByText(/Donation amount must be greater than or equal to 10/i)
      ).toBeInTheDocument();
    });
  });

  test("Institution field shows error if it's blank when submitting", async () => {
    await user.click(getSubmitButton());
    await waitFor(() => {
      expect(
        screen.getByText(/Institution name is needed/i)
      ).toBeInTheDocument();
    });
  });

  test("Percentage field shows error if it's blank when submitting", async () => {
    await user.click(getSubmitButton());
    await waitFor(() => {
      expect(
        screen.getByText(/Percentage needs to be at least 1%/i)
      ).toBeInTheDocument();
    });
  });

  test("onSubmit is called when all fields pass validation", async () => {
    await user.type(getFullName(), fullName);
    await user.type(getDonationAmount(), donationAmount);
    const institution = screen.getByRole("textbox", {
      name: /institution/i,
    });
    const percentage = screen.getByRole("textbox", {
      name: /percentage/i,
    });

    await user.type(institution, institutionName);
    await user.type(percentage, donationPercentage);
    await user.click(getCheckbox());
    await user.click(getSubmitButton());

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const functionArg = onSubmit.mock.calls[0][0];

      expect(functionArg).toMatchObject({
        fullName,
        donationAmount: 100,
        donations: [{ institution: institutionName, percentage: 100 }],
        termsAndConditions: true,
      });

      expect(functionArg).toEqual({
        fullName,
        donationAmount: 100,
        donations: [{ institution: institutionName, percentage: 100 }],
        termsAndConditions: true,
      });
    });
  });
  // test.only("inst in document", async () => {
  //   const inst = screen.getByTestId(/donations.0.institution/i);
  //   expect(inst).toBeInTheDocument();
  //   await user.type(inst, institution);
  //   await waitFor(() => {
  //     expect(inst).toHaveValue(institution);
  //   });
  //   preview.debug();
  // });
});

const getFullName = () => {
  return screen.getByRole("textbox", { name: /full name/i });
};

const getDonationAmount = () => {
  return screen.getByRole("spinbutton", { name: /Donation amount/i });
};

const getInstitutionByIndex = (i: number) => {
  return screen.getByTestId(`donations.${i}.institution`);
};

const getPercentageByIndex = (i: number) => {
  return screen.getByTestId(`donations.${i}.percentage`);
};

const getSubmitButton = () => {
  return screen.getByRole("button", { name: /submit/i });
};

const getAddDonationButton = () => {
  return screen.getByRole("button", { name: /add donation/i });
};

const getDeleteButtonByIndex = (index: number) => {
  return screen.getByTestId(`donations.${index}.delete`);
};

const getCheckbox = () => {
  return screen.getByRole("checkbox", {
    name: /I accept terms and conditions/i,
  });
};
