import lambda from 'aws-lambda';
import { GraphQLOptions } from 'apollo-server-core';
import { ValueOrPromise } from 'apollo-server-types';
export interface LambdaGraphQLOptionsFunction {
    (event: lambda.APIGatewayProxyEvent, context: lambda.Context): ValueOrPromise<GraphQLOptions>;
}
export declare function graphqlLambda(options: GraphQLOptions | LambdaGraphQLOptionsFunction): lambda.APIGatewayProxyHandler;
//# sourceMappingURL=lambdaApollo.d.ts.map