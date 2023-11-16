import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, HeadersDefaults } from "axios";
import { RequstRefreshToken, ResponseRefreshToken } from "./types"
import { LocalStorage } from './local_storage'

interface CommonHeaderProperties extends HeadersDefaults {
	Authorization: string;
	'Content-Type': string;
	accept: string;
}

export abstract class HTTPBaseService extends LocalStorage {

    protected instance: AxiosInstance;
    protected access_token?: string = '';
    protected readonly baseURL: string;

    public constructor(baseURL: string, access_token?: string) {
        super();
        this.baseURL = baseURL;
        this.instance = axios.create({
            baseURL,
			timeout: 5000
        });
        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
		this.instance.defaults.headers = {
			Authorization: localStorage.getItem('access')
					? 'JWT ' + localStorage.getItem('access')
					: " ",
			'Content-Type': 'application/json',
			accept: 'application/json'
		} as CommonHeaderProperties;
    }

    private async setAccessAuth(){
        const access_token_body = {
            client_id: process.env.REACT_APP_CLIENT_ID as string,
            client_secret: process.env.REACT_APP_CLIENT_SECRET as string
        }
        await this.instance.post('/secure/auth/', access_token_body);
    }

    /** Mange localstorage */
    private initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(this.handleRequest);
    };

    private initializeResponseInterceptor = () => {

        this.instance.interceptors.response.use(response => {
            if(response.config.url === "/secure/auth/"){
                this.setAccessToken(response.data.access_token);
                this.setRefreshToken(response.data.refresh_token);
                this.access_token = response.data.access_token;
            }else if(response.config.url === "/secure/refreshtoken/"){
                this.setAccessToken(response.data.access_token);
                this.setRefreshToken(response.data.refresh_token);
                this.access_token = response.data.access_token;
            }
            return response;
        }, this.handleError);

    }

    private handleRequest = (config: AxiosRequestConfig) => {
        //let access_token = this.getAccessToken();
        //(config.headers ??= {}).Authorization = `Bearer ${access_token}`;
        //console.log(config);
        return config;
    };

    private async refreshToken(body: RequstRefreshToken): Promise<ResponseRefreshToken> {
        return this.instance.post(`${this.baseURL}secure/refreshtoken/`, body);
    }

    private handleError = async (error: AxiosError) => {

        const originalRequest = error.config;
        const requestURL = error.response?.config.url;
        const isGetRefreshTokenURL = requestURL?.includes("/secure/refreshtoken/");

        /**
         * If status is 403 and not refresh token.
         * If refresh token response is 403 means request access token is must.
         * Other error.
         */
        if (error.response?.status === 403 && !isGetRefreshTokenURL) {

            const refresh_token = this.getRefreshToken();
            if (refresh_token.length <= 0) {
                const access_token_body = {
                    client_id: process.env.REACT_APP_CLIENT_ID as string,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET as string
                }
                await this.instance.post('/secure/auth/', access_token_body); 
            }else {
                const refresh_token_body = {
                    refresh_token: refresh_token as string
                }
                await this.instance.post('/secure/refreshtoken/', refresh_token_body);
            }
            let access_token = this.getAccessToken();
            (error.response.config.headers ??= {}).Authorization = `Bearer ${access_token}`;
            return this.instance(originalRequest);
        }
        else if (error.response?.status === 403 && isGetRefreshTokenURL){
            const access_token_body = {
                client_id: process.env.REACT_APP_CLIENT_ID as string,
                client_secret: process.env.REACT_APP_CLIENT_SECRET as string
            }
            await this.instance.post('/secure/auth/', access_token_body); 
        }
        else if (error.response?.status === 500){
            console.log("Error is 500.");
        }
        else{
            console.log("Unknown error ....");
        }
        }
}

