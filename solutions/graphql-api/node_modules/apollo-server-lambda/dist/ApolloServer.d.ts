/// <reference types="node" />
import { APIGatewayProxyCallback, APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import { FileUploadOptions, ApolloServerBase, GraphQLOptions, Config } from 'apollo-server-core';
import { IncomingHttpHeaders } from 'http';
import { Readable } from 'stream';
export interface CreateHandlerOptions {
    cors?: {
        origin?: boolean | string | string[];
        methods?: string | string[];
        allowedHeaders?: string | string[];
        exposedHeaders?: string | string[];
        credentials?: boolean;
        maxAge?: number;
    };
    uploadsConfig?: FileUploadOptions;
    onHealthCheck?: (req: APIGatewayProxyEvent) => Promise<any>;
}
export declare class FileUploadRequest extends Readable {
    headers: IncomingHttpHeaders;
}
export declare class ApolloServer extends ApolloServerBase {
    constructor(options: Config);
    protected supportsUploads(): boolean;
    createGraphQLServerOptions(event: APIGatewayProxyEvent, context: LambdaContext): Promise<GraphQLOptions>;
    createHandler({ cors, onHealthCheck }?: CreateHandlerOptions): (event: APIGatewayProxyEvent, context: LambdaContext, callback: APIGatewayProxyCallback) => void;
}
//# sourceMappingURL=ApolloServer.d.ts.map