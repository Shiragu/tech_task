import { useAppState } from "@core/hooks/useRedux";
import { v4 as uuid } from "uuid";

import styles from "./CommentsSection.module.css";
import { Comment } from "../Comment";
import { CommentsSummary } from "../CommentsSummary";
import { LoadButton } from "../LoadButton";

export const CommentsSection = () => {
  const { commentsList } = useAppState((state) => state.commentsReducer);

  return (
    <div className={styles.container}>
      <CommentsSummary />
      <div className={styles.comments}>
        {commentsList.map((comment) => (
          <Comment {...comment} key={uuid()} />
        ))}
      </div>
      <LoadButton />
    </div>
  );
};
