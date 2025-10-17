const container = document.querySelector('.container');

const images = [ // Array(Lista) com todas as cartas
    '01',
    '02',
    '03',
    '04',
];

const createElement = (tag, className) => { // Função para criar elementos com classe (class="")
    const element = document.createElement(tag); // Cria um elemnto
    element.className = className; // Adiciona a classe ao elemento
    return element; // Retorna o elemento criado (Faz ele ser usado fora da função)
}

let firstCard = ''; // Variável para armazenar a primeira carta clicada
let secondCard = ''; // Variável para armazenar a segunda carta clicada

const checkEndGame = () => { // Função para verificar se o jogo acabou

    const disabledCards = document.querySelectorAll('.disabled-card'); // Pega todas as cartas com a classe "disabled-card"

    if (disabledCards.length === 8) {

        setTimeout(() => {
            alert('Parabéns! Você encontrou todos os pares!'); // Se todas as cartas estiverem com a classe "disabled-card", o jogo acabou.
        }, 500);
    }

}

const checkCards = () => { // Função para verificar se as cartas são iguais

    const firstImage = firstCard.getAttribute('data-image'); // Pega o atributo "data-image" da primeira carta
    const secondImage = secondCard.getAttribute('data-image');

    if (firstImage === secondImage) { // Se as imagens forem iguais

        firstCard.firstChild.classList.add('disabled-card'); // Adiciona a classe "disabled-card" nas cartas (para que fiquem diferentes das demais)
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = ''; // Reseta as variáveis para poder clicar em novas cartas
        secondCard = '';

        checkEndGame(); // Chama a função para verificar se o jogo acabou

    } else { // Se as imagens forem diferentes

        setTimeout(() => { // Espera 0.5 segundos antes de executar o código dentro da função

            firstCard.classList.remove('reveal-card'); // Remove a classe "reveal-card" das cartas (vira elas de volta)
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) { // Se a div pai (card) da carta clicada (target) tiver a classe "reveal-card"

        return; // Retorna (não faz nada)

    }


    if (firstCard === '') { // Se a variável firstCard estiver vazia

        target.parentNode.classList.add('reveal-card'); // Adiciona a classe "reveal-card" na div pai (card) da carta clicada (target)
        firstCard = target.parentNode;

    } else if (secondCard === '') { // Se a variável secondCard estiver vazia

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards(); // Chama a função para verificar as cartas
    }
}

const createCard = (image) => {

    const card = createElement('div', 'card'); // Cria a div com a classe "card"
    const frente = createElement('div', 'face frente');
    const verso = createElement('div', 'face verso');

    frente.style.backgroundImage = `url('img/Cartas/${image}.png')`; // Adiciona a imagem de fundo da carta (frente)

    card.appendChild(frente); // Adiciona a carta (frente) dentro da div (card)
    card.appendChild(verso);

    card.addEventListener('click', revealCard); // Adiciona o evento de click na carta para virar-la
    card.setAttribute('data-image', image) // Adiciona um atributo "data-image" na carta com o nome da imagem (para comparar depois)


    return card // Retorna a carta criada (Faz ela ser usada fora da função)
}

const loadGame = () => {

    const duplicateImages = [...images, ...images]; // Duplicando as imagens (para fazer pares)

    const shuffledArray = duplicateImages.sort(() => Math.random() - 0.5); // Embaralha as cartas

    shuffledArray.forEach((image) => { // Para cada imagem no array embaralhado

        const card = createCard(image); // Cria a carta
        container.appendChild(card); // Adiciona a carta na div container

    })
}

loadGame(); // Chama a função para carregar o jogo (criar as cartas e adicionar na div container)