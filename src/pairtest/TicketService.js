
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  assignPrice(arrayItem) {
    const type = arrayItem.getTicketType()
    const number = arrayItem.getNoOfTickets();
    let price = 0;
    if (type == 'ADULT') {
      price = 25 * number
    }
    else if (type == 'CHILD') {
      price = 10 * number
    
    }
    return price;
}

assignSeats(arrayItem) {
    const type = arrayItem.getTicketType()
    const number = arrayItem.getNoOfTickets();
    let seat = 0;
    if (type == 'ADULT'|| type =='CHILD') {
      seat = 1
    }
    return seat * number;
} 


  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
  //  console.log(ticketTypeRequests)

    const requests = ticketTypeRequests[0];
    let totalNumberOfTickets = 0;
    let totalPrice =0;
    let totalSeat =0;
    let ticketType;
     let countOfAdultTickets = 0;
    let countOfInfantTickets =0;
    let countOfChildTickets =0;
    let assign = 0;
    let seats =0;

    // so in a total request we want to check that if there are 25 adults 
  
  requests.forEach((arrayItem)=>{

    totalNumberOfTickets = arrayItem.getNoOfTickets();
    ticketType = arrayItem.getTicketType();
   
    if (ticketType == 'ADULT'){
      countOfAdultTickets += totalNumberOfTickets;
      console.log(countOfAdultTickets, 'adult tickets')
      
    }
    else if(ticketType == 'CHILD') {
      countOfChildTickets += totalNumberOfTickets
      console.log(countOfChildTickets, 'child tickets')
    }
     else if(ticketType == 'INFANT') {
      countOfInfantTickets += totalNumberOfTickets  
      console.log(countOfInfantTickets, 'infant tickets')
    }
      assign += this.assignPrice(arrayItem);
      seats += this.assignSeats(arrayItem);
    })

    const totalOfAllTickets  = countOfAdultTickets + countOfChildTickets + countOfInfantTickets;
    console.log(totalOfAllTickets, 'total of all tickets')
     if (totalOfAllTickets >25) {
          throw Error('Can only purchase 25 tickets at a time.');
    } else{


    if (countOfAdultTickets >= countOfChildTickets || countOfAdultTickets >= countOfInfantTickets || countOfAdultTickets >= countOfChildTickets +countOfInfantTickets) {
     
    totalPrice = assign;
    
    totalSeat = seats;


}


    }


        console.log('total', totalPrice)
        console.log('seats', totalSeat);
    const payment = new TicketPaymentService;
    const seat = new SeatReservationService;
    payment.makePayment(accountId, totalPrice)
    seat.reserveSeat(accountId, totalSeat)
  }
  
   ;


}
