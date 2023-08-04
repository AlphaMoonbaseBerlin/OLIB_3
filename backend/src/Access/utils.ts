import { Access, AccessArgs,  } from "payload/config"

export function or(args: AccessArgs, rules:Array<Access>):any {
    const potential_queries = [];
    for (let entry of rules) {
        const result = entry(args);
        if (result === true) {
            return true
        }
        if (result instanceof Object) {
            potential_queries.push( result );
        }
    }
    if ( potential_queries.length) {
        return {
            "or" : potential_queries
        }
    }
    return false
}