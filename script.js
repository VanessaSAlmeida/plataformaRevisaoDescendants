id = "js-auradon-engine"

/* ==========================================
   ESTADO GLOBAL
========================================== */
const APP_VERSION = "1.3";
const VERSION_KEY = "auradon-academy-version";
const STORAGE_KEY_PREFIX = "auradon-";

let STORAGE_KEY = "";
let returningStudent = false;
let selectedCharacterKey = null;
let selectedSubject = null;
let savedProgressPercentage = 0;
let savedPerformance = "-";
let unlockedAchievements = {};

let totalQuestions = 0;
let answeredQuestions = 0;
let correctAnswers = 0;

let studentName = "";
let selectedCharacter = null;

let ultimoConselho = {
    personagem: null,
    materia: null,
    indice: -1
};

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

const achievements = {
    primeiraAventura: {
        id: "primeira-aventura",
        icon: "🌟",
        title: "Primeira Aventura",
        description: "Complete sua primeira matéria."
    },

    mestreDasPalavras: {
        id: "mestre-das-palavras",
        icon: "📖",
        title: "Mestre das Palavras",
        description: "Complete Português."
    },

    mestreDosNumeros: {
        id: "mestre-dos-numeros",
        icon: "🔢",
        title: "Mestre dos Números",
        description: "Complete Matemática."
    },

    perfeccionista: {
        id: "perfeccionista",
        icon: "💯",
        title: "Perfeccionista",
        description: "Complete uma matéria com 100% de acertos."
    },

    conquistadoraDeAuradon: {
        id: "conquistadora-auradon",
        icon: "👑",
        title: "Conquistadora de Auradon",
        description: "Complete todas as matérias disponíveis."
    }
};

function getStorageKey() {
    return STORAGE_KEY_PREFIX + studentName
        .trim()
        .toLowerCase();
}

function checkAppVersion() {
    const savedVersion = localStorage.getItem(VERSION_KEY);

    // Primeiro acesso
    if (!savedVersion) {
        localStorage.setItem(VERSION_KEY, APP_VERSION);
        console.log(`Primeiro acesso. Versão registrada: ${APP_VERSION}.`);
        return;
    }

    if (savedVersion === APP_VERSION) {
        return;
    }

    console.log(
        `Nova versão detectada: ${savedVersion} → ${APP_VERSION}.`
    );

    localStorage.clear();
    localStorage.setItem(VERSION_KEY, APP_VERSION);
}

/* ==========================================
   INICIALIZAÇÃO
========================================== */

document.addEventListener("DOMContentLoaded", initializeWelcomeScreen);

function initializeWelcomeScreen() {
    checkAppVersion();

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

    document
        .getElementById("resetAdventureBtn")
        .addEventListener("click", resetEntireAdventure);

    const comingSoonBackBtn =
        document.getElementById("comingSoonBackBtn");

    if (comingSoonBackBtn) {
        comingSoonBackBtn.addEventListener("click", backToWelcome);
    }

    if (detectReturningStudent()) {
        showReturningHome();
    }

    const novoConselhoBtn =
        document.getElementById("novoConselhoBtn");

    if (novoConselhoBtn) {
        novoConselhoBtn.addEventListener("click", () => {

            ultimoConselho = obterConselhoAuradon(
                selectedCharacterKey,
                selectedSubject
            );

            document.getElementById("conselhoAuradon").textContent =
                ultimoConselho.texto;

            document.querySelector(".auradon-advice .author").textContent =
                `— ${ultimoConselho.autor}`;
        });
    }

    const finalModal = document.getElementById("finalModal");

    if (finalModal) {
        finalModal.addEventListener("click", function(event) {

            if (event.target === finalModal) {
                closeFinalModal();
            }

        });
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
        .getElementById("returningCharacterIcon").textContent = selectedCharacter?.icon || "🏰";

    document
        .getElementById("returningCharacterName").textContent = "Guardiã escolhida: " + selectedCharacter?.name || "";

    document
        .getElementById("lastSubjectLabel").textContent = subjects[selectedSubject]?.name || "Nenhuma";

    document
        .getElementById("lastProgressLabel").textContent = (savedProgressPercentage || 0) + "%";

    document
        .getElementById("returningStudentSalute").textContent = "👋 Bem-vinda de volta, " + studentName + "!";

    document.getElementById("lastSubjectPerformance").textContent = savedPerformance;

    buildSubjectSelector("returningSubjectGrid");
}

function showMainContent() {
    document
        .getElementById("welcomeScreen")
        .classList.add("hidden");

    document
        .getElementById("mainContent")
        .classList.remove("hidden");

    ultimoConselho = obterConselhoAuradon(
        selectedCharacterKey,
        selectedSubject
    );

    document.getElementById("conselhoAuradon").textContent =
        ultimoConselho.texto;

    document.querySelector(".auradon-advice .author").textContent =
        `— ${ultimoConselho.autor}`;
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
        saveProgress();
        checkCompletion();
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

    updateAchievementsPanel();
}

/* ==========================================
MEDALHAS
========================================== */
function updateMedal(score) {
    let icon = "🎓";
    let title = "Iniciante";

    if (score >= 95) {

        icon = "🥇";
        title = "Lenda de Auradon";

    } else if (score >= 80) {

        icon = "🥈";
        title = "Mestre de Auradon";

    } else if (score >= 60) {

        icon = "🥉";
        title = "Guardião do Conhecimento";

    } else if (score >= 40) {

        icon = "⭐";
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

    const newAchievements = checkAchievements();

    updateAchievementsPanel();

    showFinalModal(newAchievements);
}

function showFinalModal(newAchievements = []) {
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
        🎖️ Excelente desempenho!
        Seu legado em Auradon está muito orgulhoso.
        `;
    }

    if (score >= 60) {
        return `
        ⭐ Bom trabalho.
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
    saveData.achievements = unlockedAchievements;

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

        if (correctAnswers && answeredQuestions > 0) {
            savedPerformance = Math.round(
                (correctAnswers / answeredQuestions) * 100
            ) + "%";
        }
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
    try {

        if (!window.jspdf) {
            throw new Error("jsPDF não foi carregado.");
        }

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF(
            "landscape",
            "mm",
            "a4"
        );

        const pageWidth = 297;
        const pageHeight = 210;

        // ==========================================
        // DADOS
        // ==========================================
        const percentage = totalQuestions > 0
            ? Math.round(
                (correctAnswers / totalQuestions) * 100
            )
            : 0;

        const medal = getCurrentMedal();

        const subjectName =
            subjects[selectedSubject]?.name
                ?.replace(/^[^\s]+\s/, "")
            || "Matéria";

        const characterName =
            selectedCharacter?.name
            || "Auradon";

        const characterIcon =
            selectedCharacter?.icon
            || "✨";

        const characterColor =
            selectedCharacter?.color
            || "#6C3FA3";

        const today =
            new Date().toLocaleDateString("pt-BR");

        // ==========================================
        // FUNDO
        // ==========================================
        pdf.setFillColor(13, 18, 32);
        pdf.rect(
            0,
            0,
            pageWidth,
            pageHeight,
            "F"
        );

        // ==========================================
        // MOLDURA EXTERNA
        // ==========================================
        pdf.setDrawColor(216, 180, 90);
        pdf.setLineWidth(1.5);
        pdf.rect(
            8,
            8,
            pageWidth - 16,
            pageHeight - 16
        );
        pdf.setLineWidth(.4);
        pdf.rect(
            12,
            12,
            pageWidth - 24,
            pageHeight - 24
        );

        // ==========================================
        // DETALHES DECORATIVOS
        // ==========================================
        pdf.setFillColor(216, 180, 90);
        pdf.circle(18, 18, 2, "F");
        pdf.circle(pageWidth - 18, 18, 2, "F");
        pdf.circle(18, pageHeight - 18, 2, "F");
        pdf.circle(
            pageWidth - 18,
            pageHeight - 18,
            2,
            "F"
        );

        // ==========================================
        // BRASÃO
        // ==========================================
        const crestImg =
            await loadImage("assets/auradon-crest.png");
        pdf.addImage(
            imageToDataURL(crestImg),
            "PNG",
            128,
            16,
            41,
            41
        );

        // ==========================================
        // TÍTULO
        // ==========================================
        pdf.setTextColor(216, 180, 90);
        pdf.setFont(
            "times",
            "bold"
        );
        pdf.setFontSize(25);
        pdf.text(
            "AURADON ACADEMY",
            pageWidth / 2,
            68,
            {
                align: "center"
            }
        );

        // ==========================================
        // SUBTÍTULO
        // ==========================================
        pdf.setTextColor(244, 232, 208);
        pdf.setFontSize(17);
        pdf.text(
            "CERTIFICADO DE CONCLUSÃO",
            pageWidth / 2,
            79,
            {
                align: "center"
            }
        );

        // ==========================================
        // TEXTO
        // ==========================================
        pdf.setFont(
            "times",
            "normal"
        );
        pdf.setFontSize(12);
        pdf.text(
            "Este certificado é concedido a",
            pageWidth / 2,
            94,
            {
                align: "center"
            }
        );

        // ==========================================
        // NOME DA CRIANÇA
        // ==========================================
        pdf.setTextColor(247, 227, 163);
        pdf.setFont(
            "times",
            "bold"
        );
        pdf.setFontSize(27);
        pdf.text(
            studentName,
            pageWidth / 2,
            108,
            {
                align: "center"
            }
        );

        // Linha abaixo do nome
        pdf.setDrawColor(216, 180, 90);
        pdf.setLineWidth(.5);
        pdf.line(
            80,
            112,
            217,
            112
        );

        // ==========================================
        // MATÉRIA
        // ==========================================
        pdf.setTextColor(244, 232, 208);
        pdf.setFont(
            "times",
            "normal"
        );
        pdf.setFontSize(13);
        pdf.text(
            "por concluir com sucesso sua jornada de aprendizagem em",
            pageWidth / 2,
            124,
            {
                align: "center"
            }
        );
        pdf.setTextColor(216, 180, 90);
        pdf.setFont(
            "times",
            "bold"
        );
        pdf.setFontSize(20);
        pdf.text(
            subjectName,
            pageWidth / 2,
            136,
            {
                align: "center"
            }
        );
        pdf.setTextColor(244, 232, 208);
        pdf.setFont(
            "times",
            "normal"
        );
        pdf.setFontSize(11);
        pdf.text(
            "5º Ano do Ensino Fundamental",
            pageWidth / 2,
            146,
            {
                align: "center"
            }
        );

        // ==========================================
        // PERSONAGEM
        // ==========================================
        pdf.setTextColor(...hexToRgb(characterColor));
        pdf.setFont(
            "times",
            "bold"
        );
        pdf.setFontSize(13);
        pdf.text(
            `Guardiã: ${characterName}`,
            pageWidth / 2,
            158,
            {
                align: "center"
            }
        );

        // ==========================================
        // RESULTADO
        // ==========================================
        pdf.setTextColor(244, 232, 208);
        pdf.setFont(
            "times",
            "normal"
        );
        pdf.setFontSize(11);
        pdf.text(
            `Desempenho: ${percentage}% de acertos`,
            75,
            177,
            {
                align: "center"
            }
        );
        pdf.text(
            `${correctAnswers} de ${totalQuestions} questões`,
            75,
            184,
            {
                align: "center"
            }
        );

        // ==========================================
        // SELO
        // ==========================================
        pdf.setFillColor(216, 180, 90);
        pdf.circle(
            222,
            177,
            19,
            "F"
        );
        pdf.setTextColor(20, 24, 38);
        pdf.setFont(
            "times",
            "bold"
        );
        pdf.setFontSize(9);
        pdf.text(
            "CONQUISTA",
            222,
            173,
            {
                align: "center"
            }
        );
        pdf.setFontSize(8);
        pdf.text(
            medal,
            222,
            180,
            {
                align: "center"
            }
        );

        // ==========================================
        // DATA
        // ==========================================
        pdf.setTextColor(244, 232, 208);
        pdf.setFont(
            "times",
            "normal"
        );
        pdf.setFontSize(9);
        pdf.text(
            `Auradon Academy, ${today}`,
            pageWidth / 2,
            195,
            {
                align: "center"
            }
        );

        // ==========================================
        // RODAPÉ
        // ==========================================
        pdf.setTextColor(216, 180, 90);
        pdf.setFont(
            "times",
            "italic"
        );
        pdf.setFontSize(9);
        pdf.text(
            "A bondade é a nossa maior virtude.",
            pageWidth / 2,
            201,
            {
                align: "center"
            }
        );

        // ==========================================
        // DOWNLOAD
        // ==========================================
        const fileName =
            `Certificado_${subjectName}_${studentName}`
                .replace(/\s+/g, "_")
                .replace(/[^\wÀ-ÿ_-]/g, "");
        pdf.save(
            `${fileName}.pdf`
        );
    } catch (error) {
        console.error(
            "Erro ao gerar certificado:",
            error
        );
        alert(
            "Não foi possível gerar o certificado. " +
            "Verifique o console para mais detalhes."
        );
    }
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

function hexToRgb(hex) {
    const value = hex.replace("#", "");

    return [
        parseInt(value.substring(0, 2), 16),
        parseInt(value.substring(2, 4), 16),
        parseInt(value.substring(4, 6), 16)
    ];
}

/* ==========================================
   CONSELHOS
========================================== */
function obterConselhoAuradon(personagem, materia) {
    const lista = conselhosAuradon?.[personagem]?.[materia];

    if (!lista || lista.length === 0) {
        return {
            texto: "Bibbidi-bobbidi-basta de distrações! Sei que os livros parecem uma montanha intransponível hoje, mas lembre-se: a verdadeira sabedoria não surge num passe de mágica, ela é construída página por página.",
            author: "Fada Madrinha"
        };
    }

    let indice;

    do {
        indice = Math.floor(Math.random() * lista.length);
    } while (
        lista.length > 1 &&
        ultimoConselho.personagem === personagem &&
        ultimoConselho.materia === materia &&
        indice === ultimoConselho.indice
        );

    ultimoConselho = {
        personagem,
        materia,
        indice
    };

    return lista[indice];
}

function checkAchievements() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return [];
    }

    const saveData = JSON.parse(raw);

    saveData.subjectProgress = saveData.subjectProgress || {};

    // Conquistas já desbloqueadas
    const unlocked = saveData.achievements || {};

    // Novas conquistas obtidas nesta verificação
    const newAchievements = [];

    // ==========================================
    // MATÉRIAS DISPONÍVEIS
    // ==========================================

    const availableSubjects = Object.keys(subjects)
        .filter(subject => subjects[subject].available);

    // ==========================================
    // MATÉRIAS CONCLUÍDAS
    // ==========================================

    const completedSubjects = availableSubjects.filter(subject => {

        const progress = saveData.subjectProgress[subject];

        return progress &&
            progress.progressPercentage >= 100;
    });

    // ==========================================
    // PRIMEIRA AVENTURA
    // ==========================================

    if (
        completedSubjects.length >= 1 &&
        !unlocked[achievements.primeiraAventura.id]
    ) {

        unlocked[achievements.primeiraAventura.id] = true;

        newAchievements.push(
            achievements.primeiraAventura
        );
    }

    // ==========================================
    // MESTRE DAS PALAVRAS
    // ==========================================

    if (
        subjects.portugues &&
        subjects.portugues.available &&
        completedSubjects.includes("portugues") &&
        !unlocked[achievements.mestreDasPalavras.id]
    ) {

        unlocked[achievements.mestreDasPalavras.id] = true;

        newAchievements.push(
            achievements.mestreDasPalavras
        );
    }

    // ==========================================
    // MESTRE DOS NÚMEROS
    // ==========================================

    if (
        subjects.matematica &&
        subjects.matematica.available &&
        completedSubjects.includes("matematica") &&
        !unlocked[achievements.mestreDosNumeros.id]
    ) {

        unlocked[achievements.mestreDosNumeros.id] = true;

        newAchievements.push(
            achievements.mestreDosNumeros
        );
    }

    // ==========================================
    // PERFECCIONISTA
    // ==========================================

    const perfectSubject = completedSubjects.some(subject => {

        const progress = saveData.subjectProgress[subject];

        return (
            progress.correctAnswers === progress.answeredQuestions &&
            progress.answeredQuestions > 0
        );
    });

    if (
        perfectSubject &&
        !unlocked[achievements.perfeccionista.id]
    ) {

        unlocked[achievements.perfeccionista.id] = true;

        newAchievements.push(
            achievements.perfeccionista
        );
    }

    // ==========================================
    // CONQUISTADORA DE AURADON
    // ==========================================

    const allSubjectsCompleted =
        availableSubjects.length > 0 &&
        availableSubjects.every(subject => {

            const progress = saveData.subjectProgress[subject];

            return (
                progress &&
                progress.progressPercentage >= 100
            );
        });

    if (
        allSubjectsCompleted &&
        !unlocked[achievements.conquistadoraDeAuradon.id]
    ) {

        unlocked[achievements.conquistadoraDeAuradon.id] = true;

        newAchievements.push(
            achievements.conquistadoraDeAuradon
        );
    }

    // ==========================================
    // SALVAR CONQUISTAS
    // ==========================================

    saveData.achievements = unlocked;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(saveData)
    );

    return newAchievements;
}

function updateAchievementsPanel() {

    const panel = document.getElementById("achievementsPanel");

    if (!panel) {
        return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        renderLockedAchievements();
        return;
    }

    const saveData = JSON.parse(raw);

    const unlocked = saveData.achievements || {};

    const achievementList = Object.values(achievements);

    const unlockedCount = achievementList.filter(
        achievement => unlocked[achievement.id]
    ).length;

    // ==========================================
    // CONTADOR
    // ==========================================

    const countElement =
        document.getElementById("achievementsCount");

    if (countElement) {
        countElement.textContent =
            `${unlockedCount}/${achievementList.length}`;
    }

    // ==========================================
    // MENSAGEM
    // ==========================================

    const summary =
        document.getElementById("achievementsSummary");

    if (summary) {

        if (unlockedCount === 0) {
            summary.textContent =
                "Sua primeira conquista está esperando por você!";
        } else if (unlockedCount === achievementList.length) {
            summary.textContent =
                "Você conquistou tudo em Auradon! 👑";
        } else {
            summary.textContent =
                `${unlockedCount} conquista${unlockedCount > 1 ? "s" : ""} desbloqueada${unlockedCount > 1 ? "s" : ""}!`;
        }
    }

    // ==========================================
    // LISTA
    // ==========================================

    panel.innerHTML = achievementList
        .map(achievement => {

            const isUnlocked =
                !!unlocked[achievement.id];

            return `
                <div class="achievement-item ${isUnlocked ? "unlocked" : "locked"}">

                    <div class="achievement-icon">
                        ${isUnlocked ? achievement.icon : "🔒"}
                    </div>

                    <div class="achievement-info">

                        <strong>
                            ${achievement.title}
                        </strong>

                        <span>
                            ${achievement.description}
                        </span>

                        ${isUnlocked
                ? `<small>✨ Conquistada!</small>`
                : `<small>Ainda bloqueada</small>`
            }

                    </div>

                </div>
            `;
        })
        .join("");
}

function closeFinalModal() {

    const modal = document.getElementById("finalModal");

    if (modal) {
        modal.classList.add("hidden");
    }

    // Garante que o painel esteja atualizado
    updateDashboard();
    updateAchievementsPanel();
}

function resetEntireAdventure() {

    const confirmReset = confirm(
        "⚠️ Deseja realmente reiniciar toda a aventura?\n\n" +
        "Todo o progresso, conquistas, matérias respondidas " +
        "e dados do aluno serão apagados.\n\n" +
        "Esta ação não pode ser desfeita."
    );

    if (!confirmReset) {
        return;
    }

    // Apaga o progresso completo do aluno atual
    if (STORAGE_KEY) {
        localStorage.removeItem(STORAGE_KEY);
    }

    // Remove as referências do último aluno/matéria
    localStorage.removeItem("auradon-last-student");
    localStorage.removeItem("auradon-last-subject");

    // Limpa o estado da aplicação
    STORAGE_KEY = "";
    returningStudent = false;
    selectedCharacterKey = null;
    selectedCharacter = null;
    selectedSubject = null;
    studentName = "";
    savedProgressPercentage = 0;
    savedPerformance = "-";
    unlockedAchievements = {};

    answeredQuestions = 0;
    correctAnswers = 0;
    totalQuestions = 0;

    // Limpa estatísticas de dificuldade
    difficultyStats.easy.correct = 0;
    difficultyStats.easy.total = 0;

    difficultyStats.medium.correct = 0;
    difficultyStats.medium.total = 0;

    difficultyStats.hard.correct = 0;
    difficultyStats.hard.total = 0;

    // Volta para a tela inicial como novo aluno
    document
        .getElementById("mainContent")
        .classList.add("hidden");

    document
        .getElementById("welcomeScreen")
        .classList.remove("hidden");

    showNewStudentPanel();

    // Limpa seleções visuais
    document
        .querySelectorAll(".character-btn, .subject-btn")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    document
        .getElementById("studentNameInput")
        .value = "";

    console.log("Auradon Academy: aventura reiniciada.");
}
