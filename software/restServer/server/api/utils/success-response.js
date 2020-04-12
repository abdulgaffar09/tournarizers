var successResponse = function successResponse(data,token){

        this.status = 'success';
        this.data = data;
        this.token = token;
}
export default successResponse;