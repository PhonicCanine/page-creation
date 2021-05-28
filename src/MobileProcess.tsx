import { Button, MobileStepper, Paper, Step, StepLabel, Stepper, Typography, useMediaQuery } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MobileSelectableList, { renderPatientRow } from "./MobileSelectableList";
import DirectoryList from "./DirectoryList";
import Patient from "./Model/Patient";
import FinalStep from "./FinalStep";
import { charLimit } from "./constants";
import { FHIRPractitionerRole } from "./Model/FHIRPractitionerRole";
import { FHIRPractitioner } from "./Model/FHIRPractitioner";
import FHIRPaginatedList from "./Model/FHIRPaginatedList";
import { AutoSizer } from "react-virtualized";

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
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
    const [selectedPatient, updateSelectedPatient] = useState<Patient|null>(null);
    const [selectedRoles, updateSelectedRoles] = useState<FHIRPractitionerRole[]>([]);
    const [selectedPractitioners, updateSelectedPractitioners] = useState<FHIRPractitioner[]>([]);
    const [dateDue, updateDueDate] = useState(new Date());
    const [taskDescription, updateTaskDescription] = useState("");
    const handleNext = () => {
        setActiveStep((val) => val + 1);
    }
    const handleBack = () => {
        setActiveStep((val) => val - 1);
    }
    const getNextButtonActive = () => {
        switch (activeStep) {
            case 0:
                return selectedPatient !== null;
            case 1:
                return selectedRoles.length + selectedPractitioners.length > 0;
            case 2:
                return taskDescription.length > 0 && taskDescription.length <= charLimit;
        }
    }
    const stepNames = ["Select a patient", "Select a recipient", "Select a due date"]
    const matches = !(useMediaQuery('(min-width:600px)'));

    return (
        <AutoSizer>
            {(size) => {
                return (
                    <div className={classes.root} style={{width: size.width, height: size.height}}>
                        
                        {matches && 
                        <>
                        <Paper square elevation={0} className={classes.header}>
                            <Typography>{stepNames[activeStep]}</Typography>
                        </Paper>
                        <MobileStepper
                            variant="dots"
                            steps={3}
                            activeStep={activeStep}
                            style={{height: "50px", position: "relative"}}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === 3 || !(getNextButtonActive())}>
                                {activeStep < 2 ? "Next" : "Send"}
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
                        </>}
                        {!matches && <Stepper activeStep={activeStep} alternativeLabel style={{height: 56, paddingTop: 20}}>
                            {stepNames.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                        }
                            {
                                (() => {
                                    let height = size.height - 50 - 66;
                                    let width = size.width;
                                    console.log(size);
                                    switch (activeStep) {
                                        case 0:
                                            return (
                                            <MobileSelectableList 
                                                RowRenderFunction={renderPatientRow} 
                                                SearchText="Search for patients by name, URN or DOB"
                                                selectionUpdated={(s) => {
                                                    if (s.length > 0) {
                                                        updateSelectedPatient(s[0]);
                                                    } else {
                                                        updateSelectedPatient(null);
                                                    }
                                                }}
                                                initialSelection={selectedPatient === null ? [] : [selectedPatient]}
                                                query={async (x,y) => {
                                                    const patientList = new FHIRPaginatedList<Patient>();
                                                    patientList.count = 500;
                                                    patientList.results = Array(100).fill(0).map(x => new Patient("123456789","16/09/2000","Patient"));
                                                    return patientList;
                                                }}
                                                height={height}
                                                width={width}
                                                />
                                            );
                                        case 1:
                                            return <DirectoryList 
                                                        selectedPractitioners={selectedPractitioners} 
                                                        selectedRoles={selectedRoles} 
                                                        updateSelected={(roles,practitioners) => {updateSelectedRoles(roles); updateSelectedPractitioners(practitioners);}}
                                                        height={height}
                                                        width={width}
                                                    />
                                        case 2:
                                            return <FinalStep 
                                                        InitialDate={dateDue} 
                                                        InitialDescription={taskDescription} 
                                                        DateTimeChanged={updateDueDate} 
                                                        TaskDescriptionChanged={updateTaskDescription}
                                                        height={height}
                                                        width={width}
                                                    />
                                    }
                                })()
                            }
                        {!matches && 
                            <div style={{position: "absolute", bottom: 0, right: 0}}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === stepNames.length || !(getNextButtonActive())}>
                                        {activeStep === stepNames.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        }
                </div>
                )
            }}
        </AutoSizer>
        
    );
}
export default MobileProcess;