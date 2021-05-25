import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListItemProps, TextField } from "@material-ui/core";
import { Component, ComponentType, FunctionComponent, useReducer, useState } from "react";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Patient from "./Model/Patient";
import Practitioner from "./Model/Practitioner";
import Role from "./Model/Role";

class MobileSelectableListProps<T> {
  RowRenderFunction: (itm: T) => JSX.Element;
  SearchText: string;
  getItemAtIndex: (idx: number) => T;
  getCount: () => number;
  constructor(renderer: (itm: T)  => JSX.Element, query: string, getItemAtIndex: (idx: number) => T, getCount: () => number) {
    this.RowRenderFunction = renderer;
    this.SearchText = query;
    this.getItemAtIndex = getItemAtIndex;
    this.getCount = getCount;
  }
}

export function renderPatientRow(itm: Patient) {
  return (
    <ListItem button>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={`URN: ${itm.URN}`} />
    </ListItem>
  );
}

export function renderRoleRow(itm: Role) {
  return (
    <ListItem button>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={itm.Unit} />
    </ListItem>
  );
}

export function renderPractitionerRow(itm: Practitioner) {
  return (
    <ListItem button>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.Name} secondary={itm.Active} />
    </ListItem>
  );
}

function MobileSelectableList<T>(props: MobileSelectableListProps<T>) {
  
  const [selected, updateSelected] = useState<T[]>([]);
  const getIsSelected = (itm: T) => {
    const t = selected.find(x => JSON.stringify(x) === JSON.stringify(itm)) !== undefined;
    return t;
  }

  const handleClick = (n: T) => () => {
    if (getIsSelected(n)) {
      let newList = selected.filter(x => JSON.stringify(x) != JSON.stringify(n));
      updateSelected(newList);
    } else {
      let newList = selected.filter(x => true);
      newList.push(n);
      updateSelected(newList);
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
    return (
      <ListItem button style={p.style} key={p.index} onClick={() => {handleClick(itm)();/*updateSelection(!selection)*/}} selected={getIsSelected(itm)/*selection*/}>
        {(listItem.props as any).children}
      </ListItem>
    );
  }

  const selectedListHeight = Math.min(46*selected.length,300);

  return (
    <AutoSizer>
      {(w) => { return (
      <div style={{height: "100%", width: "100%", margin: 0, padding: 0}}>
        <FixedSizeList height={selectedListHeight} width={w.width} itemSize={46} itemCount={selected.length}>
          {SelectedRenderer}
        </FixedSizeList>
        <FixedSizeList height={w.height - 110 - selectedListHeight} width={w.width} itemSize={46} itemCount={props.getCount()}>
          {Renderer}
        </FixedSizeList>
        <TextField variant="outlined" color="secondary" label={props.SearchText} style={{width: w.width, height: 0, bottom: 0, position: "relative"}}/>
      </div>);
      }}
    </AutoSizer>
  );
}

export default MobileSelectableList;