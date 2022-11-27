module.exports = class Perm {
    constructor(client) {
        this.client = client
        this.db = client.db
    }

    static checkPerm(member, perm) {
        if (typeof(perm) !== "string") try { return perm(member) } catch { return false }
        else try { return member.permissions.has(perm) } catch { return false }
    }

    static testAllPerms(member) { 
        const allPerms = Object.getOwnPropertyNames(this).filter(p => !["length", "name", "prototype", "checkPerm", "testAllPerms"].includes(p))

        const passCheck = {}
        for (const perm of allPerms) passCheck[perm] = this.checkPerm(member, this[perm])

        return passCheck
    }

    static EVERYONE(member) { return true }
    static FRENCH(member) { try { return client.db.getData(`/users/${member.id}/lang`) === "fr" } catch { return false } }
    static DEV(member) { return member.id === "722823449470304288" }

    static get EVERYONE() { return "EVERYONE" }
    static get FRENCH() { return "FRENCH" }
    static get DEV() { return "DEV" }

    static get CREATE_INSTANT_INVITE() { return "CREATE_INSTANT_INVITE" }
    static get KICK_MEMBERS() { return "KICK_MEMBERS" }
    static get BAN_MEMBERS() { return "BAN_MEMBERS" }
    static get ADMINISTRATOR() { return "ADMINISTRATOR" }
    static get MANAGE_CHANNELS() { return "MANAGE_CHANNELS" }
    static get MANAGE_GUILD() { return "MANAGE_GUILD" }
    static get ADD_REACTIONS() { return "ADD_REACTIONS" }
    static get VIEW_AUDIT_LOG() { return "VIEW_AUDIT_LOG" }
    static get VIEW_CHANNEL() { return "VIEW_CHANNEL" }
    static get SEND_MESSAGES() { return "SEND_MESSAGES" }
    static get SEND_TTS_MESSAGES() { return "SEND_TTS_MESSAGES" }
    static get MANAGE_MESSAGES() { return "MANAGE_MESSAGES" }
    static get EMBED_LINKS() { return "EMBED_LINKS" }
    static get ATTACH_FILES() { return "ATTACH_FILES" }
    static get READ_MESSAGE_HISTORY() { return "READ_MESSAGE_HISTORY" }
    static get MENTION_EVERYONE() { return "MENTION_EVERYONE" }
    static get USE_EXTERNAL_EMOJIS() { return "USE_EXTERNAL_EMOJIS" }
    static get CONNECT() { return "CONNECT" }
    static get SPEAK() { return "SPEAK" }
    static get MUTE_MEMBERS() { return "MUTE_MEMBERS" }
    static get DEAFEN_MEMBERS() { return "DEAFEN_MEMBERS" }
    static get MOVE_MEMBERS() { return "MOVE_MEMBERS" }
    static get USE_VAD() { return "USE_VAD" }
    static get CHANGE_NICKNAME() { return "CHANGE_NICKNAME" }
    static get MANAGE_NICKNAMES() { return "MANAGE_NICKNAMES" }
    static get MANAGE_ROLES() { return "MANAGE_ROLES" }
    static get MANAGE_WEBHOOKS() { return "MANAGE_WEBHOOKS" }
    static get MANAGE_EMOJIS_AND_STICKERS() { return "MANAGE_EMOJIS" }
    static get USE_APPLICATION_COMMANDS() { return "USE_APPLICATION_COMMANDS" }
    static get REQUEST_TO_SPEAK() { return "REQUEST_TO_SPEAK" }
    static get MANAGE_EVENTS() { return "MANAGE_EVENTS" }
    static get MANAGE_THREADS() { return "MANAGE_THREADS" }
    static get CREATE_PUBLIC_THREADS() { return "CREATE_PUBLIC_THREADS" }
    static get CREATE_PRIVATE_THREADS() { return "CREATE_PRIVATE_THREADS" }
    static get USE_EXTERNAL_STICKERS() { return "USE_EXTERNAL_STICKERS" }
    static get SEND_MESSAGES_IN_THREADS() { return "SEND_MESSAGES_IN_THREADS" }
    static get USE_EMBEDDED_ACTIVITIES() { return "USE_EMBEDDED_ACTIVITIES" }
    static get MODERATE_MEMBERS() { return "MODERATE_MEMBERS" }

    static set CREATE_INSTANT_INVITE(value) { throw new Error("READ-ONLY property !") }
    static set KICK_MEMBERS(value) { throw new Error("READ-ONLY property !") }
    static set BAN_MEMBERS(value) { throw new Error("READ-ONLY property !") }
    static set ADMINISTRATOR(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_CHANNELS(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_GUILD(value) { throw new Error("READ-ONLY property !") }
    static set ADD_REACTIONS(value) { throw new Error("READ-ONLY property !") }
    static set VIEW_AUDIT_LOG(value) { throw new Error("READ-ONLY property !") }
    static set VIEW_CHANNEL(value) { throw new Error("READ-ONLY property !") }
    static set SEND_MESSAGES(value) { throw new Error("READ-ONLY property !") }
    static set SEND_TTS_MESSAGES(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_MESSAGES(value) { throw new Error("READ-ONLY property !") }
    static set EMBED_LINKS(value) { throw new Error("READ-ONLY property !") }
    static set ATTACH_FILES(value) { throw new Error("READ-ONLY property !") }
    static set READ_MESSAGE_HISTORY(value) { throw new Error("READ-ONLY property !") }
    static set MENTION_EVERYONE(value) { throw new Error("READ-ONLY property !") }
    static set USE_EXTERNAL_EMOJIS(value) { throw new Error("READ-ONLY property !") }
    static set CONNECT(value) { throw new Error("READ-ONLY property !") }
    static set SPEAK(value) { throw new Error("READ-ONLY property !") }
    static set MUTE_MEMBERS(value) { throw new Error("READ-ONLY property !") }
    static set DEAFEN_MEMBERS(value) { throw new Error("READ-ONLY property !") }
    static set MOVE_MEMBERS(value) { throw new Error("READ-ONLY property !") }
    static set USE_VAD(value) { throw new Error("READ-ONLY property !") }
    static set CHANGE_NICKNAME(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_NICKNAMES(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_ROLES(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_WEBHOOKS(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_EMOJIS_AND_STICKERS(value) { throw new Error("READ-ONLY property !") }
    static set USE_APPLICATION_COMMANDS(value) { throw new Error("READ-ONLY property !") }
    static set REQUEST_TO_SPEAK(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_EVENTS(value) { throw new Error("READ-ONLY property !") }
    static set MANAGE_THREADS(value) { throw new Error("READ-ONLY property !") }
    static set CREATE_PUBLIC_THREADS(value) { throw new Error("READ-ONLY property !") }
    static set CREATE_PRIVATE_THREADS(value) { throw new Error("READ-ONLY property !") }
    static set USE_EXTERNAL_STICKERS(value) { throw new Error("READ-ONLY property !") }
    static set SEND_MESSAGES_IN_THREADS(value) { throw new Error("READ-ONLY property !") }
    static set USE_EMBEDDED_ACTIVITIES(value) { throw new Error("READ-ONLY property !") }
    static set MODERATE_MEMBERS(value) { throw new Error("READ-ONLY property !") }
    
    static set EVERYONE(value) { throw new Error("READ-ONLY property !") }
    static set FRENCH(value) { throw new Error("READ-ONLY property !") }
    static set DEV(value) { throw new Error("READ-ONLY property !") }
}