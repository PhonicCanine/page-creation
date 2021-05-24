import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList, ListChildComponentProps } from 'react-window';

class MobileSelectableListProps {

}

function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemAvatar>
            <Avatar/>
        </ListItemAvatar>
        <ListItemText primary={`Patient ${index + 1}`} secondary={"URN: 199290123"} />
      </ListItem>
    );
  }

function MobileSelectableList() {
    return (
      <Box width={1} height={1}>
        <AutoSizer>
          {(w) => {
            return (
              <FixedSizeList height={w.height} width={w.width} itemSize={46} itemCount={200}>
                {renderRow}
              </FixedSizeList>
              );
          }}
        </AutoSizer>
      </Box>
        
    );
}

export default MobileSelectableList;