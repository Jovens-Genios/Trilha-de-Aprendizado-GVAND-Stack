"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloServer = exports.FileUploadRequest = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_playground_html_1 = require("@apollographql/graphql-playground-html");
const lambdaApollo_1 = require("./lambdaApollo");
const apollo_server_env_1 = require("apollo-server-env");
const stream_1 = require("stream");
class FileUploadRequest extends stream_1.Readable {
}
exports.FileUploadRequest = FileUploadRequest;
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
    constructor(options) {
        if (process.env.ENGINE_API_KEY || options.engine) {
            options.engine = Object.assign({ sendReportsImmediately: true }, (typeof options.engine !== 'boolean' ? options.engine : {}));
        }
        super(options);
    }
    supportsUploads() {
        return true;
    }
    createGraphQLServerOptions(event, context) {
        return super.graphQLServerOptions({ event, context });
    }
    createHandler({ cors, onHealthCheck } = { cors: undefined, onHealthCheck: undefined }) {
        const promiseWillStart = this.willStart();
        const corsHeaders = new apollo_server_env_1.Headers();
        if (cors) {
            if (cors.methods) {
                if (typeof cors.methods === 'string') {
                    corsHeaders.set('access-control-allow-methods', cors.methods);
                }
                else if (Array.isArray(cors.methods)) {
                    corsHeaders.set('access-control-allow-methods', cors.methods.join(','));
                }
            }
            if (cors.allowedHeaders) {
                if (typeof cors.allowedHeaders === 'string') {
                    corsHeaders.set('access-control-allow-headers', cors.allowedHeaders);
                }
                else if (Array.isArray(cors.allowedHeaders)) {
                    corsHeaders.set('access-control-allow-headers', cors.allowedHeaders.join(','));
                }
            }
            if (cors.exposedHeaders) {
                if (typeof cors.exposedHeaders === 'string') {
                    corsHeaders.set('access-control-expose-headers', cors.exposedHeaders);
                }
                else if (Array.isArray(cors.exposedHeaders)) {
                    corsHeaders.set('access-control-expose-headers', cors.exposedHeaders.join(','));
                }
            }
            if (cors.credentials) {
                corsHeaders.set('access-control-allow-credentials', 'true');
            }
            if (typeof cors.maxAge === 'number') {
                corsHeaders.set('access-control-max-age', cors.maxAge.toString());
            }
        }
        return (event, context, callback) => {
            const eventHeaders = new apollo_server_env_1.Headers(event.headers);
            const requestCorsHeaders = new apollo_server_env_1.Headers(corsHeaders);
            if (cors && cors.origin) {
                const requestOrigin = eventHeaders.get('origin');
                if (typeof cors.origin === 'string') {
                    requestCorsHeaders.set('access-control-allow-origin', cors.origin);
                }
                else if (requestOrigin &&
                    (typeof cors.origin === 'boolean' ||
                        (Array.isArray(cors.origin) &&
                            requestOrigin &&
                            cors.origin.includes(requestOrigin)))) {
                    requestCorsHeaders.set('access-control-allow-origin', requestOrigin);
                }
                const requestAccessControlRequestHeaders = eventHeaders.get('access-control-request-headers');
                if (!cors.allowedHeaders && requestAccessControlRequestHeaders) {
                    requestCorsHeaders.set('access-control-allow-headers', requestAccessControlRequestHeaders);
                }
            }
            const requestCorsHeadersObject = Array.from(requestCorsHeaders).reduce((headersObject, [key, value]) => {
                headersObject[key] = value;
                return headersObject;
            }, {});
            if (event.httpMethod === 'OPTIONS') {
                context.callbackWaitsForEmptyEventLoop = false;
                return callback(null, {
                    body: '',
                    statusCode: 204,
                    headers: Object.assign({}, requestCorsHeadersObject),
                });
            }
            if (event.path === '/.well-known/apollo/server-health') {
                const successfulResponse = {
                    body: JSON.stringify({ status: 'pass' }),
                    statusCode: 200,
                    headers: Object.assign({ 'Content-Type': 'application/json' }, requestCorsHeadersObject),
                };
                if (onHealthCheck) {
                    onHealthCheck(event)
                        .then(() => {
                        return callback(null, successfulResponse);
                    })
                        .catch(() => {
                        return callback(null, {
                            body: JSON.stringify({ status: 'fail' }),
                            statusCode: 503,
                            headers: Object.assign({ 'Content-Type': 'application/json' }, requestCorsHeadersObject),
                        });
                    });
                }
                else {
                    return callback(null, successfulResponse);
                }
            }
            if (this.playgroundOptions && event.httpMethod === 'GET') {
                const acceptHeader = event.headers['Accept'] || event.headers['accept'];
                if (acceptHeader && acceptHeader.includes('text/html')) {
                    const path = event.path ||
                        (event.requestContext && event.requestContext.path) ||
                        '/';
                    const playgroundRenderPageOptions = Object.assign({ endpoint: path }, this.playgroundOptions);
                    return callback(null, {
                        body: graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions),
                        statusCode: 200,
                        headers: Object.assign({ 'Content-Type': 'text/html' }, requestCorsHeadersObject),
                    });
                }
            }
            const response = new stream_1.Writable();
            const callbackFilter = (error, result) => {
                response.end();
                callback(error, result && Object.assign(Object.assign({}, result), { headers: Object.assign(Object.assign({}, result.headers), requestCorsHeadersObject) }));
            };
            const fileUploadHandler = (next) => {
                const contentType = event.headers["content-type"] || event.headers["Content-Type"];
                if (contentType && contentType.startsWith("multipart/form-data")
                    && typeof apollo_server_core_1.processFileUploads === "function") {
                    const request = new FileUploadRequest();
                    request.push(Buffer.from(event.body, event.isBase64Encoded ? "base64" : "ascii"));
                    request.push(null);
                    request.headers = event.headers;
                    apollo_server_core_1.processFileUploads(request, response, this.uploadsConfig || {})
                        .then(body => {
                        event.body = body;
                        return next();
                    })
                        .catch(error => {
                        throw apollo_server_core_1.formatApolloErrors([error], {
                            formatter: this.requestOptions.formatError,
                            debug: this.requestOptions.debug,
                        });
                    });
                }
                else {
                    return next();
                }
            };
            fileUploadHandler(() => lambdaApollo_1.graphqlLambda(() => __awaiter(this, void 0, void 0, function* () {
                yield promiseWillStart;
                return this.createGraphQLServerOptions(event, context);
            }))(event, context, callbackFilter));
        };
    }
}
exports.ApolloServer = ApolloServer;
//# sourceMappingURL=ApolloServer.js.map