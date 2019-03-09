#!/bin/bash
# airline
cd airline-tickets
docker-compose up -d

# car-rental
cd ..
cd car-rental-service
docker-compose up -d

# credit-service
cd ..
cd airline-tickets
docker-compose up -d

# hotel-booking
cd ..
cd hotel-booking
docker-compose up -d

# travel
cd ..
cd travel
docker-compose up