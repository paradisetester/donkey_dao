import { type } from "os";

export type RequstAccessToken = {
  client_id: string;
  client_secret: string;
};

export type RequstRefreshToken = {
  refresh_token: string;
};

export type CreateVote = {
  question: string;
  status: string;
  asset_name: string;
  asset_id: number;
  unit_name: string;
  total_supply: number;
  option_address_yes: string;
  option_address_no: string;
};
export type CreateWhitepaper={

  id:number,
  label:string,
  descr:string,
  files: string,
  status: number,
}

export type UpdateWhitepaper={

  label:string,
  descr:string,
  files: string,
  status: number,
}
export type UpdateVote = {
  id:number,
  question?: string,
  status: number,
  asset_name?: string,
  asset_id?: number,
  unit_name?: string,
  total_supply?: number,
  option_address_yes?: string,
  option_address_no?: string,
};

export type ResponseRefreshToken = {
  status: string;
  access_token: string;
  refresh_token: string;
  expiry_date: string;
  refresh_token_expiry: string;
  expired: boolean;
  created_on: string;
  application_id: number;
};

export type AuthDetail = {
  access_token: string;
  refresh_token: string;
};

export type UpdateVoteAddress = {
  amount: number,
  is_activate?: number,
  question: number
};


export type CreateProposal = {
  label:string,
  descr:string,
  files:string,
  status:number,
};

export type UpdateProposal = {
 
  status?: number,
  id: number
};


export type vote_addr= {
  question: number;
  totoal_weight?:number;
  total_percent?:number;
}


export type QuestsionResultUpdate = {
  id:number,
  question?: string,
  status?: number,
  asset_name?: string,
  asset_id?: number,
  unit_name?: string,
  total_supply?: number,
  option_address_yes: vote_addr[],
  option_address_no: vote_addr[],
};


export type GeneralSetting = {
  id:number,
  user:number,
  mnemonic:string,
  testapi:string,
  mainapi: string,
  beatapi: string,
  addre:string,
  privatekey:string,
};
