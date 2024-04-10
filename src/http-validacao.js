function extrairLinks (arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function verificarStatus (listaURLs) {
    const arrStatus = await Promise.
    all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status;
            } catch (erro) {
                return manejarErros(erro)
            }
        })
        )
        return arrStatus
    }
    
    function manejarErros (erro) {
        if (erro.cause.code === "ENOTFOUND") {
            return "Link não encontrado"
        } else {
            return "Ocorreu algum erro"
        }
    }
    

export default async function listaValidada (listaDeLinks) {
    const links = extrairLinks(listaDeLinks);
    const status = await verificarStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}
