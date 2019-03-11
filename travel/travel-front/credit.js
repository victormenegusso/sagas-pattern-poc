const API_CREDIT = 'http://localhost:7178'
const API_CREDIT_LIST = `${API_CREDIT}/credit`

const renderTableAccount = () => {
    const table = `
    <table class="table" id='accounts'>
        <thead>
            <tr>
                <th>id</th>
                <th>clientName</th>
                <th>maxCreditAllowed</th>
                <th>creditUsed</th>
            </tr>
        </thead>
        <tbody id="accountRows"></tbody>
    </table>`

    $('#container').append(table)
}

const renderRowsAccount = accounts => {
    const rows = accounts.map(account => {
        return $('<tr>')
            .append($('<td>').append(`<input type='radio' name='account_id' value='${account._id}' /> ${account._id}`))
            .append($('<td>').append(account.clientName))
            .append($('<td>').append(account.maxCreditAllowed))
            .append($('<td>').append(account.creditUsed))
    })
    $('#accountRows').html(rows)
}

const getAccounts = () => {
    $.ajax({
        url: API_CREDIT_LIST,
        success: accounts => {
            renderRowsAccount(accounts)
        }
    })
}

const renderButtonInitAccounts = () => {
    const type = 'Update'
    const label = 'ACCOUNT - INIT'
    
    const button = $('<button>').addClass(`btn btn-${type}`).html(label)
    button.click(() => initAccount())
    $('#containerINIT').append(button)
}

const initAccount = () => {

    createAccount({ 'clientName':'Victor', 'maxCreditAllowed':10, 'creditUsed':10})

    createAccount({ 'clientName':'Natan', 'maxCreditAllowed':10000000, 'creditUsed':10})

    createAccount({ 'clientName':'Boao Jini', 'maxCreditAllowed':20001, 'creditUsed':0})
}

const createAccount = (account) => {
    $.ajax({
        method: 'POST',
        url: `${API_CREDIT_LIST}`,
        data: account,
        success: getAccounts
    })
}

$(() => {
    renderButtonInitAccounts()
    renderTableAccount()
    getAccounts()
})