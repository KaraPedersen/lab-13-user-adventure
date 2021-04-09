function hasCompletedAllQuests(quests, user) {
    for (let i = 0; i < quests.length; i++) {
        const quest = quests[i];

        if (!user.completed[quest.id]) {
            return false;
        }
    }
    return true;
}
export default hasCompletedAllQuests;