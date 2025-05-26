const songs = [
  {
    title: "Diss Pro Zeus",
    file: "musicas/diss-pro-zeus.mp3",
    description: "🏛️ Quando o Gragas caipira resolve as paradas com os deuses do Olimpo",
  },
  {
    title: "YUNG GRAGAS - AYEL & EU",
    file: "musicas/YUNG GRAGAS - AYEL & EU.mp3",
    description: "🤝 Parceria raiz entre os caipiras mais brutos da região",
  },
  {
    title: "Desculpa Bruno",
    file: "musicas/desculpa-bruno.mp3",
    description: "😔 Pedido de desculpas mais sincero que já saiu da roça",
  },
  {
    title: "YUNG GRAGAS - TEU ROXINHO",
    file: "musicas/YUNG GRAGAS - AYEL & EU.mp3",
    description: "🤝 Parceria raiz entre os caipiras mais brutos da região",
  },
  {
    title: "Desculpa Bruno",
    file: "musicas/desculpa-bruno.mp3",
    description: "😔 Pedido de desculpas mais sincero que já saiu da roça",
  },
  {
    title: "YUNG GRAGAS - TEU ROXINHO",
    file: "musicas/YUNG GRAGAS - TEU ROXINHO.mp3",
    description: "🍇 Ode poética a algo roxinho muito especial da fazenda",
  },
  {
    title: "ROXO ULTIMATO - YUNG GRAGAS X YUNG ZE",
    file: "musicas/ROXO ULTIMATO - YUNG GRAGAS X YUNG ZE.mp3",
    description: "🔥 Duelo épico que vai decidir quem manda na roça",
  },
  {
    title: "Bostologia",
    file: "musicas/bostologia.mp3",
    description: "💩 Estudo científico avançado sobre temas questionáveis do sítio",
  },
  {
    title: "As Bala Me Erra",
    file: "musicas/as bala me erra.mp3",
    description: "🎯 Quando você tem mais sorte que habilidade na caçada",
  },
  {
    title: "Douglas56",
    file: "musicas/douglas56.mp3",
    description: "🤠 A lenda do Douglas e seus 56 mistérios da fazenda",
  },
  {
    title: "Dois Três O Mundo Gragas Fim",
    file: "musicas/doistresomundogragasfim.mp3",
    description: "🌍 A saga épica do fim do mundo segundo o Gragas caipira",
  },
]

// Música secreta do easter egg
const secretSong = {
  title: "🔥 GROUPIES DA ROÇA 🔥",
  file: "musicas/groupies.mp3",
  description: "🎸 FAIXA SECRETA DESBLOQUEADA! As groupies mais raiz do interior!",
}

let currentSongIndex = -1
let isPlaying = false
let score = 0
let correct = 0
let wrong = 0
let quizActive = false
let quizTimer = null
let timeLeft = 15
let questionsAnswered = 0
const maxQuestions = 10

const audioPlayer = document.getElementById("audioPlayer")
const currentSongEl = document.getElementById("currentSong")
const statusEl = document.getElementById("status")
const playBtn = document.getElementById("playBtn")
const progressBar = document.getElementById("progressBar")
const progressContainer = document.querySelector(".progress-container")
const autoplayToggle = document.getElementById("autoplayToggle")
let easterEggUnlocked = false

// VARIÁVEIS PARA EFEITOS TRAP CONTÍNUOS
let trapModeActive = false
let trapEmojiInterval = null
let trapStrobeInterval = null
let scrollEmojiCooldown = false

// Inicializar playlist
function initPlaylist() {
  const songList = document.getElementById("songList")

  // Adicionar músicas normais
  songs.forEach((song, index) => {
    const songItem = document.createElement("div")
    songItem.className = "song-item"
    songItem.innerHTML = `
            <strong>${song.title}</strong><br>
            <small>${song.description}</small>
        `
    songItem.onclick = () => playSong(index)
    songList.appendChild(songItem)
  })

  // Adicionar música secreta se desbloqueada
  if (easterEggUnlocked) {
    addSecretSong()
  }
}

// Adicionar música secreta
function addSecretSong() {
  const songList = document.getElementById("songList")
  const secretItem = document.createElement("div")
  secretItem.className = "song-item secret-song"
  secretItem.innerHTML = `
        <strong>${secretSong.title}</strong><br>
        <small>${secretSong.description}</small>
    `
  secretItem.onclick = () => playSecretSong()
  songList.appendChild(secretItem)
}

// Tocar música secreta
function playSecretSong() {
  currentSongIndex = -1 // Marca como música especial

  currentSongEl.textContent = secretSong.title
  audioPlayer.src = secretSong.file

  // Destacar música secreta
  document.querySelectorAll(".song-item").forEach((item) => {
    item.classList.remove("playing")
  })
  document.querySelector(".secret-song").classList.add("playing")

  // Ativar modo trap CONTÍNUO
  startTrapMode()

  audioPlayer
    .play()
    .then(() => {
      statusEl.textContent = "🔥 TOCANDO FAIXA SECRETA DA ROÇA 🔥"
      isPlaying = true
      updatePlayButton()
    })
    .catch((error) => {
      console.error("Erro ao reproduzir música secreta:", error)
      simulatePlayback(secretSong)
    })
}

// INICIAR MODO TRAP CONTÍNUO
function startTrapMode() {
  trapModeActive = true

  // Aplicar tema roxo trap
  document.body.style.filter = "hue-rotate(270deg) saturate(2) brightness(1.3) contrast(1.3)"
  document.body.classList.add("secret-mode")
  document.body.style.animation = "trapShake 0.5s ease-in-out infinite"

  // CHUVA INICIAL INSANA (100 emojis!)
  createMassiveEmojiRain()

  // EMOJIS CONTÍNUOS durante toda a música
  trapEmojiInterval = setInterval(() => {
    if (trapModeActive) {
      createContinuousEmojis()
    }
  }, 1500) // A cada 1.5 segundos (era 0.8s)

  // STROBE CONTÍNUO mais suave
  trapStrobeInterval = setInterval(() => {
    if (trapModeActive) {
      createMiniStrobe()
    }
  }, 2000) // A cada 2 segundos
}

// CHUVA INICIAL MASSIVA
function createMassiveEmojiRain() {
  const trapEmojis = ["💎", "🕶️", "💰", "🔥", "⚡", "👑", "💜", "🎤", "🎧", "💸", "🌟", "✨", "🔮", "🍇", "🌌"]

  // 30 EMOJIS INICIAIS (mais controlado)
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createTrapEmoji(trapEmojis)
    }, i * 100) // Um pouco mais devagar
  }
}

// EMOJIS CONTÍNUOS
function createContinuousEmojis() {
  const trapEmojis = ["💎", "🕶️", "💰", "🔥", "⚡", "👑", "💜", "🎤", "🎧", "💸", "🌟", "✨", "🔮", "🍇", "🌌"]

  // 8 emojis a cada intervalo (mais controlado)
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      createTrapEmoji(trapEmojis)
    }, i * 150) // Mais espaçado
  }
}

// CRIAR EMOJI TRAP INDIVIDUAL
function createTrapEmoji(emojiArray) {
  if (!trapModeActive) return

  const emoji = document.createElement("div")
  emoji.className = "floating-emoji trap-emoji"
  emoji.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)]

  // Posição aleatória por TODA a tela
  emoji.style.left = Math.random() * 100 + "vw"
  emoji.style.top = Math.random() * 100 + "vh"
  emoji.style.fontSize = Math.random() * 4 + 2 + "em" // 2em a 6em

  // Animações diferentes para cada emoji
  const animations = ["trapFloat1", "trapFloat2", "trapFloat3", "trapSpin", "trapBounce", "trapCrazy"]
  emoji.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} ${Math.random() * 4 + 3}s ease-in-out infinite`

  // Filtros especiais INSANOS
  const hueRotate = Math.random() * 60 + 270
  emoji.style.filter = `hue-rotate(${hueRotate}deg) drop-shadow(0 0 20px #8a2be2) brightness(2) saturate(3)`
  emoji.style.textShadow = "0 0 30px #ff00ff, 0 0 40px #8a2be2, 0 0 50px #ff00ff"

  document.body.appendChild(emoji)

  // Remover após tempo aleatório
  setTimeout(
    () => {
      if (emoji.parentNode) {
        emoji.remove()
      }
    },
    Math.random() * 5000 + 8000,
  ) // 8-13 segundos
}

// STROBE MINI CONTÍNUO
function createMiniStrobe() {
  if (!trapModeActive) return

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const flash = document.createElement("div")
      flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(138,43,226,0.05) 100%);
        z-index: 9999;
        pointer-events: none;
        animation: flashEffect 0.1s ease-out;
      `

      document.body.appendChild(flash)

      setTimeout(() => {
        if (flash.parentNode) {
          flash.remove()
        }
      }, 100)
    }, i * 200)
  }
}

// PARAR MODO TRAP
function stopTrapMode() {
  trapModeActive = false

  // Limpar intervalos
  if (trapEmojiInterval) {
    clearInterval(trapEmojiInterval)
    trapEmojiInterval = null
  }

  if (trapStrobeInterval) {
    clearInterval(trapStrobeInterval)
    trapStrobeInterval = null
  }

  // Remover efeitos visuais
  document.body.style.filter = "none"
  document.body.style.animation = "none"
  document.body.classList.remove("secret-mode")

  // Remover emojis restantes
  document.querySelectorAll(".trap-emoji").forEach((emoji) => {
    emoji.remove()
  })
}

// EMOJIS NO SCROLL - PACARAI!
window.addEventListener("scroll", () => {
  if (trapModeActive && !scrollEmojiCooldown) {
    scrollEmojiCooldown = true

    // 10 EMOJIS A CADA SCROLL (mais controlado)
    const scrollEmojis = ["💎", "🕶️", "💰", "🔥", "⚡", "👑", "💜", "🎤", "🎧", "💸", "🌟", "✨"]

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createTrapEmoji(scrollEmojis)
      }, i * 50)
    }

    // Cooldown de 800ms para não sobrecarregar
    setTimeout(() => {
      scrollEmojiCooldown = false
    }, 800)
  }
})

// Tocar música específica
function playSong(index) {
  currentSongIndex = index
  const song = songs[index]

  console.log("Tentando tocar:", song.file)

  currentSongEl.textContent = song.title
  audioPlayer.src = song.file

  // Destacar música atual na playlist
  document.querySelectorAll(".song-item").forEach((item, i) => {
    if (i < songs.length) {
      item.classList.toggle("playing", i === index)
    } else {
      item.classList.remove("playing")
    }
  })

  audioPlayer
    .play()
    .then(() => {
      console.log("Reprodução iniciada!")
      statusEl.textContent = "Tocando na Roça"
      isPlaying = true
      updatePlayButton()
      createFloatingEmojis()
    })
    .catch((error) => {
      console.error("Erro ao reproduzir:", error)
      simulatePlayback(song)
    })
}

// Atualizar botão play com ícones caipiras
function updatePlayButton() {
  if (isPlaying) {
    playBtn.innerHTML = "⏸️ PAUSE"
  } else {
    playBtn.innerHTML = "▶️ PLAY"
  }
}

// Próxima música
function nextSong() {
  if (currentSongIndex === -1) {
    // Se estava no modo trap, parar efeitos
    if (trapModeActive) {
      stopTrapMode()
    }
    playRandomSong()
    return
  }

  const nextIndex = (currentSongIndex + 1) % songs.length
  playSong(nextIndex)
}

// Simular reprodução
function simulatePlayback(song) {
  statusEl.textContent = "Tocando (Simulado na Roça)"
  isPlaying = true
  updatePlayButton()
  createFloatingEmojis()

  setTimeout(() => {
    if (isPlaying) {
      if (autoplayToggle.checked) {
        nextSong()
      } else {
        stopMusic()
      }
    }
  }, 30000)
}

// Tocar música aleatória
function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length)
  playSong(randomIndex)
}

// Toggle play/pause
function togglePlay() {
  if (currentSongIndex === -1 && !document.querySelector(".secret-song.playing")) {
    playRandomSong()
    return
  }

  if (isPlaying) {
    audioPlayer.pause()
    statusEl.textContent = "Pausado"
    isPlaying = false
    updatePlayButton()

    // Se pausou música secreta, parar efeitos trap
    if (document.querySelector(".secret-song.playing") && trapModeActive) {
      stopTrapMode()
    }
  } else {
    audioPlayer
      .play()
      .then(() => {
        statusEl.textContent = "Tocando na Roça"
        isPlaying = true
        updatePlayButton()
      })
      .catch(() => {
        if (currentSongIndex >= 0) {
          simulatePlayback(songs[currentSongIndex])
        }
      })
  }
}

// Parar música
function stopMusic() {
  audioPlayer.pause()
  audioPlayer.currentTime = 0
  statusEl.textContent = "Parado"
  isPlaying = false
  updatePlayButton()
  currentSongEl.textContent = "🤠 Escolha uma música da roça 🤠"
  progressBar.style.width = "0%"

  document.querySelectorAll(".song-item").forEach((item) => {
    item.classList.remove("playing")
  })

  // Parar modo trap se estiver ativo
  if (trapModeActive) {
    stopTrapMode()
  }
}

// Formatar tempo
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// Atualizar barra de progresso e tempo
function updateProgress() {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressBar.style.width = progress + "%"

    // Atualizar tempo
    const currentTime = formatTime(audioPlayer.currentTime)
    const duration = formatTime(audioPlayer.duration)

    let timeInfo = document.querySelector(".time-info")
    if (!timeInfo) {
      timeInfo = document.createElement("div")
      timeInfo.className = "time-info"
      document
        .querySelector(".progress-container")
        .parentNode.insertBefore(timeInfo, document.querySelector(".progress-container"))
    }
    timeInfo.innerHTML = `<span>🕐 ${currentTime}</span> <span>🕐 ${duration}</span>`
  }
}

// Controle de progresso clicável
progressContainer.addEventListener("click", (e) => {
  if (audioPlayer.duration) {
    const rect = progressContainer.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickTime = (clickX / width) * audioPlayer.duration
    audioPlayer.currentTime = clickTime
  }
})

// Iniciar quiz
function startQuiz() {
  quizActive = true
  questionsAnswered = 0
  score = 0
  correct = 0
  wrong = 0
  updateScore()

  const quizArea = document.getElementById("quizArea")
  quizArea.style.display = "block"

  // Esconder botão de começar e mostrar controles
  document.querySelector('button[onclick="startQuiz()"]').style.display = "none"

  // Adicionar controles do quiz
  let quizControls = document.querySelector(".quiz-controls")
  if (!quizControls) {
    quizControls = document.createElement("div")
    quizControls.className = "quiz-controls"
    quizControls.innerHTML = `
      <button class="btn" onclick="endQuiz()">🚪 ENCERRAR QUIZ</button>
    `
    document.querySelector(".game-section").insertBefore(quizControls, quizArea)
  }
  quizControls.style.display = "flex"

  generateQuizQuestion()
}

// Encerrar quiz
function endQuiz() {
  quizActive = false

  if (quizTimer) {
    clearInterval(quizTimer)
    quizTimer = null
  }

  audioPlayer.pause()

  const quizArea = document.getElementById("quizArea")
  quizArea.style.display = "none"

  const quizControls = document.querySelector(".quiz-controls")
  if (quizControls) {
    quizControls.style.display = "none"
  }

  document.querySelector('button[onclick="startQuiz()"]').style.display = "inline-block"

  showGameOverScreen()
}

// Tela de game over
function showGameOverScreen() {
  const feedback = document.getElementById("quizFeedback")
  feedback.className = "quiz-feedback game-over"

  let performance = ""
  const percentage = questionsAnswered > 0 ? (correct / questionsAnswered) * 100 : 0

  if (percentage >= 80) performance = "🏆 EXPERT CAIPIRA!"
  else if (percentage >= 60) performance = "🥉 BOM DE ROÇA!"
  else if (percentage >= 40) performance = "🤠 CAIPIRA INICIANTE"
  else performance = "🐄 PRECISA ESTUDAR MAIS!"

  feedback.innerHTML = `
    <div style="font-size: 1.2em; margin-bottom: 15px;">🎮 QUIZ FINALIZADO! 🎮</div>
    <div style="font-size: 0.9em; margin-bottom: 10px;">${performance}</div>
    <div style="font-size: 0.7em; margin-bottom: 15px;">
      Pontuação Final: ${score}<br>
      Acertos: ${correct}/${questionsAnswered} (${percentage.toFixed(1)}%)
    </div>
    <button class="btn" onclick="hideGameOver(); startQuiz();" style="font-size: 0.6em; padding: 10px 20px;">
      🔄 JOGAR NOVAMENTE
    </button>
  `
  feedback.style.display = "block"
}

// Esconder game over
function hideGameOver() {
  document.getElementById("quizFeedback").style.display = "none"
}

// Gerar pergunta do quiz
function generateQuizQuestion() {
  if (questionsAnswered >= maxQuestions) {
    endQuiz()
    return
  }

  const correctIndex = Math.floor(Math.random() * songs.length)
  const correctSong = songs[correctIndex]

  // CORRIGIR BUG DO TIMER - resetar corretamente
  if (quizTimer) {
    clearInterval(quizTimer)
    quizTimer = null
  }

  timeLeft = 15
  updateQuizTimer()

  // Criar opções (incluindo música secreta às vezes)
  const options = [correctSong]
  const availableSongs = [...songs]

  // 15% de chance de incluir a música secreta se desbloqueada
  if (easterEggUnlocked && Math.random() < 0.15) {
    availableSongs.push(secretSong)
  }

  while (options.length < 4) {
    const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)]
    if (!options.includes(randomSong)) {
      options.push(randomSong)
    }
  }

  options.sort(() => Math.random() - 0.5)

  const quizOptions = document.getElementById("quizOptions")
  quizOptions.innerHTML = ""

  options.forEach((song) => {
    const button = document.createElement("button")
    button.className = "option-btn"
    button.textContent = song.title
    button.onclick = () => checkAnswer(song === correctSong, correctSong.title)
    quizOptions.appendChild(button)
  })

  // Atualizar pergunta com contador
  document.getElementById("quizQuestion").textContent =
    `Pergunta ${questionsAnswered + 1}/${maxQuestions}: Qual é essa música da roça?`

  currentSongEl.textContent = `🎵 Quiz da Roça: Pergunta ${questionsAnswered + 1} 🎵`
  audioPlayer.src = correctSong.file

  audioPlayer
    .play()
    .then(() => {
      console.log("Música do quiz tocando:", correctSong.title)
      statusEl.textContent = "Quiz Mode da Roça"
      isPlaying = true
      updatePlayButton()
      createFloatingEmojis()
      startQuizTimer()
    })
    .catch((error) => {
      console.error("Erro no quiz:", error)
      statusEl.textContent = "Quiz (Simulado na Roça)"
      createFloatingEmojis()
      startQuizTimer()
    })
}

// Timer do quiz - CORRIGIDO
function startQuizTimer() {
  // Garantir que não há timer anterior rodando
  if (quizTimer) {
    clearInterval(quizTimer)
  }

  quizTimer = setInterval(() => {
    timeLeft--
    updateQuizTimer()

    if (timeLeft <= 0) {
      clearInterval(quizTimer)
      quizTimer = null
      questionsAnswered++
      showFeedback(false, "⏰ Tempo esgotado, parceiro!", "")
      disableQuizButtons()
      setTimeout(() => {
        generateQuizQuestion()
      }, 2500)
    }
  }, 1000)
}

function updateQuizTimer() {
  const timerEl = document.getElementById("quizTimer")
  timerEl.textContent = `⏰ ${timeLeft}s`

  if (timeLeft <= 5) {
    timerEl.style.color = "#8B0000"
    timerEl.style.animation = "country-pulse 0.5s infinite"
  } else {
    timerEl.style.color = "#8B4513"
    timerEl.style.animation = "none"
  }
}

// Verificar resposta
function checkAnswer(isCorrect, correctTitle) {
  // Parar timer
  if (quizTimer) {
    clearInterval(quizTimer)
    quizTimer = null
  }

  questionsAnswered++
  audioPlayer.pause()
  disableQuizButtons()

  if (isCorrect) {
    score += 10 + timeLeft
    correct++
    showFeedback(true, "🎉 Acertou, caipira!", `Era "${correctTitle}"! +${10 + timeLeft} pontos!`)
    createCelebrationEffect()
  } else {
    score = Math.max(0, score - 5)
    wrong++
    showFeedback(false, "❌ Errou, sô!", `Era "${correctTitle}". -5 pontos!`)
  }

  updateScore()

  setTimeout(() => {
    generateQuizQuestion()
  }, 3500)
}

// Mostrar feedback visual
function showFeedback(isCorrect, title, subtitle) {
  const feedback = document.getElementById("quizFeedback")
  feedback.className = `quiz-feedback ${isCorrect ? "" : "wrong"}`
  feedback.innerHTML = `
    <div style="font-size: 1.2em; margin-bottom: 15px;">${title}</div>
    <div style="font-size: 0.8em;">${subtitle}</div>
  `
  feedback.style.display = "block"

  setTimeout(() => {
    feedback.style.display = "none"
  }, 3000)
}

// Desabilitar botões do quiz
function disableQuizButtons() {
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true
  })
}

// Atualizar pontuação
function updateScore() {
  document.getElementById("score").textContent = score
  document.getElementById("correct").textContent = correct
  document.getElementById("wrong").textContent = wrong
}

// Criar emojis flutuantes
function createFloatingEmojis() {
  const emojis = ["🎵", "🎶", "🤠", "🍺", "🌾", "🐄", "🚜", "⭐", "🔥"]

  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div")
      emoji.className = "floating-emoji"
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      emoji.style.left = Math.random() * 100 + "vw"
      emoji.style.animationDelay = Math.random() * 2 + "s"
      document.body.appendChild(emoji)

      setTimeout(() => {
        emoji.remove()
      }, 8000)
    }, i * 250)
  }

  // Chance de easter egg aleatório
  showRandomEasterEgg()
}

// Efeito de celebração
function createCelebrationEffect() {
  const celebrationEmojis = ["🎉", "🎊", "🥳", "🏆", "⭐", "💫", "🤠", "🍺", "🔥"]

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div")
      emoji.className = "floating-emoji"
      emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]
      emoji.style.left = Math.random() * 100 + "vw"
      emoji.style.fontSize = "3.5em"
      document.body.appendChild(emoji)

      setTimeout(() => {
        emoji.remove()
      }, 8000)
    }, i * 150)
  }

  // Chance de mega easter egg quando acerta
  showMegaEasterEgg()
}

// Eventos do player de áudio
audioPlayer.addEventListener("play", () => {
  isPlaying = true
  statusEl.textContent = "Tocando na Roça"
  updatePlayButton()
})

audioPlayer.addEventListener("pause", () => {
  isPlaying = false
  statusEl.textContent = "Pausado"
  updatePlayButton()
})

audioPlayer.addEventListener("timeupdate", updateProgress)

// Detectar quando música secreta acaba para remover efeito
audioPlayer.addEventListener("ended", () => {
  // Se estava tocando música secreta, remover efeito
  if (document.querySelector(".secret-song.playing") && trapModeActive) {
    stopTrapMode()
  }

  if (autoplayToggle.checked && !quizActive) {
    nextSong()
  } else {
    stopMusic()
  }
})

// NOVOS EASTER EGGS ALEATÓRIOS COM IMAGENS
const easterEggImages = [
  { src: "davi.jpeg", name: "Davi Surpreso", emoji: "😱" },
  { src: "andrezitos.png", name: "Topperson", emoji: "🔥" },
  { src: "mano-brown.png", name: "Mano Brown Pensativo", emoji: "🤔" },
]

// Função para mostrar easter egg aleatório
function showRandomEasterEgg() {
  // 8% de chance de aparecer
  if (Math.random() < 0.08) {
    const randomEgg = easterEggImages[Math.floor(Math.random() * easterEggImages.length)]

    const easterDiv = document.createElement("div")
    easterDiv.style.cssText = `
      position: fixed;
      top: ${Math.random() * 60 + 20}%;
      right: ${Math.random() * 30 + 10}%;
      z-index: 999;
      background: linear-gradient(135deg, #8b4513, #a0522d);
      border: 4px solid #ffd700;
      border-radius: 20px;
      padding: 15px;
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
      animation: easterPop 4s ease-out forwards;
      text-align: center;
      max-width: 200px;
    `

    easterDiv.innerHTML = `
      <img src="${randomEgg.src}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 15px; border: 3px solid #ffd700;">
      <div style="color: #ffd700; font-weight: bold; margin-top: 10px; text-shadow: 2px 2px 0px #654321; font-family: 'Rye', cursive;">
        ${randomEgg.emoji} ${randomEgg.name}!
      </div>
    `

    document.body.appendChild(easterDiv)

    // Remover após 4 segundos
    setTimeout(() => {
      easterDiv.remove()
    }, 4000)
  }
}

// Função para easter egg mega raro (todas as 3 imagens)
function showMegaEasterEgg() {
  // 1% de chance super rara
  if (Math.random() < 0.01) {
    const megaDiv = document.createElement("div")
    megaDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      background: linear-gradient(135deg, #ffd700, #ff8c00);
      border: 6px solid #8b0000;
      border-radius: 25px;
      padding: 30px;
      box-shadow: 0 0 60px rgba(255, 140, 0, 0.9);
      animation: megaEasterPop 6s ease-out forwards;
      text-align: center;
    `

    megaDiv.innerHTML = `
      <div style="color: #8b0000; font-size: 2em; font-weight: bold; margin-bottom: 20px; text-shadow: 3px 3px 0px #ffd700; font-family: 'Creepster', cursive;">
        🎉 MEGA EASTER EGG DA ROÇA! 🎉
      </div>
      <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 15px;">
        ${easterEggImages
          .map(
            (egg) => `
          <img src="${egg.src}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; border: 3px solid #8b0000;">
        `,
          )
          .join("")}
      </div>
      <div style="color: #8b0000; font-weight: bold; text-shadow: 2px 2px 0px #ffd700; font-family: 'Rye', cursive;">
        🔥 TRIO LENDÁRIO DESBLOQUEADO! 🔥
      </div>
    `

    document.body.appendChild(megaDiv)

    // Chuva de emojis especiais
    const megaEmojis = ["🎉", "🔥", "⭐", "💎", "🏆", "🎊", "🥳", "💫"]
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const emoji = document.createElement("div")
        emoji.className = "floating-emoji"
        emoji.textContent = megaEmojis[Math.floor(Math.random() * megaEmojis.length)]
        emoji.style.left = Math.random() * 100 + "vw"
        emoji.style.fontSize = "4em"
        document.body.appendChild(emoji)
        setTimeout(() => emoji.remove(), 8000)
      }, i * 100)
    }

    setTimeout(() => {
      megaDiv.remove()
    }, 6000)
  }
}

// Inicializar
window.onload = () => {
  initPlaylist()
  createFloatingEmojis()
}

// Easter egg melhorado - palavra secreta ROXO
let typedSequence = ""

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase()

  // Adicionar letra digitada
  typedSequence += key

  // Manter apenas os últimos 10 caracteres para não ficar muito longo
  if (typedSequence.length > 10) {
    typedSequence = typedSequence.slice(-10)
  }

  // Verificar se contém "roxo"
  if (typedSequence.includes("roxo")) {
    if (!easterEggUnlocked) {
      easterEggUnlocked = true

      // Mostrar mensagem
      const feedback = document.getElementById("quizFeedback")
      feedback.className = "quiz-feedback"
      feedback.innerHTML = `
        <div style="font-size: 1.5em; margin-bottom: 15px;">💎 MODO TRAP ATIVADO! 💎</div>
        <div style="font-size: 1em;">Música secreta "GROUPIES DA ROÇA" tocando em 1 segundo! 🔥🕶️</div>
      `
      feedback.style.display = "block"

      // Adicionar música secreta à playlist
      addSecretSong()

      // TOCAR AUTOMATICAMENTE a música secreta em 1 SEGUNDO
      setTimeout(() => {
        playSecretSong()
        feedback.style.display = "none"
      }, 1000) // 1 SEGUNDO!
    }

    typedSequence = "" // Resetar sequência
  }
})

// Easter egg do clique triplo no header
let clickCount = 0
document.querySelector(".header").addEventListener("click", () => {
  clickCount++
  if (clickCount === 3) {
    createCelebrationEffect()

    // Dica sobre o easter egg
    if (!easterEggUnlocked) {
      const feedback = document.getElementById("quizFeedback")
      feedback.className = "quiz-feedback"
      feedback.innerHTML = `
        <div style="font-size: 1.2em; margin-bottom: 15px;">🤔 DICA SECRETA DA ROÇA!</div>
        <div style="font-size: 0.9em;">Digite: R-O-X-O no teclado... 💎🕶️</div>
      `
      feedback.style.display = "block"

      setTimeout(() => {
        feedback.style.display = "none"
      }, 4000)
    }

    clickCount = 0
  }
  setTimeout(() => {
    clickCount = 0
  }, 1000)
})
