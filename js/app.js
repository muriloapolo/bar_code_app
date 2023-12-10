const barCode = {
    //dve  125
    '173537': 'DVE 20*25 125f',
    '173538': 'DVE 25*30 125f',
    '173539': 'DVE 28*35 125f',
    '173542': 'DVE 35*43 125f',
    //dvm 125
    '827157': 'DVM 20*25 125f',
    '897632': 'DVM 25*30 125f',
    '157212': 'DVM 28*35 125f',
    // dve 100
    '173605': 'DVE 8X10 100f',
    '173606': 'DVE 10X12 100f',
    '173607': 'DVE 14X11 100f',
    '173608': 'DVE 35X43 100f',
    // dvm 100
    '141115': 'DVM 8X10 100f',
    '828509': 'DVM 10X12 100f',


    //  UNIDADE x CAIXA
    '14088997': 'UN',
    '16088997': 'CX',

}

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
            console.log('teste')
        })
    }




}


const newDocument = new PageItens()
newDocument.getCode()
newDocument.copyToClip()
newDocument.changeBackground()



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
    let resultadoFinal;

    let unidade = code.slice(0, 8);
    let produto = code.slice(8, 14);
    let lote = code.slice(30, 40);
    let validade = validateValidade(code.slice(17, 23));




    // let dataTipe = new Object();
    // dataTipe[''] = {
    //     modelo: '',
    //     unidade: 0,
    //     caixa: 0,
    //     validade: []
    // };



    console.log(barCode[unidade])
    console.log(barCode[produto])
    console.log(lote)
    console.log(validade)

    resultadoFinal = `${barCode[unidade]}:  ${barCode[produto]} ${lote}  ${validade};`

    newDocument.showResult().innerHTML += resultadoFinal;
    newDocument.imputCodeDocument().value = ""
}

function validateValidade(data) {
    return `${data.slice(4, 6)}/${data.slice(2, 4)}/${data.slice(0, 2,)}`
}


function addToClipBoard() {
    let textToCopy = document.querySelector('#resultado');
    let string = textToCopy.innerText
    if (string == "") return false
    navigator.clipboard.writeText(string)
        .then(() => {
            showSpan()
        })

}

function showSpan() {
    setTimeout(() => { newDocument.showHideSpan().style.display = 'block' }, 100);
    setTimeout(() => { newDocument.showHideSpan().style.display = 'none' }, 800)
}
function showErrorLineCode() {
    setTimeout(() => { newDocument.errorSpan.style.display = 'block' }, 100);
    setTimeout(() => { newDocument.errorSpan.style.display = 'none' }, 800)
}
