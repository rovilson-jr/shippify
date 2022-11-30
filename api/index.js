const express = require('express')
const app = express()
const port = 3000
const { execSQLQuery } = require('./services/db')

app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Working' }))

app.listen(port)
console.log('API working!')

// First Route - GET - List vehicles by driver
app.get('/vehicle-driver', (req, res) => {
  execSQLQuery('SELECT driver.first_name, driver.last_name, vehicle.plate, vehicle.model \
    FROM driver \
    INNER JOIN vehicle ON vehicle.driver_id=driver.id;', res)
})

// Second Route - POST - Create a new vehicle
app.post('/vehicle', (req, res) => {
  const driver_id = req.body.driver_id
  const plate = req.body.plate
  const model = req.body.model
  const type = req.body.type
  const capacity = req.body.capacity

  execSQLQuery(`INSERT INTO vehicle (driver_id, plate, model, type, capacity) VALUES ('${driver_id}','${plate}','${model}','${type}','${capacity}')`, res)
})

// Third Route - PATCH - Update an existing vehicle
app.patch('/vehicle/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const driver_id = req.body.driver_id
  const plate = req.body.plate
  const model = req.body.model
  const type = req.body.type
  const capacity = req.body.capacity

  execSQLQuery(`UPDATE vehicle SET driver_id='${driver_id}', plate='${plate}', model='${model}', type='${type}', capacity='${capacity}' WHERE ID=${id}`, res)
})

// Fourth Route - DELETE - Delete a vehicle
app.delete('/vehicle/:id', (req, res) => {
  execSQLQuery('DELETE FROM vehicle WHERE ID=' + parseInt(req.params.id), res)
})
