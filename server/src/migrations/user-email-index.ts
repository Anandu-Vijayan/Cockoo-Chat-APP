import { Db } from "mongodb"

module.exports = {
    async up(db: Db) {
        // console.log('up migration');
        // Create an Index on the eamil field in the users collection  with the unique constaint
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
    },

    //The Down function is called when you rollback the migration
    async down(db: Db) {
        // console.log('down migration');
        await db.collection('users').dropIndex('email_1')

    },
} 