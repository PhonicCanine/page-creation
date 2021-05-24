import { Button, MobileStepper, Paper, Typography } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MobileSelectableList from "./MobileSelectableList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 400,
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
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
    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
                <Typography>{"Something Here"}</Typography>
            </Paper>
            <MobileSelectableList/>
            <MobileStepper
                variant="dots"
                steps={3}
                activeStep={activeStep}
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
        </div>
    );
}
export default MobileProcess;