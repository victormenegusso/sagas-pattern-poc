const API_CAR = 'http://localhost:7272'
const API_CAR_LIST = `${API_CAR}/cars`

const renderTableCars = () => {
    const table = `
    <table class="table" id='rooms'>
        <thead>
            <tr>
                <th>id</th>
                <th>brand</th>
                <th>model</th>
                <th>year</th>
                <th>description</th>
                <th>price</th>
                <th>qttTotal</th>
                <th>qttRented</th>
            </tr>
        </thead>
        <tbody id="carsRows"></tbody>
    </table>`

    $('#container').append(table)
}

const renderRowsCars = cars => {
    const rows = cars.map(car => {
        return $('<tr>')
            .append($('<td>').append(`<input type='radio' name='car_id' value='${car._id}' /> ${car._id}`))
            .append($('<td>').append(car.brand))
            .append($('<td>').append(car.model))
            .append($('<td>').append(car.year))
            .append($('<td>').append(car.description))
            .append($('<td>').append(car.price))
            .append($('<td>').append(car.qttTotal))
            .append($('<td>').append(car.qttRented))
    })
    $('#carsRows').html(rows)
}

const getCars = () => {
    $.ajax({
        url: API_CAR_LIST,
        success: cars => {
            renderRowsCars(cars)
        }
    })
}

const renderButtonInitCars = () => {
    const type = 'Update'
    const label = 'CARS - INIT'
    
    const button = $('<button>').addClass(`btn btn-${type}`).html(label)
    button.click(() => initCars())
    $('#containerINIT').append(button)
}

const initCars = () => {

    createCar({ 'brand':'vw', 'model':'gol', 'year':'2019', 'description':'desc', 'price':10,  'qttTotal':10, 'qttRented':0})

    createCar({ 'brand':'ch', 'model':'onix', 'year':'2019', 'description':'desc', 'price':2,  'qttTotal':10, 'qttRented':0})

    createCar({ 'brand':'rn', 'model':'clio', 'year':'2019', 'description':'desc', 'price':10,  'qttTotal':10, 'qttRented':10})
}

const createCar = (car) => {
    $.ajax({
        method: 'POST',
        url: `${API_CAR_LIST}`,
        data: car,
        success: getCars
    })
}

$(() => {
    renderButtonInitCars()
    renderTableCars()
    getCars()
})