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

    type CommandOptions = SubCommand | SubCommandGroup | CommandArguments

    export class Command{
        constructor(name: string, description?: string, options?: CommandOptions[])
        public name: string
        public description: string
        public options: CommandOptions[]
        
        
        public setName(name: string): this
        public setDescription(description: string): this
        
        public setOptions(options: CommandArguments[]): this 
        public addOptions(options: CommandArguments[]): this 
        public addOption(option: CommandArguments): this 
    }



    export class CommandOption{
        public name: string
        public description: string
        public type: number

        public setName(name: string): this
        public setDescription(description: string): this
        public setType(type: number): this
    }

    export class SubCommand extends CommandOption{
        public type: 1
        public options: CommandArguments[]

        public setOptions(options: CommandArguments[]): this 
        public addOptions(options: CommandArguments[]): this 
        public addOption(option: CommandArguments): this 
    }
    export class SubCommandGroup extends CommandOption{
        public type: 2
        public options: CommandArguments[] | SubCommand[]

        public setOptions(options: CommandArguments[] | SubCommand[]): this 
        public addOptions(options: CommandArguments[] | SubCommand[]): this 
        public addOption(option: CommandArguments | SubCommand): this 
    }
    export class CommandArguments extends CommandOption{
        public type: 3 | 4 | 5 | 6 | 7 | 8
        public required: boolean
        public choices: {name: string, value: string}[]

        public setRequired(type: boolean): this 
        public setChoices(choices: {name: string, value: string}[]): this 
        public addChoices(choices: {name: string, value: string}[]): this 
        public addChoice(name: string, value: string): this 
    }




    export function post    (client: Discord.Client, command: Command, callback?: callback): any
    export function edit    (client: Discord.Client, command: Command, callback?: callback): any
    export function get     (client: Discord.Client, callback?: callback): any
    export function delete_ (client: Discord.Client, id: string, callback?: callback): any
    
    export function GuildPost   (client: Discord.Client, Guild: Discord.Guild, command: Command, callback?: callback): any
    export function GuildEdit   (client: Discord.Client, Guild: Discord.Guild, command: Command, callback?: callback): any
    export function GuildGet    (client: Discord.Client, Guild: Discord.Guild, callback?: callback): any
    export function GuildDelete (client: Discord.Client, Guild: Discord.Guild, id: string, callback?: callback): any
}