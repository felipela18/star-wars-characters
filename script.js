let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {//toda vez que a página for carregada, ela vai chamar essa função.
    try {
        await loadCharacters(currentPageUrl)//função vai pegar a url e vai fazer uma requisição na API para trazer os resultados e vai transformar os resultados em cards
    } catch (error) {
        console.log(error)
        alert('erro ao carregar cards')
    };

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')
    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', previousNextPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; 
    //Limpa os resultados anteriores e gera os novos
    
    try {
        const response = await fetch(url);
        //faz a requisição na URL da API,para ser utilizada nessa variável
        const responseJson = await response.json();//converte os dados trazidos da API em Json 

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"
            
            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`
            //innertext = mude os dados do texto
            
            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)
            
            mainContent.appendChild(card)

        })
        
        const nextButton = document.getElementById('next-button')  //foi repetido as variáveis pois a mesma está fora dos escopos da 1º
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"


        currentPageUrl = url

    } catch (error) {
        alert('Erro ao carregar personagens')
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}
