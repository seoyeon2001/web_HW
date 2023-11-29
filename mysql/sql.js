// 여기서는 쿼리문이 들어가

module.exports = {
    userList:`select * from users where id = ? and password = ?`,
    userID:`select id from users where id = ?`,
    userInsert: `INSERT INTO users set ?`,
    finduser: `select * from users where id = ?`,
};