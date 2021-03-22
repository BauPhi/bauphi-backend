const db = require('../dbfunctions/dbControls');
class Announcement {
    constructor() {
        this.dbAnnouncements = [
            {
                announcement_id: "1",
                ann_starter: "3",
                image: "https://www.macleayargus.com.au/images/transform/v1/crop/frm/ruby.pascoe/36c422d6-5e42-4f85-a4eb-05f9edf9979e.jpg/r0_806_3024_3480_w1200_h678_fmax.jpg",
                phone: "+905067064686",
                title: "Kırmızı Tasmalı Kayıp Evcil Köpek",
                description: "Köpeğim Paris depremin ardından kayboldu. Görenler olursa bu numaradan irtibata geçsinler.",
                isHuman: false,
            },
            {
                announcement_id: "2",
                ann_starter: "2",
                image: "https://i.kym-cdn.com/entries/icons/original/000/016/546/hidethepainharold.jpg",
                phone: "+905437534687",
                title: "Kayıp Yaşlı",
                description: "Dedeme ulaşamıyorum, kendisine bakamıyor. Görenler olursa irtibata geçsinler.",
                isHuman: true,
            },
            {
                announcement_id: "3",
                ann_starter: "1",
                image: "https://i.kym-cdn.com/entries/icons/original/000/016/546/hidethepainharold.jpg",
                phone: "+905417566682",
                title: "Kayıp British Kedi!!!",
                description: "Dün 15.00'dan beri haber alamadım. Bu numaradan arayabilirsiniz.",
                isHuman: false,
            },
            {
                announcement_id: "4",
                ann_starter: "3",
                image: "https://www.verywellfamily.com/thmb/DUTf87y7J3Lv0d3cxPiVUcqt_gI=/500x350/filters:no_upscale():max_bytes(150000):strip_icc()/181451278-56a258395f9b58b7d0c931fd.jpg",
                phone: "+905067064686",
                title: "7 yaşındaki oğlum kayıp",
                description: "En son X Devlet Hastanesinde görülmüştür. Görenlerin numaraya veya polise ulaşmaları rica olunur.",
                isHuman: true,
            },
        ]
    }
    

    getAnnouncements(reqBody, params, user_id){

        // get announcements of user
        //const announcements = this.dbAnnouncements.filter(x => x.ann_starter === user_id);
       
        let sampleGetAnnouncementsResponse = {}
        const announcements = db.knex('announcement').select().where('ann_starter', user_id)
        if(announcements && announcements.length !== 0){
            sampleGetAnnouncementsResponse = {
                status: "SUCCESS",
                message: "all announcements of user are listed",
                user_id: user_id,
                announcements: announcements,
            }
        }
        else{
            sampleGetAnnouncementsResponse = {
                status: "FAILURE",
                message: "announcements are not found",
            }
        }

        return sampleGetAnnouncementsResponse
    }

    getAnnouncement(reqBody, params, user_id){

        // get announcements of user
        /*const announcement = this.dbAnnouncements.find(x => {
            if(x.announcement_id === params.id && x.ann_starter === user_id){
                return true;
            }
        });*/
       
        const announcement = db.knex('announcement').select().where({'announcement_id': params.id, 'ann_starter': user_id})
        let sampleGetAnnouncementResponse = {}
        if(announcement){
            sampleGetAnnouncementResponse = {
                status: "SUCCESS",
                message: "announcement is found",
                user_id: user_id,
                announcement: announcement,
            }
        }
        else{
            sampleGetAnnouncementResponse = {
                status: "FAILURE",
                message: "announcement is not found",
            }
        }

        return sampleGetAnnouncementResponse
    }

    addAnnouncement(reqBody, params, user_id){

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.includes("image" && "phone" && "title" && "description" && "isHuman") && fields.length < 6

        let sampleAddAnnouncementResponse = {}
        if(fieldCheck){
            const temp = {...JSON.parse({'ann_starter':user_id}), ...JSON.parse(reqBody)}
            db.knex('announcement').insert(temp)
            sampleAddAnnouncementResponse = {
                status: "SUCCESS",
                message: "new announcement is added",
                user_id: user_id,
                announcement: {
                    announcement_id: Math.floor(Math.random()*100 +1).toString(),
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
            sampleAddAnnouncementResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleAddAnnouncementResponse;

    }

    deleteAnnouncement(reqBody, params, user_id){

        // get announcements of user
        /*const announcement = this.dbAnnouncements.find(x => {
            if(x.announcement_id === params.id && x.ann_starter === user_id){
                return true;
            }
        });*/

        const announcement = db.knex('announcement').where({'ann_starter': user_id, 'announcement_id':params.id}).delete()
        let sampleDeleteAnnouncementResponse = {}
        if(announcement > 0){
            sampleDeleteAnnouncementResponse = {
                status: "SUCCESS",
                message: "announcement is deleted",
                user_id: user_id,
                announcement: announcement
            }
        }
        else{
            sampleDeleteAnnouncementResponse = {
                status: "FAILURE",
                message: "announcement is not found",
            }
        }

        return sampleDeleteAnnouncementResponse;

    }

    updateAnnouncement(reqBody, params, user_id){

        //check fields
        const fields = Object.keys(reqBody)
        const fieldCheck = fields.length < 6

        // check db
        /*const announcement = this.dbAnnouncements.find(x => {
            if(x.announcement_id === params.id && x.ann_starter === user_id){
                return true;
            }
        });*/
        
        let sampleUpdateAnnouncementResponse = {}
        if(fieldCheck && announcement){
            knex('announcement').where({'ann_starter': user_id, 'announcement_id':params.id}).update(reqBody)
            sampleUpdateAnnouncementResponse = {
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
            sampleUpdateAnnouncementResponse = {
                status: "FAILURE",
                message: "request body fields are not true"
            }
        }

        return sampleUpdateAnnouncementResponse;
    }


}


module.exports = Announcement;