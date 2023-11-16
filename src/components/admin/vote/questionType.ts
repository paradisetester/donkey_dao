

export interface EditVoteProps {
  props?: any;
}


export interface EditVoteProps {
    props?: any;
  }
  
export interface Question {
  id: number;
  question: string;
  status: number;
  asset_name: string;
  asset_id: number;
  unit_name: string;
  total_supply: string;
  option_address_yes: string;
  option_address_no: string;
  vote_end_date:number;
  
}


export interface VoteFormFields {
  question: string,
  status: number ,
  asset_name: string,
  asset_id: number,
  unit_name: string,
  total_supply: string,
  vote_end_date:Date,
  asset_txn?: string,
  vote_create_addres:string,
  // option_address_yes:string,
  // option_address_no: string,
}
export interface VoteFormProps {
  vote?: VoteFormFields;
  voteId?: string;
}
export interface Errors {
  title?: string;
  message?: string;
  status?: boolean;
}



export interface VoteList {
    id: number;
    question: string,
    status: boolean ,
    asset_name: string,
    asset_id: number,
    unit_name: string,
    total_supply: string,
  }
