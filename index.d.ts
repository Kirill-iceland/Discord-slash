type callback = (res: any) => any


declare enum CommandOptionTypes {
    SUB_COMMAND,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE
}

declare module '@the_zolotuskiy/discord-slash' {
    import Discord from 'discord.js'

    type CommandOptions = SubCommand | SubCommandGroup | CommandArgument
    type CommandOptionsJSON = SubCommandJSON | SubCommandGroupJSON | CommandArgumentJSON

    type CommandJSON = {name: string, description?: string, options: CommandOptionsJSON[]}
    type SubCommandGroupJSON = {name: string, type: 2, description?: string, options?: (CommandArgument | SubCommand)[]}
    type SubCommandJSON = {name: string, type: 1, description?: string, options?: CommandArgument[]}
    type CommandArgumentJSON = {name: string, type: 3 | 4 | 5 | 6 | 7 | 8, required: boolean, description?: string, choices?: {name: string, value: string}[]}

    export class Command{
        constructor(name: string, description?: string, options?: CommandOptions[])
        public name: string
        public description: string
        public options: CommandOptions[]
        
        
        public setName(name: string): this
        public setDescription(description: string): this
        
        public setOptions(options: CommandArgument[]): this 
        public addOptions(options: CommandArgument[]): this 
        public addOption(option: CommandArgument): this 

        public toJSON(): CommandJSON
        public static parse(json: CommandJSON): Command
    }



    export class CommandOption{
        constructor(name: string, description?: string)
        public name: string
        public description: string
        public type: number

        public setName(name: string): this
        public setDescription(description: string): this
        public setType(type: number): CommandOptions

        public static parse(json: SubCommandJSON): SubCommand 
        public static parse(json: SubCommandGroupJSON): SubCommandGroup
        public static parse(json: CommandArgumentJSON): CommandArgument
    }

    export class SubCommand extends CommandOption{
        constructor(name: string, description?: string, options?: CommandArgument[])
        public type: 1
        public options: CommandArgument[]

        public setOptions(options: CommandArgument[]): this 
        public addOptions(options: CommandArgument[]): this 
        public addOption(option: CommandArgument): this 

        public toJSON(): SubCommandJSON
        public static parse(json: SubCommandJSON): SubCommand 
    }
    export class SubCommandGroup extends CommandOption{
        constructor(name: string, description?: string, options?: (CommandArgument | SubCommand)[])
        public type: 2
        public options: (CommandArgument | SubCommand)[]

        public setOptions(options: (CommandArgument | SubCommand)[]): this 
        public addOptions(options: (CommandArgument | SubCommand)[]): this 
        public addOption(option: CommandArgument | SubCommand): this 
        
        public toJSON(): SubCommandGroupJSON
        public static parse(json: SubCommandGroupJSON): SubCommandGroup
    }
    export class CommandArgument extends CommandOption{
        constructor(name: string, description?: string, options?: CommandArgument[])
        public type: 3 | 4 | 5 | 6 | 7 | 8
        public required: boolean
        public choices: {name: string, value: string}[]

        public setType(type: number): this
        public setRequired(type: boolean): this 
        public setChoices(choices: {name: string, value: string}[]): this 
        public addChoices(choices: {name: string, value: string}[]): this 
        public addChoice(name: string, value: string): this 
        
        public toJSON(): CommandArgumentJSON
        public static parse(json: CommandArgumentJSON): CommandArgument
    }




    export function post    (client: Discord.Client, command: Command, callback?: callback): any
    export function edit    (client: Discord.Client, command: Command, callback?: callback): any
    export function getById (client: Discord.Client, command_id: string, callback?: callback): any
    export function get     (client: Discord.Client, callback?: callback): any
    export function delete_ (client: Discord.Client, command_id: string, callback?: callback): any
    
    export function GuildPost   (client: Discord.Client, Guild: Discord.Guild, command: Command, callback?: callback): any
    export function GuildEdit   (client: Discord.Client, Guild: Discord.Guild, command: Command, callback?: callback): any
    export function GuildGetById(client: Discord.Client, Guild: Discord.Guild, command_id: string, callback?: callback): any
    export function GuildGet    (client: Discord.Client, Guild: Discord.Guild, callback?: callback): any
    export function GuildDelete (client: Discord.Client, Guild: Discord.Guild, command_id: string, callback?: callback): any
}