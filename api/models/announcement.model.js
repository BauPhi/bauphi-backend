const knex = require('../dbfunctions/dbControls');
class Announcement {

    async getAnnouncements(reqBody, params, user_id){

        // get announcements of user
       
        return knex('announcement').select().where('ann_starter', user_id)
        .then(function(ann) {
            if(ann && ann.length !== 0){
                return {
                    status: "SUCCESS",
                    message: "all announcements of user are listed",
                    user_id: user_id,
                    announcements: ann,
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "announcements are not found",
                }
            }
    
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });     
    }

    async getAnnouncement(reqBody, params, user_id){

        // get announcements of user
       
        return knex('announcement').select().where({'announcement_id': params.id, 'ann_starter': user_id})
        .then(function(ann) {
            if(ann.length > 0){
                return {
                    status: "SUCCESS",
                    message: "announcement is found",
                    user_id: user_id,
                    announcement: ann,
                }
            }
            else{
                return {
                    status: "FAILURE",
                    message: "announcement is not found",
                }
            }
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });    
    }

    async addAnnouncement(reqBody, params, user_id){

        //const fieldCheck = fields.includes("image" && "phone" && "title" && "description" && "isHuman") && fields.length < 6

        reqBody['ann_starter'] = user_id;
        
        return knex('announcement').insert(reqBody).returning('announcement_id')
        .then(function(ann) {
            return {
                status: "SUCCESS",
                message: "new announcement is added",
                user_id: user_id,
                announcement: {
                    announcement_id: "" + ann[0],
                    ann_starter: reqBody.ann_starter,
                    image: reqBody.image,
                    phone: reqBody.phone,
                    title: reqBody.title,
                    description: reqBody.description,
                    isHuman: reqBody.isHuman,
                }
            }
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
        
    }

    async deleteAnnouncement(reqBody, params, user_id){

        // get announcements of user
        const announcement = await this.getAnnouncement(reqBody, params, user_id);
        return knex('announcement').where({'ann_starter': user_id, 'announcement_id':params.id}).del()
        .then(function(num) {
            if(num > 0){
                return {
                    status: "SUCCESS",
                    message: "announcement is deleted",
                    user_id: user_id,
                    announcement: announcement.announcement
                }
            }
            else{
                return{
                    status: "FAILURE",
                    message: "announcement is not found",
                }
            }
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
    }

    async updateAnnouncement(reqBody, params, user_id){

        return this.getAnnouncement(reqBody, params, user_id)
        .then(function(ann) {
            if(ann.status === "SUCCESS"){
                return knex('announcement').where({'ann_starter': user_id, 'announcement_id':params.id}).update(reqBody)
                .then(function(num) {
                    if(num){
                        return {
                            status: "SUCCESS",
                            message: "announcement is updated.",
                            user_id: user_id,
                            announcement: {
                                announcement_id: params.id,
                                ann_starter: reqBody.ann_starter,
                                image: reqBody.image,
                                phone: reqBody.phone,
                                title: reqBody.title,
                                description: reqBody.description,
                                isHuman: reqBody.isHuman,
                            }
                        }
                    }
                    else{
                        return {
                            status: "FAILURE",
                            message: err.detail,
                            ann: ann
                        }
                    }
                    
                }).catch((err) => {
                    console.log(err)
                    return {
                        status: "FAILURE",
                        message: "no announcement is found"
                    }
                });
            }
            else{
                return {
                    status: "FAILURE",
                    message: "no announcement is found"
                }
            }
        }).catch((err) => {
            console.log(err)
            return {
                status: "FAILURE",
                message: err.detail
            }
        });
        
    }


}


module.exports = Announcement;