const fs = require('fs');

class Ticket {
    constructor(num, desk) {
        this.num = num;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        let data = require('../data/data.json');
        this.tickets = [];
        this.last4tickets = [];

        console.log('data:', data);

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
        } else {
            this.resetJson();
        }
    }

    resetJson() {
        this.last = 0;
        this.tickets = [];
        this.last4tickets = [];
        console.log('reinicio conteo.');
        this.saveJson();
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveJson();
        return this.last; //`Ticket: ${this.last}`
    }

    getLastTicket() {
        return this.last;
    }

    getLast4() {
        return this.last4tickets;
    }

    setTicketDesktop(desk) {
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes.'
        }

        let ticketNum = this.tickets[0].num;
        this.tickets.shift(); //borra el elemento

        let servTicket = new Ticket(ticketNum, desk);
        this.last4tickets.unshift(servTicket); //agrega ticket al inicio del arreglo
        if (this.last4tickets.length > 4) {
            this.last4tickets.splice(-1, 1); //borra el ultimo elemento
        }

        this.saveJson;

        console.log('ultimos 4:');
        console.log(this.last4tickets);

        return servTicket;
    }



    saveJson() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4tickets: this.last4tickets
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
};