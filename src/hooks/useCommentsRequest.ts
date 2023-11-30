import getCommentsRequest from "@core/api/comments/getCommentsRequest";
import { commentsActions } from "@core/store/commentsSlice";
import { IComment, IPagination } from "@core/types/posts.types";

import { useAppDispatch } from "./useRedux";

export const useCommentsRequest = (page: number) => {
  const dispatch = useAppDispatch();
  const { updateCommentsList, toggleLoadingState, toggleErrorState, updateStats } = commentsActions;

  const loadComments = () => {
    dispatch(toggleLoadingState(true));

    getCommentsRequest(page)
      .then((comments: IPagination<IComment[]>) => {
        dispatch(updateCommentsList(comments));
        dispatch(updateStats());
        dispatch(toggleErrorState(false));
      })
      .catch((e) => {
        dispatch(toggleErrorState(true));

        // отправка ошибки в логгер
        console.error(e);
      })
      .finally(() => dispatch(toggleLoadingState(false)));
  };

  return { loadComments };
};
