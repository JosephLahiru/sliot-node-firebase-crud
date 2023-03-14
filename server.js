const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')

app.use(express.json())

app.get('/power-switch', async (req, res) => {
    const peopleRef = db.collection('switches').doc('power-switch')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

app.post('/addentry', async (req, res) => {
    const { DayMaxVoltage, DayMinVoltage, DayTotRealPower, DaytotapparentPower, SupplyID, date, elecAccNumber, time } = req.body
    const peopleRef = db.collection('entry')
    const newFriendRef = await peopleRef.add({ DayMaxVoltage, DayMinVoltage, DayTotRealPower, DaytotapparentPower, SupplyID, date, elecAccNumber, time});
    const newFriendId = newFriendRef.id;
    res.status(200).send({ message: 'Entry added successfully', friendId: newFriendId });
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))