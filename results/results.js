import loadProfile from '../common/load-profile.js';
import { getUser } from '../data/api.js';
import scoreHp from './score-gold.js';
import scoreGold from './score-gold.js';
import { hpMessages, aliveGoldMessages, deadGoldMessages } from './messages.js';

loadProfile();

const user = getUser();

const storyDisplay = document.getElementById('story-display');

const hpResult = scoreHp(user.hp);
const goldResult = scoreGold(user.gold);
const hpMessage = hpMessages(hpResult);

let goldMessages = null;
if (hpResult === 'dead') {
    goldMessages = deadGoldMessages;
}
else {
    goldMessages = aliveGoldMessages;
}

const goldMessage = goldMessages[goldResult];

let story = 'After your adventures, ';
story += user.name + ' the ' + user.race + ', ';
story += hpMessage + ' and ' + goldMessage + '.';

storyDisplay.textContent = story;