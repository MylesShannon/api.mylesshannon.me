#!/bin/bash

sudo apt-get update #> /dev/null 2>&1
# sudo apt-get upgrade
sudo apt-get install php5 php5-mysql -y
sudo apt-get install apache2 libapache2-mod-php5 -y
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
sudo chown -R ubuntu /home/ubuntu/.composer
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
# echo "source /home/ubuntu/.nvm/nvm.sh" >> /home/ubuntu/.profile
# source /home/ubuntu/.profile
# nvm install 4.4.7
# nvm alias default 4.4.7
# npm install -g grunt grunt-cli bower
composer global require "laravel/installer"
cd "/vagrant" && composer install
sudo chgrp -R www-data /vagrant
sudo chmod -R 775 /vagrant
sudo chmod -R 777 /vagrant/storage
sudo a2dissite 000-default
mkdir "/home/ubuntu/logs"
printf "<VirtualHost *:80>\n	DocumentRoot /vagrant/public\n	ServerName api.mylesshannon.me\n	ServerAlias *.mylesshannon.me\n	ErrorLog /home/ubuntu/logs/api-error.log\n	CustomLog /home/ubuntu/logs/api-access.log combined\n	<Directory /vagrant/public>\n		AllowOverride All\n		Require all granted\n	</Directory>\n</VirtualHost>" | sudo tee /etc/apache2/sites-available/api.conf
sudo a2ensite api
sudo a2enmod rewrite
sudo service apache2 restart
echo "DONE!"