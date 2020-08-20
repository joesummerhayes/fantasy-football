export const queries = `
  type RootQuery {
    login(email: String!, password: String!): AuthData!
    user: User!
    getPlayers(teamName: String!): [LeaguePlayer]
    getLeague: League!
}`;

export default {};
