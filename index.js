const fetch = require('node-fetch');
const query = require('querystring');

module.exports = class GDClient{
    /**
     * @param {String} user - A Valid username or User id
     * @param {String} username - A Valid Username
     * @param {Number} id - A Valid Level ID
     * @param {Object} level - A Valid Level Options (basic is {name: 'levelnamehere'})
     * @param {String} levelname - A Valid level name
     * @param {Object} opts - A Valid Options
     * @property {String} levelname - A Valid Level Name
     * @property {Number} count - The amount of levels to list (default is 10, max is 500)
     * @property {Boolean} featured - Only return featured levels
     * @property {Boolean} creator - Turns on Creator Leaderboard or not.
     */

    static async getLevelbyName(levelname){
        if(!levelname) throw new TypeError('Please Provide A level Name!!');
        if(typeof levelname != 'string') throw new TypeError('The Given level Name is Not a String!!');
        
        const fixed = levelname.split(' ').join('%20');

        fetch('https://gdbrowser.com/api/search/' + fixed).then(res => res.json()).then(result => {
            if(result === -1){
                callback(null)
            }else{
              callback(result[0]);
            }
        }).catch(err => {callback(null)});
    }
    static async getLevelbyID(id, callback){
        if(!id) throw new TypeError('Please Provide A Level ID!!');
        if(isNaN(id)) throw new TypeError('The Given ID Is Not a Number!!');

        fetch('https://gdbrowser.com/api/level/' + id).then(res => res.json()).then(result => {
            if(result === -1){
                callback(null)
            }else{
              callback(result);
            }
        }).catch(err => {callback(null)});
    }
    static async getUser(user, callback){
        if(!user) throw new TypeError('Please Provide A Username Or User ID!!');
        if(typeof user != 'string') throw new TypeError('The Given User is Not A String!!')

        fetch('https://gdbrowser.com/api/profile/' + user).then(res => res.json()).then(result => {
            callback(result)
        }).catch(err => {callback(null)});
    }
    static async search(level={levelname, count: 10, featured: false}, callback){
        if(!level) throw new TypeError('Please Provide A level options!!');
        if(typeof level != 'object') throw new TypeError('The Given level options is Not an obj!!');
        if(!level.levelname) throw new TypeError('Please Provide A level name on level options. (  ex. search({name: "retray"})  )!!');
        if(typeof level.levelname != 'string') throw new TypeError('The Given Level Name on Level Options is Not a String. (  ex. search({name: "retray"})  )');
        if(isNaN(level.count)) level.count = 10

        const fixed = level.levelname.split(' ').join('%20');

        if(level.featured === true){
                    
        fetch(`https://gdbrowser.com/api/search/${fixed}?featured&count=${level.count}`).then(res => res.json()).then(result => {
            if(result === -1){
                callback(null)
            }else{
                callback(result);
            }
        }).catch(err => {callback(null)});

        }else{
            fetch(`https://gdbrowser.com/api/search/${fixed}?count=${level.count}`).then(res => res.json()).then(result => {
                if(result === -1){
                    callback(null)
                }else{
                    callback(result);
                }
            }).catch(err => {callback(null)});
        }
    }
    static async leaderboard(opts={creator: false, count: 10}, callback){
        if(!opts) throw new TypeError('Please Provide An Options!!')
        if(typeof opts != 'object') throw new TypeError('The Options Must be an obj!!');
        if(opts.count > 500) throw new TypeError('The Results are too many!! Please Reduce the count!! Max is 5000');

        if(opts.creator === true){
            fetch(`https://gdbrowser.com/api/leaderboard?creator&count${opts.count || 10}`).then(res => res.json()).then(result => {
                callback(result)
            }).catch(err => {callback(null)});
        }else{
            fetch(`https://gdbrowser.com/api/leaderboard?count${opts.count || 10}`).then(res => res.json()).then(result => {
                callback(result)
            }).catch(err => {callback(null)});
        }
    }
    static async MapPacks(callback){
        fetch('https://gdbrowser.com/api/mappacks').then(res => res.json()).then(result => {
            callback(result)
        }).catch(err => {callback(null)});
    }
    static async Gauntlets(callback){
        fetch('https://gdbrowser.com/api/gauntlets').then(res => res.json()).then(result => {
            callback(result)
        }).catch(err => {callback(null)});
    }
    static async getIcon(username, callback){
        if(!username) throw new TypeError('Please Provide A UserName!!');
        if(typeof username != 'string') throw new TypeError('The Given UserName is Not a String!!');

        const user = `https://gdbrowser.com/icon/${username}`

        const cube = user
        const ship = user + '?form=ship'
        const wave = user + '?form=wave'
        const ball = user + '?form=ball'
        const spider = user + '?form=spider'
        const ufo = user + '?form=ufo'
        const robot = user + '?form=robot'

        const res = {
            cube: cube,
            ship: ship,
            wave: wave,
            ball: ball,
            spider: spider,
            ufo: ufo,
            robot: robot
        }

        callback(res);
    }
}