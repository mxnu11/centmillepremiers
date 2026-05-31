const Stripe = require('stripe');

const TIERS = [
  { min: 1,   max: 49,       price: 1.00 },
  { min: 50,  max: 199,      price: 0.95 },
  { min: 200, max: 499,      price: 0.90 },
  { min: 500, max: Infinity, price: 0.85 },
];

function getTierPrice(n){
  return TIERS.find(t => n >= t.min && n <= t.max)?.price || 1.00;
}

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST'){
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const body = JSON.parse(event.body);
  const { pixels, color, name, email, msg, url } = body;

  const n = pixels.length;
  const pricePerPixel = getTierPrice(n);
  const totalCents = Math.round(n * pricePerPixel * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: totalCents,
          product_data: {
            name: `${n} pixel${n>1?'s':''} — Les Cent Mille Premiers`,
            description: `${pricePerPixel.toFixed(2)} €/px · ${name}`,
          },
        },
        quantity: 1,
      }],
      metadata: {
        pixels: JSON.stringify(pixels),
        color,
        name,
        email,
        msg: msg || '',
        url: url || '',
      },
      success_url: `${process.env.URL}/?payment=success`,
      cancel_url:  `${process.env.URL}/?payment=cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};const Stripe = require('stripe');

const TIERS = [
  { min: 1,   max: 49,       price: 1.00 },
  { min: 50,  max: 199,      price: 0.95 },
  { min: 200, max: 499,      price: 0.90 },
  { min: 500, max: Infinity, price: 0.85 },
];

function getTierPrice(n){
  return TIERS.find(t => n >= t.min && n <= t.max)?.price || 1.00;
}

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST'){
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const body = JSON.parse(event.body);
  const { pixels, color, name, email, msg, url } = body;

  const n = pixels.length;
  const pricePerPixel = getTierPrice(n);
  const totalCents = Math.round(n * pricePerPixel * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: totalCents,
          product_data: {
            name: `${n} pixel${n>1?'s':''} — Les Cent Mille Premiers`,
            description: `${pricePerPixel.toFixed(2)} €/px · ${name}`,
          },
        },
        quantity: 1,
      }],
      metadata: {
        pixels: JSON.stringify(pixels),
        color,
        name,
        email,
        msg: msg || '',
        url: url || '',
      },
      success_url: `${process.env.URL}/?payment=success`,
      cancel_url:  `${process.env.URL}/?payment=cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};const Stripe = require('stripe');

const TIERS = [
  { min: 1,   max: 49,       price: 1.00 },
  { min: 50,  max: 199,      price: 0.95 },
  { min: 200, max: 499,      price: 0.90 },
  { min: 500, max: Infinity, price: 0.85 },
];

function getTierPrice(n){
  return TIERS.find(t => n >= t.min && n <= t.max)?.price || 1.00;
}

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST'){
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const body = JSON.parse(event.body);
  const { pixels, color, name, email, msg, url } = body;

  const n = pixels.length;
  const pricePerPixel = getTierPrice(n);
  const totalCents = Math.round(n * pricePerPixel * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: totalCents,
          product_data: {
            name: `${n} pixel${n>1?'s':''} — Les Cent Mille Premiers`,
            description: `${pricePerPixel.toFixed(2)} €/px · ${name}`,
          },
        },
        quantity: 1,
      }],
      metadata: {
        pixels: JSON.stringify(pixels),
        color,
        name,
        email,
        msg: msg || '',
        url: url || '',
      },
      success_url: `${process.env.URL}/?payment=success`,
      cancel_url:  `${process.env.URL}/?payment=cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};const Stripe = require('stripe');

const TIERS = [
  { min: 1,   max: 49,       price: 1.00 },
  { min: 50,  max: 199,      price: 0.95 },
  { min: 200, max: 499,      price: 0.90 },
  { min: 500, max: Infinity, price: 0.85 },
];

function getTierPrice(n){
  return TIERS.find(t => n >= t.min && n <= t.max)?.price || 1.00;
}

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST'){
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const body = JSON.parse(event.body);
  const { pixels, color, name, email, msg, url } = body;

  const n = pixels.length;
  const pricePerPixel = getTierPrice(n);
  const totalCents = Math.round(n * pricePerPixel * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: totalCents,
          product_data: {
            name: `${n} pixel${n>1?'s':''} — Les Cent Mille Premiers`,
            description: `${pricePerPixel.toFixed(2)} €/px · ${name}`,
          },
        },
        quantity: 1,
      }],
      metadata: {
        pixels: JSON.stringify(pixels),
        color,
        name,
        email,
        msg: msg || '',
        url: url || '',
      },
      success_url: `${process.env.URL}/?payment=success`,
      cancel_url:  `${process.env.URL}/?payment=cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};