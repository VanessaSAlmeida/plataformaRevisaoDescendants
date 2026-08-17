window.courseData = {
    title: "✨ Matemática em Auradon",
    tagline: "Onde princesas e príncipes aprendem que somar bondade é importante!",
    subtitle: "Matemática • 3º Período • 5º Ano",
    description: "Resolva desafios, descubra padrões e use a Matemática para ajudar a desvendar novas aventuras em Auradon.",

    topics: [
        {
            icon: "➕",
            title: "As Quatro Operações",
            svg: "",
            content: `
                <h3>🧮 Adição, subtração, multiplicação e divisão</h3>
                <p>
                    As quatro operações com números naturais aparecem em muitas
                    situações do dia a dia. Para resolver um problema, primeiro
                    leia com atenção, descubra quais informações são importantes
                    e identifique o que precisa ser encontrado.
                </p>
                <p>
                    <strong>Adição</strong> pode juntar quantidades;
                    <strong>subtração</strong> pode indicar quanto falta ou quanto
                    sobra; <strong>multiplicação</strong> pode representar grupos
                    de mesma quantidade; e <strong>divisão</strong> pode repartir
                    uma quantidade em partes iguais.
                </p>
            `,
            questions: [
                {
                    id: "mat-01",
                    difficulty: "easy",
                    learningObjective: "Resolver situações-problema utilizando as quatro operações com números naturais.",
                    question: "O castelo de Auradon tinha 248.735 livros em seu acervo. Para ampliar a biblioteca, recebeu mais 137.486 livros. Quantos livros há agora?",
                    answers: [
                        "376.121 livros",
                        "386.221 livros",
                        "386.121 livros",
                        "396.221 livros"
                    ],
                    correct: 2,
                    explanation: "É preciso juntar as duas quantidades: 248.735 + 137.486 = 386.221."
                },
                {
                    id: "mat-02",
                    difficulty: "medium",
                    learningObjective: "Resolver situações-problema utilizando as quatro operações com números naturais.",
                    question: "Para um grande festival de Auradon, foram preparadas 1.248 caixas com 325 lembranças em cada uma. Quantas lembranças foram preparadas ao todo?",
                    answers: [
                        "395.600",
                        "405.600",
                        "405.800",
                        "415.600"
                    ],
                    correct: 1,
                    explanation: "São 1.248 grupos de 325 lembranças: 1.248 × 325 = 405.600."
                },
                {
                    id: "mat-03",
                    difficulty: "hard",
                    learningObjective: "Resolver situações-problema utilizando as quatro operações com números naturais.",
                    question: "Auradon recebeu 864.000 fichas para distribuir igualmente entre 12 equipes. Depois, cada equipe recebeu mais 3.500 fichas. Quantas fichas cada equipe recebeu ao final?",
                    answers: [
                        "72.500",
                        "75.500",
                        "76.000",
                        "79.500"
                    ],
                    correct: 1,
                    explanation: "Primeiro, 864.000 ÷ 12 = 72.000 fichas por equipe. Depois, 72.000 + 3.500 = 75.500 fichas."
                }
            ]
        },

        {
            icon: "💯",
            title: "Porcentagem",
            svg: "",
            content: `
                <h3>💯 Porcentagens simples</h3>
                <p>
                    Porcentagem indica uma parte de 100. Algumas porcentagens
                    simples podem ser relacionadas diretamente a frações conhecidas.
                </p>
                <p>
                    <strong>10%</strong> = décima parte;
                    <strong>25%</strong> = quarta parte;
                    <strong>50%</strong> = metade;
                    <strong>75%</strong> = três quartos;
                    <strong>100%</strong> = inteiro.
                </p>
            `,
            questions: [
                {
                    id: "mat-04",
                    difficulty: "easy",
                    learningObjective: "Calcular porcentagens simples e resolver situações-problema.",
                    question: "Em uma coleção com 200 cartões, 25% são cartões dourados. Quantos cartões dourados há?",
                    answers: [
                        "25",
                        "40",
                        "50",
                        "75"
                    ],
                    correct: 2,
                    explanation: "25% corresponde à quarta parte. A quarta parte de 200 é 50."
                },
                {
                    id: "mat-05",
                    difficulty: "medium",
                    learningObjective: "Calcular porcentagens simples e resolver situações-problema.",
                    question: "Uma loja de Auradon anunciou 10% de desconto em uma capa que custava R$ 80,00. Qual é o valor do desconto?",
                    answers: [
                        "R$ 4,00",
                        "R$ 8,00",
                        "R$ 10,00",
                        "R$ 16,00"
                    ],
                    correct: 1,
                    explanation: "10% é a décima parte. A décima parte de R$ 80,00 é R$ 8,00."
                },
                {
                    id: "mat-06",
                    difficulty: "hard",
                    learningObjective: "Relacionar porcentagens simples a suas frações equivalentes.",
                    question: "Uma turma recebeu 48 medalhas. Se 75% delas foram entregues às equipes que participaram do desafio, quantas medalhas foram entregues?",
                    answers: [
                        "12",
                        "24",
                        "36",
                        "42"
                    ],
                    correct: 2,
                    explanation: "75% corresponde a três quartos. Três quartos de 48 são 36."
                }
            ]
        },

        {
            icon: "🔢",
            title: "Frações e Números Decimais",
            svg: "",
            content: `
                <h3>🔢 Diferentes representações</h3>
                <p>
                    Uma mesma quantidade pode ser representada por uma fração
                    decimal, por um número decimal ou por uma porcentagem.
                </p>
                <p>
                    Exemplos:
                    <br>
                    1/10 = 0,1 = 10%
                    <br>
                    1/4 = 0,25 = 25%
                    <br>
                    1/2 = 0,5 = 50%
                    <br>
                    3/4 = 0,75 = 75%
                    <br>
                    1 inteiro = 1 = 100%
                </p>
            `,
            questions: [
                {
                    id: "mat-07",
                    difficulty: "easy",
                    learningObjective: "Relacionar porcentagens simples a suas frações equivalentes.",
                    question: "Qual alternativa apresenta uma porcentagem e uma fração que representam a mesma quantidade?",
                    answers: [
                        "10% = 1/2",
                        "25% = 3/4",
                        "50% = 1/2",
                        "75% = 1/4"
                    ],
                    correct: 2,
                    explanation: "50% representa a metade de um inteiro, portanto equivale a 1/2."
                },
                {
                    id: "mat-08",
                    difficulty: "medium",
                    learningObjective: "Converter e relacionar números racionais nas suas diferentes representações.",
                    question: "Qual alternativa apresenta três representações da mesma quantidade?",
                    answers: [
                        "1/4 = 0,25 = 25%",
                        "1/2 = 0,25 = 50%",
                        "3/4 = 0,5 = 75%",
                        "1/10 = 0,5 = 10%"
                    ],
                    correct: 0,
                    explanation: "Um quarto corresponde a 0,25 e também a 25%."
                }
            ]
        },

        {
            icon: "📊",
            title: "Comparação e Ordenação de Decimais",
            svg: "",
            content: `
                <h3>📊 Comparando números decimais</h3>
                <p>
                    Para comparar números decimais, observe primeiro a parte inteira.
                    Se ela for igual, compare as casas decimais da esquerda para
                    a direita: décimos, centésimos e assim por diante.
                </p>
                <p>
                    Também podemos acrescentar zeros à direita sem mudar o valor:
                    0,5 = 0,50 = 0,500.
                </p>
            `,
            questions: [
                {
                    id: "mat-09",
                    difficulty: "easy",
                    learningObjective: "Comparar e ordenar números decimais.",
                    question: "Qual número é maior?",
                    answers: [
                        "0,45",
                        "0,5",
                        "0,39",
                        "0,41"
                    ],
                    correct: 1,
                    explanation: "0,5 equivale a 0,50, que é maior que 0,45, 0,41 e 0,39."
                },
                {
                    id: "mat-10",
                    difficulty: "medium",
                    learningObjective: "Comparar e ordenar números decimais.",
                    question: "Qual alternativa apresenta os números em ordem crescente?",
                    answers: [
                        "2,50 – 2,05 – 2,15 – 2,55",
                        "2,05 – 2,15 – 2,50 – 2,55",
                        "2,15 – 2,05 – 2,55 – 2,50",
                        "2,55 – 2,50 – 2,15 – 2,05"
                    ],
                    correct: 1,
                    explanation: "Em ordem crescente: 2,05 < 2,15 < 2,50 < 2,55."
                }
            ]
        },

        {
            icon: "⚖️",
            title: "Proporcionalidade",
            svg: "",
            content: `
                <h3>⚖️ Relações de proporcionalidade</h3>
                <p>
                    Em uma situação proporcional, duas grandezas mantêm uma
                    relação constante. Quando uma quantidade aumenta ou diminui
                    seguindo determinada razão, a outra acompanha essa relação.
                </p>
            `,
            questions: [
                {
                    id: "mat-11",
                    difficulty: "medium",
                    learningObjective: "Resolver situações-problema que envolvam relações de proporcionalidade.",
                    question: "Para preparar 3 jarros de suco, são usados 6 copos de água. Mantendo a mesma proporção, quantos copos de água serão necessários para 5 jarros?",
                    answers: [
                        "8 copos",
                        "9 copos",
                        "10 copos",
                        "12 copos"
                    ],
                    correct: 2,
                    explanation: "Cada jarro usa 2 copos de água. Para 5 jarros: 5 × 2 = 10 copos."
                },
                {
                    id: "mat-12",
                    difficulty: "hard",
                    learningObjective: "Identificar a relação entre grandezas e determinar valores desconhecidos em situações proporcionais.",
                    question: "Uma equipe percorre 24 quilômetros em 3 horas, mantendo sempre a mesma velocidade. Quantos quilômetros percorrerá em 5 horas?",
                    answers: [
                        "32 km",
                        "36 km",
                        "40 km",
                        "45 km"
                    ],
                    correct: 2,
                    explanation: "Em 1 hora são percorridos 8 km. Em 5 horas: 5 × 8 = 40 km."
                }
            ]
        },

        {
            icon: "⚖️",
            title: "Divisão em Partes Desiguais",
            svg: "",
            content: `
                <h3>⚖️ Repartindo em partes diferentes</h3>
                <p>
                    Nem toda divisão precisa ser feita em partes iguais. Em uma
                    repartição proporcional, cada pessoa ou grupo recebe uma
                    quantidade de acordo com o critério estabelecido.
                </p>
            `,
            questions: [
                {
                    id: "mat-13",
                    difficulty: "medium",
                    learningObjective: "Resolver situações-problema que envolvam a divisão de uma quantidade em partes desiguais.",
                    question: "Uma equipe recebeu 60 fichas para dividir entre Mal e Evie na razão de 2 para 3. Quantas fichas Evie deve receber?",
                    answers: [
                        "20",
                        "24",
                        "30",
                        "36"
                    ],
                    correct: 3,
                    explanation: "A razão 2:3 representa 5 partes. Cada parte vale 60 ÷ 5 = 12. Evie recebe 3 × 12 = 36 fichas."
                },
                {
                    id: "mat-14",
                    difficulty: "hard",
                    learningObjective: "Identificar e aplicar critérios de repartição proporcional em divisões de partes desiguais.",
                    question: "Um prêmio de 90 pontos será dividido entre três equipes na proporção 1 : 2 : 3. Quantos pontos receberá a equipe que tem a maior parte?",
                    answers: [
                        "15",
                        "30",
                        "45",
                        "60"
                    ],
                    correct: 2,
                    explanation: "A soma das partes é 6. Cada parte vale 90 ÷ 6 = 15. A maior equipe recebe 3 × 15 = 45 pontos."
                }
            ]
        },

        {
            icon: "📈",
            title: "Tabelas, Gráficos e Infográficos",
            svg: "",
            content: `
                <h3>📋 Tabela: livros lidos por uma turma</h3>
                <table class="study-table">
                    <thead>
                        <tr><th>Aluno</th><th>Livros lidos</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Mal</td><td>4</td></tr>
                        <tr><td>Evie</td><td>6</td></tr>
                        <tr><td>Uma</td><td>3</td></tr>
                        <tr><td>Red</td><td>5</td></tr>
                    </tbody>
                </table>

                <h3>📊 Gráfico de barras</h3>
                <div class="study-chart" aria-label="Gráfico de barras com livros lidos">
                    <p><strong>Livros lidos</strong></p>
                    <p>Mal&nbsp;&nbsp;&nbsp;&nbsp;████&nbsp;4</p>
                    <p>Evie&nbsp;&nbsp;&nbsp;██████&nbsp;6</p>
                    <p>Uma&nbsp;&nbsp;&nbsp;███&nbsp;3</p>
                    <p>Red&nbsp;&nbsp;&nbsp;█████&nbsp;5</p>
                </div>

                <h3>🧩 Infográficos</h3>
                <p>
                    Um infográfico combina informações, números, imagens e textos
                    curtos para comunicar dados de maneira visual e organizada.
                </p>
            `,
            questions: [
                {
                    id: "mat-15",
                    difficulty: "easy",
                    learningObjective: "Interpretar e comparar dados estatísticos apresentados em tabelas.",
                    question: "De acordo com a tabela, quem leu a maior quantidade de livros?",
                    answers: [
                        "Mal",
                        "Evie",
                        "Uma",
                        "Red"
                    ],
                    correct: 1,
                    explanation: "Evie leu 6 livros, a maior quantidade registrada na tabela."
                },
                {
                    id: "mat-16",
                    difficulty: "hard",
                    learningObjective: "Interpretar, analisar e comparar dados estatísticos apresentados em tabelas, gráficos e infográficos.",
                    question: "Observando os dados apresentados no gráfico, qual afirmação está correta?",
                    answers: [
                        "Uma leu mais livros que Evie.",
                        "Mal e Uma leram a mesma quantidade.",
                        "Red leu 2 livros a mais que Uma.",
                        "Evie leu menos livros que Mal."
                    ],
                    correct: 2,
                    explanation: "Red leu 5 livros e Uma leu 3. Portanto, Red leu 2 livros a mais que Uma."
                }
            ]
        }
    ]
};
