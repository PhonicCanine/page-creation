import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListItemProps, TextField } from "@material-ui/core";
import { Component, ComponentType, FunctionComponent } from "react";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Patient from "./Model/Patient";
import Practitioner from "./Model/Practitioner";
import Role from "./Model/Role";

class MobileSelectableListProps<T> {
  RowRenderFunction: (itm: T, props: ListChildComponentProps) => JSX.Element;
  SearchText: string;
  getItemAtIndex: (idx: number) => T;
  getCount: () => number;
  constructor(renderer: (itm: T, props: ListChildComponentProps)  => JSX.Element, query: string, getItemAtIndex: (idx: number) => T, getCount: () => number) {
    this.RowRenderFunction = renderer;
    this.SearchText = query;
    this.getItemAtIndex = getItemAtIndex;
    this.getCount = getCount;
  }
}

export function renderPatientRow(itm: Patient, props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={`URN: ${itm.URN}`} />
    </ListItem>
  );
}

export function renderRoleRow(itm: Role, props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={itm.Unit} />
    </ListItem>
  );
}

export function renderPractitionerRow(itm: Practitioner, props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={itm.Active} />
    </ListItem>
  );
}

function MobileSelectableList<T>(props: MobileSelectableListProps<T>) {
  const handleClick = (n: T) => () => {

  }

  function renderer(p: ListChildComponentProps): JSX.Element {
    let itm = props.getItemAtIndex(p.index);
    let listItem = props.RowRenderFunction(itm,p);
    //(listItem as unknown as Component<ListItemProps>).props.onClick = handleClick(itm);
    return listItem;
  }
  return (
    <AutoSizer>
      {(w) => { return (
      <div style={{height: "100%", width: "100%", margin: 0, padding: 0}}>
        <FixedSizeList height={w.height - 110} width={w.width} itemSize={46} itemCount={props.getCount()}>
          {renderer}
        </FixedSizeList>
        <TextField variant="outlined" color="secondary" label={props.SearchText} style={{width: w.width, height: 0, bottom: 0, position: "relative"}}/>
      </div>);
      }}
    </AutoSizer>
  );
}

export default MobileSelectableList;