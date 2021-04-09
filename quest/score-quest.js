function scoreQuest(choice, questId, user) {
    user.hp += choice.hp;

    user.gold += choice.gold;

    user.completed[questId] = true;
}

export default scoreQuest;