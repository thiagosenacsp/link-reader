import chalk from "chalk";
import fs from "fs";
import pegarArquivo from "./index.js";

const caminho = process.argv;

async function processarTexto(argumentos) {
    const caminho = argumentos[2];

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegarArquivo(argumentos[2]);
        console.log(chalk.yellow("Lista de links"), resultado)
    } else if ( fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeDeArquivo}`)
            console.log(`${caminho}/${nomeDeArquivo}`)
            console.log(lista)
        })
        console.log(arquivos)
    }
}

processarTexto(caminho);