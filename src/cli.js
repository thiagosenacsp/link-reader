import chalk from "chalk";
import fs from "fs";
import pegarArquivo from "./index.js";

const caminho = process.argv;

function imprimirLista(resultado) {
    console.log(chalk.yellow("Lista de links"), resultado)
}

async function processarTexto(argumentos) {
    const caminho = argumentos[2];

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegarArquivo(argumentos[2]);
        imprimirLista(resultado);
    } else if ( fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimirLista(lista)
        })
        console.log(arquivos)
    }
}

processarTexto(caminho);