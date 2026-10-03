/** Season 4 keeps the Gen 9 engine while using resolved Gen 4 move definitions. */
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	gen: 9,
	init() {
		const gen4Dex = this.mod('gen4');
		for (const id in this.data.Moves) {
			const historicalMove = gen4Dex.moves.get(id);
			if (!historicalMove.exists || historicalMove.gen > 4) continue;
			this.data.Moves[id] = this.deepClone(gen4Dex.data.Moves[id]);
		}
	},
};
