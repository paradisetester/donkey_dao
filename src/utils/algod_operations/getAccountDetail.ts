import { algodClient } from "../connections/algosdk_algodv2";
var WAValidator = require("multicoin-address-validator");

export async function getAccountDetail(address: any): Promise<any> {
  try {
    var valid = WAValidator.validate(address, "algo");
    if (valid) {
      const account_detail = await algodClient.accountInformation(address).do();
      return account_detail;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

// USAGE: const arr = get_asset_ids_array(account_detail.account.assets);
export function get_asset_ids_array(found_nft_ids_array: any) {
  let asset_ids = [];
  for (var key in found_nft_ids_array) {
    if (found_nft_ids_array.hasOwnProperty(key)) {
      var val = found_nft_ids_array[key];
      for (key in val) {
        if (val.hasOwnProperty(key) && key === "asset-id") {
          var asset_id = val[key];
          var asset_amount = parseInt(val["amount"]);
          if(asset_amount > 0){
            asset_ids.push(asset_id);
          }
        }
      }
    }
  }
  return asset_ids;
}

// USAGE: const arr = get_asset_ids_array(account_detail.account["created-assets"]);
export function get_created_asset_ids_array(found_nft_ids_array: any) {
  let asset_ids = [];
  for (var key in found_nft_ids_array) {
    if (found_nft_ids_array.hasOwnProperty(key)) {
      var val = found_nft_ids_array[key];
      for (key in val) {
        if (val.hasOwnProperty(key) && key === "index") {
          var asset_id = val[key];
          asset_ids.push(asset_id);
        }
      }
    }
  }
  return asset_ids;
}

export default function getCommonNFTsCount(
  account_detail_user: any,
  account_detail_admin: any
): number {

  let assets_array_user: Array<number> = [];
  let assets_array_admin: Array<number> = [];
  let intersection: Array<number> = [];

  if (account_detail_user != null) {
    assets_array_user = get_asset_ids_array(account_detail_user.assets);
  }

  if (account_detail_admin != null) {
    assets_array_admin = get_created_asset_ids_array(
      account_detail_admin["created-assets"]
    );
  }

  if (account_detail_admin != null && account_detail_user != null) {
    intersection = assets_array_user.filter((x) =>
      assets_array_admin.includes(x)
    );
  }
  return intersection.length;
}
