import { IComment } from "@core/types/posts.types";

export const findComment = (comment: IComment, searchId: number): IComment | undefined => {
  if (comment.id === searchId) {
    return comment;
  }

  if (comment.child) {
    return findComment(comment.child, searchId);
  }
};

export const getCommentsWithChildren = (comments: IComment[]) => {
  const formattedComments: IComment[] = [];

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    comment.isLiked = false;

    if (comment.parent) {
      const parentComment = comments.find(({ id }) => id === comment.parent);

      if (parentComment) {
        parentComment.child = comment;
      }
    } else {
      formattedComments.push(comment);
    }
  }

  return formattedComments;
};

export const countComments = (comment: IComment) => {
  let commentsCount = 0;
  let likesCount = 0;

  if (comment.child) {
    commentsCount += countComments(comment.child).commentsCount;
    likesCount += countComments(comment.child).likesCount;
  }

  commentsCount++;
  likesCount += comment.likes;

  return { commentsCount, likesCount };
};

export const formatThousands = (digit: number) => {
  if (isNaN(digit)) {
    return "";
  }

  return digit.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};
