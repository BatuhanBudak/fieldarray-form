import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { fieldArraySchema } from "./ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const emptyDonation = { institution: "", percentage: 0 };

type FormValues = {
  fullName: string;
  donationAmount: number;
  termsAndConditions: boolean;
  donations: typeof emptyDonation[];
};

const FieldArray = () => {
  const {
    control,
    formState: { isSubmitted, isSubmitting, errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      donationAmount: 0,
      termsAndConditions: false,
      donations: [emptyDonation],
    },
    resolver: yupResolver(fieldArraySchema),
  });

  const { fields, remove, append } = useFieldArray({
    name: "donations",
    control,
  });

  async function onSubmit(data: FormValues) {
    console.log("data", data);
    return new Promise((res) => setTimeout(res, 2500));
  }
  console.log("errors", errors);
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full name"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message ?? ""}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="donationAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    label="Donation amount"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.donationAmount}
                    helperText={errors.donationAmount?.message ?? ""}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">All Donations</Typography>
            </Grid>
            {fields.map((field, i) => (
              <Grid
                container
                item
                key={field.id}
                spacing={2}
                alignItems="center"
              >
                <Grid container item spacing={2} xs={12} sm={10} key={field.id}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name={`donations.${i}.institution` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Institution"
                          fullWidth
                          error={!!errors.donations?.[0]?.institution?.message}
                          helperText={
                            errors.donations?.[0]?.institution?.message ?? ""
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name={`donations.${i}.percentage` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Percentage (%)"
                          fullWidth
                          error={!!errors.donations?.[0]?.percentage?.message}
                          helperText={
                            errors.donations?.[0]?.percentage?.message ?? ""
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button
                    disabled={isSubmitted || isSubmitting}
                    onClick={() => remove(i)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Grid item>
              <Button
                type="button"
                disabled={isSubmitting || isSubmitted}
                variant="contained"
                onClick={() => append(emptyDonation)}
              >
                Add donation
              </Button>
            </Grid>
            <Grid item>
              <Controller
                name="termsAndConditions"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Checkbox />}
                    label={
                      <Typography
                        color={
                          errors.termsAndConditions?.message
                            ? "error"
                            : "default"
                        }
                      >
                        I accept terms and conditions
                      </Typography>
                    }
                  />
                )}
              ></Controller>
            </Grid>
            <Grid item>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={
                  isSubmitting ? <CircularProgress size="0.9rem" /> : undefined
                }
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <p>{errors.donations?.root?.message}</p>
      </CardContent>
    </Card>
  );
};
export default FieldArray;
