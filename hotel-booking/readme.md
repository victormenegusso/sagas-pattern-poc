# Hotel Booking

Run Hotel Booking:
```bash
docker-compose up
```

## Hotel Service
Service in NodeJS
Service run on port: 7171

### API

#### List rooms
```bash
curl -X GET \
  http://localhost:7171/rooms
```

#### Create room
```bash
curl -X POST \
  http://localhost:7171/rooms \
  -H 'content-type: application/json' \
  -d '{
	"hotelName": "big plaza",
    "roomName": "room_142",
    "description": "desc....",
    "available": true
}'
```

### BUY room
```bash
curl -X POST \
  http://localhost:7171/buy \
  -H 'content-type: application/json' \
  -d '{"room_id":"5c6cbff322faba00132b518b"}'
```

### BUY-UNDO room
```bash
curl -X POST \
  http://localhost:7171/buy/undo \
  -H 'content-type: application/json' \
  -d '{"room_id":"5c6cbff322faba00132b518b"}'
```

## Hotel Front
Single Page 'CRUD' for tests

```
http://localhost:7172
```