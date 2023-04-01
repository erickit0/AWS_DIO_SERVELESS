"use strict";

const AWS = require("aws-sdk");

const updateItem = async (event) => {
// Desestruturação da variável "itemStatus" do corpo da requisição e do "id" dos parâmetros da rota
const { itemStatus } = JSON.parse(event.body);
const { id } = event.pathParameters;

// Instancia o client do DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Faz uma atualização do item da tabela com o id passado na rota
await dynamodb.update({
TableName: "ItemTable",
Key: { id },
UpdateExpression: "set itemStatus = :itemStatus", // Define a expressão de atualização
ExpressionAttributeValues: { // Define os valores das expressões
":itemStatus": itemStatus,
},
ReturnValues: "ALL_NEW", // Define que deve retornar todos os valores atualizados do item
}).promise();

// Retorna uma resposta de sucesso
return {
statusCode: 200,
body: JSON.stringify({ msg: "Item updated" }),
};
};

// Exporta a função "updateItem" como handler da lambda
module.exports = {
handler: updateItem,
};
