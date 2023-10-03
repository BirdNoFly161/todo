class api {
  constructor() {
    this.uri = "http://localhost:3001";
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
        resolve(response);
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
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

const API = new api();
export default API;
