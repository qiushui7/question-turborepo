import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRequest } from "ahooks";
import { getQuestionService } from "../services/question";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷 id");
      return await getQuestionService(id);
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (!data) return;
    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      isPublished = false,
      componentList = [],
    } = data;
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null }),
    );

    dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
}

export default useLoadQuestionData;
