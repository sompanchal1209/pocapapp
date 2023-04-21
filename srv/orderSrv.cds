using { som.db } from '../db/demotable';

service OrdersSrv {

    entity Myorders as projection on db.orders;

}
