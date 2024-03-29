import { useState, useEffect } from "react";
import { Button, TextField, Box, Autocomplete, Grid } from "@mui/material";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { submitSecondForm } from "../formSlice";

interface Country {
  name: {
    common: string;
  };
}

interface StepComponentProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const addressSchema = yup.object().shape({
  //   address: yup.string().required("Address is required"),
  //   state: yup.string().required("State is required"),
  //   city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be  6 digits"),
});

const Step2: React.FC<StepComponentProps> = ({ setStep }) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<string[]>([]);
  const [formState, setFormState] = useState({
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Error fetching countries");
        }
        const data: Country[] = await response.json();
        console.log(data);
        setCountries(data.map(d => d.name.common))
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (event: any, value: any) => {
    setFormState({ ...formState, country: value });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await addressSchema.validate(formState, { abortEarly: false });
      dispatch(submitSecondForm(formState));
      setStep(3);
    } catch (err: any) {
      alert(err.errors);
      console.log(err.errors); // Handle validation errors
    }
  };

  return (
    <Box sx={{ mt: 10, mx: 10 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="address"
              label="Address"
              value={formState.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="state"
              label="state"
              value={formState.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="city"
              label="city"
              value={formState.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="pincode"
              label="pincode"
              value={formState.pincode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6} my={2}>
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Step2;
