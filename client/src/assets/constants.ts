const BASE_URL = "http://localhost:3001";

export const URL_GET_BOOKS = `${BASE_URL}/book`;
export const URL_POST_USER_SIGNUP = `${BASE_URL}/user/signup`;
export const URL_POST_USER_LOGIN = `${BASE_URL}/user/login`;
export const URL_GET_SEARCH_BY_TITLE = `${BASE_URL}/book/search?query=`;
export const URL_ADD_REVIEW = `${BASE_URL}/review`;
export const URL_GET_REVIEWS = `${BASE_URL}/review/byBook?bookUuid=`;
