# Airline Tickets

Run  Airline Tickets:
```bash
docker-compose up
```
## Airline Tickets Service

Service run on port: 7070

### API

#### List tickets
```bash
curl -X GET \
  http://localhost:7070/tickets
```

#### Create Ticket
```bash
curl -X POST \
  http://localhost:7070/tickets \
  -H 'content-type: application/json' \
  -d '{"nameCompany":"GOL", "nameSeat":"seat A12", "available":true}'
```

### BUY Ticket
```bash
curl -X POST \
  http://localhost:7070/buy \
  -H 'content-type: application/json' \
  -d '{"ticket_id":1}'
```

### BUY-UNDO Ticket
```bash
curl -X POST \
  http://localhost:7070/buy/undo \
  -H 'content-type: application/json' \
  -d '{"ticket_id":1}'
```