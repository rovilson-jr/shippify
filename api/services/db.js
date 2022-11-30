const mysql = require('mysql2')

function execSQLQuery (sqlQry, res) {
  const connection = mysql.createConnection({
    host: 'shippify4.cv2sgxogwffx.sa-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'candidate5',
    password: 'ubnpS3rySnj88Sum',
    database: 'shippify5'
  })

  connection.query(sqlQry, (error, results, fields) => {
    if (error) { res.json(error) } else { res.json(results) }

    connection.end()
    console.log('executed!')
  })
}

module.exports = {
  execSQLQuery
}
