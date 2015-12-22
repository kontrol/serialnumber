This mini application uses Postgresql (DB), NodeJS(Server-side), and AngularJS(client-side)
Style wise, I wrote the app to remain compact and left comments to a minimum.  If there are any questions about the code feel free to contact me at <tony.broomes@gmail.com>
Project root directory: /home/tbroomes/serial-number-app/

The database and schema has already been created.  If you want to start with a fresh database, run

    node db/database.js 

from the project root


In order to run the application, run the command

    npm start 

from projects root directory.

Once started go to 
http://45.55.248.243:3000

From Here you can add or void serial numbers by placing a number in textbox, then clicking the corresponding button.

You can also void individual serial numbers by using the checkbox.  It will remove the serial number immediately.

The database configuration can be found in config.js
I installed a GUI component to view the postgres data as well
go to 
http://45.55.248.243/phppgadmin
and use login tek/tek to gain access

The database name is serial and the table is serial_numbers. 
