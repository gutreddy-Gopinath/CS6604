@isTest
global class AnimalLocatorMock implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest request){
        HTTPResponse response = new HTTPResponse();
        response.setHeader('Content-type', 'application/json');
        response.setBody('{"animal":{"id":1,"name":"Lion","eats":"predates","says":"lol"}}');
        response.setStatusCode(200);
        return response;
    }
    

}