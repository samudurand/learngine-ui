/* eslint no-process-env: "off"*/
export const config = {
    backend: {
        url: process.env.LE_BACKEND_URL || "http://localhost:9000"
    }
};