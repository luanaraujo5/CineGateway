const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let requestBody;

    console.log('Evento recebido:', JSON.stringify(event));

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'O corpo da requisição está vazio. Envie um JSON válido.'
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        }

        requestBody = JSON.parse(event.body);

        if (!requestBody.title || !requestBody.description || !requestBody.genre || !requestBody.year) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Os campos title, description, genre e year são obrigatórios.'
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        }

        const movieId = uuidv4(); 
        const createdAt = new Date().toISOString();

        const params = {
            TableName: 'Movies',
            Item: {
                id: movieId,
                title: requestBody.title,
                description: requestBody.description,
                genre: requestBody.genre,
                year: requestBody.year,
                createdAt: createdAt
            }
        };

        await dynamoDb.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Filme criado com sucesso!',
                id: movieId,
                createdAt: createdAt
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

    } catch (error) {
        
        console.error('Erro ao processar a requisição:', error.message);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Erro interno ao processar a requisição.',
                error: error.message
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
};
