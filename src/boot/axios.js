import { boot } from "quasar/wrappers";
import axios from "axios";
import { useRouter } from "vue-router";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: "http://localhost:5238" });
//const api = axios.create({ baseURL: "http://localhost:5018" });
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const router = useRouter();

      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");

        router.push("/");
      }
      return Promise.reject(error);
    }
  );
});

export { api };
