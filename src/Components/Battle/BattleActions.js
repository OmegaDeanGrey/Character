// FIGHTER ACTION
export function fighterSlashAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Separate front and back row enemies
  const frontRowEnemies = enemies.filter(
    (enemy, index) => index < 3 && enemy.currentHP > 0
  );
  const backRowEnemies = enemies.filter(
    (enemy, index) => index >= 3 && enemy.currentHP > 0
  );

  let target = null;

  if (frontRowEnemies.length > 0) {
    target =
      frontRowEnemies[Math.floor(Math.random() * frontRowEnemies.length)];
  } else if (backRowEnemies.length > 0) {
    target = backRowEnemies[Math.floor(Math.random() * backRowEnemies.length)];
  }

  if (target) {
    // Physical damage: user.strength - target.defense
    const rawDamage = user.strength - target.defense;
    const damage = Math.max(1, rawDamage); // At least 1 damage

    logs.push(
      `${user.name} uses Slash on ${target.name} for ${damage} damage!`
    );

    effects.push({
      type: "damage",
      targetId: target.id,
      value: damage,
    });
  } else {
    logs.push(`${user.name} tried to Slash, but there were no valid targets!`);
  }

  return { logs, effects };
}

// CLERIC ACTION
export function clericHealingHandsAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Filter wounded allies
  const woundedAllies = allies.filter(
    (ally) => ally.currentHP < (ally.maxHP ?? ally.HP)
  );

  if (woundedAllies.length === 0) {
    // No healing needed — attack like a Fighter
    const frontRowEnemies = enemies.filter(
      (enemy, index) => index < 3 && enemy.currentHP > 0
    );
    const backRowEnemies = enemies.filter(
      (enemy, index) => index >= 3 && enemy.currentHP > 0
    );

    let target = frontRowEnemies.length
      ? frontRowEnemies[Math.floor(Math.random() * frontRowEnemies.length)]
      : backRowEnemies[Math.floor(Math.random() * backRowEnemies.length)];

    if (target) {
      const damage = Math.max(1, user.strength - target.defense);
      logs.push(
        `${user.name} swings their mace at ${target.name} for ${damage} damage!`
      );
      effects.push({
        type: "damage",
        targetId: target.id,
        value: damage,
        damageType: "physical",
      });
    } else {
      logs.push(`${user.name} wanted to attack, but there are no targets!`);
    }

    return { logs, effects };
  }

  // Heal the ally with the lowest HP (absolute value)
  const target = woundedAllies.reduce((lowest, ally) => {
    const allyCurrent = ally.currentHP ?? 0;
    return (lowest.currentHP ?? 0) > allyCurrent ? ally : lowest;
  });

  const maxHP = target.maxHP ?? target.HP ?? 1;
  const currentHP = target.currentHP ?? 0;
  const healAmount = Math.min(user.intelligence * 2, maxHP - currentHP);

  logs.push(
    `${user.name} uses Healing Hands on ${target.name}, restoring ${healAmount} HP!`
  );

  effects.push({
    type: "heal",
    targetId: target.id,
    value: healAmount,
  });

  return { logs, effects };
}

// ARCHER ACTION (prioritize back row enemies)
export function archerVolleyAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Filter back row enemies first (index 3 and up)
  const backRowEnemies = enemies.filter(
    (enemy, index) => index >= 3 && enemy.currentHP > 0
  );
  // Filter front row enemies if back row is empty
  const frontRowEnemies = enemies.filter(
    (enemy, index) => index < 3 && enemy.currentHP > 0
  );

  let validTargets =
    backRowEnemies.length > 0 ? backRowEnemies : frontRowEnemies;

  if (validTargets.length === 0) {
    logs.push(`${user.name} fires a Volley, but there are no enemies left!`);
    return { logs, effects };
  }

  const target = validTargets[Math.floor(Math.random() * validTargets.length)];
  const baseDamage = Math.floor(user.strength * 0.8) - target.defense;
  const damage = Math.max(1, baseDamage);

  logs.push(
    `${user.name} fires a Volley at ${target.name} for ${damage} damage!`
  );
  effects.push({ type: "damage", targetId: target.id, value: damage });

  return { logs, effects };
}

// SUMMONER ACTION
export function summonerFamiliarAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  const validTargets = enemies.filter((e) => e.currentHP > 0);
  if (validTargets.length === 0) {
    logs.push(`${user.name} summons Familiar, but there are no enemies left!`);
    return { logs, effects };
  }

  // Summoner attacks multiple random enemies (e.g., 1 to 3 random enemies)
  const numTargets = Math.min(
    Math.floor(Math.random() * 3) + 1,
    validTargets.length
  );

  const targets = [];
  const chosenIndices = new Set();

  while (targets.length < numTargets) {
    const idx = Math.floor(Math.random() * validTargets.length);
    if (!chosenIndices.has(idx)) {
      chosenIndices.add(idx);
      targets.push(validTargets[idx]);
    }
  }

  const damagePerTarget = Math.max(1, Math.floor(user.intelligence * 1.2));

  logs.push(`${user.name} summons a Familiar to attack ${numTargets} enemies!`);

  targets.forEach((target) => {
    logs.push(`${target.name} takes ${damagePerTarget} damage!`);
    effects.push({
      type: "damage",
      targetId: target.id,
      value: damagePerTarget,
      damageType: "magic",
    });
  });

  return { logs, effects };
}

// MAGE ACTION
export function mageSpellcastAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // All alive enemies (any row)
  const validTargets = enemies.filter((enemy) => enemy.currentHP > 0);

  if (validTargets.length === 0) {
    logs.push(
      `${user.name} tried to cast a spell, but there are no enemies left!`
    );
    return { logs, effects };
  }

  // Pick a random enemy target from any row
  const target = validTargets[Math.floor(Math.random() * validTargets.length)];

  // Calculate magic damage: based on user's intelligence minus target's defense
  const rawDamage = user.intelligence * 1.5 - target.defense;
  const damage = Math.max(1, Math.floor(rawDamage)); // At least 1 damage

  logs.push(
    `${user.name} casts Spellcast on ${target.name}, dealing ${damage} magic damage!`
  );

  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
    damageType: "magic",
  });

  return { logs, effects };
}

// ROGUE ACTION
export function rogueBackstabAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  const validTargets = enemies.filter((enemy) => enemy.currentHP > 0);

  if (validTargets.length === 0) {
    logs.push(`${user.name} attempts a BackStab, but there are no enemies!`);
    return { logs, effects };
  }

  const target = validTargets[Math.floor(Math.random() * validTargets.length)];

  // Critical chance (e.g., 30%)
  const critChance = 0.3;
  const isCrit = Math.random() < critChance;

  // Damage calculation
  const baseDamage = user.strength - target.defense;
  const rawDamage = isCrit ? baseDamage * 2 : baseDamage;
  const damage = Math.max(1, Math.floor(rawDamage)); // Always at least 1

  if (isCrit) {
    logs.push(
      `${user.name} performs a CRITICAL BackStab on ${target.name} for ${damage} damage!`
    );
  } else {
    logs.push(
      `${user.name} uses BackStab on ${target.name} for ${damage} damage.`
    );
  }

  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
    damageType: "physical",
  });

  return { logs, effects };
}

//FAIRY ACTION

export function fairyPolarityAction(actor, players, enemies) {
  const logs = [];
  const effects = [];

  const healingAmount =
    Math.floor(actor.intelligence * 0.6) + Math.floor(Math.random() * 5);
  const damageAmount =
    Math.floor(actor.intelligence * 0.5) + Math.floor(Math.random() * 5);

  // Heal one random living ally
  const livingAllies = players.filter((p) => p.currentHP > 0);
  if (livingAllies.length > 0) {
    const targetAlly =
      livingAllies[Math.floor(Math.random() * livingAllies.length)];
    effects.push({
      type: "heal",
      targetId: targetAlly.id,
      value: healingAmount,
    });
    logs.push(
      `${actor.name} heals ${targetAlly.name} for ${healingAmount} HP!`
    );
  }

  // Damage one random living enemy
  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length > 0) {
    const targetEnemy =
      livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
    effects.push({
      type: "damage",
      targetId: targetEnemy.id,
      value: damageAmount,
    });
    logs.push(
      `${actor.name} zaps ${targetEnemy.name} for ${damageAmount} damage!`
    );
  }

  return { logs, effects };
}

// VAMP ACTION

export function vampireDrainAction(actor, players, enemies) {
  const logs = [];
  const effects = [];

  // Target a random alive enemy
  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length === 0) return { logs, effects };

  const target =
    livingEnemies[Math.floor(Math.random() * livingEnemies.length)];

  // Damage calculation
  const damage =
    Math.floor(actor.strength * 0.9) + Math.floor(Math.random() * 6); // Slight randomness
  const healing = Math.floor(damage / 2);

  // Apply damage to enemy
  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
  });
  logs.push(`${actor.name} drains ${damage} HP from ${target.name}!`);

  // Heal self
  effects.push({
    type: "heal",
    targetId: actor.id,
    value: healing,
  });
  logs.push(`${actor.name} restores ${healing} HP!`);

  return { logs, effects };
}
