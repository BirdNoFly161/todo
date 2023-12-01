import { apiURL } from "./configs/environement";

class api {
  constructor() {
    this.uri = apiURL;
    this.options = {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  setAuthToken(token) {
    this.token = token;
  }

  clearAuthToken() {
    this.token = null;
  }

  getURI() {
    return this.uri;
  }

  get(path) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let options = { ...this.options };
        options.method = "GET";
        if (this.token) {
          options.headers.Authorization = `Bearer ${this.token}`;
        }
        let response = await fetch(`${this.uri}${path}`, options);
        let responseJSON = null;

        //passport auto sends "Unauthorized" string so you cant .json() it like a standard response obj
        //either check if 401 and populate the res obj manually or change the passport on 401 behavior
        if (response.status === 401) {
          responseJSON = { message: "Unauthorized" };
        } else {
          responseJSON = response.json();
        }
        // populate the parsed response with everything you need from the response sent from backend
        responseJSON.status = response.status;
        resolve(responseJSON);
      } catch (error) {
        reject(error);
      }
    });
  }

  post(path, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let options = { ...this.options };
        options.method = "POST";
        if (body) {
          options.body = JSON.stringify(body);
        }
        if (this.token) {
          options.headers.Authorization = `Bearer ${this.token}`;
        }
        let response = await fetch(`${this.uri}${path}`, options);
        let responseJSON = await response.json();

        // populate the parsed response with everything you need from the response sent from backend
        responseJSON.status = response.status;
        resolve(responseJSON);
      } catch (error) {
        reject(error);
      }
    });
  }

  put(path, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let options = { ...this.options };
        options.method = "PUT";
        if (body) {
          options.body = JSON.stringify(body);
        }
        if (this.token) {
          options.headers.Authorization = `Bearer ${this.token}`;
        }
        let response = await fetch(`${this.uri}${path}`, options);
        let responseJSON = await response.json();

        // populate the parsed response with everything you need from the response sent from backend
        responseJSON.status = response.status;
        resolve(responseJSON);
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(path) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let options = { ...this.options };
        options.method = "DELETE";
        if (this.token) {
          options.headers.Authorization = `Bearer ${this.token}`;
        }
        let response = await fetch(`${this.uri}${path}`, options);
        let responseJSON = await response.json();

        // populate the parsed response with everything you need from the response sent from backend
        responseJSON.status = response.status;
        resolve(responseJSON);
      } catch (error) {
        reject(error);
      }
    });
  }

  post_multipart(path, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let options = { ...this.options };
        options.method = "POST";

        // for some reason when i set Content-Type to "multipart/form-data" it will cause boundary error on backend
        // SO suggests not setting content type and letting browser do it for u so it can auto set boundary
        delete options.headers["Content-Type"];

        if (body) {
          let data = new FormData();

          for (const property in body) {
            data.append(property, body[property]);
          }
          /*
          data.append("username", body.username);
          data.append("name",body.name);
          data.append("password", body.password);
          data.append("firstName",body.firstName);
          data.append("lastName",body.lastName);
          data.append("email", body.email);
          data.append("profile", body.profile);
          */
          options.body = data;
        }
        if (this.token) {
          options.headers.Authorization = `Bearer ${this.token}`;
        }
        let response = await fetch(`${this.uri}${path}`, options);
        let responseJSON = await response.json();

        // populate the parsed response with everything you need from the response sent from backend
        responseJSON.status = response.status;
        resolve(responseJSON);
      } catch (error) {
        reject(error);
      }
    });
  }
}

const API = new api();
export default API;
