export default function validateTickets(accountId, ticketTypeRequests) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new Error('Invalid account ID');
    }
  
    const totals = {
      ADULT: 0,
      CHILD: 0,
      INFANT: 0,
      TOTAL: 0
    };
  
    for (const req of ticketTypeRequests) {
      const type = req.getTicketType();
      const count = req.getNoOfTickets();
  
      if (!['ADULT', 'CHILD', 'INFANT'].includes(type)) {
        throw new Error(`Unknown ticket type: ${type}`);
      }
  
      totals[type] += count;
      totals.TOTAL += count;
    }
  
    if (totals.TOTAL > 25) {
      throw new Error('Cannot purchase more than 25 tickets');
    }
  
    if (totals.ADULT === 0 && (totals.CHILD > 0 || totals.INFANT > 0)) {
      throw new Error('At least one adult must accompany children or infants');
    }
  
    if (totals.INFANT > totals.ADULT) {
      throw new Error('Each infant must have an accompanying adult');
    }
  
    return totals;
  }
  