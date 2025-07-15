
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';

export default function processPayment(accountId, totals) {
  const totalCost = totals.ADULT * 25 + totals.CHILD * 15;
  const paymentService = new TicketPaymentService();
  paymentService.makePayment(accountId, totalCost);
}

