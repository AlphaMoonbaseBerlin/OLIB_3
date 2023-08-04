import { FieldHookArgs } from "payload/dist/fields/config/types";
import { CollectionConfig, Field } from "payload/types";

type Slug = string;

export function manyToOne(source:Slug, target:CollectionConfig, prefix:string = "") : Field {
    const source_field:Field = {
        name : `${prefix}${target.slug}`,
        type : "relationship",
        relationTo : target.slug,
        hasMany : false,
    }
    const target_field:Field = {
        name : `${prefix}${source}s`,
        type : "relationship",
        relationTo : source,
        hasMany : true,
        admin: {
            readOnly:true
        },
        hooks : {
            afterRead : [
                (args) => findChildren(source, `${prefix}${target.slug}`, args)
            ]
        }
    }
    target.fields.push( target_field );
    return source_field
}
async function findChildren( target:Slug, targetFieldName:string, {originalDoc, req }:FieldHookArgs) {
    const {payload} = req;
    const query_config = {
      collection : target,
      depth : 0,
      where : { [targetFieldName] : { equals : originalDoc.id } } 
    }
    const children = await payload.find(query_config)
    return children.docs.map(item => item.id);
}
async function findOne( target:Slug, targetFieldName:string, {originalDoc, req }:FieldHookArgs) {
    const {payload} = req;
    const query_config = {
      collection : target,
      depth : 0,
      limit: 1,
      where : { [targetFieldName] : { equals : originalDoc.id } } 
    }
    const children = await payload.find(query_config)
    return children.pagingCounter ? children.docs.map(item => item.id)[0] : null;
}