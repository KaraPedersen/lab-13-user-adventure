import loadProfile from '../common/load-profile.js';
import { getUser, saveUser } from '../data/api.js';
import quests from '../data/quest-data.js';
import createChoice from './create-choice.js';
import findById from '../common/find-by-id.js';
import scoreQuest from './score-quest.js';

loadProfile();

const searchParams = new URLSearchParams(window.location.search);

const questId = searchParams.get('id');

const quest = findById(quests, questId);

if (!quest) {
    window.location = '../map';
}

const title = document.getElementById('title');
const image = document.getElementById('image');
const audio = document.getElementById('audio');
const description = document.getElementById('description');
const choiceForm = document.getElementById('choice-form');
const choices = document.getElementById('choices');
const result = document.getElementById('result');
const resultDescription = document.getElementById('result-description');

title.textContent = quest.title;
image.src = '../assets/quests/' + quest.image;
audio.src = '../assets/quests/' + quest.audio;
description.textContent = quest.description;

for (let index = 0; index < quest.choice.length; index++) {
    const choice = quest.choices[index];

    const choiceDom = createChoice(choice);

    choices.appendChild(choiceDom);
}

choiceForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(choiceForm);

    const choiceId = formData.get('choice');

    const choice = findById(quest.choices, choiceId);

    const user = getUser();

    scoreQuest(choice, quest.id, user);

    saveUser(user);

    audio.src = '../assets/quests/' + quest.action;
    choiceForm.classList.add('hidden');
    resultDescription.classList.remove('hidden');
    resultDescription.textContent = choice.result;

    loadProfile();
});
