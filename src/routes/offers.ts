import express from 'express';
import { createOffer, listOffers, markOfferSent, markOfferAccepted } from '../modules/offers';
import { sendOfferEmailMock } from '../modules/mail';

const router = express.Router();

router.post('/', (req, res) => {
  const offer = createOffer(req.body);
  res.json(offer);
});

router.get('/', (req, res) => {
  res.json(listOffers());
});

router.post('/:id/send', (req, res) => {
  const offer = markOfferSent(Number(req.params.id));
  if (!offer) return res.status(404).send('Not found');

  const result = sendOfferEmailMock(offer);
  res.json({ offer, email: result });
});

router.post('/:id/accept', (req, res) => {
  const offer = markOfferAccepted(Number(req.params.id));
  res.json(offer);
});

export default router;