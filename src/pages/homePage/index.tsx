import { CommentsSection } from "@core/components/CommentsSection";
import { ErrorMessage } from "@core/components/ErrorMessage";
import { useAuthorsRequest } from "@core/hooks/useAuthorsRequest";
import { useCommentsRequest } from "@core/hooks/useCommentsRequest";
import { useAppState } from "@core/hooks/useRedux";
import { useEffect } from "react";

export default function HomePage() {
  const { isError } = useAppState((state) => state.commentsReducer);
  const { loadComments } = useCommentsRequest(1);

  useEffect(() => {
    loadComments();
  }, []);

  useAuthorsRequest();

  return (
    <>
      {isError && <ErrorMessage />}
      <CommentsSection />
    </>
  );
}
