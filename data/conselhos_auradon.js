/* ==========================================
   CONSELHOS DE AURADON — V1.1
   Estrutura: personagem -> matéria -> lista de conselhos
   Os textos foram mantidos exatamente como na versão anterior.
========================================== */

const conselhosAuradon = {

    mal: {
        portugues: [
            {
                texto: "As palavras podem ser poderosas. Escolha as suas com cuidado.",
                autor: "Mal"
            },
            {
                texto: "Ler com atenção é uma forma de descobrir aquilo que está escondido no texto.",
                autor: "Mal"
            },
            {
                texto: "Uma boa ideia merece palavras claras para poder brilhar.",
                autor: "Mal"
            },
            {
                texto: "Antes de responder, observe cada detalhe. Às vezes, a pista está bem ali.",
                autor: "Mal"
            }
        ],

        matematica: [
            {
                texto: "Até o maior desafio fica menor quando você resolve uma parte de cada vez.",
                autor: "Mal"
            },
            {
                texto: "Não tenha pressa. Uma boa estratégia vale mais do que um palpite.",
                autor: "Mal"
            },
            {
                texto: "Quando um cálculo parecer difícil, respire e procure a lógica por trás dele.",
                autor: "Mal"
            },
            {
                texto: "Coragem também é tentar novamente quando a primeira resposta não funciona.",
                autor: "Mal"
            }
        ],

        ciencias: [
            {
                texto: "A curiosidade é uma das maiores forças de quem quer descobrir como o mundo funciona.",
                autor: "Mal"
            },
            {
                texto: "Observe, faça perguntas e procure evidências. É assim que grandes descobertas começam.",
                autor: "Mal"
            },
            {
                texto: "A ciência não precisa de magia para ser fascinante.",
                autor: "Mal"
            },
            {
                texto: "Toda descoberta começa com alguém disposto a perguntar: por quê?",
                autor: "Mal"
            }
        ],

        historia: [
            {
                texto: "Conhecer o passado ajuda você a entender as escolhas que construíram o presente.",
                autor: "Mal"
            },
            {
                texto: "As histórias de quem veio antes podem ensinar muito sobre coragem e mudança.",
                autor: "Mal"
            },
            {
                texto: "O passado deixa pistas. Cabe a você descobrir o que elas significam.",
                autor: "Mal"
            },
            {
                texto: "Grandes mudanças começam quando alguém decide fazer diferente.",
                autor: "Mal"
            }
        ],

        geografia: [
            {
                texto: "Conhecer o mundo é descobrir que existem muitos caminhos além daquele que já conhecemos.",
                autor: "Mal"
            },
            {
                texto: "Um mapa não mostra apenas lugares. Ele também conta histórias sobre as pessoas.",
                autor: "Mal"
            },
            {
                texto: "Observe onde as coisas estão e pense em por que estão ali.",
                autor: "Mal"
            },
            {
                texto: "O mundo é enorme. Cada lugar tem algo novo para ensinar.",
                autor: "Mal"
            }
        ],

        ingles: [
            {
                texto: "Aprender uma nova língua abre portas para conhecer pessoas e lugares diferentes.",
                autor: "Mal"
            },
            {
                texto: "Não tenha medo de errar uma palavra. Praticar é parte da aventura.",
                autor: "Mal"
            },
            {
                texto: "Cada palavra nova é uma pequena conquista.",
                autor: "Mal"
            },
            {
                texto: "Quanto mais você pratica, mais natural fica usar o inglês.",
                autor: "Mal"
            }
        ]
    },

    evie: {
        portugues: [
            {
                texto: "Uma frase bem construída pode transformar uma ideia simples em algo extraordinário.",
                autor: "Evie"
            },
            {
                texto: "Leia com atenção: detalhes importantes costumam aparecer onde menos esperamos.",
                autor: "Evie"
            },
            {
                texto: "As palavras têm estilo, significado e intenção. Descubra os três.",
                autor: "Evie"
            },
            {
                texto: "Antes de escolher uma resposta, compare as alternativas. Inteligência também é observar.",
                autor: "Evie"
            }
        ],

        matematica: [
            {
                texto: "Uma boa solução começa com organização. Separe o problema em partes.",
                autor: "Evie"
            },
            {
                texto: "Números também podem contar histórias. Descubra o padrão antes de calcular.",
                autor: "Evie"
            },
            {
                texto: "Quando você entende a lógica, a resposta deixa de parecer um mistério.",
                autor: "Evie"
            },
            {
                texto: "Uma estratégia elegante é aquela que resolve o problema sem complicá-lo.",
                autor: "Evie"
            }
        ],

        ciencias: [
            {
                texto: "A melhor ferramenta de um cientista é uma boa pergunta.",
                autor: "Evie"
            },
            {
                texto: "Observe os detalhes. Pequenas pistas podem explicar grandes fenômenos.",
                autor: "Evie"
            },
            {
                texto: "Conhecimento fica ainda mais interessante quando você entende como as coisas funcionam.",
                autor: "Evie"
            },
            {
                texto: "Faça hipóteses, observe os resultados e aprenda com eles.",
                autor: "Evie"
            }
        ],

        historia: [
            {
                texto: "O passado está cheio de decisões que mudaram o futuro. Descubra quais foram.",
                autor: "Evie"
            },
            {
                texto: "Conhecer diferentes pontos de vista ajuda a compreender melhor a história.",
                autor: "Evie"
            },
            {
                texto: "Uma boa investigação começa com perguntas inteligentes.",
                autor: "Evie"
            },
            {
                texto: "Cada época tem seus costumes, desafios e descobertas. Compare e aprenda.",
                autor: "Evie"
            }
        ],

        geografia: [
            {
                texto: "Um mapa é uma ferramenta de investigação. Use-o para encontrar relações entre os lugares.",
                autor: "Evie"
            },
            {
                texto: "Clima, relevo, população e atividades humanas estão mais conectados do que parecem.",
                autor: "Evie"
            },
            {
                texto: "Conhecer outros lugares também é uma forma de conhecer outras maneiras de viver.",
                autor: "Evie"
            },
            {
                texto: "Observe o espaço ao seu redor. A geografia está acontecendo o tempo todo.",
                autor: "Evie"
            }
        ],

        ingles: [
            {
                texto: "Uma palavra nova pode abrir uma conversa inteira.",
                autor: "Evie"
            },
            {
                texto: "Observe o contexto. Muitas vezes ele ajuda a descobrir o significado de uma palavra.",
                autor: "Evie"
            },
            {
                texto: "Praticar um pouco todos os dias é uma estratégia inteligente.",
                autor: "Evie"
            },
            {
                texto: "Não memorize apenas palavras. Descubra como elas funcionam nas frases.",
                autor: "Evie"
            }
        ]
    },

    uma: {
        portugues: [
            {
                texto: "Leia o texto inteiro antes de tomar uma decisão. Estratégia começa com informação.",
                autor: "Uma"
            },
            {
                texto: "Uma boa leitura exige atenção aos detalhes e ao que não foi dito diretamente.",
                autor: "Uma"
            },
            {
                texto: "Quando duas respostas parecem possíveis, procure a pista que elimina uma delas.",
                autor: "Uma"
            },
            {
                texto: "Palavras podem mudar o sentido de uma frase. Observe cada uma.",
                autor: "Uma"
            }
        ],

        matematica: [
            {
                texto: "Problemas difíceis pedem estratégia, não pressa.",
                autor: "Uma"
            },
            {
                texto: "Procure padrões. Eles podem revelar o caminho para a resposta.",
                autor: "Uma"
            },
            {
                texto: "Se uma estratégia não funcionou, mude o plano e tente outra.",
                autor: "Uma"
            },
            {
                texto: "Organize os dados antes de fazer as contas. Informação bem organizada facilita tudo.",
                autor: "Uma"
            }
        ],

        ciencias: [
            {
                texto: "Investigar é observar, questionar e testar. Não aceite uma resposta sem entender o motivo.",
                autor: "Uma"
            },
            {
                texto: "A natureza está cheia de pistas. Aprenda a reconhecê-las.",
                autor: "Uma"
            },
            {
                texto: "Uma boa pergunta pode ser mais importante do que uma resposta rápida.",
                autor: "Uma"
            },
            {
                texto: "Quando algo parecer estranho, investigue. A curiosidade pode revelar a explicação.",
                autor: "Uma"
            }
        ],

        historia: [
            {
                texto: "Para entender uma decisão histórica, descubra o que aconteceu antes dela.",
                autor: "Uma"
            },
            {
                texto: "História é feita de escolhas, consequências e mudanças.",
                autor: "Uma"
            },
            {
                texto: "Compare acontecimentos e procure relações entre eles.",
                autor: "Uma"
            },
            {
                texto: "Quem conhece o passado consegue enxergar melhor os caminhos que levaram ao presente.",
                autor: "Uma"
            }
        ],

        geografia: [
            {
                texto: "Localização importa. Descubra onde algo acontece antes de tentar explicar por quê.",
                autor: "Uma"
            },
            {
                texto: "Observe as relações entre natureza, território e sociedade.",
                autor: "Uma"
            },
            {
                texto: "Um bom mapa pode revelar conexões que não aparecem em uma lista de lugares.",
                autor: "Uma"
            },
            {
                texto: "Cada região possui características próprias. Compare antes de concluir.",
                autor: "Uma"
            }
        ],

        ingles: [
            {
                texto: "Não tente traduzir tudo palavra por palavra. Observe o contexto.",
                autor: "Uma"
            },
            {
                texto: "Uma boa estratégia é procurar primeiro as palavras que você já conhece.",
                autor: "Uma"
            },
            {
                texto: "Errar faz parte do treino. O importante é descobrir o que levou ao erro.",
                autor: "Uma"
            },
            {
                texto: "Preste atenção à forma como as palavras aparecem juntas.",
                autor: "Uma"
            }
        ]
    },

    red: {
        portugues: [
            {
                texto: "Se uma resposta não parece certa, pare e olhe o problema de outro jeito.",
                autor: "Red"
            },
            {
                texto: "Você pode mudar de caminho sem desistir do objetivo.",
                autor: "Red"
            },
            {
                texto: "Leia, pense e depois escolha. Pressa não ganha de atenção.",
                autor: "Red"
            },
            {
                texto: "Uma história pode mudar completamente quando enxergamos outro ponto de vista.",
                autor: "Red"
            }
        ],

        matematica: [
            {
                texto: "Não gostou do primeiro caminho? Tudo bem. Problemas podem ter mais de uma estratégia.",
                autor: "Red"
            },
            {
                texto: "Tente, erre, descubra e tente novamente. É assim que se aprende.",
                autor: "Red"
            },
            {
                texto: "Quando a conta parecer confusa, organize os números e recomece.",
                autor: "Red"
            },
            {
                texto: "Um desafio não decide do que você é capaz. Sua próxima tentativa pode surpreender.",
                autor: "Red"
            }
        ],

        ciencias: [
            {
                texto: "Pergunte, experimente e descubra. A curiosidade gosta de caminhos inesperados.",
                autor: "Red"
            },
            {
                texto: "Nem tudo funciona na primeira tentativa. A ciência sabe muito bem disso.",
                autor: "Red"
            },
            {
                texto: "Olhe para o problema de um jeito diferente. Às vezes, a resposta aparece por outro caminho.",
                autor: "Red"
            },
            {
                texto: "Descobrir como algo funciona pode ser muito mais divertido do que simplesmente decorar.",
                autor: "Red"
            }
        ],

        historia: [
            {
                texto: "A história mostra que as coisas podem mudar. E isso é uma boa notícia.",
                autor: "Red"
            },
            {
                texto: "Nem todo caminho precisa terminar como começou.",
                autor: "Red"
            },
            {
                texto: "Conhecer diferentes escolhas do passado ajuda a imaginar novas possibilidades.",
                autor: "Red"
            },
            {
                texto: "Pergunte o que poderia ter acontecido de outra forma. Pensar também é aprender história.",
                autor: "Red"
            }
        ],

        geografia: [
            {
                texto: "O mundo muda quando as pessoas mudam a forma como vivem e ocupam os lugares.",
                autor: "Red"
            },
            {
                texto: "Observe os lugares com curiosidade. Cada região tem sua própria história.",
                autor: "Red"
            },
            {
                texto: "Não existe apenas um jeito de enxergar um mapa. Procure novas conexões.",
                autor: "Red"
            },
            {
                texto: "Conhecer o mundo ajuda a perceber quantas possibilidades existem além do nosso próprio lugar.",
                autor: "Red"
            }
        ],

        ingles: [
            {
                texto: "Não espere saber tudo para começar a usar uma nova língua.",
                autor: "Red"
            },
            {
                texto: "Uma palavra de cada vez já é progresso.",
                autor: "Red"
            },
            {
                texto: "Se você errar, tente de novo. O próximo caminho pode funcionar melhor.",
                autor: "Red"
            },
            {
                texto: "Aprender inglês é uma aventura. Comece pelo que você já conhece e avance daí.",
                autor: "Red"
            }
        ]
    }
};
