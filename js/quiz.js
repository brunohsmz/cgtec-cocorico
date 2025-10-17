const perguntas = [
  // Fácil
  {
    pergunta: "Qual é o formato geral da função do segundo grau?",
    opcoes: [
      "y = ax + b",
      "y = ax² + bx + c",
      "y = a/x + b",
      "y = ax³ + bx² + c"
    ],
    resposta: 1,
    nivel: "Fácil"
  },
  {
    pergunta: "O gráfico da função do segundo grau é chamado de:",
    opcoes: [
      "Reta",
      "Parábola",
      "Circunferência",
      "Elipse"
    ],
    resposta: 1,
    nivel: "Fácil"
  },
  {
    pergunta: "A linha que divide a parábola em duas partes simétricas é chamada de:",
    opcoes: [
      "Raiz",
      "Vértice",
      "Eixo de Simetria",
      "Foco"
    ],
    resposta: 2,
    nivel: "Fácil"
  },
  {
    pergunta: "O que é vértice?",
    opcoes: [
      "O vértice é uma aresta",
      "O vértice é o ponto no qual a função do segundo grau atinge o valor maximo ou minimo",
      "Nada",
      "O vértice é a distância entre o centro e a borda de um círculo"
    ],
    resposta: 1,
    nivel: "Fácil"
  },
  {
    pergunta: "Numa equação de segundo grau o que significa o x?",
    opcoes: [
      "Uma incógnita que representa um valor desconhecido",
      "Um coeficiente da equação",
      "Nada",
      "Uma hipotenusa de um teorema de Pitágoras"
    ],
    resposta: 0,
    nivel: "Fácil"
  },

  // Médio
  {
    pergunta: "Qual o número máximo de raízes que a equação pode ter?",
    opcoes: [
      "Uma",
      "Duas",
      "Três",
      "Nenhuma"
    ],
    resposta: 1,
    nivel: "Médio"
  },
  {
    pergunta: "Se a < 0 na função y = ax² + bx + c, a parábola é:",
    opcoes: [
      "Concava para cima",
      "Concava para baixo",
      "Uma reta",
      "Um círculo"
    ],
    resposta: 1,
    nivel: "Médio"
  },
  {
    pergunta: "O que leva uma equação de segundo grau a ser considerada incompleta? Quando o valor dos coeficientes...",
    opcoes: [
      "b e c são diferentes de 0 (b≠0 ou c≠0)",
      "b e c são menores que 0 (b>0 ou c>0)",
      "b e c são maiores que 0 (b>0 ou c>0)",
      "b e c são iguais a 0 (b=0 ou c=0)"
    ],
    resposta: 3,
    nivel: "Médio"
  },
  {
    pergunta: "A solução de uma equação de segundo grau ocorre em que momento?",
    opcoes: [
      "Quando o Delta é encontrado",
      "Quando as raízes são encontradas",
      "Quando as raízes não são encontradas",
      "Quando a de primeiro grau é resolvida"
    ],
    resposta: 1,
    nivel: "Médio"
  },
  {
    pergunta: "O que temos que fazer para concluir uma equação de segundo grau?",
    opcoes: [
      "Dividir e subtrair",
      "Multiplicar os mebros da equação",
      "Descobrir o Delta e fazer o Bhaskara",
      "Somar e multiplicar"
    ],
    resposta: 2,
    nivel: "Médio"
  },
  {
    pergunta: "Qual a fórmula de Delta?",
    opcoes: [
      "∆ = b² / 4ac",
      "∆ = b² + 4ac",
      "∆ = b² - 4ac",
      "∆ = b² x 4ac"
    ],
    resposta: 2,
    nivel: "Médio"
  },
  {
    pergunta: "Qual a fórmula de Bhaskara?",
    opcoes: [
      "x = (-b ± √∆)/2a",
      "x = (+b ± √∆)/2a",
      "x = -b ± √∆/2a",
      "x = (-b² ± c√∆)/2a"
    ],
    resposta: 0,
    nivel: "Médio"
  },

  // Difícil
  {
    pergunta: "Se a > 0 e Δ < 0, o gráfico da função: ",
    opcoes: [
      "Não toca o eixo x",
      "Toca o eixo x uma vez",
      "Toca o eixo x duas vezes",
      "É uma reta"
    ],
    resposta: 0,
    nivel: "Difícil"
  },
  {
    pergunta: "Qual elemento indica a abertura e concavidade da parábola? (y = ax² + bx + c)",
    opcoes: [
      "Δ",
      "c",
      "b",
      "a"
    ],
    resposta: 3,
    nivel: "Difícil"
  }
];

let nivelSelecionado = null;
let perguntasFiltradas = [];
let indiceAtual = 0;
let timerInterval = null;
let tempoRestante = 15;

document.addEventListener("DOMContentLoaded", () => {
  const botoesNivel = document.querySelectorAll('.opcao-categoria');
  botoesNivel.forEach(botao => {
    botao.addEventListener('click', () => {
      botoesNivel.forEach(b => b.classList.remove('selecionado'));
      botao.classList.add('selecionado');
      nivelSelecionado = botao.textContent.trim();
    });
  });

  const btnIniciar = document.querySelector('.iniciar-quiz');
  btnIniciar.addEventListener('click', () => {
    if (!nivelSelecionado) {
      alert('Selecione um nível!');
      return;
    }
    // Redireciona para o jogo da memória só quando iniciar for clicado
    if (nivelSelecionado === "Jogo da Memória") {
      window.location.href = "memory.html";
      return;
    }
    perguntasFiltradas = perguntas.filter(q => q.nivel === nivelSelecionado);
    if (perguntasFiltradas.length === 0) {
      alert('Não há perguntas para este nível!');
      return;
    }
    document.querySelector('.container-config').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    indiceAtual = 0;
    mostrarPergunta();
  });

  document.querySelector('.quiz-container').style.display = 'none';
  document.querySelector('.container-config').style.display = 'block';
});

function mostrarPergunta() {
  clearInterval(timerInterval);
  tempoRestante = 15;
  atualizarTimer();

  const quizContainer = document.querySelector('.quiz-container .conteudo');
  const perguntaObj = perguntasFiltradas[indiceAtual];
  const opcoesEmbaralhadas = embaralhar(
    perguntaObj.opcoes.map((op, i) => ({ texto: op, indice: i }))
  );

  quizContainer.innerHTML = `
    <h1 class="pergunta">${perguntaObj.pergunta}</h1>
    <div class="opcoes-quiz">
      ${opcoesEmbaralhadas.map(op =>
    `<button onclick="responderPergunta(${op.indice})">${op.texto}</button>`
  ).join('')}
    </div>
  `;

  timerInterval = setInterval(() => {
    tempoRestante--;
    atualizarTimer();
    if (tempoRestante <= 0) {
      clearInterval(timerInterval);
      responderPergunta(-1); // Considera resposta errada
    }
  }, 1000);
}

function responderPergunta(indiceSelecionado) {
  clearInterval(timerInterval);
  const perguntaObj = perguntasFiltradas[indiceAtual];
  if (indiceSelecionado === perguntaObj.resposta) {
    alert("✅Resposta correta!✅");
  } else if (indiceSelecionado === -1) {
    alert("🕑Tempo esgotado!🕑");
  } else {
    alert("❌Resposta incorreta!❌");
  }
  indiceAtual++;
  if (indiceAtual < perguntasFiltradas.length) {
    mostrarPergunta();
  } else {
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.container-config').style.display = 'block';
    indiceAtual = 0;
    perguntasFiltradas = [];
    document.querySelectorAll('.opcao-categoria').forEach(b => b.classList.remove('selecionado'));
    atualizarTimer(15); // Reset timer display
  }
}

function atualizarTimer() {
  const timerEl = document.querySelector('.quiz-container .duracao');
  if (timerEl) {
    timerEl.textContent = `${tempoRestante}s`;
  }
}

// Função para embaralhar as opções
function embaralhar(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}