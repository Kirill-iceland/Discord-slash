const Discord = require('discord.js')

const calback = res => res

class Command{
    constructor(name, description = "", options = []){
        this.name = name;
        this.description = description;

        if(options.length > 25){
            console.error('Command can only have 25 options!')
        }
        if(options.length == 1){
            this.options = [options];
        }else{
            this.options = options;
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

    toJSON(){
        let options = [];
        this.options.forEach(option => {
            options.push(option.toJSON())
        })
        return {name: this.name, description: this.description, options}
    }
}
exports.Command = Command

class CommandOption{
    constructor(name, description = ""){
        this.name = name;
        this.description = description;

    }
    
    setName(name){
        this.name = name;
    }
    setDescription(description){
        this.description = description;
    }
    setType(type){
        if(typeof type != 'number' || type > 8 || type < 1){
            console.error('Wrong type');
            return;
        }
        this.type = type
        switch(type){
            case 1:
                return new SubCommand(this.name, this.type, this.description);
            case 2:
                return new SubCommandGroup(this.name, this.type, this.description);
            default:
                return new CommandArguments(this.name, this.type, this.description);
        }
    }
}
exports.CommandOption = CommandOption

















class SubCommand extends CommandOption{
    constructor(name, description = "", options = []){
        this.name = name;
        this.description = description;
        this.type = 1;

        if(options.length > 25){
            console.error('Sub Command can only have 25 options!')
        }
        if(options.length == 1){
            this.options = [options];
        }else{
            this.options = options;
        }
    }

    setOptions(options){
        if(options.length > 25){
            console.error('Sub Command can only have 25 options!')
        }
        this.options = options;
    }
    addOptions(options){
        if(this.options.length + options.length > 25){
            console.error('Sub Command can only have 25 options!')
        }
        this.options = this.options.concat(options)
    }
    addOption(option){
        if(this.options.length == 25){
            console.error('Sub Command can only have 25 options!')
        }
        this.options.push(option);
    }

    toJSON(){
        let options = [];
        this.options.forEach(option => {
            options.push(option.toJSON());
        })
        return {name: this.name, type: this.type, description: this.description, options}
    }
}

//---------------------------------------------------------------------------------------------------------------
class SubCommandGroup extends CommandOption{
    constructor(name, description = "", options = []){
        this.name = name;
        this.description = description;
        this.type = 2;

        if(options.length > 25){
            console.error('Sub Command can only have 25 options!')
        }
        if(options.length == 1){
            this.options = [options];
        }else{
            this.options = options;
        }
    }

    setOptions(options){
        if(options.length > 25){
            console.error('Sub Command can only have 25 options!')
        }
        this.options = options;
    }
    addOptions(options){
        if(this.options.length + options.length > 25){
            console.error('Sub Command can only have 25 options!')
        }
        this.options = this.options.concat(options);
    }
    addOption(option){
        if(this.options.length == 25){
            console.error('Sub Command can only have 25 options!')
        }
        this.options.push(option);
    }

    toJSON(){
        let options = [];
        this.options.forEach(option => {
            options.push(option.toJSON())
        })
        return {name: this.name, type: this.type, description: this.description, options};
    }
}
exports.SubCommandGroup = SubCommandGroup;

//---------------------------------------------------------------------------------------------------------------
class CommandArgument extends CommandOption{
    constructor(name,  type, required, description = "", choices = []){
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;

        if(choices.length > 25){
            console.error('Sub Command can only have 25 choices!')
        }
        if(choices.length == 1){
            this.choices = [choices];
        }else{
            this.choices = choices;
        }
    }

    setType(type){
        if(typeof type != 'number' || type > 8 || type < 3){
            console.error('Wrong type');
            return;
        }
        this.type = type;
    }
    setRequired(required){
        if(typeof required != 'boolean'){
            console.error('Wrong type');
            return;
        }
        this.required = required;
    }
    setChoices(choices){
        if(choices.length > 25){
            console.error('Sub Command can only have 25 choices!')
        }
        this.choices = choices;
    }
    addChoices(choices){
        if(this.choices.length + choices.length > 25){
            console.error('Sub Command can only have 25 choices!')
        }
        this.choices = this.choices.concat(choices);
    }
    addChoices(choices){
        if(this.choices.length == 25){
            console.error('Sub Command can only have 25 choices!')
        }
        this.choices.push(choices);
    }

    toJSON(){
        let choices = [];
        this.choices.forEach(choice => {
            choices.push(choice);
        })
        return {name: this.name, type: this.type, required: this.required, description: this.description, choices};
    }
}
exports.CommandArgument = CommandArgument;

















exports.post = async (client, command, callback = calback) => {
    return callback(await client.api.applications(client.user.id).commands.post({data: command.toJSON()}))
}
exports.edit = async (client, command, callback = calback) => {
    return callback(await client.api.applications(client.user.id).commands.patch({data: command.toJSON()}))
}
exports.getById = async (client, command_id, callback = calback) => {
    return callback(await client.api.applications(client.user.id).commands(command_id).get())
}
exports.get = async (client, callback = calback) => {
    return callback(await client.api.applications(client.user.id).commands.get())
}
exports.delete_ = async (client, command_id, callback = calback) => {
    return callback(client.api.applications(client.user.id).commands(command_id).delete())
}

//Guild
exports.GuildPost = async (client, guild, command, callback = calback) => {
    return callback(await client.api.applications(client.user.id).guilds(guild.id).commands.post({data: command.toJSON()}))
}
exports.GuildEdit = async (client, guild, command, callback = calback) => {
    return callback(await client.api.applications(client.user.id).guilds(guild.id).commands.patch({data: command.toJSON()}))
}
exports.GuildGetById = async (client, guild, command_id, callback = calback) => {
    return callback(await client.api.applications(client.user.id).guilds(guild.id).commands(command_id).get())
}
exports.GuildGet = async (client, guild, callback = calback) => {
    return callback(await client.api.applications(client.user.id).guilds(guild.id).commands.get())
}
exports.GuildDelete =  async (client, guild, command_id, callback = calback) => {
    return callback(client.api.applications(client.user.id).guilds(guild.id).commands(command_id).delete())
}