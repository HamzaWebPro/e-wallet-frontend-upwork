import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useState,useEffect } from "react";
import About from "./About";
import Address from "./Address";
import Socials from "./Socials";
import Identity from "./Identity";
import { useSoftUIController } from "context";
import SoftAlert from "components/SoftAlert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FullProcess() {
  const [controller, dispatch] = useSoftUIController();

  const nextPage = () => {
    setActiveStep((prev) => formStep[prev.index + 1]);
  };

  const prevPage = () => {
    setActiveStep((prev) => formStep[prev.index - 1]);
  };

  const formStep = [
    { label: "User Info", index: 0, element: <About onSave={nextPage} /> },
    { label: "Address", index: 1, element: <Address onSave={nextPage} /> },
    { label: "Identity", index: 2, element: <Identity onSave={nextPage} prev={prevPage} /> },
    //{ label: "First Top-up", index: 2, element: <Socials /> },
  ];

  const [activeStep, setActiveStep] = useState(formStep[0]);
  // redux state for login
  let data = useSelector((state) => state);
  let navigate = useNavigate();
  useEffect(() => {
    if (data.userData.userInfo) {
     return navigate("/activation-process-full");
    }
    if (!data.userData.userInfo) {
    return  navigate("/authentication/sign-in");
    }
  }, []);

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

export default FullProcess;
