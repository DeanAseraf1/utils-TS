import React from "react";
// export const dbBuilder = {
//     response: (data:any, err:any, isMuiltiple = false, hasPagination = false, includeCount = false) => {
//         if(err) return {err, isSuccessful: false};
//         else if(data){
//             let result:any = {data: null, count:0, exclusiveStartKey: undefined, hasMoreData: undefined};
    
//             if(isMuiltiple && data?.Items){
//                 result.data = data?.Items || [];
//             }
//             else if(!isMuiltiple && (data?.Items?.length || 0) > 0){
//                 result.data = data?.Items || [];
//             }
//             else if(!includeCount){
//                 return {err: {msg: "No Items that match your'e request was found."}, isSuccessful: false}
//                 //err
//             }
    
//             if(hasPagination && data?.LastEvaluatedKey){
//                 result.exclusiveStartKey = data.LastEvaluatedKey;
//             }
//             else if(!hasPagination && data?.LastEvaluatedKey){
//                 result.hasMoreData = true;
//             }
    
//             if(includeCount && data?.Count){
//                 result.count = data.Count;
//             }
//             else if(includeCount && !data?.Count){
//                 return {err: {msg: "Count wasn't found in the response."}, isSuccessful: false}
//             }
    
//             return {...result, isSuccessful: true};
//         //     if(data?.Items?.length > 0)
//         //     return {data: isMuiltiple ? data.Items : data.Items[0], isSuccessful: true}
//         }
//         else{
//             return {err: {msg: "Data wasn't found in the response."}, isSuccessful: false}
//         }
//         // else if (data && data?.Items && data?.Items?.length > 0) 
//         // else if (data && data?.Items && isMuiltiple) return {data: data.Items, isSuccessful: true};
//     },

//     params: (tableName: string, projectionExpression: string = "id", options: {includePagination: boolean, onlyCount: boolean} = {includePagination: false, onlyCount: false}, ...params:any) => {
//         return {
//             TableName: tableName,
//             ProjectionExpression: !options?.onlyCount ? projectionExpression || undefined : undefined,
//             ExclusiveStartKey: (options?.includePagination && (params?.length || 0) > 0) ? (params?.exclusiveStartKey || undefined) : undefined,
//             Select: projectionExpression ? "SPECIFIC_ATTRIBUTES" : options?.onlyCount ? "COUNT" : undefined,
//             ...(params || {})
//         }
//     }
// }