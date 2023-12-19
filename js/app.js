
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

function getInfo(code) {
    // let resultadoFinal;

    let tipoUnidade = code.slice(0, 8);
    let produto = code.slice(8, 14);
    let lote = code.slice(30, 40);
    let validade = validateValidade(code.slice(17, 23));

    newObjDataFormat(tipoUnidade, produto, lote, validade)

    newDocument.showResult().innerHTML = newFormatScreen();
    newDocument.imputCodeDocument().value = ""
}

function validateValidade(data) {
    return `${data.slice(4, 6)}/${data.slice(2, 4)}/${data.slice(0, 2,)}`
}




function newObjDataFormat(tipoUnidade, produto, lote, validade) {
    if (!dataTipe.hasOwnProperty(produto)) {
        dataTipe[produto] = {
            modelo: barCode[produto],
            lotes: [],
            validades: [],
            unidade: 0,
            caixa: 0,
        }
    }
    if (!dataTipe[produto].validades.includes(validade)) dataTipe[produto].validades.push(validade);
    if (!dataTipe[produto].lotes.includes(lote)) dataTipe[produto].lotes.push(lote);

    if (barCode[tipoUnidade] == "CX" && (recuperaTipo(produto) == true)) {
        dataTipe[produto].unidade += 4;
    } else if (barCode[tipoUnidade] == "CX" && recuperaTipo(produto) == false) {
        dataTipe[produto].unidade += 5;
    } else {
        dataTipe[produto].unidade += 1;
    }

}

function recuperaTipo(data) {
    let valueCx;
    switch (data) {
        case '173537':
            valueCx = true
            break;
        case '173538':
            valueCx = true
            break;
        case '173539':
            valueCx = true
            break;
        case '173542':
            valueCx = true
            break;
        case '827157':
            valueCx = true
            break;
        case '897632':
            valueCx = true
            break;
        case '157212':
            valueCx = true
            break;
        default:
            valueCx = false
            break;
    }

    return valueCx

}

function newFormatScreen() {
    let novoResultadoFormatado = "";
    Object.keys(dataTipe).forEach(key => {

        novoResultadoFormatado += `UN:${dataTipe[key].unidade} ${dataTipe[key].modelo} ${dataTipe[key].lotes} ${dataTipe[key].validades};`
    });
    return novoResultadoFormatado
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
    let textToCopy = document.querySelector('#resultado');
    textToCopy.innerHTML = ''

    navigator.clipboard.writeText("")
        .then(() => {
            alert('Limpo')
            newDocument.imputCodeDocument().removeAttribute('disabled');

        })
        .catch(e => console.error(e, 'Error'))

}



function showSpan() {
    setTimeout(() => { newDocument.showHideSpan().style.display = 'block' }, 100);
    setTimeout(() => { newDocument.showHideSpan().style.display = 'none' }, 800)
}
function showErrorLineCode() {
    setTimeout(() => { newDocument.errorSpan.style.display = 'block' }, 100);
    setTimeout(() => { newDocument.errorSpan.style.display = 'none' }, 800)
}

