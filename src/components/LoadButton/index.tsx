import { useCommentsRequest } from "@core/hooks/useCommentsRequest";
import { useAppState } from "@core/hooks/useRedux";

import styles from "./LoadButton.module.css";

export const LoadButton = () => {
  const { isLoading, pagination } = useAppState((state) => state.commentsReducer);

  const currentPage = pagination.page;
  const totalPages = pagination.total_pages;
  const isLastPage = currentPage === totalPages;

  const { loadComments } = useCommentsRequest(currentPage + 1);

  return (
    <button
      className={styles.button}
      onClick={isLastPage ? undefined : loadComments}
      disabled={isLoading || currentPage === totalPages}
    >
      {isLoading && (
        <>
          <span className={styles.loader} />
          <span>Загружаем...</span>
        </>
      )}
      {!isLoading && "Загрузить еще"}
    </button>
  );
};
