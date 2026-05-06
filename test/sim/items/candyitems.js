'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Candy Items', () => {
	afterEach(() => {
		battle.destroy();
	});

	it('Tasty Candy should heal 25% hp when consumed at 75% hp or less', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'Aggron', ability: 'sturdy', item: 'tastycandy', moves: ['sleeptalk']}]});
		battle.setPlayer('p2', {team: [{species: 'Magikarp', ability: 'swiftswim', moves: ['splash']}]});
		const holder = battle.p1.active[0];
		const startingHp = Math.floor(holder.maxhp * 3 / 4);
		const expectedHp = Math.min(holder.maxhp, startingHp + Math.floor(holder.baseMaxhp / 4));
		holder.hp = startingHp;
		battle.makeChoices('move sleeptalk', 'move splash');
		assert.false.holdsItem(holder);
		assert.equal(holder.hp, expectedHp);
	});

	it('Spicy Candy should burn the holder when consumed at 75% hp or less', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'Snorlax', item: 'spicycandy', moves: ['sleeptalk']}]});
		battle.setPlayer('p2', {team: [{species: 'Magikarp', ability: 'swiftswim', moves: ['splash']}]});
		const holder = battle.p1.active[0];
		holder.hp = Math.floor(holder.maxhp * 3 / 4);
		battle.makeChoices('move sleeptalk', 'move splash');
		assert.false.holdsItem(holder);
		assert.equal(holder.status, 'brn');
	});

	it('Exploding Candy should damage the holder by 50% of max hp when consumed at 75% hp or less', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'Snorlax', item: 'explodingcandy', moves: ['sleeptalk']}]});
		battle.setPlayer('p2', {team: [{species: 'Magikarp', ability: 'swiftswim', moves: ['splash']}]});
		const holder = battle.p1.active[0];
		const startingHp = Math.floor(holder.maxhp * 3 / 4);
		const expectedHp = startingHp - Math.floor(holder.baseMaxhp / 2);
		holder.hp = startingHp;
		battle.makeChoices('move sleeptalk', 'move splash');
		assert.false.holdsItem(holder);
		assert.equal(holder.hp, expectedHp);
	});

	it('Whoppers the Original Malted Milk Balls should damage the holder by 5% of max hp when consumed', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'Snorlax', item: 'whopperstheoriginalmaltedmilkballs', moves: ['sleeptalk']}]});
		battle.setPlayer('p2', {team: [{species: 'Magikarp', ability: 'swiftswim', moves: ['splash']}]});
		const holder = battle.p1.active[0];
		const startingHp = Math.floor(holder.maxhp * 3 / 4);
		const expectedHp = startingHp - Math.floor(holder.baseMaxhp / 20);
		holder.hp = startingHp;
		battle.makeChoices('move sleeptalk', 'move splash');
		assert.false.holdsItem(holder);
		assert.equal(holder.hp, expectedHp);
	});
});
