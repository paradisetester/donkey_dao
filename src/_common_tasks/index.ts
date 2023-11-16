export const parseJwt = (token: string) => {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}

export function getAuthDetail(access_token: string) {
  let auth_object = { user_id: null,  is_authenticated: false}
  if (access_token === checkAccessToken(access_token)) {
    let detail = parseJwt(access_token);
    auth_object.user_id = detail.user_id ? detail.user_id : null
    if(auth_object.user_id){
      auth_object.is_authenticated = true;
    }
  }
  return auth_object
}

function checkAccessToken(access_token: string) {
  if(typeof access_token != undefined && access_token){
    let base64Payload = access_token.split('.');
    return base64Payload.length > 1 ? access_token : '';
  }
  return '';
}