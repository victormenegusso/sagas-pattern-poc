import psycopg2
import json
import os
from bottle import Bottle, request, response
 
class Sender(Bottle):
    def __init__(self):
        super().__init__()
        
        # routes
        self.route('/tickets', method='POST', callback=self.apiSave)
        self.route('/tickets', method='GET', callback=self.apiList)
        self.route('/buy', method='POST', callback=self.apiBuy)
        self.route('/buy/undo', method='POST', callback=self.apiUndoBuy)
        
        # db service ( compose )
        db_host = os.getenv('DB_HOST', 'db')
        db_user = os.getenv('DB_USER', 'postgres')
        db_name = os.getenv('DB_NAME', 'airline_tickets')
        dsn = f'dbname={db_name} user={db_user} host={db_host}'
        self.conn = psycopg2.connect(dsn)
    
    # API /tickets POST 
    def apiSave(self):
        data = request.json
        self.save(data.get('nameCompany', 'company'), data.get('nameSeat', 'seat'), data.get('available', True))
        return data

    # API /tickets GET
    def apiList(self):
        return self.list()

    # API /buy
    def apiBuy(self):
        ticket_id = request.json.get('ticket_id', 0)
        if(self.buy(ticket_id)):
            return json.dumps({'status': 'ok', 'ticket_id':ticket_id})          

        response.status = 400
        response.content_type = 'application/json'
        return json.dumps({'status': 'failed to buy'})

    # API /buy/undo
    def apiUndoBuy(self):
        ticket_id = request.json.get('ticket_id', 0)
        if(self.undoBuy(ticket_id)):
            return json.dumps({'status': 'ok', 'ticket_id':ticket_id})          

        response.status = 400
        response.content_type = 'application/json'
        return json.dumps({'status': 'failed to undu'})

    # save ticket
    def save(self, nameCompany, nameSeat, available):
        SQL = 'INSERT INTO tickets (nameCompany, nameSeat, available) VALUES (%s, %s, %s)'
        cur = self.conn.cursor()
        cur.execute(SQL, (nameCompany, nameSeat, available))
        self.conn.commit()
        cur.close()

    # list all tickets
    def list(self):
        SQL = 'SELECT * FROM tickets'
        cur = self.conn.cursor()
        cur.execute(SQL)
        data = json.dumps(cur.fetchall(), indent=2)
        cur.close() 

        return data

    # buy a ticket
    def buy(self, ticket_id):
        SQL = 'SELECT * FROM tickets WHERE id = %s and available=true'
        cur = self.conn.cursor()
        cur.execute(SQL,[ticket_id])
        
        if(cur.rowcount == 0):
            cur.close() 
            return False

        SQL = 'UPDATE tickets SET available = false WHERE id = %s'
        cur.execute(SQL,[ticket_id])

        cur.close()  
        return True

    # undo buy ticket ( rollback )
    def undoBuy(self, ticket_id):
        SQL = 'SELECT * FROM tickets WHERE id = %s'
        cur = self.conn.cursor()
        cur.execute(SQL,[ticket_id])
        
        if(cur.rowcount == 0):
            cur.close() 
            return False

        SQL = 'UPDATE tickets SET available = true WHERE id = %s'
        cur.execute(SQL,[ticket_id])
        
        cur.close()  
        return True

if __name__ == '__main__':
    print('INIT')
    sender = Sender()
    sender.run(host='0.0.0.0', port=7070, debug=True)