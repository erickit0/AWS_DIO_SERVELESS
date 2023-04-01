"use strict";
const AWS = require("aws-sdk");

const fetchItems = async (event) => {
// Importa o AWS SDK e configura a DocumentClient para acessar o DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();

let items;

try {
// Executa uma operação de scan no DynamoDB, sem especificar uma chave
// para pesquisar. O DynamoDB retorna todos os itens da tabela.
const results = await dynamodb.scan({
TableName: "ItemTable",
}).promise();

makefile
Copy code
// Atribui o array de items retornados ao objeto "items"
items = results.Items;
} catch (error) {
console.log(error);
}

// Retorna uma resposta HTTP com o status 200 e o array de items em formato JSON
return {
statusCode: 200,
body: JSON.stringify(items),
};
};

// Exporta a função "fetchItems" como a função principal da Lambda
module.exports = {
handler: fetchItems,
};





