import { countComments, findComment, getCommentsWithChildren } from "@core/lib/commentUtils";
import { IAuthor, IComment, IPagination } from "@core/types/posts.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface commentsSliceState {
  authors: IAuthor[];
  totalComments: number;
  totalLikes: number;
  pagination: {
    page: number;
    size: number;
    total_pages: number;
  };
  commentsList: IComment[];

  isLoading: boolean;
  isError: boolean;
}

const initialState: commentsSliceState = {
  authors: [],
  commentsList: [],
  totalComments: 0,
  totalLikes: 0,
  pagination: { page: 0, size: 0, total_pages: 0 },

  isLoading: false,
  isError: false,
};

const commentsSlice = createSlice({
  name: "home-comments",
  initialState,
  reducers: {
    setCommentAuthors(state, action: PayloadAction<IAuthor[]>) {
      state.authors = action.payload;
    },

    updateCommentsList(state, action: PayloadAction<IPagination<IComment[]>>) {
      state.pagination = action.payload.pagination;

      const formattedComments = getCommentsWithChildren(action.payload.data);

      state.commentsList.push(...formattedComments);
    },

    updateStats(state) {
      const { commentsCount, likesCount } = state.commentsList
        .map((comment) => countComments(comment))
        .reduce(
          (acc, curr) => ({
            likesCount: (acc.likesCount += curr.likesCount),
            commentsCount: (acc.commentsCount += curr.commentsCount),
          }),
          { likesCount: 0, commentsCount: 0 }
        );
      state.totalLikes = likesCount;
      state.totalComments = commentsCount;
    },

    likeComment(state, action: PayloadAction<number>) {
      state.commentsList.map((comment) => {
        const foundComment = findComment(comment, action.payload);

        if (foundComment) {
          foundComment.likes++;
          foundComment.isLiked = true;
        }
      });
    },
    dislikeComment(state, action: PayloadAction<number>) {
      state.commentsList.map((comment) => {
        const foundComment = findComment(comment, action.payload);

        if (foundComment) {
          foundComment.likes--;
          foundComment.isLiked = false;
        }
      });
    },

    toggleLoadingState(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    toggleErrorState(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { actions: commentsActions, reducer: commentsReducer } = commentsSlice;
