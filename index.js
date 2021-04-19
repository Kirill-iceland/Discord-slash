const Discord = require('discord.js')

const calback = res => res

class Command{
    constructor(name, description = "", options = []){
        this.name = name;
        this.description = description;

        if(options.length > 25){
            console.error('Command can only have 25 options!')
        }
        if(options.length > 1){
            this.options = options;
        }else{
            this.options = [options];
        }
    }
    
    setName(name){
        this.name = name
    }
    setDescription(description){
        this.description = description
    }

    
    setOptions(options){
        if(options.length > 25){
            console.error('Command can only have 25 options!')
        }
        this.options = options
    }
    addOptions(options){
        if(this.options.length + options.length > 25){
            console.error('Command can only have 25 options!')
        }
        this.options = this.options.concat(options)
    }
    addOption(option){
        if(this.options.length == 25){
            console.error('Command can only have 25 options!')
        }
        this.options.push(option)
    }
}
exports.BaceCommand

exports = {
    post: async (client, command, callback = calback) => {
        return callback(await client.api.applications(client.user.id).commands.post({data: command.toJSON()}))
    },
    edit: async (client, command, callback = calback) => {
        return callback(await client.api.applications(client.user.id).commands.patch({data: command.toJSON()}))
    },
    get: async (client, callback = calback) => {
        return callback(await client.api.applications(client.user.id).commands.get())
    },
    delete_: async (client, id, callback = calback) => {
        return callback(client.api.applications(client.user.id).commands(id).delete())
    },

    //Guild
    GuildPost: async (client, guild, command, callback = calback) => {
        return callback(await client.api.applications(client.user.id).guilds(guild.id).commands.post({data: command.toJSON()}))
    },
    GuildEdit: async (client, guild, command, callback = calback) => {
        return callback(await client.api.applications(client.user.id).guilds(guild.id).commands.patch({data: command.toJSON()}))
    },
    GuildGet: async (client, guild, callback = calback) => {
        return callback(await client.api.applications(client.user.id).guilds(guild.id).commands.get())
    },
    GuildDelete: async (client, guild, id, callback = calback) => {
        return callback(client.api.applications(client.user.id).guilds(guild.id).commands(id).delete())
    }
}