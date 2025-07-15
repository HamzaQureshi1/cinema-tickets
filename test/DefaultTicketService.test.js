import DefaultTicketService from '../src/DefaultTicketService.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

// Mocks for payment and seat services
jest.unstable_mockModule('../src/thirdparty/paymentgateway/TicketPaymentService.js', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      makePayment: jest.fn(),
    })),
  };
});

jest.unstable_mockModule('../src/thirdparty/seatbooking/SeatReservationService.js', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      reserveSeat: jest.fn(),
    })),
  };
});

describe('DefaultTicketService', () => {
  let service;

  beforeEach(async () => {
    const { default: TicketService } = await import('../src/DefaultTicketService.js');
    service = new TicketService();
  });

  test('valid purchase: 2 adults, 1 child, 1 infant', () => {
    expect(() =>
      service.purchaseTickets(
        1,
        new TicketTypeRequest('ADULT', 2),
        new TicketTypeRequest('CHILD', 1),
        new TicketTypeRequest('INFANT', 1)
      )
    ).not.toThrow();
  });

  test('throws when purchasing more than 25 tickets', () => {
    expect(() =>
      service.purchaseTickets(1, new TicketTypeRequest('ADULT', 26))
    ).toThrow(/more than 25/i);
  });

  test('throws when no adult is included', () => {
    expect(() =>
      service.purchaseTickets(1, new TicketTypeRequest('CHILD', 3))
    ).toThrow(/at least one adult/i);
  });

  test('throws when more infants than adults', () => {
    expect(() =>
      service.purchaseTickets(
        1,
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('INFANT', 2)
      )
    ).toThrow(/infant must have an accompanying adult/i);
  });

  test('calculates correct payment and seat count', async () => {
    const { default: TicketPaymentService } = await import('../src/thirdparty/paymentgateway/TicketPaymentService.js');
    const { default: SeatReservationService } = await import('../src/thirdparty/seatreservation/SeatReservationService.js');

    const mockPayment = TicketPaymentService.mock.instances[0].makePayment;
    const mockReserve = SeatReservationService.mock.instances[0].reserveSeat;

    service.purchaseTickets(
      123,
      new TicketTypeRequest('ADULT', 2),
      new TicketTypeRequest('CHILD', 3),
      new TicketTypeRequest('INFANT', 1)
    );

    // £25 * 2 + £15 * 3 = £95
    expect(mockPayment).toHaveBeenCalledWith(123, 95);

    // Seats = 2 (adults) + 3 (children) = 5
    expect(mockReserve).toHaveBeenCalledWith(123, 5);
  });
});