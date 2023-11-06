### expressJS-multi-role
*Restful CRUD and multi Role app using Express JS and MySQL*

### Getting Start Guide
Clone this repo to your local computer.

- copy the **.env.example** file, then paste and delete the .example so it becomes an **.env** file.
- fill the port and secret session data in the **.env** file as you wish.
- set up the database according to what is in your local database in the **config/Database.js** file.
- Run the command bellow to install package dependencies (get node_modules)
```sh
npm install
```
- in the **model/User.js** file, uncomment the script on lines 50 to 55, then run the command below (for generate the table User automatically):
```sh
node models/User.js
```
- do the same thing in the **model/Product.js** file to generate the Product table, run command bellow:
```sh
node models/Product.js
```
- in the **index.js** file uncomment the script on line 36, then run the command bellow (for generate the table Session automatically):
```sh
node index.js
```
*After it has been successfully generated, comment back on the script on the three files*

Run the command bellow
```sh
nodemon index
```
**The app ready to use**
