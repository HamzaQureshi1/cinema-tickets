import validateTickets from './services/TicketValidator';
import processPayment from './services/PaymentProcessor'; 
import allocateSeats from './services/SeatAllocator';

export default class DefaultTicketService {
    purchaseTickets(accountId, ...ticketTypeRequests) {
      const totals = validateTickets(accountId, ticketTypeRequests);
      processPayment(accountId, totals);
      allocateSeats(accountId, totals);
    }
  }
  
