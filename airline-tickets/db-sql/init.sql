create database airline_tickets;

\c airline_tickets

create table tickets (
  id serial not null,
  nameCompany varchar(100) not null,
  nameSeat varchar(100) not null,
  available boolean not null
);