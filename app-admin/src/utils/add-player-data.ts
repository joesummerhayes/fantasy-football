export const positions = [
  'Keeper',
  'Defender',
  'Midfielder',
  'Forward',
];

export const premTeams = [
  'Arsenal',
  'Aston Villa',
  'AFC Bournmouth',
  'Brighton',
  'Burnley',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Leicester City',
  'Liverpool',
  'Manchester City',
  'Manchester United',
  'Newcastle United',
  'Norwich City',
  'Sheffield United',
  'Southampton',
  'Tottenham Hotspur',
  'Watford',
  'West Ham United',
  'Wolverhampton Wanderers',
];

export const findSpecPositions = (position: string): string[] | undefined => {
  if (position.toLocaleLowerCase() === 'defender') {
    return ['LB', 'RB', 'CB'];
  }
  if (position.toLocaleLowerCase() === 'midfielder') {
    return ['LM', 'RM', 'CM', 'CDM', 'CAM'];
  }

  if (position.toLocaleLowerCase() === 'forward') {
    return ['LW', 'RW', 'CF', 'SS'];
  }
};
