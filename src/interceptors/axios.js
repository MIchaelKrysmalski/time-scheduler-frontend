import Axios from "axios";
import store from '../store/index.js'
const axiosInstance = Axios.create();

  
  axiosInstance.interceptors.response.use(
    async function(response) {
        return response;
    },
    async function(error) {
        if (error.response.status === 401) {
            const tokens = store.getters.getTokens;
            const response= await Axios.get('http://localhost:3000/auth/refresh',{             
                headers: {
                    'Authorization': 'Bearer ' + tokens.refreshToken
                  }
            })
    
            if (response.status === 200) {
                Axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
                store.commit('refresh',response.data)
                return Axios(error.config);
            }
        }
      return Promise.reject(error);
    }
  )

export default axiosInstance;