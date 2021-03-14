
# E-Voting System
>India is a developing country and one of the biggest drawback is it's population density. Election Commission of India spent approximately 55,000 Crore INR for resources during the lok Sabha Elections in 2019. <br/>
Government has taken steps to digitalize India, which has reduced the cost and increased the transparency in a number of situations. <br/>
Hence, the definition of our project is to **Digitalize voting**, and thereby reduce the expenditure of Government, redirecting the saved money in the welfare of our nation.

The system that our team Apex is trying to build, is an electronic voting web-based application, where one application itself would handle all the aspects of voting system in the country. 

## Our Approach for Solving 
* ***A simple and user-friendly User Interface, for non-computer people*** <br/>
The general Users visiting our application would be non-computer people. To meet their level of understanding, we would need a user Interface, with an Instruction Manual attached.

* ***Within Electoral Party registration requests by aspiring candidates*** <br/>
A candidate can fill in forms to be able to stand undera particular political party like BJP. Once the form is filled, the approval of it would be done by the party admin of that political party.

* ***Voter Registration and three-step authentication protocol***<br/>
The most important part of this entire system is Authenticity. To make sure if a voter trying to register is authentic or not. This would be done in three steps:
    1) Voter enters his/her aadhar number and mobile number linked to aadhar.
    2) All the details from Government's aadhar database would be shown on the screen, to be verified by the user and an OTP would be sent on the registered email account of that user.
    3) Once the OTP is verified by the machine, registered user's data goes for a manual verification of documents within the dashboard of admin staff

    Every step will have a captcha required to be done within required time, or i'd refresh itself.
* ***Easy Voting and vote Verification***
On the Day of Election Voter would have to login and put a vote to the desired candidate. 

![usecase](https://user-images.githubusercontent.com/60515418/111027991-ab6c9180-8419-11eb-83f5-99b63dca8821.JPG)

## Verifying Binaries
**1. Clone the repository**<br/>
**2. Run the commands to install node package manager in Command-Line Interface**<br/>
`npm install` or `npm i`<br/>
**3. Open the server's folder and set up a .env file and paste the following in it**
```
SESSION_SECRET=secret1
CLOUDINARY_CLOUD_NAME=ddgnxopcv
CLOUDINARY_KEY=359437366889111
CLOUDINARY_SECRET=qCOsEIdEiFQTzrbFEZCXMSgpQPU
USER_NAME=admin-bhagyesh
PASSWORD=test123
DB_NAME=ApexEvoting
```
**4. To open client side type `npm start` in CLI**
**5. To open backend type 'nodemon app.js**

## Technological stack
 **Databases** - MongoDB
 <br/>
 ### `frontend`:<br/>
**material-ui** - React components for faster and easier web development<br/>
**axios** - Promise based HTTP client for the browser and node.js<br/>
**react** - JavaScript library for building user interfaces or UI components<br/>
**redux** - A Predictable State Container for JS Apps
<br/> 
### `Backend`:
**base-64** - Base64 is a encoding algorithm <br/>
**cloudinary** - Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline.<br/>

**dotenv** - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The 
Twelve-Factor App methodology.<br/>
**ejs** - Embedded JavaScript templates <br/>
**Express** - Fast, unopinionated, minimalist web framework for node.<br/>
**Mongoose**-Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.<br/>
**multer** - Middleware for handling 'multipart/form-data'<br/>
**passport** - Simple, unobtrusive authentication for Node.js.
<br/>

## Developers: 
![github](https://cloud.githubusercontent.com/assets/17016297/18839843/0e06a67a-83d2-11e6-993a-b35a182500e0.png)![linkedin](https://cloud.githubusercontent.com/assets/17016297/18839848/0fc7e74e-83d2-11e6-8c6a-277fc9d6e067.png)
<br/> 
#### Bhagyesh Jahangirpuriya
https://github.com/IBHAGYESH/
<br/> https://www.linkedin.com/in/bhagyesh-jahangirpuria
<br/>
#### Suvarna Vasava
https://github.com/Vsuvarn<br/> https://www.linkedin.com/in/suvarn-vasava
<br/>
#### Shreya Brahmbhatt
https://github.com/shreyabrahmbhatt
<br/> https://www.linkedin.com/in/shreya-brahmbhatt
