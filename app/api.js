class api {
  constructor() {
    this.uri =
      "https://vercel.com/sharpoussama-gmailcom/todo-app-vsfq-backend/HZckKHK141yRc1v6zu4Xge9FnCov";
    this.options = {
      credentials: "include",
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
}

const API = new api();
export default API;
