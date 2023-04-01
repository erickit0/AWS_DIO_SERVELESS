"use strict";
const AWS = require("aws-sdk");

/**
 * Recupera um item específico da tabela do DynamoDB
 *
 * @param {object} event - objeto do evento fornecido pelo AWS Lambda
 * @param {object} context - objeto do contexto fornecido pelo AWS Lambda
 * @param {function} callback - função de retorno de chamada fornecida pelo AWS Lambda
 */
const fetchItem = async (event, context, callback) => {
  try {
    // Verifica se o ID do item foi fornecido corretamente
    if (!event.pathParameters || !event.pathParameters.id) {
      throw new Error("ID do item não fornecido.");
    }

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = event.pathParameters.id;

    const result = await dynamodb.get({
      TableName: "ItemTable",
      Key: { id }
    }).promise();

    // Verifica se há um item correspondente ao ID fornecido
    if (!result.Item) {
      throw new Error(`Nenhum item encontrado com o ID: ${id}`);
    }

    const item = result.Item;

    // Retorna o item recuperado com sucesso
    return {
      statusCode: 200,
      body: JSON.stringify(item)
    };
  } catch (error) {
    console.log(error);

    // Retorna a mensagem de erro adequada
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message })
    };
  }
};

module.exports = {
  handler: fetchItem
};
