import axios, { HeadersDefaults } from "axios";

const baseURL = process.env.REACT_APP_BASE_API_PATH + '/api/';

interface CommonHeaderProperties extends HeadersDefaults {
	Authorization: string;
	'Content-Type': string;
	accept: string;
}

export const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000
});

axiosInstance.defaults.headers = {
    Authorization: localStorage.getItem('access')
            ? 'JWT ' + localStorage.getItem('access')
            : " ",
    'Content-Type': 'application/json',
    accept: 'application/json'
} as CommonHeaderProperties;

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access', response.data.access);
							localStorage.setItem('refresh', response.data.refresh);

                            axiosInstance.defaults.headers = {
                                Authorization: response.data.access
                            } as CommonHeaderProperties;  

							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
