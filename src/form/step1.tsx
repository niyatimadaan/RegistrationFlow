import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, useState } from "react";
import * as yup from "yup";
import { submitFirstForm } from "../formSlice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Must be at least  3 characters"),
  age: yup.number().required("Age is required").positive().integer(),
  sex: yup.string().required("Sex is required").oneOf(["Male", "Female"]),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
  idType: yup.string().required("ID Type is required").oneOf(["Aadhar", "PAN"]),
  idNumber: yup.string().when("idType", (idType: any[], schema) => {
    const actualIdType = idType[0];
    return actualIdType === "Aadhar"
      ? schema.matches(
          /^[2-9]\d{11}$/,
          "Aadhar must be  12 numeric digits and should not start with  0 and  1"
        )
      : schema.matches(
          /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
          "PAN must be a ten-character long alpha-numeric string"
        );
  }),
});

interface StepComponentProps {
    setStep: Dispatch<React.SetStateAction<number>>;
}

const Step1: React.FC<StepComponentProps> = ({setStep}) => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
      name: '',
      age: '',
      sex: '',
      mobile: '',
      idType: '',
      idNumber: '',
    });
  
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        await schema.validate(formState, { abortEarly: false });
        dispatch(submitFirstForm(formState)); // Dispatch first form data
        setStep(2);
        // Proceed to Step  2
      } catch (err:any) {
        console.log(err.errors); // Handle validation errors
      }
    };
  
    return (
      <Box sx={{ mt:  10, mx:10 }}>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField name="name" label="Name" value={formState.name} onChange={handleChange} required fullWidth margin="normal" />
            </Grid>
            <Grid item xs={3}>
                <TextField name="age" label="Age" value={formState.age} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={3} my={2}>
                <Select
                name="sex"
                value={formState.sex}
                onChange={handleChange}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>
                Select Sex
                </MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
            </Select>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField name="mobile" label="Mobile" value={formState.mobile} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={2} my={2}>
            <Select
                name="idType"
                value={formState.idType}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value="" disabled>
                Select ID Type
                </MenuItem>
                <MenuItem value="Aadhar">Aadhar</MenuItem>
                <MenuItem value="PAN">PAN</MenuItem>
            </Select>
            </Grid>
            <Grid item xs={4}>
            <TextField name="idNumber" label="ID Number" value={formState.idNumber} onChange={handleChange} fullWidth margin="normal" />
            </Grid>
        </Grid>
        <Box sx={{ mt:  5, mx:10 }}>
            <Button type="submit">Next</Button>
        </Box>
        </form>
      </Box>
    );
  };

export default Step1;
