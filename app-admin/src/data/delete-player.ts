import graphQL from './graph-ql';

interface DeletePlayersQlResult {
  deletePlayer: string;
}

const deletePlayer = async (variables: any): Promise<string> => {
  const response = await graphQL.query<DeletePlayersQlResult>(`
    mutation deletePlayer($id: String!, $teamId: String!) {
      deletePlayer(id: $id, teamId: $teamId)
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem deleting player');
  }
  return response.deletePlayer;
};

export default deletePlayer;
