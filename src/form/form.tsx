import React, { useState } from 'react';
import Step1 from './step1';
// import Step1 from './Step1';

type FormState = {
  name: string;
  age: string;
  sex: string;
  mobile: string;
  idType: string;
  idNumber: string;
};

type Step1Props = {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type Form2State = {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
};

type Step2Props = {
  formState: Form2State;
  setFormState: React.Dispatch<React.SetStateAction<Form2State>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

 // Assuming Step1 is defined in a separate file

const ParentComponent: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    age: '',
    sex: '',
    mobile: '',
    idType: '',
    idNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation or submission logic
  };

  return (
    <></>
    // <Step1
    //   formState={formState}
    //   setFormState={setFormState}
    //   handleChange={handleChange}
    //   handleSubmit={handleSubmit}
    // />
  );
};

export default ParentComponent;
