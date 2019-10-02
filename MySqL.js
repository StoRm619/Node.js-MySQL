var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

//Var for ID pick
var pickID = "";

function start() {
    inquirer
        .prompt([{
            type: "input",
            message: "What is the ID of the item your would like to purchase? [Quit with Q]",
            name: "userInput"
        }]).then(function(inquirerResponse) {
            console.log
            switch (inquirerResponse.userInput) {
                case "Q":
                    connection.end();
                    break;
                case "q":
                    connection.end();
                    break;
                default:
                    pickID += inquirerResponse.userInput;
                    console.log(pickID);
                    amount();
                    break;
            }
        });

}

function amount() {
    inquirer
        .prompt([{
            type: "input",
            message: "How many would you like? [Quit with Q]",
            name: "userInput"
        }, ]).then(function(inquirerResponse) {
            console.log
            switch (inquirerResponse.userInput) {
                case "Q":
                    connection.end();
                    break;
                case "q":
                    connection.end();
                    break;
                default:
                    updateProduct(inquirerResponse.userInput);
                    break;
            }
        });
}


function updateProduct(x) {
    console.log("Update\n");
    var query = connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ?  WHERE item_id = ?", [
            x, pickID
        ],
        function(err, res) {
            if (err) throw err;
            console.log("products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            readProducts();
        }
    );

    // // logs the actual query being run
    console.log(query.sql);
}



function readProducts() {
    pickID = "";

    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
}
readProducts();