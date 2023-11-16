export function get_nfts_count_in_account(existed_nfts_json_obj: any, found_nft_ids_array: any) {
    let counter: number = 0;
    for (var key in existed_nfts_json_obj) {
        if (existed_nfts_json_obj.hasOwnProperty(key)) {
            var val = existed_nfts_json_obj[key];
            for (var key in val) {
                if (val.hasOwnProperty(key) && key == "id") {
                    var id = val[key];
                    if (found_nft_ids_array.includes(String(id))) {
                        counter++
                    }
                }
            }
        }
    }
    return counter;
}


export function get_asset_ids_array(found_nft_ids_array: any) {
    let asset_ids = [];
    for (var key in found_nft_ids_array) {
        if (found_nft_ids_array.hasOwnProperty(key)) {
            var val = found_nft_ids_array[key];
            for (var key in val) {
                if (val.hasOwnProperty(key) && key == "asset-id") {
                    var asset_id = val[key];
                    asset_ids.push(asset_id);
                }
            }
        }
    }
    return asset_ids;
}