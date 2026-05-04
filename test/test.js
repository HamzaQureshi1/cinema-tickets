import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";


const ticketService = new TicketService();
const ticket1 = new TicketTypeRequest('ADULT', 10);
const ticket2 = new TicketTypeRequest('ADULT', 5);
const ticket3 = new TicketTypeRequest('INFANT', 4);
const ticket4 = new TicketTypeRequest('CHILD', 5);
const ticket5 = new TicketTypeRequest('ADULT', 26);
const ticket6 = new TicketTypeRequest('CHILD', 6);

const totalTickets = [ticket1, ticket2, ticket3]
const totalIsTooHigh = [ ticket2, ticket3, ticket4  , ticket6]
const totalBadTickets = [ticket5];

// ticketService.purchaseTickets(12345, totalTickets);
ticketService.purchaseTickets(12345, totalIsTooHigh)
// ticketService.purchaseTickets(12345, totalBadTickets);
   


