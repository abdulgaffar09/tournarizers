var errorResponse = function errorResponse(message){
        this.status = 'failure';
        console.log(message);
        this.errorMessage = message;
        
}
export default errorResponse;