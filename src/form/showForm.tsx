import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";

export default function ShowForm(){
    const [step,setStep] = useState(1);

    return (
        <div>
          {step ===  1 && <Step1 setStep={setStep} />
          }
          {step ===  2 && <Step2/>
          }
        </div>
      );
      
}