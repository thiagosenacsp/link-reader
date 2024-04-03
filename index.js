import chalk from "chalk";
import fs from "fs";

function tratarErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, "Não há arquivos neste diretório"));
    // exibe o stacktrace no console
}

function pegarArquivo(caminhoDoArquivo) {
    const encoding = "utf-8";
    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        if(erro) {
            tratarErro(erro);
        }
        console.log(chalk.green(texto));
    })
}

pegarArquivo("./arquivos/")
// para simular o erro, retire o nome do arquivo, por exemplo
