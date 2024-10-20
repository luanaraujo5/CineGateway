const { normalizeData } = require('./normalizer');
const { createResponse } = require('./response');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Verifica se um ID foi passado na URL
        if (event.pathParameters && event.pathParameters.id) {
            // Busca um filme específico pelo ID
            const movieId = event.pathParameters.id;
            const params = {
                TableName: 'Movies',
                Key: {
                    id: movieId
                }
            };

            const data = await dynamoDb.get(params).promise();

            // Se não encontrar o filme, retorna um 404
            if (!data.Item) {
                return createResponse(404, { message: 'Filme não encontrado' });
            }

            // Retorna o filme específico
            return createResponse(200, { content: data.Item });
        } else {
            // Se não houver ID, busca todos os filmes
            const params = {
                TableName: 'Movies',
            };

            const data = await dynamoDb.scan(params).promise();
            const normalizedData = normalizeData(data.Items);

            return createResponse(200, { content: normalizedData });
        }
    } catch (error) {
        return createResponse(500, { message: 'Erro ao buscar filmes', error: error.message });
    }
};
