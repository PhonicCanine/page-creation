import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListItemProps, TextField, Divider, Typography, ListItemSecondaryAction, Checkbox, Grow } from "@material-ui/core";
import { Component, ComponentType, FunctionComponent, useReducer, useState } from "react";
import { AutoSizer, Size } from "react-virtualized";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Patient from "./Model/Patient";
import Practitioner from "./Model/Practitioner";
import Role from "./Model/Role";

interface MobileSelectableListProps<T> {
  RowRenderFunction: (itm: T) => JSX.Element;
  SearchText: string;
  getItemAtIndex: (idx: number) => T;
  getCount: () => number;
  multiSelect?: boolean;
  selectionUpdated: (list: T[]) => void;
  initialSelection: T[] | undefined;
}

export function renderPatientRow(itm: Patient) {
  return (
    <>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={`URN: ${itm.URN}`} />
    </>
  );
}

export function renderRoleRow(itm: Role) {
  return (
    <>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={itm.Unit} />
    </>
  );
}

export function renderPractitionerRow(itm: Practitioner) {
  return (
    <>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={itm.Active} />
    </>
  );
}

function MobileSelectableList<T>(props: MobileSelectableListProps<T>) {
  
  const [selected, updateSelected] = useState<T[]>(props.initialSelection ?? []);
  const getIsSelected = (itm: T) => {
    const t = selected.find(x => JSON.stringify(x) === JSON.stringify(itm)) !== undefined;
    return t;
  }

  const handleClick = (n: T) => () => {
    if (getIsSelected(n)) {
      let newList = selected.filter(x => JSON.stringify(x) != JSON.stringify(n));
      props.selectionUpdated(newList);
      updateSelected(newList);
    } else {
      let newList = selected.filter(x => true);
      newList.push(n);
      updateSelected(newList);
      props.selectionUpdated(newList);
    }
  }

  function Renderer(p: ListChildComponentProps): JSX.Element {
    let itm = props.getItemAtIndex(p.index);
    let listItem = props.RowRenderFunction(itm);
    const [selection, updateSelection] = useState(false);
    return (
      <ListItem button style={p.style} key={p.index} onClick={() => {handleClick(itm)();/*updateSelection(!selection)*/}} selected={getIsSelected(itm)/*selection*/}>
        {(listItem.props as any).children}
      </ListItem>
    );
  }

  function SelectedRenderer(p: ListChildComponentProps): JSX.Element {
    let itm = selected[p.index];
    let listItem = props.RowRenderFunction(itm);
    let children: JSX.Element[] = (listItem.props as any).children;
    
    let newChildren = children.concat(<Checkbox edge="end" checked={true}/>);
    return (
      <ListItem button style={p.style} key={p.index} onClick={() => {handleClick(itm)();/*updateSelection(!selection)*/}} selected={getIsSelected(itm)/*selection*/}>
        {newChildren}
      </ListItem>
    );
  }

  function RenderSelectedList(size: Size): JSX.Element {
    if (selected.length === 0) return (<></>);
    
    return (
      <Grow in={selected.length > 0}>
        <div style={{marginBottom: 10, paddingBottom: 10}}>
          <Typography variant="h6">
            Selected
          </Typography>
          <FixedSizeList height={selectedListHeight} width={size.width} itemSize={46} itemCount={selected.length}>
            {SelectedRenderer}
          </FixedSizeList>
          <Divider light />
        </div>
      </Grow>
    );
  }

  const selectedListHeight = Math.min(46*selected.length,300);

  return (
    <AutoSizer>
      {(w) => { return (
      <div style={{height: "100%", width: "100%", margin: 0, padding: 0}}>
        {RenderSelectedList(w)}
        <Grow appear={false} in={props.multiSelect || selected.length == 0}>
          <div>
            <FixedSizeList height={w.height - 110 - selectedListHeight} width={w.width} itemSize={46} itemCount={props.getCount()}>
              {Renderer}
            </FixedSizeList>
            <TextField variant="outlined" color="secondary" label={props.SearchText} style={{width: w.width, height: 0, bottom: 0, position: "relative"}}/>
          </div>
        </Grow>
      </div>);
      }}
    </AutoSizer>
  );
}

export default MobileSelectableList;