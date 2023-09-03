import { or } from "./utils"

export function isAdmin({ req: { user } }) {
    return ["Admin"].includes(user.role)
}

export function isModerator( { req: {user}}) {
    return ["Moderator", "Admin"].includes( user.role )
}

export function isUploader( { req: {user}}) {
    return ["Uploader", "Admin", "Moderator"].includes( user.role )
}

export function isOwner({req : {user}}) {
    return {
        createdBy : { equals : user.id }
    }
}
export function isItself({req : {user}}) {
    return {
        id : { equals : user.id } 
    }
}

export function publicVisible() {
    return true
}


export function defaultModeratorOrOwner() {
    return {
        create : isUploader,
        update : (args) => or(args,  [isModerator, isOwner]),
        delete : (args) => or(args,  [isModerator, isOwner]),
        read   : publicVisible
      }
}