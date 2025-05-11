import db from './db.js';
async function getUserList() {
    try {
        const users = await db('users').select('email');
        users.forEach( (users) => {
            console.log(users.email);
        });
    } catch (err) {
        console.error('Error fetching users:', err);
    }
    process.exit();
}
getUserList();