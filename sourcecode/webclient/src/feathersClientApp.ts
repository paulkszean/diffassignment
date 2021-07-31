import feathers from "@feathersjs/client";
import { Application } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import hooks from "feathers-hooks";
import io from "socket.io-client";

const serverUrl = process.env.REACT_APP_WEBSERVER_URL;
const serverPort = process.env.REACT_APP_WEBSERVER_PORT;

const socket = io(`${serverUrl}:${serverPort}`);
const feathersClientApp: Application = feathers();

feathersClientApp.configure(hooks);
feathersClientApp.configure(socketio(socket));

export default feathersClientApp;
