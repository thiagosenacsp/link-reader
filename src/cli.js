import chalk from "chalk";
import fs from "fs";
import pegarArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimirLista(valida, resultado, identificador = " ") {
    if (valida) {
        console.log(
            chalk.yellow("Lista de validada"),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado))
    } else {
    console.log(
        chalk.yellow("Lista de links"),
        chalk.black.bgGreen(identificador),
        resultado)
    }
}

async function processarTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === "--validar";

    try {
        fs.lstatSync(caminho)
    } catch(erro) {
        if (erro.code === "ENOENT") {
            console.log("Arquivo ou diretório não existe")
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegarArquivo(argumentos[2]);
        imprimirLista(valida, resultado);
    } else if ( fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimirLista(valida, lista, nomeDeArquivo)
        })
        console.log(arquivos)
    }
}

processarTexto(caminho);