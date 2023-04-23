using { som.db } from '../db/datamodel';

service CatalogService@(path:'/CatalogService') {

    entity EmployeeSet as projection on db.master.employees;

    entity AddressSet as projection on db.master.address;

    entity ProductSet as projection on db.master.product;

    entity BPSet as projection on db.master.businesspartner;

    entity POs @(
        title: '{i18n>poHeader}'
    ) as projection on db.transaction.purchaseorder{
        *,
        Items: redirected to POItems
    }

    entity POItems @( title : '{i18n>poItems}' )
    as projection on db.transaction.poitems{
        *,
        PARENT_KEY: redirected to POs,
        PRODUCT_GUID: redirected to ProductSet
    }

}
