function contarItens(array) {
let contagem = {};

// Contar cada item no array
array.forEach(item => {
if (contagem[item]) {
contagem[item]++;
} else {
contagem[item] = 1;
}
});

// Criar um novo array com os itens e suas contagens
let resultado = [];

for (let item in contagem) {
resultado.push(`${item}: ${contagem[item]}`);
}

return resultado;
}

// Exemplo de uso:
const meuArray = ['maçã', 'banana', 'maçã', 'laranja', 'banana', 'maçã'];
const resultado = contarItens(meuArray);
console.log(resultado);
