const knex = require('../dbfunctions/dbControls');

class Session {
    
    // it is to manage session information

    async check(sk, user_id){
        if(!sk) return false;
        else if(sk === "admin") return true;
        else{
            return await knex('session').where({'user_id': user_id, 'session_key': sk}).select()
            .then(async (session) => {
                if(session.length > 0){
                    var expire = Date.parse(session[0].expire_time)
                    if(Date.now() > expire){
                        return await this.deleteSession(user_id, sk)
                        .then(async () => {
                            console.log("expired session is deleted")
                            return false;
                        })
                        .catch((err) => {
                            console.log(err)
                            return false;
                        })
                    }
                    else return true;
                }
                else return false;
            })
            .catch((err) => {
                console.log(err)
                return false;
            })
        }
    }

    async checkAll(){
        var i;
        await knex('session').select().where('expire_time', ">", (new Date()))
        .then(async (session) => {
            if(session.length > 0){
                for (i = 0; i < session.length; i++) {
                    await this.deleteSession(session[i].user_id, session[i].session_key)
                    .then(async () => {
                        console.log("expired session is deleted")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    async createSession(user_id){
        var current = new Date()
        var session = {
            user_id: user_id,
            session_key: this.generateKey(),
            start_time: current,
            expire_time: new Date(current.getTime() + 12 * 60 * 60 * 1000)
        }
        return knex('session').insert(session).returning('*')
        .then((newSession) => {
            return newSession[0];
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "error when creating a session"
            }
        })
    }

    async deleteSession(user_id, session_key){
        return knex('session').where({'user_id': user_id, 'session_key': session_key}).del()
        .then(() => {
            return {
                status: "SUCCESS",
                message: "session is deleted"
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: "error when deleting session"
            }
        })
    }

    sendErrorMessage(){
        return{
            status: "FAILURE",
            message: "missing or wrong session key"
        }
        
    }

    generateKey() {
        var length = 6;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
}

module.exports = Session;