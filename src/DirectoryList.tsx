import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { useState } from "react";
import { AutoSizer } from "react-virtualized";
import MobileSelectableList, { renderPractitionerRow, renderRoleRow } from "./MobileSelectableList";
import Practitioner from "./Model/Practitioner";
import Role from "./Model/Role";

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

function DirectoryList() {
    const [currentTab,ChangeTab] = useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        ChangeTab(newValue);
    };
    const [selectedPractitioners, updateSelectedPractitioners] = useState([]);
    return (
        <AutoSizer>
            {(size) => {
                return (
                    <div style={{height: size.height, width: size.width}}>
                        <Tabs value={currentTab} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Roles" disabled={selectedPractitioners.length > 0}/>
                            <Tab label="Practitioners" />
                        </Tabs>
                        <div style={{width: size.width, height: size.height - 80, position: "relative"}}>
                            <TabPanel index={0} value={currentTab}>
                                <MobileSelectableList RowRenderFunction={renderRoleRow} SearchText="Search Roles" getCount={() => 100} getItemAtIndex={(idx) => new Role(`Role: ${idx}`, "Unit")}/>
                            </TabPanel>
                            <TabPanel index={1} value={currentTab}>
                                <MobileSelectableList RowRenderFunction={renderPractitionerRow} SearchText="Search for Practitioners" getCount={() => 100} getItemAtIndex={(idx) => new Practitioner(`Practitioner: ${idx}`, "Active")}/>
                            </TabPanel>
                        </div>
                    </div>
                );
            }}
        </AutoSizer>
    )
}

export default DirectoryList;