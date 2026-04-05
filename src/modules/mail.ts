export function sendOfferEmailMock(offer: any) {
  return {
    status: "sent",
    message: `Offer ${offer.id} sent to ${offer.customer}`
  };
}