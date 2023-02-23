chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  });
});

const ROTTEN_TOMATOES_URL = 'https://www.rottentomatoes.com/';

function toggleAudienceScore (isEnabled) {
  const HIDDEN_AUDIENCE_SCORE_ID = 'joe-is-stinky-haha';
  try {
    // The audience score is located within 2 layers of shadow elements
    const scorePanel = document.querySelector('[data-qa=score-panel]');
    const scoreAudienceIcon = scorePanel.shadowRoot.querySelector('[data-qa=score-icon-audience]');
    const scoreAudience = scoreAudienceIcon.shadowRoot.querySelector('[data-qa=audience-score');

    if (isEnabled) {
      // Store the audience percentage in a hidden span. We can re-show this percentage if toggled off.
      const audiencePercentage = scoreAudience.innerText;
      scoreAudience.innerHTML = `Irrelevant<span id="${HIDDEN_AUDIENCE_SCORE_ID}" style="display: none;">${audiencePercentage}</span>`;
    } else {
      // Check if score has been hidden before. If it has, then revert the changes from above
      if (scoreAudience.innerHTML.includes(HIDDEN_AUDIENCE_SCORE_ID)) {
        const hiddenScore = scoreAudience.querySelector(`#${HIDDEN_AUDIENCE_SCORE_ID}`).innerText;
        scoreAudience.innerHTML = hiddenScore;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

async function getCurrentState () {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  return (await chrome.action.getBadgeText({ tabId: tab.id })) === 'ON';
}

async function handleAudienceToggle (isEnabled) {
  if (tab.url.startsWith(ROTTEN_TOMATOES_URL)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleAudienceScore,
      args: [nextState === 'ON']
    });
  }
};

async function updateToggleState (isEnabled) {
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
}

chrome.tabs.onUpdated.addListener(async (tab, changeInfo) => {
  const isEnabled = await getCurrentState();
  await handleAudienceToggle(isEnabled);
});

chrome.action.onClicked.addListener(async (tab) => {


});
