namespace som.db;

type Integer16 : Integer @edm.Type : 'Int16';

entity orders 
{
	key orderid : Integer16;
	customername : String(120);
	contactperson : String(64);
	grossamount : Decimal(10,2);
	currency : String(4) not null;
}