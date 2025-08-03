// VeloniaEnemies.js

const createGoblin = (id = 0) => ({
  id: `goblin-${id}`,
  name: `Goblin ${id + 1}`,
  role: "Goblin",
  maxHP: 100,
  currentHP: 100,
  strength: 30,
  defense: 30,
  speed: 40,
  experienceYield: 5,
  // Optionally, you can omit `action` if your battle manager uses its own logic.

  action: {
    name: "Hit",
    type: "damage",
    power: 20, // Goblin's attack is just their strength
    target: "singleEnemy",
    damageType: "physical",
    perform: ({ attacker, targets }) => {
      const target = targets[Math.floor(Math.random() * targets.length)];
      const damage = Math.max(1, attacker.strength - target.defense);

      return {
        targetId: target.id,
        newHP: Math.max(0, target.currentHP - damage),
        actionLog: `${attacker.name} uses Hit on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const VeloniaEnemies = {
  goblins: (count = 3) => {
    return Array(count)
      .fill(null)
      .map((_, i) => createGoblin(i));
  },

  // Add other Velonia enemies here later
};

export default VeloniaEnemies;
