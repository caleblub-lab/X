// Éléments du DOM
const sliderV = document.getElementById('sliderV');
const sliderR = document.getElementById('sliderR');
const valV = document.getElementById('valV');
const valR = document.getElementById('valR');
const valI = document.getElementById('valI');
const statusText = document.getElementById('statusText');
const btnValidate = document.getElementById('btnValidate');
const xpText = document.getElementById('xpText');
const xpBar = document.getElementById('xpBar');
const userLevel = document.getElementById('userLevel');
const badgeOhm = document.getElementById('badgeOhm');

// État de l'application
let xp = 0;
let level = 1;
let challengeCompleted = false;

// Mise à jour de la simulation en temps réel
function updateSimulation() {
  const v = parseFloat(sliderV.value);
  const r = parseFloat(sliderR.value);
  const i = v / r;

  valV.textContent = v;
  valR.textContent = r;
  valI.textContent = `${i.toFixed(3)} A (${Math.round(i * 1000)} mA)`;

  if (i > 0.03) {
    statusText.textContent = "⚠️ Danger : Courant trop élevé ! La LED risque de griller (>30 mA).";
    statusText.style.color = "var(--warning)";
    btnValidate.disabled = true;
  } else if (Math.abs(i - 0.02) < 0.002) {
    statusText.textContent = "✅ Parfait ! La LED fonctionne à son niveau optimal (20 mA).";
    statusText.style.color = "var(--success)";
    btnValidate.disabled = challengeCompleted;
  } else {
    statusText.textContent = "État : Réglez les curseurs pour atteindre ~20 mA.";
    statusText.style.color = "var(--subtext)";
    btnValidate.disabled = true;
  }
}

// Validation du défi
function completeChallenge() {
  if (challengeCompleted) return;

  challengeCompleted = true;
  addXP(50);
  badgeOhm.classList.add('unlocked');
  btnValidate.textContent = "Défi validé !";
  btnValidate.disabled = true;
}

// Gestion de la progression (XP / Niveaux)
function addXP(amount) {
  xp += amount;
  if (xp >= 100) {
    xp -= 100;
    level += 1;
    userLevel.textContent = `Niveau ${level} - Électricien`;
  }
  xpText.textContent = `${xp} / 100`;
  xpBar.style.width = `${xp}%`;
}

// Écouteurs d'événements
sliderV.addEventListener('input', updateSimulation);
sliderR.addEventListener('input', updateSimulation);
btnValidate.addEventListener('click', completeChallenge);

// Initialisation au chargement
updateSimulation();
