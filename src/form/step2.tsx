import { useState, useEffect } from "react";
import { Button, TextField, Box, Autocomplete } from "@mui/material";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { submitSecondForm } from "../formSlice";

interface Country {
  name: {
    common: string;
  };
}

const addressSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be  6 digits"),
});

const Step2 = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState<Country[]>([]);
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
        setCountries(data);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (event: any, value: any) => {
    setFormState({ ...formState, country: value });
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      await addressSchema.validate(formState, { abortEarly: false });
      dispatch(submitSecondForm(formState));
      
    } catch (err: any) {
      console.log(err.errors); // Handle validation errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="address"
        label="Address"
        value={formState.address}
        onChange={handleChange}
      />
      <TextField name="state" label="state" value={formState.state} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="city" label="city" value={formState.city} onChange={handleChange} fullWidth margin="normal" />
      {/* <TextField name="country" label="country" value={formState.country} onChange={handleChange} fullWidth margin="normal" /> */}
      <TextField name="pincode" label="pincode" value={formState.pincode} onChange={handleChange} fullWidth margin="normal" />
      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option.name.common}
        onChange={handleCountryChange}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Step2;
