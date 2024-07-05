//Variável para coletar todos os buttons
const botoes = document.querySelector('.todosBotoes');
//Variavel com a tela (onde o resultado será a´resentado e os numeros e operação innseridos)
const tela = document.querySelector('.tela');
//Tecla precionada
let tecla;
//Variável com o botão clicado
let botaoClicado;
//Variável com a operação a ser realizada
let operacaoSelecionada;
//caso clique em duas opçoes diferentes
let operacaoSelecionadaDup;
//Variável com o primeiro valor
let n1 = '';
//Variável com o segundo valor
let n2 = '';
//variavel que armazenará o calculo
let calc;
//Mensagem a ser gravada no Histórico
let mensagem = '';
//Variavel com o elemento do historico selecionado
const historico = document.querySelector('tbody');
//Variável para adicionar uma linha ao histórico
let linhaTabela;
//variável para criar o elemento que exibirá a mensagem
let valorLinha;
//controlador para realizar os numeros
let i = 0;

let comprimento;
let valorTela;
let novoValorTela

// Escutador de eventos, quando o usuário clicar em algum botão
botoes.addEventListener('click', function(e){
    //Identificar o texto do botao clicado
    botaoClicado = e.target.textContent

    //se o botão for C, então...
    if(botaoClicado === 'C'){
        //zera todas as variáveis interativas
        n1 = '';
        n2 = '';
        mensagem = '';
        i = 0;
        //tira o valor da tela
        tela.value = null;

    //Se o botão clicado for um número então...
    } else if (botaoClicado >= 0 && botaoClicado <= 9) {
        if(tela.value == calc){
            tela.value = ''
            n1 = ''
            n2 = ''
        }
        //Escreve na tela o valor solicitado
        tela.value += botaoClicado;  
        //adiciona esse valor a variáriavel correspondente 
        if(i == 0){
            n1 += botaoClicado;
        } else if (i = 1){
            n2 += botaoClicado;
        }
    
    //selecionando a operação
    } else if (botaoClicado === '/' || botaoClicado === '*' || botaoClicado === '-' || botaoClicado === '+'){
        if(i == 1){
            operacaoSelecionadaDup = botaoClicado;
            i=2
            
        } else if(i == 0 && botaoClicado == '-' && n1 === ''){
            operacaoSelecionada = botaoClicado
            n1= operacaoSelecionada
            tela.value += operacaoSelecionada

        }else{
            operacaoSelecionada = botaoClicado;
            tela.value += operacaoSelecionada
            i++
        }

    //se o botao clicado for = então...    
    } else if (botaoClicado === '='){
        console.log('o primeiro valor é', n1, ';', 'o segundo valor é', n2, ';')
        //realizar a operação
        parseInt(n1)
        parseInt(n2);
        calc = operacoes(n1, n2, operacaoSelecionada);
        //escrever na tela
        tela.value = parseFloat(calc).toFixed(1)
        adicionarHistorico()
        n1 = parseFloat(calc).toFixed(1)
        n2 = ''
        i = 0

    } else if (botaoClicado == '<='){
        valorTela = tela.value
        comprimento = valorTela.length
        //apagar o operador
        if(valorTela[parseInt(comprimento)-1] == operacaoSelecionada){
            novoValorTela = valorTela.replace(operacaoSelecionada, '')
            tela.value = novoValorTela
            console.log('operação removida')
            i--
        //apagar o ultimo numero antes do operador
        } else if (i == 0 && valorTela[parseInt(comprimento)-1] != operacaoSelecionada){
            novoValorTela = valorTela.replace(n1[parseInt(comprimento)-1], '')
            tela.value = novoValorTela
            n1 = novoValorTela
            console.log('novo n1: ', n1)
        //apagar o ultimo numero depois do operador
        } else {
            novoValorTela = valorTela.replace(n2[parseInt(n2.length)-1], '')
            tela.value = novoValorTela
            n2 = n2.replace(n2[parseInt(n2.length)-1], '')
            console.log('novo n2: ', n2)
        }

    //se o botão da virgula for clicado
    } else if (botaoClicado == ',' ){
        valorTela = tela.value
        comprimento = valorTela.length
        if(i == 0){
            n1 += '.'
            tela.value += ','
        } else if (i == 0 && valorTela[parseInt(comprimento)-1] != operacaoSelecionada) {
            n2 += '.'
            tela.value += ','
        }

    //se o botão do ponto for clicado
    } else if (botaoClicado == '.' ){
        valorTela = tela.value
        comprimento = valorTela.length
        if(i == 0){
            tela.value += '.'
        } else if (i == 0 && valorTela[parseInt(comprimento)-1] != operacaoSelecionada) {
            tela.value += '.'
        }
    } else if (botaoClicado == 'AC' ){
        location.reload()
    }

    //se o controlador chegar ate 2 então...
    if(i == 2){
        console.log('o primeiro valor é', n1, ';', 'o segundo valor é', n2, ';')
        //realizar a operação
        calc = operacoes(n1, n2, operacaoSelecionada);
        //escrever na tela
        tela.value = parseFloat(calc).toFixed(1) + operacaoSelecionadaDup
        adicionarHistorico()
        n1 = parseFloat(calc).toFixed(1)
        n2 = ''
        i = 1
        operacaoSelecionada = operacaoSelecionadaDup
    }
    e.preventDefault();
});

//escutador de eventos quando o usuário clicar em alguma tecla
tela.addEventListener('keydown', function(e){
    tecla = e.key;
    console.log(tecla)

    //Se a tecla clicado for um número então...
    if (tecla >= 0 && tecla <= 9) {
        if(tela.value == calc){
            tela.value = ''
            n1 = ''
            n2 = ''
        }
        //Escreve na tela o valor solicitado
        tela.value += tecla;  
        //adiciona esse valor a variáriavel correspondente 
        if(i == 0){
            n1 += tecla;
        } else if (i = 1){
            n2 += tecla;
        }
    
    //selecionando a operação
    } else if (tecla === '/' || tecla === '*' || tecla === '-' || tecla === '+'){
        if(i == 1){
            operacaoSelecionadaDup = tecla;
            i=2
            
        } else if(i == 0 && tecla == '-' && n1 === ''){
            operacaoSelecionada = tecla
            n1= operacaoSelecionada
            tela.value += operacaoSelecionada

        }else{
            operacaoSelecionada = tecla;
            tela.value += operacaoSelecionada
            i++
        }

    //se a tecla clicada for = então ou enter...    
    } else if (tecla === '=' || tecla === 'Enter'){
        console.log('o primeiro valor é', n1, ';', 'o segundo valor é', n2, ';')
        //realizar a operação
        parseInt(n1)
        parseInt(n2);
        calc = operacoes(n1, n2, operacaoSelecionada);
        //escrever na tela
        tela.value = parseFloat(calc).toFixed(1)
        adicionarHistorico()
        n1 = parseFloat(calc).toFixed(1)
        n2 = ''
        i = 0

    //se a tecla apagar for pressionada
    } else if (tecla == 'Backspace'){
        valorTela = tela.value
        comprimento = valorTela.length
        //apagar o operador
        if(valorTela[parseInt(comprimento)-1] == operacaoSelecionada){
            novoValorTela = valorTela.replace(operacaoSelecionada, '')
            tela.value = novoValorTela
            console.log('operação removida')
            i--
        //apagar o ultimo numero antes do operador
        } else if (i == 0 && valorTela[parseInt(comprimento)-1] != operacaoSelecionada){
            novoValorTela = valorTela.replace(n1[parseInt(comprimento)-1], '')
            tela.value = novoValorTela
            n1 = novoValorTela
            console.log('novo n1: ', n1)
        //apagar o ultimo numero depois do operador
        } else {
            novoValorTela = valorTela.replace(n2[parseInt(n2.length)-1], '')
            tela.value = novoValorTela
            n2 = n2.replace(n2[parseInt(n2.length)-1], '')
            console.log('novo n2: ', n2)
        }

    //se a tecla da virgula for clicado
    } else if (tecla == ',' ){
        valorTela = tela.value
        comprimento = valorTela.length
        if(i == 0){
            n1 += '.'
            tela.value += ','
        } else if (i == 0 && valorTela[parseInt(comprimento)-1] != operacaoSelecionada) {
            n2 += '.'
            tela.value += ','
        }

    //se a tecla do ponto for clicado
    } else if (tecla == '.' ){
        valorTela = tela.value
        comprimento = valorTela.length
        if(i == 0){
            tela.value += '.'
        } else if (i == 0 && valorTela[parseInt(comprimento)-1] != operacaoSelecionada) {
            tela.value += '.'
        }
    }

    //se o controlador chegar ate 2 então...
    if(i == 2){
        console.log('o primeiro valor é', n1, ';', 'o segundo valor é', n2, ';')
        //realizar a operação
        calc = operacoes(n1, n2, operacaoSelecionada);
        //escrever na tela
        tela.value = parseFloat(calc).toFixed(1) + operacaoSelecionadaDup
        adicionarHistorico()
        n1 = parseFloat(calc).toFixed(1)
        n2 = ''
        i = 1
        operacaoSelecionada = operacaoSelecionadaDup
    }

    e.preventDefault()
});

function operacoes(a,b,ope){

    switch (ope){
        //se operacao for dividir:
        case '/':
            return (parseFloat(a)/parseFloat(b));

        //se operacao for multiplicar:
        case '*':
            return (parseFloat(a)*parseFloat(b));

        //se operacao for subtração:
        case '-':
            return (parseFloat(a)-parseFloat(b));

        //se operação for adição:
        case '+':
            return (parseFloat(a)+parseFloat(b));
    }
}

function adicionarHistorico () {
    //escrever mensagem
    mensagem = `${n1} ${operacaoSelecionada} ${n2}= ${parseFloat(calc).toFixed(2)}`
    //adicionar uma linha ao histórico
    linhaTabela = document.createElement('tr');
    //criar o elemento que exibirá a mensagem
    valorLinha = document.createElement('td')
    //adicionar o valor da operação ao valor da linha no histórico
    valorLinha.textContent = mensagem;
    //adicionar o valor a linha do histórico
    linhaTabela.appendChild(valorLinha);
    //e finalmente adicionar tudo ao histórico
    historico.appendChild(linhaTabela);
    i = 0
}