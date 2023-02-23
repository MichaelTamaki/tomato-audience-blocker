const IRRELEVANT = 'Irrelevant';

// Assume that the score audience percentage is available right away when the script is loaded
try {
  if (document.querySelector("[data-qa=audience-score]")) {
    /**
     * TV
     * 
     * The audience score is not in a shadow element
     */
    document.querySelector("[data-qa=audience-score]").innerText = IRRELEVANT;
  } else {
    /**
     * MOVIES
     * 
     * The audience score is in 2 layers of shadow elements
     */
    const scorePanel = document.querySelector('[data-qa=score-panel]');
    const scoreAudienceIcon = scorePanel.shadowRoot.querySelector('[data-qa=score-icon-audience]');
    const scoreAudience = scoreAudienceIcon.shadowRoot.querySelector('[data-qa=audience-score');
    scoreAudience.innerText = IRRELEVANT;
  }
} catch (e) {
  console.error(e);
}
