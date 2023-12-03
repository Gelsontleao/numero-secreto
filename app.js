let listaDeNumerosSorteados = [];
let tamanhoDaLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativa = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, `Brazilian Portuguese Female`, { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela(`h1`, `Jogo do Número Secreto`);
  exibirTextoNaTela(`p`, `Escolha um número entre 1 e ${tamanhoDaLista}`);
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector(`input`).value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela(`h1`, `Acertou!!!`);
    let quantidadeTentativas = numeroTentativa > 1 ? `tentativas` : `tentativa`;
    let mensagemTentativas = `Você descobriu o número secreto com ${numeroTentativa} ${quantidadeTentativas}!`;
    exibirTextoNaTela(`p`, mensagemTentativas);
    document.getElementById(`reiniciar`).removeAttribute(`disabled`);
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela(`p`, `O número secreto é menor`);
    } else {
      exibirTextoNaTela(`p`, `O número secreto é maior`);
    }
    numeroTentativa++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * tamanhoDaLista + 1);
  let quantidadeElemntosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeElemntosNaLista == tamanhoDaLista) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector(`input`);
  chute.value = ``;
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  numeroTentativa = 1;
  exibirMensagemInicial();
  document.getElementById(`reiniciar`).setAttribute(`disabled`, true);
}
