function createResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        body: body,  // Retorne o objeto diretamente sem JSON.stringify
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

module.exports = {
    createResponse
};
