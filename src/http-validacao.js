function extrairLinks (arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function verificarStatus (listaURLs) {
    const arrStatus = await Promise.
    all(
        listaURLs.map(async (url) => {
            const response = await fetch(url)
            return response.status;
        })
    )
    return arrStatus
}

export default async function listaValidada (listaDeLinks) {
    const links = extrairLinks(listaDeLinks);
    const status = await verificarStatus(links);
    return status
}
