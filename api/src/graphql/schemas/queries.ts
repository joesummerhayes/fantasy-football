export const queries = `
  type RootQuery {
    login(email: String!, password: String!): AuthData!
    user: User!
    getPlayers(teamName: String!): [LeaguePlayer]
    getLeague: League!
    getCorePlayers(teamName: String!): [PlayerWithTeam]!
    getPremTeams: [PremTeam]!
}`;

export default {};
