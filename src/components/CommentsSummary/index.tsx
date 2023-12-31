import { HeartGray } from "@core/assets/icons/HeartGray";
import { useAppState } from "@core/hooks/useRedux";
import { formatThousands } from "@core/lib/commentUtils";

import styles from "./CommentsSummary.module.css";

export const CommentsSummary = () => {
  const { totalComments, totalLikes } = useAppState((state) => state.commentsReducer);

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <p>{totalComments} комментариев</p>
        <p>
          <HeartGray /> {formatThousands(totalLikes)}
        </p>
      </div>
      <hr className={styles.divider} />
    </div>
  );
};
