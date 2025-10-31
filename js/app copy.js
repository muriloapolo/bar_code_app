
// 160889971735420172512093050010028544549Z
// let info2 = '140889978976320172409063012510028544207E'
//Remover espaços de uma string
//.replace(/\s/g, '')

class PageItens {
    constructor() {
        this.displayResultado = document.getElementById('resultado');
        this.inputeCodigo = document.getElementById('codeBar');
        this.copyClipboard = document.getElementById('copyClipboard');
        this.spanCopy = document.getElementById('alertCopy');
        this.errorSpan = document.getElementById('infoCodeError')
        this.changeBg = document.getElementById('changeBg');
        this.clearClip = document.getElementById('clearClipBoard');

    }


    // Gera arquivos de primeira instância
    imputCodeDocument() {
        return this.inputeCodigo;
    }
    getCode() {
        return this.inputeCodigo.addEventListener('keyup', getCodeToFormat);
    }

    showResult() {
        return this.displayResultado;
    }

    copyToClip() {
        return this.copyClipboard.addEventListener('click', addToClipBoard);
    }
    clear() {
        return this.clearClip.addEventListener('click', clearTheClipBoard)
    }

    // Arquivos de segunda Instância
    showHideSpan() {
        return this.spanCopy;
    }

    errorSpan() {
        return this.errorSpan;
    }



    changeBackground() {
        return this.changeBg.addEventListener('click', () => {
            let body = document.querySelector('body');
            body.classList.toggle("darkBgColor");
        })
    }
}


const newDocument = new PageItens();
newDocument.getCode();
newDocument.copyToClip();
newDocument.clear();
newDocument.changeBackground();



function getCodeToFormat(e) {

    let code = e.target.value;

    if (e.which == 13) {
        if (code.length < 40 || code.length > 40) {
            showErrorLineCode()
            return
        }
        code = code.replace(/\s/g, '').trim()
        getInfo(code)
    }

}

/**
 * Analisa um código completo, extrai informações chave e atualiza a UI.
 * @param {string} code O código de entrada a ser processado.
 */
function getInfo(code) {
    // 1. **Verificação de Entrada:** Garante confiabilidade, falhando rapidamente se a entrada for inválida.
    if (!code || typeof code !== 'string' || code.length < 40) {
        console.error("Código inválido ou incompleto.");
        // Opcional: Mostrar uma mensagem de erro na tela
        newDocument.showError('Código inválido. Verifique o formato.');
        return;
    }

    // 2. **Desestruturação Otimizada (Extração de Dados):** // Garante que a extração de substrings (slices) seja feita de forma direta.
    // Usamos variáveis const para imutabilidade e clareza.
    const tipoUnidade = code.slice(0, 8);
    const produto = code.slice(8, 14);
    const lote = code.slice(30, 40);
    // Chamada imediata e uso do resultado (validação de validade)
    const validade = validateValidade(code.slice(17, 23));

    // 3. **Processamento/Mapeamento (Separação de Responsabilidades):**
    // Cria o objeto de dados com as informações extraídas. 
    // Assumindo que 'newObjDataFormat' recebe e processa/armazena esses dados.
    newObjDataFormat(tipoUnidade, produto, lote, validade);

    // 4. **Atualização da Interface (I/O):**
    // As operações de DOM são agrupadas e executadas por último.
    try {
        // Redução das chamadas de método (evita múltiplas buscas pelo elemento DOM se 'newDocument' não for um objeto já pronto)
        const showResultElement = newDocument.showResult();
        if (showResultElement) {
            showResultElement.innerHTML = newFormatScreen();
        }

        newDocument.imputCodeDocument().value = "";
    } catch (error) {
        console.error("Erro ao atualizar a interface ou limpar o campo.", error);
    }
}

function validateValidade(data) {
    return `${data.slice(4, 6)}/${data.slice(2, 4)}/${data.slice(0, 2,)}`
}




/**
 * Adiciona informações de um novo item (ou caixa) no objeto de dados agrupando por Lote e Validade.
 * Assumimos que 'dataTipe' é um objeto global ou acessível.
 * * @param {string} tipoUnidade Indica se é "CX" ou "UN".
 * @param {string} produto O código do produto.
 * @param {string} lote O número do lote.
 * @param {string} validade A validade formatada.
 */
/**
 * Adiciona informações de um novo item (ou caixa) no objeto de dados agrupando por Lote e Validade.
 * AGORA SEMPRE USA 4 UNIDADES PARA CAIXA (CX).
 * ...
 */
function newObjDataFormat(tipoUnidade, produto, lote, validade) {
    // 1. Inicializa o objeto do Produto, se não existir
    if (!dataTipe.hasOwnProperty(produto)) {
        dataTipe[produto] = {
            modelo: barCode[produto],
            loteEvalidade: [],
            lotes: [],
            validades: [],
            unidade: 0,
            caixa: 0,
        }
    }

    // 2. Define a quantidade de UNIDADES a ser adicionada
    let quantidadeCaixas = 0;
    let quantidadeUnidades = 1; // Padrão: 1

    const isCaixa = barCode[tipoUnidade] === "CX";
    // const isTipoEspecial = recuperaTipo(produto); <--- Esta variável não será mais usada para decidir a contagem.

    // Lógica CORRIGIDA para usar SEMPRE 4 para CX:
    if (isCaixa) {
        quantidadeUnidades = 4; // SEMPRE 4 UNIDADES para CX
        quantidadeCaixas = 1;
    }
    // Se não for CX, quantidadeUnidades permanece 1.

    // 3. Atualiza a contagem total de unidades e caixas
    dataTipe[produto].unidade += quantidadeUnidades;
    dataTipe[produto].caixa += quantidadeCaixas;

    // ... (4. Lógica de Agrupamento Lote/Validade - Permanece igual)
    const arrayAgrupamento = dataTipe[produto].loteEvalidade;

    const itemExistente = arrayAgrupamento.find(item =>
        item.lote === lote && item.validade === validade
    );

    if (itemExistente) {
        itemExistente.quantidade += quantidadeUnidades;
    } else {
        arrayAgrupamento.push({
            lote: lote,
            validade: validade,
            quantidade: quantidadeUnidades
        });

        // Opcional: Manter as listas de lotes e validades únicas, se ainda forem necessárias
        if (!dataTipe[produto].validades.includes(validade)) dataTipe[produto].validades.push(validade);
        if (!dataTipe[produto].lotes.includes(lote)) dataTipe[produto].lotes.push(lote);
    }
}

function recuperaTipo(data) {
    // 1. Defina um Array com todos os códigos de interesse
    const CODIGOS_ESPECIAIS = [
        '173537',
        '173538',
        '173539',
        '173542',
        '827157',
        '897632',
        '157212'
    ];

    // 2. Use o método includes() para verificar a existência
    // O resultado (true ou false) é exatamente o que você quer retornar.
    return CODIGOS_ESPECIAIS.includes(data);
}

function newFormatScreen() {
    let novoResultadoFormatado = "";
    Object.keys(dataTipe).forEach(key => {
        const produtoData = dataTipe[key];

        let detalhesLoteValidade = "";

        // 1. Constrói a linha de detalhes do Lote/Validade
        produtoData.loteEvalidade.forEach(itemLote => {
            detalhesLoteValidade += ` ${itemLote.quantidade} un Lote ${itemLote.lote} validade: ${itemLote.validade}`;
        });

        // 2. Constrói a linha principal do produto, SEM o excesso de quebras de linha e espaços no início.
        // O trim() final vai garantir que não haja espaços ou quebras no começo/fim.
        novoResultadoFormatado += `UN: ${produtoData.unidade} ${produtoData.modelo}${detalhesLoteValidade}\n`;
    });

    // Retorna o resultado final, removendo o espaço/quebra de linha inicial se houver.
    return novoResultadoFormatado.trim();
}

function addToClipBoard() {
    let textToCopy = document.querySelector('#resultado');
    let string = textToCopy.innerText;

    if (string == "") return false;
    navigator.clipboard.writeText(string)
        .then(() => {
            showSpan()
            newDocument.imputCodeDocument().setAttribute('disabled', true)

        })
        .catch(e => console.error(e, 'Error'))

}

function clearTheClipBoard() {
    // 1. Tenta encontrar o elemento do resultado
    const textToCopy = document.querySelector('#resultado');

    // Se o elemento não for encontrado, a função para aqui (fail-safe)
    if (!textToCopy) {
        console.error("Elemento '#resultado' não encontrado. Verifique o ID.");
        return;
    }

    // 2. Confirmação do usuário
    const verify = confirm('Deseja realmente limpar a tela e resetar os dados?');

    if (verify) { // Usuário clicou em 'OK'

        // A. Limpa o clipboard (Assíncrono, não bloqueia a interface)
        navigator.clipboard.writeText('').then();

        // B. Limpa a tela (DOM)
        textToCopy.innerHTML = '';

        // C. **ADICIONADO:** Limpa o campo de input
        newDocument.imputCodeDocument().value = '';

        // D. Habilita o input
        newDocument.imputCodeDocument().removeAttribute('disabled');

        // E. Limpa o objeto global de dados (dataTipe)
        for (const key in dataTipe) {
            if (dataTipe.hasOwnProperty(key)) {
                delete dataTipe[key];
            }
        }

    } else { // Usuário clicou em 'Cancelar'
        // Ação apenas para cancelar o 'disabled', caso estivesse ativo
        newDocument.imputCodeDocument().removeAttribute('disabled');
    }
}

function showSpan() {
    setTimeout(() => { newDocument.showHideSpan().style.display = 'block' }, 100);
    setTimeout(() => { newDocument.showHideSpan().style.display = 'none' }, 800)
}
function showErrorLineCode() {
    setTimeout(() => { newDocument.errorSpan.style.display = 'block' }, 100);
    setTimeout(() => { newDocument.errorSpan.style.display = 'none' }, 800)
}

