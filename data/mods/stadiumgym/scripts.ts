/** Gym-only additive ability support. */
export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	pokemon: {
		_getStadiumExtraAbilities(this: any) {
			if (this.m.stadiumExtraAbilities) return this.m.stadiumExtraAbilities as string[];
			const sideAbilities = this.battle.stadiumExtraAbilities?.[this.side.id] || {};
			const slot = String(this.side.pokemon.indexOf(this) + 1);
			this.m.stadiumExtraAbilities = (sideAbilities[slot] || []).map((ability: string) => this.battle.toID(ability));
			return this.m.stadiumExtraAbilities as string[];
		},
		ignoringAbility(this: any) {
			let neutralizingGas = false;
			for (const pokemon of this.battle.getAllActive()) {
				const extras = pokemon.m.stadiumExtraAbilities || [];
				if (
					(pokemon.ability === ('neutralizinggas' as ID) || extras.includes('neutralizinggas')) &&
					!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending
				) {
					neutralizingGas = true;
					break;
				}
			}
			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] ||
					(neutralizingGas && (this.ability !== ('neutralizinggas' as ID) ||
						(this.m.stadiumExtraAbilities || []).includes('neutralizinggas')))) &&
					!this.getAbility().flags['cantsuppress'])
			);
		},
		hasAbility(this: any, ability: string | string[]) {
			if (this.ignoringAbility()) return false;
			const abilities = Array.isArray(ability) ? ability : [ability];
			const extraAbilities = this._getStadiumExtraAbilities();
			return abilities.some((candidate: string) => {
				const id = this.battle.toID(candidate);
				return this.ability === id || extraAbilities.includes(id) || !!this.volatiles['ability:' + id];
			});
		},
	} as any,
};
