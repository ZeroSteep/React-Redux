import {
  ASYNC_POST,
  CREATE_POST,
  HIDE_ALERT,
  HIDE_LOADER,
  SHOW_ALERT,
  SHOW_LOADER,
} from "./types";

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post,
  };
}

export function showAlert(text) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });

    setTimeout(() => dispatch(hideAlert()), 3000);
  };
}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}

export function asyncPosts() {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      const json = await response.json();

      dispatch({ type: ASYNC_POST, payload: json });
      dispatch({ type: HIDE_LOADER });
    } catch (error) {
      dispatch(showAlert('Что-то пошло не так!'));
      dispatch({ type: HIDE_LOADER });
    }
  };
}
