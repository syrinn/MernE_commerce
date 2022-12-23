import Message from "./Message";

function getErrorMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data?.error?.message && error.response.data.error.message) {
      return data.error.message;
    }

    if (data?.error && error.response.data.error) {
      return data.error;
    }
    return String(data);
  }
}

function getErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }
}

export default class Errors {
  static handleError(error) {
    if ([400, 429].includes(getErrorCode(error))) {
      Message.Error(getErrorMessage(error));
    }

    if (getErrorCode(error) === 401) {
      console.log("i don have autorisation");
    }

    if (getErrorCode(error) === 403) {
      console.log("page not found ");
    }

    if (getErrorCode(error) === 500) {
      console.log("Error Server");
    }
  }

  static errorCode(error) {
    return getErrorCode(error);
  }
}
