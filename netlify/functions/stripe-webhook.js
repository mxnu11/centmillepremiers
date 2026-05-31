const Stripe = require('stripe');
const admin  = require('firebase-admin');

if(!admin.apps.length){
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      ),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
  } catch(e){ console.error('Firebase init error:', e.message); }
}

const COMMISSION = 0.12;

exports.handler = async (event) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = event.headers['stripe-signature'];

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch(err){
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if(stripeEvent.type === 'checkout.session.completed'){
    const session = stripeEvent.data.object;
    const m = session.metadata;
    if(!m || !m.pixels) return { statusCode: 200, body: 'OK - no metadata' };

    const pixels = JSON.parse(m.pixels);
    const isResale = m.isResale === 'true';
    const total = session.amount_total / 100;

    try {
      // Sauvegarde le pixel dans Firebase
      await admin.database().ref('pixels').push({
        name:   m.name   || '',
        email:  m.email  || '',
        color:  m.color  || '#c9a84c',
        msg:    m.msg    || '',
        url:    m.url    || '',
        pixels: pixels,
        total:  total,
        ts:     Date.now(),
      });

      // Si revente — marque l'annonce comme vendue + enregistre la commission
      if(isResale && m.listingKey){
        await admin.database().ref(`market/${m.listingKey}`).update({
          sold: true,
          soldAt: Date.now(),
          buyerEmail: m.email,
        });

        // Enregistre la revente pour paiement manuel au vendeur
        const sellerAmount = total * (1 - COMMISSION);
        await admin.database().ref('resales').push({
          listingKey: m.listingKey,
          sellerEmail: m.sellerEmail || '',
          buyerEmail: m.email,
          totalPaid: total,
          sellerAmount: parseFloat(sellerAmount.toFixed(2)),
          commission: parseFloat((total * COMMISSION).toFixed(2)),
          ts: Date.now(),
          paid: false, // tu passes à true après avoir viré au vendeur
        });
      }
    } catch(e){ console.error('Firebase write error:', e.message); }
  }

  return { statusCode: 200, body: 'OK' };
};