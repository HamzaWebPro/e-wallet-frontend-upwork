import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useState } from "react";
import About from "./About";
import Address from "./Address";
import Socials from "./Socials";
import Identity from "./Identity";
import { useSoftUIController } from "context";
import SoftAlert from "components/SoftAlert";


export default function NewUser() {

    const [controller, dispatch] = useSoftUIController();

    const nextPage = () => {
        setActiveStep((prev) => formStep[prev.index + 1])
    }

    const prevPage = () => {
        setActiveStep((prev) => formStep[prev.index - 1])
    }

    const formStep = [
        { label: "Address", index: 0, element: <Address onSave={nextPage} /> },
        { label: "Identity", index: 1, element: <Identity onSave={nextPage} prev={prevPage} /> },
        //{ label: "First Top-up", index: 2, element: <Socials /> },
    ];
    
    const [activeStep, setActiveStep] = useState(formStep[0]);

        return (
            <>
              <DashboardLayout>
                <Stepper activeStep={activeStep.index} alternativeLabel>
                  {formStep.map((step, index) => (
                    <Step key={step.index} onClick={() => setActiveStep(formStep[index])}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
 
                <Grid container spacing={3} className="justify-content-center">
                  <Grid item xs={12} sm={10} xl={10} className="text-center">
                    <Card
                      sx={{
                        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                        p: 1,
                      }}
                    >
                      {activeStep && activeStep.element}
                      
                    </Card>
                  </Grid>
                </Grid>
              </DashboardLayout>
            </>
          );
  
}