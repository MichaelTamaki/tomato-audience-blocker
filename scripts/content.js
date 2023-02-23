const IRRELEVANT = 'Irrelevant';
try {
  // Assume that the score audience percentage is available right away when the script is loaded
  const scorePanel = document.querySelector('[data-qa=score-panel]');
  const scoreAudienceIcon = scorePanel.shadowRoot.querySelector('[data-qa=score-icon-audience]');
  const scoreAudience = scoreAudienceIcon.shadowRoot.querySelector('[data-qa=audience-score');
  scoreAudience.innerText = IRRELEVANT;

  // If the score audience percentage changes later, then catch it (i dont think this will happen but just in case)
  const scoreAudienceObserver = new MutationObserver((mutations, observer) => {
    mutations.forEach((mutation) => {
      if (mutation.target.innerText !== IRRELEVANT) {
        mutation.target.innerText = IRRELEVANT;
      }
    });
  });
  scoreAudienceObserver.observe(scoreAudience, { characterData: true });
} catch (e) {
  console.error(e);
}
