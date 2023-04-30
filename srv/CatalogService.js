const cds = require('@sap/cds');
module.exports = cds.service.impl(
    async function() {
        this.on('sleep', async() => {
            try {
            const db = await cds.connect.to('db');// connect to DB
            const dbClass = require('sap-hdbext-promisfied'); //Using Promisified fucntion
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials)); // get Hana Instance
            const hdbext = require('@sap/hdbext');
            const sp = await dbConn.loadProcedurePromisified(hdbext,null,'sleep');
            const output = await dbConn.callProcedurePromisified(sp,[]); // you get explanation of these when type ()
            console.log(output);
            return true;
            }
            catch(error){
                console.log(error);
                return false;
            }

        });

        const { EmployeeSet } = this.entities;
        this.before('UPDATE',EmployeeSet, (req,res) => {
            console.log("Kya aya", req.data.salaryAmount);
        if(parseFloat(req.data.salaryAmount) >= 1000000){
            req.error(500,"bhai thikse daal salary");
        }
        })
    }
    


)


// const db = await cds.connect.to('db'); - This line connects to a database using the cds library and returns a database object db. The await keyword is used because the connect.to() method returns a Promise that resolves with the database object.

// const dbClass = require('sap-hdbext-promisfied'); - This line imports the sap-hdbext-promisfied module and assigns it to a variable dbClass. This module provides promisified versions of SAP HANA client APIs.

// let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials)); - This line creates a new instance of the dbClass object using the createConnection() method of the dbClass module. The await keyword is used because the createConnection() method returns a Promise that resolves with the connection object. The connection object is then used to create a new instance of the dbClass.

// const hdbext = require('@sap/hdbext'); - This line imports the @sap/hdbext module, which provides additional functionality for SAP HANA client APIs.

// const sp = await dbConn.loadProcedurePromisified(hdbext,null,'sleep'); - This line loads a stored procedure named sleep using the loadProcedurePromisified() method of the dbConn object. The await keyword is used because the loadProcedurePromisified() method returns a Promise that resolves with a stored procedure object sp.

// const output = await dbConn.callProcedurePromisified(sp,[]); - This line calls the stored procedure sp using the callProcedurePromisified() method of the dbConn object. The await keyword is used because the callProcedurePromisified() method returns a Promise that resolves with the output of the stored procedure. In this case, no parameters are passed to the stored procedure.

// console.log(output); - This line logs the output of the stored procedure to the console.
