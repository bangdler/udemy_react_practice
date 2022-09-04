export const diaryDataReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.data;
    }
    case 'CREATE': {
      return [action.data, ...state];
    }
    case 'REMOVE': {
      return state.filter(diary => diary.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map(diary =>
        diary.id === action.targetId
          ? {
              ...diary,
              author: action.data.newAuthor,
              contents: action.data.newContents,
              emotion: action.data.newEmotion,
            }
          : diary,
      );
    }
    default:
      return state;
  }
};
