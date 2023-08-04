import { FieldHookArgs } from 'payload/dist/fields/config/types';
import { CollectionConfig, Field } from 'payload/types';
type Slug = string;

export function oneToMany(source:Slug, target:CollectionConfig, prefix:string = "") : Field {
    const source_field:Field = {
        name : `${prefix}${target.slug}`,
        type : "relationship",
        relationTo : target.slug,
        hasMany : true,
        hooks : {
            afterChange : [
                (args) => updateOneToMany(target.slug, `${prefix}${source}`, args)
            ]
        }
    }
    const target_field:Field = {
        name : `${prefix}${source}`,
        type : "relationship",
        relationTo : source,
        hasMany : false,
        hooks : {
            afterChange : [
                (args) => updateManyToOne(source, `${prefix}${target.slug}`, args)
            ]
        }
    }
    target.fields.push( target_field );
    return source_field
}

export function manyToOne(source:Slug, target:CollectionConfig, prefix:string = "") : Field {
    const source_field:Field = {
        name : `${prefix}${target.slug}`,
        type : "relationship",
        relationTo : target.slug,
        hasMany : false,
        hooks : {
            afterChange : [
                (args) => updateOneToMany(target.slug, `${prefix}${source}`, args)
            ]
        }
    }
    const target_field:Field = {
        name : `${prefix}${source}`,
        type : "relationship",
        relationTo : source,
        hasMany : true,
        hooks : {
            afterChange : [
                (args) => updateManyToOne(source, `${prefix}${target.slug}`, args)
            ]
        }
    }
    target.fields.push( target_field );
    return source_field
}

export function oneToOne(source:Slug, target:CollectionConfig, prefix:string = "") : Field {
    const source_field:Field = {
        name : `${prefix}${target.slug}`,
        type : "relationship",
        relationTo : target.slug,
        hasMany : false,
        hooks : {
            afterChange : [
                (args) => updateOneToOne(target.slug, `${prefix}${source}`, args)
            ]
        }
    }
    const target_field:Field = {
        name : `${prefix}${source}`,
        type : "relationship",
        relationTo : source,
        hasMany : false,
        hooks : {
            afterChange : [
                (args) => updateOneToOne(source, `${prefix}${target.slug}`, args)
            ]
        }
    }
    target.fields.push( target_field );
    return source_field
}
async function updateOneToOne( target:Slug, targetFieldName:string, args:FieldHookArgs) {
    const payload       = args.req.payload;
    const prev_target   = args.previousValue;
    const new_target    = args.value;

    //This is stupid.... 
    if ( typeof(args.context.updateDepth) === "number") {
        args.context.updateDepth += 1;
        if (args.context.updateDepth >= 3) {
            return
        }
    } else {
        args.context.updateDepth = 0;
    }
   
    if( prev_target ) {
        payload.update({
            collection  : target,
            id          : prev_target,
            data        : {
                [targetFieldName] : ""
            },
            context : {...args.context}
        })
    }

    if ( new_target ) {
        payload.update({
            collection  : target,
            id          : new_target,
            data        : {
                [targetFieldName] : args.originalDoc.id
            },
            context : {...args.context}
        })
    }
}
async function updateManyToOne( target:Slug, targetFieldName:string, args:FieldHookArgs) {
    const payload       = args.req.payload;
    const prev_target   = args.previousValue;
    const new_target    = args.value;

    //This is stupid.... 
    { if ( typeof(args.context.updateDepth) === "number") {
        args.context.updateDepth += 1;
        if (args.context.updateDepth >= 3) {
            return
        }
        } else {
        args.context.updateDepth = 0;
        }
    }
    if (prev_target === new_target){ return; }
    //Here we have to first query the value from the previous target.
    //Then, we need to remove the refference and update the entry.
    
    if( prev_target ) {
        //Lets find the one we were refferencing before.
        const prev_data = await payload.findByID({
            collection  : target,
            id          : prev_target,
            depth       : 0,
        });
        //prev_data now contains the ID of the different versions.
        //Now, let us remove the refference to this one 
        //FOr whatever reason, this is removing ALL of them. Hmmm.
        payload.update({
            collection  : target,
            id          : prev_target,
            data        : {
                [targetFieldName] : prev_data[targetFieldName].filter( value => value != args.originalDoc.id )
            },
            context : {...args.context}
        })
    }

    if( new_target ) {
        return
        //Lets find the one we were refferencing before.
        const prev_data = await payload.findByID({
            collection  : target,
            id          : new_target,
            depth       : 0,
        });
        //Now lets update the value 
        payload.update({
            collection  : target,
            id          : new_target,
            data        : {
                [targetFieldName] : [...prev_data[targetFieldName], args.originalDoc.id ]
            },
            context : {...args.context}
        })
    }
}
async function updateOneToMany( target:Slug, targetFieldName:string, args:FieldHookArgs) {
    const payload       = args.req.payload;
    const prev_target   = args.previousValue;
    const new_target    = args.value;

    //This is stupid.... 
    if ( typeof(args.context.updateDepth) === "number") {
        args.context.updateDepth += 1;
        if (args.context.updateDepth >= 3) {
            return
        }
    } else {
        args.context.updateDepth = 0;
    }
    if (prev_target === new_target){ return; }
    //This means, when we update our value, we need to first filter out the old ones and then add this one to our new one!
    //Easy.
    //Step 1. Filter out difference between old and new ones.
    let removed = []
    if (args.previousValue) {
        removed = args.previousValue.filter( value => !(value in args.value));
    } 
    

    //set all refferences to source to 0 if in removed.
    if( prev_target ) {
        payload.update({
            collection  : target,
            where : {
                id : { in : removed}
            },
            data        : {
                [targetFieldName] : ""
            },
            context : {...args.context}
        })
    }
    //Set all refferences to source to this doc !
    if ( new_target ) {
        payload.update({
            collection  : target,
            where : {
                id : { in : args.value}
            },
            data        : {
                [targetFieldName] : args.originalDoc.id
            },
            context : {...args.context}
        })
    }
}

export async function findChildren( target:Slug, targetFieldName:string, {originalDoc, req }:FieldHookArgs) {
      const {payload} = req;
      const query_config = {
        collection : target,
        depth : 0,
        where : { [targetFieldName] : { equals : originalDoc.id } } 
      }
      const children = await payload.find(query_config)
      return children.docs.map(item => item.id);
}


