import { FieldHookArgs } from 'payload/dist/fields/config/types';


// Field hook type is a generic that takes three arguments:
// 1: The document type
// 2: The value type
// 3: The sibling data type

export async function findChildren( source:string, target:string, targetFieldName:string, args:FieldHookArgs) {
    const {
        value, // Typed as `string` as shown above
        data, // Typed as a Partial of your ExampleDocumentType
        siblingData, // Typed as a Partial of SiblingDataType
        originalDoc, // Typed as ExampleDocumentType
        operation,
        req,
      } = args;
      const {payload} = req;
      const query_config = {
        collection : target,
        depth : 0,
        where : { [targetFieldName] : { equals : originalDoc.id } } 
      }
      const children = await payload.find(query_config)
      return children.docs.map(item => item.id);
}


