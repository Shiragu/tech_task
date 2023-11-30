import { useAppDispatch } from "@core/hooks/useRedux";
import { commentsActions } from "@core/store/commentsSlice";

import styles from "./ErrorMessage.module.css";

export const ErrorMessage = () => {
  const dispatch = useAppDispatch();
  const { toggleErrorState } = commentsActions;

  const closeMessage = () => dispatch(toggleErrorState(false));

  return (
    <div className={styles.container} onClick={closeMessage}>
      <span>Произошла ошибка</span>
      <span className={styles.hint}>Нажмите, чтобы закрыть</span>
    </div>
  );
};
