import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import UserTable from "../showTable";

export default function ShowForm(){
    const [step,setStep] = useState(1);
    console.log("step", step);

    return (
        <div>
          {step ===  1 && <Step1 setStep={setStep} />
          }
          {step ===  2 && <Step2 setStep={setStep}/>
          }
          {step ===  3 && <UserTable />
          }
        </div>
      );
      
}