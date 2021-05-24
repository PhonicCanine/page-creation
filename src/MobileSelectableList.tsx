import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
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
        <FixedSizeList height={1} width={1} itemSize={46} itemCount={200}>
            {renderRow}
        </FixedSizeList>
    );
}

export default MobileSelectableList;