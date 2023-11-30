const displayResultado = document.querySelector('#resultado');
const copyClipboard = document.querySelector('#copyClipboard');
let spanCopy = document.querySelector('.alertCopy');

// let info2 = '140889978976320172409063012510028544207E'
//Remover espaços de uma string
//.replace(/\s/g, '')
const inputeCodigo = document.querySelector('#codeBar');

inputeCodigo.addEventListener('keyup', getCodeToFormat, false);
copyClipboard.addEventListener('click', addToClipBoard)


function getCodeToFormat(e) {

    let code = e.target.value;

    if (e.which == 13) {
        if (code.length < 40 || code.length > 40) return false
        code = code.replace(/\s/g, '').trim()
        getInfo(code)
    }

}




const barCode = {
    //dve  125
    '173537': 'DVE 20*25 125F',
    '173538': 'DVE 25*30 125F',
    '173539': 'DVE 28*35 125F',
    '173542': 'DVE 35*43 125F',
    //dvm 125
    '827157': 'DVM 20*25 125F',
    '897632': 'DVM 25*30 125F',
    '157212': 'DVM 28*35 125F',
    // dve 100
    '173605': 'DVE 8X10 100F',
    '173606': 'DVE 10X12 100F',
    '173607': 'DVE 14X11 100F',
    '173608': 'DVE 35X43 100F',
    // 
    '14088997': 'UN',
    '16088997': 'CX',

}


function getInfo(code) {
    let resultadoFinal;

    let tipo = code.slice(0, 8);
    let produto = code.slice(8, 14);
    let lote = code.slice(30, 40);
    let validade = validateValidade(code.slice(17, 23));

    console.log(barCode[tipo])
    console.log(barCode[produto])
    console.log(lote)
    console.log(validade)

    resultadoFinal = `${barCode[tipo]}:  ${barCode[produto]} LOTE: ${lote} VAL: ${validade}; `

    displayResultado.innerHTML += resultadoFinal + "</br>";
    inputeCodigo.value = ""
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
    setTimeout(() => { spanCopy.style.display = 'block' }, 100);
    setTimeout(() => { spanCopy.style.display = 'none' }, 800)
}
