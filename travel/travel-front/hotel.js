const API = 'http://localhost:7171'
const API_LIST = `${API}/rooms`

const renderTableHotel = () => {
    const table = `
    <table class="table" id='rooms'>
        <thead>
            <tr>
                <th>id</th>
                <th>Hotel Name</th>
                <th>Room Name</th>
                <th>Description</th>
                <th>Available</th>
            </tr>
        </thead>
        <tbody id="roomsRows"></tbody>
    </table>`

    $('#container').append(table)
}

const renderRowsHotel = rooms => {
    const rows = rooms.map(room => {
        return $('<tr>')
            .append($('<td>').append(`<input type='radio' name='hotel_room_id' value='${room._id}' /> ${room._id}`))
            .append($('<td>').append(room.hotelName))
            .append($('<td>').append(room.roomName))
            .append($('<td>').append(room.description))
            .append($('<td>').append('' + room.available))
    })
    $('#roomsRows').html(rows)
}

const getRooms = () => {
    $.ajax({
        url: API_LIST,
        success: rooms => {
            renderRowsHotel(rooms)
        }
    })
}

const renderButtonInitHotels = () => {
    const type = 'Update'
    const label = 'HOTEL - INIT'
    
    const button = $('<button>').addClass(`btn btn-${type}`).html(label)
    button.click(() => initHotels())
    $('#containerINIT').append(button)
}

const initHotels = () => {

    createHotelRoom({ 'hotelName':'hotel_1', 'roomName':'room_a', 'description':'descA', 'available':true })

    createHotelRoom({ 'hotelName':'hotel_1', 'roomName':'room_b', 'description':'descB', 'available':true })

    createHotelRoom({ 'hotelName':'hotel_2', 'roomName':'room_c', 'description':'descC', 'available':false })
}

const createHotelRoom = (room) => {
    $.ajax({
        method: 'POST',
        url: `${API}/rooms/`,
        data: room,
        success: getRooms
    })
}

$(() => {
    renderButtonInitHotels()
    renderTableHotel()
    getRooms()
})