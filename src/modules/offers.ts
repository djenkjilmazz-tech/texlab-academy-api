type Offer = {
  id: number;
  sampleId: number;
  customer: string;
  device: string;
  price: string;
  currency: string;
  validUntil: string;
  status: "Draft" | "Sent" | "Accepted";
};

let offers: Offer[] = [];
let currentOfferId = 1;

export function createOffer(data: {
  sampleId: number;
  customer: string;
  device: string;
  price: string;
  currency?: string;
  validUntil?: string;
}) {
  const offer: Offer = {
    id: currentOfferId++,
    sampleId: data.sampleId,
    customer: data.customer,
    device: data.device,
    price: data.price,
    currency: data.currency || "EUR",
    validUntil: data.validUntil || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: "Draft"
  };

  offers.push(offer);
  return offer;
}

export function listOffers() {
  return offers;
}

export function markOfferSent(id: number) {
  const offer = offers.find((item) => item.id === id);
  if (!offer) return null;
  offer.status = "Sent";
  return offer;
}

export function markOfferAccepted(id: number) {
  const offer = offers.find((item) => item.id === id);
  if (!offer) return null;
  offer.status = "Accepted";
  return offer;
}
