var errorResponse = function errorResponse(message){
        this.status = 'failure';
        this.message = message;
}
export default errorResponse;