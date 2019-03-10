const API_AIR_LINE = 'http://localhost:7070'
const API_AIR_LINE_LIST = `${API_AIR_LINE}/tickets`

const renderTableAirline = () => {
    const table = `
    <table class="table" id='tickets'>
        <thead>
            <tr>
                <th>id</th>
                <th>nameCompany</th>
                <th>nameSeat</th>
                <th>Available</th>
            </tr>
        </thead>
        <tbody id="roomsTickets"></tbody>
    </table>`

    $('#container').append(table)
}

const renderRowsTickets = tickets => {
    const rows = tickets.map(ticket => {
        return $('<tr>')
            .append($('<td>').append(`<input type='radio' name='ticket_id' value='${ticket[0]}' /> ${ticket[0]}`))
            .append($('<td>').append(ticket[1]))
            .append($('<td>').append(ticket[2]))
            .append($('<td>').append('' +ticket[3]))
    })
    $('#roomsTickets').html(rows)
}

const getTickets = () => {
    $.ajax({
        url: API_AIR_LINE_LIST,
        success: tickets => {
            renderRowsTickets(JSON.parse(tickets))
        }
    })
}

const renderButtonInitTickets = () => {
    const type = 'Update'
    const label = 'TICKETS - INIT'
    
    const button = $('<button>').addClass(`btn btn-${type}`).html(label)
    button.click(() => initTickets())
    $('#containerINIT').append(button)
}

const initTickets = () => {

    createTicket({ 'nameCompany':'gol', 'nameSeat':'seat_1', 'available':true })

    createTicket({ 'nameCompany':'gol', 'nameSeat':'seat_2', 'available':false })

    createTicket({ 'nameCompany':'tam', 'nameSeat':'seat_1', 'available':true })
}

const createTicket = (ticket) => {
    $.ajax({
        method: 'POST',
        url: `${API_AIR_LINE_LIST}`,
        data: JSON.stringify(ticket),
        contentType: 'application/json; charset=utf-8',
        success: getTickets
    })
}

$(() => {
    renderButtonInitTickets()
    renderTableAirline()
    getTickets()
})