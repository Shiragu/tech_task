import getAuthorsRequest from "@core/api/authors/getAuthorsRequest";
import { commentsActions } from "@core/store/commentsSlice";
import { IAuthor } from "@core/types/posts.types";
import { useEffect } from "react";

import { useAppDispatch } from "./useRedux";

export const useAuthorsRequest = () => {
  const dispatch = useAppDispatch();
  const { setCommentAuthors, toggleLoadingState, toggleErrorState } = commentsActions;

  useEffect(() => {
    dispatch(toggleLoadingState(true));

    getAuthorsRequest()
      .then((authors: IAuthor[]) => {
        dispatch(setCommentAuthors(authors));
        dispatch(toggleErrorState(false));
      })
      .catch((e) => {
        dispatch(toggleErrorState(true));

        // отправка ошибки в логгер
        console.error(e);
      })
      .finally(() => dispatch(toggleLoadingState(false)));
  }, []);
};
