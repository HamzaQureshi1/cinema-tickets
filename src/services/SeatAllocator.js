// src/services/SeatAllocator.js

import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService';

export default function allocateSeats(accountId, totals) {
  const totalSeats = totals.ADULT + totals.CHILD;
  const seatService = new SeatReservationService();
  seatService.reserveSeat(accountId, totalSeats);
}

