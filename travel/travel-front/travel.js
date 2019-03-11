const buyTravel = () => {

    const idRoom = $("input[name='hotel_room_id']:checked").val()
    const idTicket = $("input[name='ticket_id']:checked").val()
    const idCar = $("input[name='car_id']:checked").val()
    const idAccount = $("input[name='account_id']:checked").val()


    console.log(`${idRoom} -- ${idTicket} -- ${idCar} -- ${idAccount}`)

    //alert(`${idRoom} -- ${idTicket} -- ${idCar} -- ${idAccount}`)
    debugger
    $.ajax({
        method: 'POST',
        url: `http://localhost:8080/travel`,
        data: {idRoom, idTicket, idCar, idAccount},
        success: function(data) {
            console.log(data)
            alert(data);
        },
        error: function(xhr) {
            console.log(xhr)
            alert("Error occured.please try again" + xhr);
        }
    })
}

$(() => {
    $('[save]').click(buyTravel)
})