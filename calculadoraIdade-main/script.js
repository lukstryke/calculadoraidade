// Algoritmo 

// Passo 1 - Pegar os valores 
// Passo 2 - Calcular a Idade
// Passo 3 - Gerar a faixa etaria 
// Passo 4 - Organizar o objeto pessoa para salvar na lista 
// Passo 5 - Cadastrar a pessoa na lista 
// Passo 6 - Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// Passo 7 - Renderizar o conteúdo da tabela com as pessoas cadastradas
// Passo 8 - Botão para limpar os registros



// Funcao Principal 

function calcularIdade(event) {
    event.preventDefault()
    console.log('FuncionaBixo!');
    let dadosUsuario = pegarValores();
    let idade = calcIdade(dadosUsuario.ano);
    console.log(idade);
    let faixaEtaria = gerarFaixaEtaria(idade)
    console.log(faixaEtaria);

    let pessoaCadastrada = organizarPessoa(dadosUsuario, faixaEtaria, idade);

    cadastrarPessoa(pessoaCadastrada);



}

// Passo 1 - Pegar os valores 

function pegarValores() {

    let nomedigitado = document.getElementById('nome').value.trim();
    let diaNasc = parseInt(document.getElementById('dia-nascimento').value);
    let mesNasc = parseInt(document.getElementById('mes-nascimento').value);
    let anoNasc = parseInt(document.getElementById('ano-nascimento').value);

    let dadosUsuario = {
        nome: nomedigitado,
        dia: diaNasc,
        mes: mesNasc,
        ano: anoNasc

    }
    console.log(dadosUsuario);
    return dadosUsuario;
}

// Passo 2 - Calcular Idade

function calcIdade(ano) {
    let idade = (new Date().getFullYear()) - ano;
    return idade;
}

// Passo 3 - Gerar a faixa etaria

// Resultado            Faixa
// 0 à 12               Criança
// 13 à 17              Adolescente
// 18 à 65              Adulto
// Acima de 65          Idoso

function gerarFaixaEtaria(idade) {
    console.log(idade);

    if (idade < 12) {
        return 'Crianca';
    }
    else if (idade <= 17) {
        return 'Adolescente'
    }
    else if (idade <= 65) {
        return 'Adulto'
    }
    else {
        return 'Idoso'
    }

}

// Passo 4 - Organizar o objeto pessoa para salvar na lista 

function organizarPessoa(dadosUsuario, fEtaria, age) {

    let pessoaAtualizada = {
        ...dadosUsuario,
        faixaEtaria: fEtaria,
        idade: age
    }
    console.log(pessoaAtualizada);
    return pessoaAtualizada;

}

// Passo 5 - Cadastrar a pessoa na lista 

function cadastrarPessoa(pessoa) {
    let listaPessoas = [];

    console.log('sera que funciona?' + pessoa);

    if (localStorage.getItem('pessoaCadastrada')) {
        listaPessoas = JSON.parse(localStorage.getItem('pessoaCadastrada'));
    }

    listaPessoas.push(pessoa)
    localStorage.setItem('pessoaCadastrada', JSON.stringify(listaPessoas));

}

// Passo 6 - Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página

function carregarPessoa() {

    let listaPessoas = [];

    console.log('aqui');

    if (localStorage.getItem('pessoaCadastrada')) {
        listaPessoas = JSON.parse(localStorage.getItem("pessoaCadastrada"));

    }
    console.log('oxe'+ listaPessoas);

    if (listaPessoas.lenght== 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado</td>
        </tr>`

    }

    else {
        renderizarTabela(listaPessoas);
    }

}
window.addEventListener('DOMContentLoaded', () => carregarPessoa());

// Passo 7 - Renderizar o conteúdo da tabela com as pessoas cadastradas

function renderizarTabela(listadePessoas) {
    let tabela = document.getElementById('corpo-tabela');
    let template = '';

    listadePessoas.forEach(pessoa => {
        template +=`<tr>
                        <td data-cell="nome">${pessoa.nome}</td>
                        <td data-cell="data de nascimento">${pessoa.dia + '/' + pessoa.mes + '/' + pessoa.ano}</td>
                        <td data-cell="idade">${pessoa.idade}</td>
                        <td data-cell="faixa etária">${pessoa.faixaEtaria}</td>
                    </tr>`
    });

    tabela.innerHTML = template;

}

// Passo 8 - Botão para limpar os registros

function deletarRegistros() {
    localStorage.removeItem('pessoaCadastrada')
    window.location.reload();

}

