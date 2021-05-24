import { Button, MobileStepper, Paper, Typography } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MobileSelectableList, { renderPatientRow } from "./MobileSelectableList";
import DirectoryList from "./DirectoryList";
import Patient from "./Model/Patient";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 400,
            flexGrow: 1,
            height: "calc(100vh - 66px)",
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default
        },
    }),
);

function MobileProcess(){
    const classes = useStyles();

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((val) => val + 1);
    }
    const handleBack = () => {
        setActiveStep((val) => val - 1);
    }
    const stepNames = ["Select a patient", "Select a recipient", "Select a due date"]
    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
                <Typography>{stepNames[activeStep]}</Typography>
            </Paper>
            <MobileStepper
                variant="dots"
                steps={3}
                activeStep={activeStep}
                style={{height: "50px", position: "relative"}}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                    </Button>
                }
            />
            {(() => {
                switch (activeStep) {
                    case 0:
                        return <MobileSelectableList RowRenderFunction={renderPatientRow} SearchText="Search for patients by name, URN or DOB" getCount={() => 100} getItemAtIndex={(idx) => new Patient("123456789","13/07/2091",`Patient: ${idx}`)}/>
                    case 1:
                        return <DirectoryList/>
                }
            })()}
        </div>
    );
}
export default MobileProcess;