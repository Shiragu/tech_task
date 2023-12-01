import { HeartEmpty } from "@core/assets/icons/HeartEmpty";
import { HeartFilled } from "@core/assets/icons/HeartFilled";
import { useAppDispatch, useAppState } from "@core/hooks/useRedux";
import { formatThousands } from "@core/lib/commentUtils";
import { zonedDateTimeToString } from "@core/lib/dateFormatters";
import { commentsActions } from "@core/store/commentsSlice";
import { IComment } from "@core/types/posts.types";
import { FC } from "react";
import { v4 as uuid } from "uuid";

import styles from "./Comment.module.css";

export const Comment: FC<IComment> = ({ id, author, created, text, likes, isLiked, child }) => {
  const { authors } = useAppState((state) => state.commentsReducer);

  const dispatch = useAppDispatch();
  const { likeComment, dislikeComment, updateStats } = commentsActions;
  const authorInfo = authors.find(({ id }) => id === author);

  const toggleLike = () => {
    dispatch(likeComment(id));
    dispatch(updateStats());
  };
  const toggleDislike = () => {
    dispatch(dislikeComment(id));
    dispatch(updateStats());
  };

  return (
    <div className={styles.container}>
      <img src={authorInfo?.avatar} className={styles.avatar} />
      <div className={styles.author}>
        <div className={styles.details}>
          <span className={styles.nickname}>{authorInfo?.name}</span>
          <span className={styles.time}>{zonedDateTimeToString(created)}</span>
        </div>
        <div className={styles.likes}>
          {isLiked ? <HeartFilled onClick={toggleDislike} /> : <HeartEmpty onClick={toggleLike} />}
          {formatThousands(likes)}
        </div>
      </div>
      <div className={styles.message}>{text}</div>

      <div className={styles.subComments}>{child && <Comment {...child} key={uuid()} />}</div>
    </div>
  );
};
