/* eslint no-process-env: "off"*/
export const config = {
    backend: {
        url: process.env.REACT_APP_LE_BACKEND_URL || "http://192.168.1.4:9000"
    }
};