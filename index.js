import chalk from "chalk";
import fs from "fs";

function tratarErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, "Não há arquivos neste diretório"));
}

function pegarArquivo(caminhoDoArquivo) {
    const encoding = "utf-8";
    fs.promises
        .readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(tratarErro)
}

pegarArquivo("./arquivos/texto.md")
