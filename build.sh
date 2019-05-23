##################### Download and install MongoDB ##############################

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 68818C72E52529D4
sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
sudo netstat -plntu
mongo
use admin
db.createUser({user:"admin", pwd:"admin", roles:[{role:"root", db:"admin"}]})
exit


##################### Download and install NodeJs ##############################

sudo apt-get install curl python-software-properties
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs


##################### install node modules ##############################
npm i 
