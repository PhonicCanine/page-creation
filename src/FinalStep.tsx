import { TextField, Typography } from "@material-ui/core";
import { DateTimePicker, LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { useState } from "react";
import { AutoSizer } from "react-virtualized";
import { charLimit } from "./constants";

interface FinalStepProps {
    DateTimeChanged: (date: Date) => void;
    TaskDescriptionChanged: (text: string) => void;
    InitialDate: Date;
    InitialDescription: string;
    height: number;
    width: number;
}

function FinalStep(props: FinalStepProps) {
    const [selectedDateTime, updateSelectedDateTime] = useState(props.InitialDate);
    const [taskDescription, updateTaskDescription] = useState(props.InitialDescription);
    let error = false;
    let helperText: string|undefined;
    const manageTaskDescription = (v: string) => {
        updateTaskDescription(v);
        props.TaskDescriptionChanged(v);
    }
    const getError = () => {
        return taskDescription.length > charLimit;
    }
    const getHelperText = () => {
        if (getError()) return `Please restrict your description to under ${charLimit} characters.`;
        return undefined;
    }
    const marginSize = 20;

    return (
            <div style={{margin: 0, padding:0, height: props.height, width: props.width}}>
                <div style={{padding: marginSize}}>
                    <Typography marginLeft={2} marginTop={5} marginBottom={2} variant="h6" component="h2" width={props.width - 2 * marginSize}>
                            What do you need done?
                    </Typography>
                    <TextField 
                        style={{width: props.width - 2 * marginSize}} 
                        multiline={true} 
                        label={"Describe what you need"}
                        value={taskDescription}
                        onChange={(changeEvent) => {const v = changeEvent.currentTarget.value;manageTaskDescription(v);}}
                        error={getError()}
                        helperText={getHelperText()}
                        rows={8}
                    >

                    </TextField>
                    <Typography marginLeft={2} marginTop={5} marginBottom={2} variant="h6" component="h2" width={props.width - 2 * marginSize}>
                            When would you like this done?
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker 
                            onChange={(val,key) => {updateSelectedDateTime(val ?? new Date()); props.DateTimeChanged(val ?? new Date());}} 
                            value={selectedDateTime} 
                            renderInput={(tfProps) => <TextField style={{width:props.width - 2 * marginSize}} {...tfProps} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
    );
}

export default FinalStep;