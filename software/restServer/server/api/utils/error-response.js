var errorResponse = function errorResponse(message){
        this.status = 'failure';
        this.errorMessage = new Error(message);
        
}
export default errorResponse;