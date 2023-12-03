import { ComponentPropsType } from "../../components/QuestionComponents";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { getNextSelectedId, insertNewComponent } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { arrayMove } from "@dnd-kit/sortable";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) => {
      return action.payload;
    },
    changeSelectedId: (
      state: ComponentsStateType,
      action: PayloadAction<string>,
    ) => {
      state.selectedId = action.payload;
    },
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>,
    ) => {
      const newComponent = action.payload;
      insertNewComponent(state, newComponent);
    },
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{
        fe_id: string;
        newProps: ComponentPropsType;
      }>,
    ) => {
      const { fe_id, newProps } = action.payload;
      const curComp = state.componentList.find(
        (c) => c.fe_id === state.selectedId,
      );
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        };
      }
    },
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = state;
      state.selectedId = getNextSelectedId(removeId, componentList);
      const index = componentList.findIndex((c) => c.fe_id === removeId);
      componentList.splice(index, 1);
    },
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList } = state;
      const { fe_id, isHidden } = action.payload;
      let newSelectedId = "";
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;
      const curComp = componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>,
    ) => {
      const { fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state;
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId,
      );
      if (!selectedComponent) return;
      state.copiedComponent = cloneDeep(selectedComponent) as ComponentInfoType;
    },
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state;
      if (!copiedComponent) return;
      copiedComponent.fe_id = nanoid();
      insertNewComponent(state, copiedComponent);
    },
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId,
      );
      if (selectedIndex < 0) return;
      if (selectedIndex <= 0) return;
      state.selectedId = componentList[selectedIndex - 1].fe_id;
    },
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId,
      );
      if (selectedIndex < 0) return;
      if (selectedIndex <= 0) return;
      state.selectedId = componentList[selectedIndex + 1].fe_id;
    },
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>,
    ) => {
      const { title, fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) curComp.title = title;
    },
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { componentList: curComponentList } = state;
      const { oldIndex, newIndex } = action.payload;

      state.componentList = arrayMove(curComponentList, oldIndex, newIndex);
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
