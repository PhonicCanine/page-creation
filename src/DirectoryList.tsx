import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { useState } from "react";
import { AutoSizer } from "react-virtualized";
import { APIConnection } from "./API/APIConnection";
import MobileSelectableList, { renderPractitionerRow, renderRoleRow } from "./MobileSelectableList";
import {FHIRPractitioner} from "./Model/FHIRPractitioner";
import {FHIRPractitionerRole} from "./Model/FHIRPractitionerRole";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
const { children, value, index, ...other } = props;

return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{height: "100%", width: "100%", margin: 0, padding: 0}}
        {...other}
        >
            {value === index && (
                <Box p={3} height={1} width={1} style={{margin: 0, padding: 0}}>
                    {children}
                </Box>
            )}
    </div>
);
}

interface DirectoryListProps {
    selectedPractitioners?: FHIRPractitioner[];
    selectedRoles?: FHIRPractitionerRole[];
    updateSelected: (roles: FHIRPractitionerRole[], practitioners:FHIRPractitioner[]) => void;
    height: number;
    width: number;
}

const tabbarheight = 48;

function DirectoryList(props: DirectoryListProps) {
    const [currentTab,ChangeTab] = useState((props.selectedPractitioners ?? []).length > 0 ? 1 : 0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        ChangeTab(newValue);
    };
    const [selectedPractitioners, updateSelectedPractitioners] = useState<FHIRPractitioner[]>(props.selectedPractitioners ?? []);
    const [selectedRoles, updateSelectedRoles] = useState<FHIRPractitionerRole[]>(props.selectedRoles ?? []);
    return (
        <div style={{height: props.height, width: props.width}}>
            <Tabs value={currentTab} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Roles" disabled={selectedPractitioners.length > 0}/>
                <Tab label="Practitioners" disabled={selectedRoles.length > 0}/>
            </Tabs>
            <div style={{width: props.width, height: props.height - tabbarheight, position: "relative"}}>
                <TabPanel index={0} value={currentTab}>
                    <MobileSelectableList 
                        RowRenderFunction={renderRoleRow} 
                        SearchText="Search Roles"
                        selectionUpdated={(s) => {updateSelectedRoles(s);  props.updateSelected(s,selectedPractitioners);}}
                        initialSelection={props.selectedRoles}
                        query={APIConnection.getPractitionerRolesQuery}
                        height={props.height - tabbarheight}
                        width={props.width}
                        />
                </TabPanel>
                <TabPanel index={1} value={currentTab}>
                    <MobileSelectableList 
                        RowRenderFunction={renderPractitionerRow} 
                        SearchText="Search for Practitioners" 
                        selectionUpdated={(s) => {updateSelectedPractitioners(s); props.updateSelected(selectedRoles,s);}}
                        initialSelection={props.selectedPractitioners}
                        multiSelect={true}
                        query={APIConnection.getPractitionersQuery}
                        height={props.height - tabbarheight}
                        width={props.width}
                        />
                </TabPanel>
            </div>
        </div>
    );
}

export default DirectoryList;