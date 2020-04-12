var errorResponse = function errorResponse(error) {
        this.status = 'failure';
        this.errorMessage = error.message;
        this.code = error.code;

}
export default errorResponse;