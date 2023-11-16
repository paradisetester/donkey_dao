export abstract class LocalStorage {

  public setAccessToken(access_token: string): void {
    localStorage.setItem('access_token', access_token);
  }

  public setRefreshToken(refresh_token: string): void {
    localStorage.setItem('refresh_token', refresh_token);
  }

  /**
   * Added a dummy access token so that something should be in bearer token.
   */
  public getAccessToken(): string {
    let ls_access_token =  localStorage.getItem('access_token');
    if(ls_access_token === null || ls_access_token.length <= 0){
      ls_access_token = "foRLwPcMhhTeZqLKfS057zzH2FK44ER5B5a45574";
    }
    return ls_access_token;
  }

  public getRefreshToken(): string {
    let ls_refresh_token =  localStorage.getItem('refresh_token');
    if(ls_refresh_token === null || ls_refresh_token.length <= 0){
      ls_refresh_token = ""
    }
    return ls_refresh_token;
  }

}