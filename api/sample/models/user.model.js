

class User {

    getAllUsers(params){

        // get users from db

        const sampleUsersResponse = {
            status: "SUCCESS",
            message: "all users are listed",
            users: [
                {
                    user_id: "1",
                    name: "Ali",
                    surname: "Yılmaz",
                    email: "example@gmail.com",
                    phone: "+905055550505"
                },
                {
                    user_id: "2",
                    name: "Ayşe",
                    surname: "Yılmaz",
                    email: "example@gmail.com",
                    phone: "+905066660606"
                }
            ]
        }

        return sampleUsersResponse;
    }

    addUser(reqBody, params){

        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("name" && "surname" && "password" && "email" && "phone") && fields.length < 6

        let sampleAddUserResponse = "";
        if(fieldCheck){
            // add user to database
            sampleAddUserResponse = {
                status: "SUCCESS",
                message: "new user is added(sample)",
                user: {
                    user_id: reqBody.id || Math.floor(Math.random()*100 +1),
                    name: reqBody.name,
                    surname: reqBody.surname,
                    password: reqBody.password,
                    email: reqBody.email,
                    phone: reqBody.phone
                }
            }
        }
        else{
            // return error message
            sampleAddUserResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }
        

        return sampleAddUserResponse;
    }

    deleteUser(params){

        // check if request is valid

        let sampleDeleteUserResponse = {
            status: "SUCCESS",
            message: "user is deleted",
            user: {
                user_id: params.id,
                name: "Ali",
                surname: "Yılmaz",
                email: "example@gmail.com",
                phone: "+905055550505"
            }
        }

        return sampleDeleteUserResponse;
    }

    updateUser(reqBody, params){
        // check if new user entry is valid
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 6

        let sampleUpdateUserResponse = {}

        if(fieldCheck){
            // add user to database
            sampleUpdateUserResponse = {
                status: "SUCCESS",
                message: "user is updated(sample)",
                user: {
                    user_id: params.id || Math.floor(Math.random()*100 +1),
                    name: reqBody.name,
                    surname: reqBody.surname,
                    password: reqBody.password,
                    email: reqBody.email,
                    phone: reqBody.phone
                }
            }
        }
        else{
            // return error message
            sampleUpdateUserResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleUpdateUserResponse;
    }




}

module.exports = User;