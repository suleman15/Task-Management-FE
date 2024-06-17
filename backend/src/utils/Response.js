/**
 * A custom class to send consistent responses for every HTTP request.
 * @class Response
 */
class Response {
  /**
   * @param {Object} responseObj - An object containing statusCode, data, and message.
   * @param {number} responseObj.statusCode - HTTP status code to be sent in the response.
   * @param {object} responseObj.data - The data to be sent in the response.
   * @param {string} responseObj.message - The message associated with the response.
   */
  constructor(responseObj) {
    const { statusCode, data, message } = responseObj;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  /**
   * Sends the response with appropriate status code and data.
   * @param {object} res - The response object to send the response.
   */
  send(res) {
    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
      success: this.success,
    });
  }
}

export { Response };
