import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListItemProps, TextField, Divider, Typography, ListItemSecondaryAction, Checkbox, Grow, ListItemIcon, LinearProgress, CircularProgress, InputAdornment } from "@material-ui/core";
import { HorizontalSplit, Search } from "@material-ui/icons";
import { Component, ComponentType, FunctionComponent, useEffect, useReducer, useState } from "react";
import { AutoSizer, Size } from "react-virtualized";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { APIConnection } from "./API/APIConnection";
import { PAGE_SIZE } from "./Config/config";
import PaginatedList from "./Model/FHIRPaginatedList";
import { FHIRPractitioner } from "./Model/FHIRPractitioner";
import { FHIRPractitionerRole } from "./Model/FHIRPractitionerRole";
import Patient from "./Model/Patient";

interface MobileSelectableListProps<T> {
  RowRenderFunction: (itm: T) => JSX.Element;
  SearchText: string;
  query: (text: string, page: number) => Promise<PaginatedList<T>>;
  multiSelect?: boolean;
  selectionUpdated: (list: T[]) => void;
  initialSelection: T[] | undefined;
  height: number;
  width: number;
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

export function renderRoleRow(itm: FHIRPractitionerRole) {
  return (
    <>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.displayName} secondary={itm.primaryOrganizationID} />
    </>
  );
}

export function renderPractitionerRow(itm: FHIRPractitioner) {
  return (
    <>
      <ListItemAvatar>
          <Avatar/>
      </ListItemAvatar>
      <ListItemText primary={itm.displayName} secondary={itm.practitionerStatus?.active} />
    </>
  );
}

const listItemSize = 92;
const textboxSize = 68;

function MobileSelectableList<T>(props: MobileSelectableListProps<T>) {
  console.log(`Size: width: ${props.width}, height: ${props.height}`);
  const [selected, updateSelected] = useState<T[]>(props.initialSelection ?? []);
  const [query, updateQuery] = useState<string>("");
  const [currPage, updatePage] = useState<number>(0);
  const [pageRequest, updatePageRequest] = useState<number>(0);
  const [items, updateItems] = useState<T[]>([]);
  const [totalItems, updateTotal] = useState(0);
  const [lastOffset, updateOffset] = useState(0);
  const [initialLoad, updateInitialLoad] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(async () => {
      console.log("Beginning load");
      updateInitialLoad(false);
      updatePageRequest(0);
      const l = await props.query(query,0);
      updateItems(l.results);
      updateTotal(l.count);
      updateInitialLoad(true);
      updateOffset(0);
    }, 500);
    return () => {
      clearInterval(timeout);
    };
  },[query]);
  useEffect(() => {
    if (!initialLoad) return;
    const requestedPage = pageRequest;
    const q = query;
    let okay = true;
    const c = async () => {
      const l = await props.query(query,requestedPage);
      if (okay && pageRequest === requestedPage && q === query) {
        updateItems(items.concat(l.results));
        updatePage(pageRequest);
      }
    }
    c();
    return () => {
      okay = false;
    }
  }, [pageRequest])
  useEffect(() => {
    console.log(`Updated to page: ${currPage}`);
    scrolled(lastOffset);
  }, [currPage])
  const getIsSelected = (itm: T) => {
    const t = selected.find(x => JSON.stringify(x) === JSON.stringify(itm)) !== undefined;
    return t;
  }

  const scrolled = (offset: number) => {
    updateOffset(Math.max(offset,lastOffset));
    const topItem = Math.ceil(offset / listItemSize);
    console.log(`In this function, req:${pageRequest} curr:${currPage}`);
    if (Math.floor(topItem / PAGE_SIZE) >= currPage && pageRequest <= currPage) {
      console.log(`Requesting page: ${currPage + 1}`);
      updatePageRequest(currPage + 1);
    }
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
    if (p.index < selected.length) {
      return SelectedRenderer(p, p.index === selected.length - 1);
    }
    let idx = Math.max(p.index - selected.length,0);
    let itm = items[idx];
    if (itm === undefined) {
      return (
        <ListItem button style={p.style} key={p.index}>
          <ListItemIcon>
            <CircularProgress/>
          </ListItemIcon>
          <ListItemText>Fetching Data...</ListItemText>
        </ListItem>
      )
    }
    let listItem = props.RowRenderFunction(itm);
    return (
      <ListItem button style={p.style} key={p.index} onClick={() => {handleClick(itm)();}} selected={getIsSelected(itm)}>
        {(listItem.props as any).children}
      </ListItem>
    );
  }

  function SelectedRenderer(p: ListChildComponentProps, last: boolean): JSX.Element {
    let itm = selected[p.index];
    let listItem = props.RowRenderFunction(itm);
    let children: JSX.Element[] = (listItem.props as any).children;
    
    let newChildren = children.concat(<Checkbox edge="end" checked={true}/>);
    return (
      <ListItem button style={p.style} key={p.index} onClick={() => {handleClick(itm)();}} selected={getIsSelected(itm)}>
        {last && <Divider style={{width: "100%", position: "absolute", bottom: 0, left: 0, borderTopWidth: 2}}/>}
        {newChildren}
      </ListItem>
    );
  }

  function GetListCount() {
    if (selected.length > 0) {
      if (props.multiSelect) {
        return totalItems + selected.length;
      } else {
        return selected.length;
      }
    }
    return totalItems;
  }

  return (
      <div style={{height: props.height, width: props.width, margin: 0, padding: 0, position: "absolute"}}>
        <div style={{height: textboxSize, width: props.width * 0.9, left: props.width * 0.05, position: "absolute", overflow: "hidden"}}>
          <TextField 
            variant="standard" 
            color="secondary" 
            label={props.SearchText} 
            style={{width: props.width, height: 50, margin: 0, padding: 0, top: 8, position: "relative"}} 
            onChange={(evt) => updateQuery(evt.target.value)}
            value={query}
            InputProps={{startAdornment: (
              <InputAdornment position="start">
                <Search/>
              </InputAdornment>
            )
          }}
          />
        </div>
        <div style={{position: "absolute", top: 58}}>
          <div>
            <FixedSizeList 
              height={props.height - textboxSize} 
              width={props.width} 
              itemSize={listItemSize} 
              itemCount={GetListCount()} 
              onScroll={(x) => scrolled(x.scrollOffset)}
            >
              {Renderer}
            </FixedSizeList>
          </div>
        </div>
      </div>
      );
}

export default MobileSelectableList;