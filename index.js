const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HuVcvGA308hXQPTwfzK94BeEMInkPEykw3CnrWMoYwmmAQHTDTntB9HKQDTNBEpcYhdUAyas7XHN9svSESuuz5Z00XpJCvfeX');

const app = express();

app.use(cors({ origin: true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send("it's working!");
});

app.post('/payments/create', async(req, res) => {
    const total = req.query.total

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});


app.listen(process.env.PORT || 4000, () => {
    console.log('App listening on port 3000!');
});