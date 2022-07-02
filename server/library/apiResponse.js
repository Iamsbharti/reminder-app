const apiResponse = (error, message, data) => {
  return {
    error,
    message,
    data,
  };
};
module.exports = apiResponse;
