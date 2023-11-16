export interface Question {
  id: number;
  question: string;
  status: boolean;
  asset_name: string;
  asset_id: number;
  unit_name: string;
  total_supply: string;
  option_address_yes: string;
  option_address_no: string;
}
