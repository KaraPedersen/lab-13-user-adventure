import { getUser } from '../data/api.js';
import quests from '../data/quest-data.js';
import loadProfile from '../common/load-profile.js';
import createQuestLink from './create-quest-link.js';
import createCompletedQuest from './create-quest-link.js';
import hasCompletedAllQuests from './has-completed-all-quests.js';
import isDead from '.../common/is-dead.js';

loadProfile();

const user = getUser();

if (isDead(user) || hasCompletedAllQuests(quests, user)) {
    window.location = '../results';
}

const nav = document.getElementById('quests');

for (let quest of quests) {
    let questDisplay = null;

    const theUserHasCompletedThisQuest = user.completed[quest.id];

    if (theUserHasCompletedThisQuest) {
        questDisplay = createCompletedQuest(quest);
    }
    else {
        questDisplay = createQuestLink(quest);
    }
    nav.appendChild(questDisplay);
}