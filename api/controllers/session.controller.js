class Session {
    // it is to manage session information

    check(sk, user_id){
        if(!sk || sk !== "admin") return false;
        else return true;
    }

    sendErrorMessage(){
        return{
            status: "FAILURE",
            message: "missing or wrong session key"
        }
    }
}

module.exports = Session;