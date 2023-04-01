"use strict";

const {v4} = require("uuid"); // Importa a função v4 da biblioteca uuid para gerar um ID único
const AWS = require("aws-sdk")

const insertItem = async (event) => {
//module.exports.insertItem = async (event) => {

const {item} = JSON.parse(event.body); // Extrai a propriedade item do corpo da requisição
const createdAt = new Date().toISOString(); // Cria uma data no formato ISO para a propriedade createdAt
const id = v4() // Gera um ID único usando a função v4 do uuid

const dynamodb = new AWS.DynamoDB.DocumentClient(); // Instancia um novo cliente DynamoDB

const newItem = {
id,
item,
createdAt,
itemStatus: false // Define o valor inicial da propriedade itemStatus como false
}

await dynamodb.put({
TableName: "ItemTable",
Item: newItem // Adiciona o novo item na tabela ItemTable
}).promise()

return {
statusCode: 200,
body: JSON.stringify(newItem), // Retorna o novo item criado como JSON
};
};

module.exports = {
handler:insertItem
}
