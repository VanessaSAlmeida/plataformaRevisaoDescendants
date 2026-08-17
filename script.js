id = "js-auradon-engine"

/* ==========================================
   ESTADO GLOBAL
========================================== */
let STORAGE_KEY = "";
let returningStudent = false;
let selectedCharacterKey = null;
let selectedSubject = null;
let savedProgressPercentage = 0;

let totalQuestions = 0;
let answeredQuestions = 0;
let correctAnswers = 0;

let studentName = "";
let selectedCharacter = null;

const characters = {
    mal: {
        icon: "💜",
        name: "Mal",
        color: "#6C3FA3"
    },

    evie: {
        icon: "💙",
        name: "Evie",
        color: "#2F6FA3"
    },

    uma: {
        icon: "🌊",
        name: "Uma",
        color: "#168C8C"
    },

    red: {
        icon: "❤️",
        name: "Red",
        color: "#B83245"
    }
};

const difficultyStats = {
    easy: {
        correct: 0, total: 0
    }, medium: {
        correct: 0, total: 0
    }, hard: {
        correct: 0, total: 0
    }
};

const subjects = {
    matematica: {name: "➕ Matemática", file: "data/matematica.js", available: true},
    portugues: {name: "📖 Português", file: "data/portugues.js", available: true},
    ciencias: {name: "🧪 Ciências", file: "data/ciencias.js", available: false},
    historia: {name: "🏺 História", file: "data/historia.js", available: false},
    geografia: {name: "🌎 Geografia", file: "data/geografia.js", available: false},
    ingles: {name: "🇬🇧 Inglês", file: "data/ingles.js", available: false}
};

const conselhosAuradon = {
    portugues: [
        "As palavras podem abrir caminhos para novas ideias. Use-as com sabedoria.",
        "Ler é uma das maneiras mais poderosas de expandir a mente.",
        "Quem compreende os textos encontra tesouros escondidos."
    ],
    matematica: [
        "Os números podem parecer misteriosos, mas sempre seguem uma lógica.",
        "Até os cálculos mais difíceis são vencidos passo a passo.",
        "A paciência é uma grande aliada dos jovens aprendizes."
    ],
    ciencias: [
        "A curiosidade é a centelha que dá início às maiores descobertas.",
        "Observar o mundo é o primeiro passo para compreendê-lo.",
        "A magia da ciência está nas perguntas que fazemos."
    ],
    historia: [
        "Conhecer o passado ajuda a compreender o presente.",
        "Grandes lições podem ser encontradas nas histórias de quem veio antes de nós.",
        "A memória é uma forma poderosa de aprendizado."
    ],
    geografia: [
        "O mundo é vasto e cheio de maravilhas para descobrir.",
        "Compreender os lugares é compreender as pessoas.",
        "Cada mapa conta uma história."
    ],
    ingles: [
        "Aprender uma nova língua é abrir mais uma porta para o conhecimento.",
        "As palavras têm o poder de unir pessoas de diferentes lugares.",
        "A prática transforma dúvidas em confiança."
    ]
};

function getStorageKey() {
    return "auradon-" + studentName
        .trim()
        .toLowerCase();
}

/* ==========================================
   INICIALIZAÇÃO
========================================== */

document.addEventListener("DOMContentLoaded", initializeWelcomeScreen);

function initializeWelcomeScreen() {
    buildCharacterSelector();
    buildSubjectSelector("subjectGrid");

    document
        .getElementById("startJourneyBtn")
        .addEventListener("click", startJourney);

    document
        .getElementById("continueJourneyBtn")
        .addEventListener("click", continueJourney);

    document
        .getElementById("changeStudentBtn")
        .addEventListener("click", changeStudent);

    document
        .getElementById("backToWelcomeBtn")
        .addEventListener("click", backToWelcome);

    const comingSoonBackBtn =
        document.getElementById("comingSoonBackBtn");

    if (comingSoonBackBtn) {
        comingSoonBackBtn.addEventListener("click", backToWelcome);
    }

    if (detectReturningStudent()) {
        showReturningHome();
    }
}

function detectReturningStudent() {
    const lastStudent = localStorage.getItem("auradon-last-student");

    if (!lastStudent) {
        return false;
    }

    studentName = lastStudent;

    STORAGE_KEY = getStorageKey();

    selectedSubject = localStorage.getItem("auradon-last-subject") || null;

    loadProgress();

    return true;
}

function showNewStudentPanel() {
    document.getElementById("returningStudentPanel").classList.add("hidden");

    document.getElementById("newStudentPanel").classList.remove("hidden");
}

function showReturningStudentPanel() {
    document
        .getElementById("newStudentPanel")
        .classList.add("hidden");

    document
        .getElementById("returningStudentPanel")
        .classList.remove("hidden");

    document
        .getElementById("returningStudentName").textContent = studentName;

    document
        .getElementById("returningCharacterIcon").textContent = selectedCharacter?.icon || "🏰";

    document
        .getElementById("returningCharacterName").textContent = selectedCharacter?.name || "";

    document
        .getElementById("lastSubjectLabel").textContent = subjects[selectedSubject]?.name || "Nenhuma";

    document
        .getElementById("lastProgressLabel").textContent = (savedProgressPercentage || 0) + "%";

    document
        .getElementById("returningStudentSalute").textContent = "👋 Bem-vinda de volta, " + studentName + "!";

    buildSubjectSelector("returningSubjectGrid");
}

function showMainContent() {
    document
        .getElementById("welcomeScreen")
        .classList.add("hidden");

    document
        .getElementById("mainContent")
        .classList.remove("hidden");

    document.getElementById("conselhoAuradon").textContent =
        obterConselhoAuradon(selectedSubject);
}

function backToWelcome() {
    resetCourseUI();

    document
        .getElementById("returningStudentSalute")
        .classList.add("hidden");

    showReturningHome();
}

function showReturningHome() {
    document
        .getElementById("mainContent")
        .classList.add("hidden");

    document
        .getElementById("welcomeScreen")
        .classList.remove("hidden");

    document
        .getElementById("finalModal")
        .classList.add("hidden");

    showReturningStudentPanel();
}

function showComingSoonSubject(subjectKey) {
    const subject = subjects[subjectKey];

    window.courseData = {
        title: "✨ " + subject.name.replace(/^[^ ]+ /, "") + " em Auradon",
        tagline: "Uma nova aventura de aprendizagem está sendo preparada!",
        subtitle: subject.name.replace(/^[^ ]+ /, "") + " • 3º Período • 5º Ano",
        description: "A aula está sendo preparada para você.",
        topics: []
    };

    totalQuestions = 0;
    answeredQuestions = 0;
    correctAnswers = 0;

    if (typeof difficultyStats !== "undefined") {
        difficultyStats.easy.total = 0;
        difficultyStats.medium.total = 0;
        difficultyStats.hard.total = 0;
        difficultyStats.easy.correct = 0;
        difficultyStats.medium.correct = 0;
        difficultyStats.hard.correct = 0;
    }

    loadCourse();
}

async function openSelectedSubject() {
    const subject = subjects[selectedSubject];

    if (!subject) {
        alert("Matéria não encontrada.");
        return;
    }

    if (!subject.available) {
        showComingSoonSubject(selectedSubject);
        showMainContent();
        updateStudentBanner();
        updateCharacterDisplay();
        return;
    }

    await loadSubject(selectedSubject);
    showMainContent();
    updateStudentBanner();
    updateCharacterDisplay();
}

async function startJourney() {
    studentName = document
        .getElementById("studentNameInput")
        .value
        .trim();

    if (!studentName) {
        alert("Digite o nome do aluno.");
        return;
    }

    STORAGE_KEY = getStorageKey();

    if (!selectedCharacterKey) {
        alert("Escolha uma personagem.");
        return;
    }

    if (!selectedSubject) {
        alert("Escolha uma matéria.");
        return;
    }

    selectedCharacter = characters[selectedCharacterKey];

    saveProgress();

    await openSelectedSubject();

    if (subjects[selectedSubject].available) {
        saveProgress();
    }

    console.log("selectedSubject =", selectedSubject);
}

async function continueJourney() {
    if (!selectedSubject) {
        alert("Nenhuma matéria foi encontrada para este aluno.");
        showReturningStudentPanel();
        return;
    }

    await openSelectedSubject();
}

function changeStudent() {
    if (!confirm("Deseja trocar de aluno?")) {
        return;
    }

    resetCourseUI();

    studentName = "";

    selectedCharacterKey = null;

    selectedCharacter = null;

    selectedSubject = null;

    document
        .getElementById("studentNameInput")
        .value = "";

    localStorage.removeItem("auradon-last-student");

    localStorage.removeItem("auradon-last-subject");

    location.reload();

    showNewStudentPanel();
}

function resetCourseUI() {
    document
        .getElementById("topicNav").innerHTML = "";

    document
        .getElementById("dynamicSections").innerHTML = "";

    totalQuestions = 0;
}

/* ==========================================
   CARREGAR DISCIPLINA
========================================== */
function setCourseAvailabilityState() {
    const mainContent = document.getElementById("mainContent");
    const courseIntro = document.getElementById("courseIntro");
    const comingSoon = document.getElementById("courseComingSoon");
    const resultPanel = document.getElementById("resultPanel");

    const isComingSoon =
        !courseData.topics ||
        courseData.topics.length === 0;

    mainContent.classList.toggle("course-empty-mode", isComingSoon);

    if (courseIntro) {
        courseIntro.classList.toggle("hidden", isComingSoon);
    }

    if (comingSoon) {
        comingSoon.classList.toggle("hidden", !isComingSoon);
    }

    if (resultPanel) {
        resultPanel.classList.toggle("hidden", isComingSoon);
    }

    return isComingSoon;
}

function loadCourse() {
    if (!window.courseData) {
        console.error("courseData não encontrado.");
        return;
    }

    document.getElementById("courseTitle").textContent = courseData.title;

    const courseTaglineElement =
        document.getElementById("courseTagline");

    if (courseTaglineElement) {
        courseTaglineElement.textContent =
            courseData.tagline ||
            "Onde aprender também é uma aventura!";
    }

    document.getElementById("courseSubtitle").textContent =
        courseData.subtitle;

    document.getElementById("welcomeText").textContent =
        courseData.description;

    const isComingSoon = setCourseAvailabilityState();

    totalQuestions = 0;

    difficultyStats.easy.total = 0;
    difficultyStats.medium.total = 0;
    difficultyStats.hard.total = 0;

    buildNavigation();
    buildSections();

    if (!isComingSoon) {
        loadProgress();
        updateDashboard();

        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) {
            const saveData = JSON.parse(raw);
            restoreQuestions(saveData.answers);
        }
    }

    console.log("difficultyStats =", difficultyStats);
}

/* ==========================================
   MENU
========================================== */
function buildNavigation() {
    const nav = document.getElementById("topicNav");

    nav.innerHTML = "";

    // Enquanto a matéria estiver em construção, nenhum tópico é exibido.
    if (!courseData.topics || courseData.topics.length === 0) {
        return;
    }

    courseData.topics.forEach((topic, index) => {
        const btn = document.createElement("button");
        btn.textContent = topic.icon + " " + topic.title;
        btn.onclick = () => showPage("topic-" + index);
        nav.appendChild(btn);
    });
}

/* ==========================================
   SEÇÕES
========================================== */
function buildSections() {
    const container = document.getElementById("dynamicSections");

    container.innerHTML = "";

    courseData.topics.forEach((topic, topicIndex) => {
        const section = document.createElement("section");
        section.className = "page";
        section.id = "topic-" + topicIndex;
        section.innerHTML = `
            <div class="content-card">
                <h2>
                    ${topic.icon} ${topic.title}
                </h2>
                <p>
                    ${topic.content}
                    
                    ${topic.readingText ? `
                    <div class="reading-box">
                        <h3>📜 Texto para leitura</h3>
                        <div class="reading-content">
                            ${topic.readingText}
                        </div>
                    </div>
                    ` : ""}
                </p>
                ${topic.svg || ""}
            </div>
        `;

        topic.questions.forEach((question, questionIndex) => {
            difficultyStats[question.difficulty].total++;
            totalQuestions++;

            section.appendChild(
                createQuestionCard(topicIndex, questionIndex, question)
            );
        });
        container.appendChild(section);
    });
}

/* ==========================================
   QUESTÕES
========================================== */
function createQuestionCard(topicIndex, questionIndex, question) {
    const card = document.createElement("div");
    card.className = "question-card";

    // ID único da questão
    card.dataset.questionId = `${selectedSubject}-${topicIndex}-${questionIndex}`;

    // informações necessárias para restaurar depois
    card.dataset.topicIndex = topicIndex;
    card.dataset.questionIndex = questionIndex;

    const answersHtml = question.answers
        .map((answer, index) => `

<button
class="answer-btn"
onclick="answerQuestion(
this,
    ${topicIndex},
${questionIndex},
${index}
)">

${answer}

</button>

`)
        .join("");

    card.innerHTML = `

<h3>
Questão ${questionIndex + 1}
<span class="badge badge-${question.difficulty}">
${getDifficultyLabel(question.difficulty)}
</span>
</h3>

<div class="question-text">
    ${question.question}
</div>

<div class="answers">
    ${answersHtml}
</div>

<div class="feedback"></div>
    `;
    return card;
}

function getDifficultyLabel(level) {
    switch (level) {
        case "easy":
            return "Fácil";

        case "medium":
            return "Médio";

        case "hard":
            return "Difícil";

        default:
            return level;
    }
}

/* ==========================================
   RESPONDER QUESTÃO
========================================== */
function answerQuestion(button, topicIndex, questionIndex, answerIndex, restoring = false) {

    const card = button.closest(".question-card");

    // impedir resposta dupla apenas quando o usuário está respondendo
    if (!restoring && card.dataset.answered) {
        return;
    }

    card.dataset.answered = "true";

    card.dataset.selectedAnswer = answerIndex;

    const question = courseData.topics[topicIndex].questions[questionIndex];

    // atualizar contadores somente durante resposta normal
    if (!restoring) {
        answeredQuestions++;
    }

    const feedback = card.querySelector(".feedback");

    const buttons = card.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {

        if (!restoring) {
            correctAnswers++;
            difficultyStats[question.difficulty].correct++;
        }

        button.classList.add("correct");

        feedback.className = "feedback correct";

        feedback.innerHTML = `
            ✅ Correto!<br>
    ${question.explanation}
`;
    } else {

        button.classList.add("wrong");

        buttons[question.correct].classList.add("correct");

        feedback.className = "feedback wrong";

        feedback.innerHTML = `
            ❌ Resposta incorreta.<br>
    ${question.explanation}
    `;
    }

    if (!restoring) {
        updateDashboard();
        checkCompletion();
        saveProgress();
    }
}

/* ==========================================
PROGRESSO
========================================== */
function updateDashboard() {
    const progress = totalQuestions === 0 ? 0 : Math.round((answeredQuestions / totalQuestions) * 100);

    const score = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);

    document
        .getElementById("progressText").textContent = progress + "%";

    document
        .getElementById("progressFill").style.width = progress + "%";

    document
        .getElementById("scoreValue").textContent = correctAnswers;

    document
        .getElementById("scorePercent").textContent = score + "% de acertos";

    document
        .getElementById("answeredQuestionsCount").textContent = answeredQuestions;

    document
        .getElementById("correctAnswersCount").textContent = correctAnswers;

    document
        .getElementById("accuracyPercent").textContent = score + "%";

    updateMedal(score);

    console.log(difficultyStats);

    document
        .getElementById("easyStats").textContent = `Fácil:
${difficultyStats.easy.correct}
/
${difficultyStats.easy.total}`;

    document
        .getElementById("mediumStats").textContent = `Médio:
${difficultyStats.medium.correct}
/
${difficultyStats.medium.total}`;

    document
        .getElementById("hardStats").textContent = `Difícil:
${difficultyStats.hard.correct}
/
${difficultyStats.hard.total}`;

}

/* ==========================================
MEDALHAS
========================================== */
function updateMedal(score) {
    let icon = "🎓";
    let title = "Iniciante";

    if (score >= 95) {

        icon = "⚡";
        title = "Lenda de Auradon";

    } else if (score >= 80) {

        icon = "🥇";
        title = "Mestre de Auradon";

    } else if (score >= 60) {

        icon = "🥈";
        title = "Guardião do Conhecimento";

    } else if (score >= 40) {

        icon = "🥉";
        title = "Explorador de Auradon";

    }

    document
        .getElementById("medalIcon").textContent = icon;

    document
        .getElementById("medalText").textContent = title;

}

/* ==========================================
RESULTADO FINAL
========================================== */
function checkCompletion() {
    if (answeredQuestions < totalQuestions) {
        return;
    }
    showFinalModal();
}

function showFinalModal() {
    const modal = document
        .getElementById("finalModal");

    modal.classList.remove("hidden");

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    document
        .getElementById("finalScore")
        .innerHTML = `
            <h3>
                ${correctAnswers}
                de
                ${totalQuestions}
                questões
            </h3>

            <h2>
                ${percentage}% de acertos
            </h2>
        `;

    document
        .getElementById("finalMedal").innerHTML = `
            <div style="
            font-size:5rem;
            margin:15px 0;
        ">
                ${document
                    .getElementById("medalIcon").textContent}
            </div>

            <h3>
                ${document.getElementById("medalText").textContent}
            </h3>
        `;

    document.getElementById("finalMessage")
            .innerHTML = getFinalMessage(percentage);
}

/* ==========================================
MENSAGEM FINAL
========================================== */
function getFinalMessage(score) {
    if (score >= 95) {
        return `
        🏆 Extraordinário!
        Você dominou completamente
        os conhecimentos desta jornada.
        `;
    }

    if (score >= 80) {
        return `
        ⭐ Excelente desempenho!
        Seu legado em Auradon está muito orgulhoso.
        `;
    }

    if (score >= 60) {
        return `
        📚 Bom trabalho.
        Continue praticando para
        alcançar a excelência.
        `;
    }

    return `
    🪄 Continue estudando.
    Grandes heróis também começam
    errando algumas questões.
    `;
}

/* ==========================================
NAVEGAÇÃO
========================================== */
function showPage(pageId) {
    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo({
        top: 0, behavior: "smooth"
    });
}

/* ==========================================
REINICIAR
========================================== */
function restartQuiz() {
    location.reload();
}

function updateStudentBanner() {
    const banner = document.getElementById("studentBanner");

    if (!banner) {
        return;
    }
    banner.textContent = `${studentName}`;
}

/* ==========================================
   SALVAR
========================================== */
function saveProgress() {
    const answers = {};
    document
        .querySelectorAll(".question-card")
        .forEach(card => {
            const id = card.dataset.questionId;

            if (!id) {
                return;
            }

            answers[id] = {
                answered: card.dataset.answered === "true", selectedAnswer: card.dataset.selectedAnswer
            };
        });

    const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    saveData.studentName = studentName;
    saveData.selectedCharacterKey = selectedCharacterKey;
    saveData.selectedSubject = selectedSubject;
    saveData.subjectProgress = saveData.subjectProgress || {};
    saveData.subjectProgress[selectedSubject] = {
        answeredQuestions, correctAnswers, difficultyStats: {
            easy: {
                correct: difficultyStats.easy.correct
            },
            medium: {
                correct: difficultyStats.medium.correct
            },
            hard: {
                correct: difficultyStats.hard.correct
            }
        }, answers, progressPercentage: calculateProgressPercentage()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));

    localStorage.setItem("auradon-last-student", studentName);

    localStorage.setItem("auradon-last-subject", selectedSubject);
}

function calculateProgressPercentage() {
    const total = document.querySelectorAll(".question-card").length;

    if (total === 0) {
        return 0;
    }

    return Math.round((answeredQuestions / total) * 100);
}

/* ==========================================
   CARREGAR PROGRESSO
========================================== */
function loadProgress() {
    answeredQuestions = 0;

    correctAnswers = 0;

    difficultyStats.easy.correct = 0;

    difficultyStats.medium.correct = 0;

    difficultyStats.hard.correct = 0;

    savedProgressPercentage = 0;

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return;
    }

    const saveData = JSON.parse(raw);

    studentName = saveData.studentName || "";

    selectedCharacterKey = saveData.selectedCharacterKey || null;

    if (!selectedSubject) {
        selectedSubject =
            saveData.selectedSubject || null;
    }

    const subjectData = saveData.subjectProgress?.[selectedSubject];

    if (subjectData) {
        answeredQuestions = subjectData.answeredQuestions || 0;

        correctAnswers = subjectData.correctAnswers || 0;

        if (subjectData.difficultyStats) {
            difficultyStats.easy.correct =
                subjectData.difficultyStats.easy?.correct ?? 0;

            difficultyStats.medium.correct =
                subjectData.difficultyStats.medium?.correct ?? 0;

            difficultyStats.hard.correct =
                subjectData.difficultyStats.hard?.correct ?? 0;
        }

        savedProgressPercentage = subjectData.progressPercentage || 0;
    }

    /* ==========================
       Nome
    ========================== */
    const studentInput = document.getElementById("studentNameInput");

    if (studentInput) {
        studentInput.value = studentName;
    }

    /* ==========================
       Personagem
    ========================== */
    if (selectedCharacterKey) {
        selectedCharacter = characters[selectedCharacterKey];

        const btn = document.querySelector(`[data-character="${selectedCharacterKey}"]`);

        if (btn) {
            btn.classList.add("selected");
        }
    }

    /* ==========================
       Matéria
    ========================== */
    if (selectedSubject) {
        const btn = document.querySelector(`.subject-btn[data-subject="${selectedSubject}"]`);

        if (btn) {
            btn.classList.add("selected");
        }
    }

    if (studentName) {
        returningStudent = true;
    }

    updateCharacterDisplay();
}

function restoreQuestions() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return;
    }

    const saveData = JSON.parse(raw);

    const subjectData = saveData.subjectProgress?.[selectedSubject];

    if (!subjectData) {
        return;
    }

    const answers = subjectData.answers || {};

    Object.entries(answers)
        .forEach(([id, info]) => {

            if (!info.answered) {
                return;
            }

            const card = document.querySelector(`[data-question-id="${id}"]`);

            if (!card) {
                return;
            }

            const selectedAnswer = parseInt(info.selectedAnswer);

            const button = card.querySelectorAll(".answer-btn")[selectedAnswer];

            if (!button) {
                return;
            }

            answerQuestion(button, parseInt(card.dataset.topicIndex), parseInt(card.dataset.questionIndex), selectedAnswer, true);
        });
}

function updateCharacterDisplay() {
    if (!selectedCharacter) {
        return;
    }

    const icon = document.getElementById("characterIcon");

    const name = document.getElementById("characterName");

    if (icon) {
        icon.textContent = selectedCharacter.icon;
    }

    if (name) {
        name.textContent = selectedCharacter.name;
    }
}

/* ==========================================
   APAGAR PROGRESSO
========================================== */
function clearProgress() {
    const confirmDelete = confirm("Deseja apagar todo o progresso?");

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    location.reload();
}

function getCurrentMedal() {
    return document
        .getElementById("medalText").textContent;
}

function buildSubjectSelector(containerId) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = "";
    Object.entries(subjects)
        .forEach(([key, subject]) => {
            const btn = document.createElement("button");

            btn.className = "subject-btn";

            btn.dataset.subject = key;

            btn.textContent = subject.name;

            if (!subject.available) {
                btn.classList.add("subject-coming-soon");
                btn.title = "Aula em criação";
            }

            // destacar a matéria atual
            if (key === selectedSubject) {
                btn.classList.add("selected");
            }

            btn.onclick = () => {
                grid.querySelectorAll(".subject-btn")
                    .forEach(b => b.classList
                        .remove("selected"));

                btn.classList
                    .add("selected");
                selectedSubject = key;
            };
            grid.appendChild(btn);
        });
}

async function loadSubject(subjectKey) {
    return new Promise((resolve, reject) => {

        const subject = subjects[subjectKey];

        console.log("Carregando matéria:", subject);

        // Remove script anterior
        const oldScript = document.getElementById("courseScript");

        if (oldScript) {
            oldScript.remove();
        }

        // Limpa o courseData anterior
        window.courseData = null;

        // Cria novo script
        const script = document.createElement("script");

        script.id = "courseScript";

        // evita cache
        script.src = subject.file + "?t=" + Date.now();

        script.onload = () => {

            console.log("Matéria carregada:", window.courseData.title);

            // zera estatísticas
            answeredQuestions = 0;
            correctAnswers = 0;

            difficultyStats.easy.correct = 0;
            difficultyStats.medium.correct = 0;
            difficultyStats.hard.correct = 0;

            loadCourse();
            resolve();
        };

        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function buildCharacterSelector() {
    document
        .querySelectorAll(".character-btn")

        .forEach(btn => {
            btn.onclick = () => {
                document
                    .querySelectorAll(".character-btn")
                    .forEach(b => b.classList
                        .remove("selected"));

                btn.classList
                    .add("selected");

                selectedCharacterKey = btn.dataset.character;

                selectedCharacter = characters[selectedCharacterKey];
            };
        });
}

/* ==========================================
   CERTIFICADO
========================================== */
async function generateCertificate() {
    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF("landscape", "mm", "a4");
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const medal = getCurrentMedal();
    const today = new Date().toLocaleDateString("pt-BR");
    const parchmentImg = await loadImage("assets/parchment.png");
    const crestImg = await loadImage("assets/hogwarts-crest.png");
    pdf.addImage(imageToDataURL(parchmentImg), "JPEG", 0, 0, 297, 210);
    pdf.addImage(imageToDataURL(crestImg), "PNG", 120, 15, 55, 55);
    pdf.setTextColor(60, 40, 10);
    pdf.setFont("times", "bold");
    pdf.setFontSize(26);
    pdf.text("ESCOLA DE MAGIA E BRUXARIA DE HOGWARTS", 148, 80, {align: "center"});
    pdf.setFontSize(20);
    pdf.text("CERTIFICADO DE CONCLUSÃO", 148, 95, {align: "center"});
    pdf.setFont("times", "normal");
    pdf.setFontSize(14);
    pdf.text("Certificamos que", 148, 115, {align: "center"});
    pdf.setFont("times", "bold");
    pdf.setFontSize(30);
    pdf.text(studentName, 148, 130, {align: "center"});
    pdf.setFont("times", "normal");
    pdf.setFontSize(14);
    pdf.text("concluiu com sucesso os estudos de Matemática Mágica", 148, 145, {align: "center"});
    pdf.text("do 5º Ano do Ensino Fundamental", 148, 155, {align: "center"});
    pdf.setFontSize(13);
    pdf.text(`Personagem: ${selectedCharacter.name}`, 70, 175);
    pdf.text(`Desempenho: ${percentage}%`, 70, 185);
    /* Selo */
    pdf.setFillColor(212, 175, 55);
    pdf.circle(235, 170, 22, "F");
    pdf.setTextColor(80, 40, 10);
    pdf.setFontSize(11);
    pdf.text("ORDEM", 235, 165, {align: "center"});
    pdf.text("DE MERLIN", 235, 172, {align: "center"});
    pdf.text(medal, 235, 180, {align: "center"});
    pdf.line(180, 185, 270, 185);
    pdf.setFontSize(12);
    pdf.text("Profª Minerva McGonagall", 225, 192, {align: "center"});
    pdf.setFontSize(10);
    pdf.text(`Emitido em ${today}`, 148, 203, {align: "center"});
    pdf.save(`Certificado-${studentName}.pdf`);
}

function loadImage(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = url;
    });
}

function imageToDataURL(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
}

/* ==========================================
   CONSELHOS DUMBLEDORE
========================================== */
function obterConselhoAuradon(materia) {
    const lista = conselhosAuradon[materia];
    if (!lista || lista.length === 0) {
        return "O conhecimento sempre será uma das maiores formas de magia.";
    }
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}
