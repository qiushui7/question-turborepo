import {useSelector} from "react-redux";
import {StateType} from "../store";
import {ComponentsStateType} from "../store/componentReducer";

function useGetComponentsInfo() {
  const components = useSelector<StateType>(
    (state) => state.components.present,
  ) as ComponentsStateType;
  const { componentList = [], selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}

export default useGetComponentsInfo;
