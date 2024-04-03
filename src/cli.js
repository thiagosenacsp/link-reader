import chalk from "chalk";
import pegarArquivo from "./index.js";

const caminho = process.argv;

async function processarTexto(caminho) {
    const resultado = await pegarArquivo(caminho[2]);
    console.log(chalk.yellow("Lista de links"), resultado)
}

processarTexto(caminho)