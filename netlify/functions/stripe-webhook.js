const Stripe = require('stripe');
const admin  = require('firebase-admin');

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    ),
    databaseURL: process.env.FIREBASE_DB_URL,
  });
}

exports.handler = async (event) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sig    = event.headers['stripe-signature'];

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch(err){
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if(stripeEvent.type === 'checkout.session.completed'){
    const session = stripeEvent.data.object;
    const m = session.metadata;

    await admin.database().ref('pixels').push({
      name:   m.name,
      email:  m.email,
      color:  m.color,
      msg:    m.msg,
      url:    m.url,
      pixels: JSON.parse(m.pixels),
      total:  session.amount_total / 100,
      ts:     Date.now(),
    });
  }

  return { statusCode: 200, body: 'OK' };
};