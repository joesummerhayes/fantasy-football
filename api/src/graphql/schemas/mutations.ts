export const mutations = `
  type RootMutation {
    createUser(userInput: UserInputData!): User!
    addPlayer(playerInput: PlayerInputData): Player!
    editPlayer(playerInput: EditPlayerInputData): Player!
    deletePlayer(id: String, teamId: String): String!
    createTeam(teamInput: TeamInputData!): Team!
    createLeague(leagueInput: LeagueInputData!): League!
    joinLeague(passcode: String!): Boolean
  }
`;

export default {};
