export interface IDAOPageProps {
  step_id?: number;
}
export interface Asset {
  amount: number;
  'asset-id': number;
  receiver: string;

}
export interface VoteList {
  [x: string]: any;

  id: number;
  'asset-transfer-transaction': {
    amount: number;
    'asset-id': number;
    receiver: string;
    sender: string;

  };
}
export interface voteAddres {
  id: number;
  question_id: number;
  address: string;
  private_key: string;
  created: number;
}
