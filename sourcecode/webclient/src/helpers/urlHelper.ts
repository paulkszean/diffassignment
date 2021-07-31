const jsonHeader = { headers: { "Content-Type": "application/json" } };

const corsHeader = { "Access-Control-Allow-Origin": "*" };

const getServerUrl = `${process.env.REACT_APP_WEBSERVER_URL}:${process.env.REACT_APP_WEBSERVER_PORT}`;

const getApiV1Url = `${process.env.REACT_APP_WEBSERVER_URL}:${process.env.REACT_APP_WEBSERVER_PORT}/api/v1`;

export { corsHeader, getServerUrl, getApiV1Url, jsonHeader };
