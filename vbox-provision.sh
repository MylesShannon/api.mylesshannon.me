#!/bin/bash

sudo apt-get update #> /dev/null 2>&1
sudo apt-get install libapache2-mod-php5 php5-mysql -y
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
sudo chown -R vagrant /home/vagrant/.composer
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
# echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
# source /home/vagrant/.profile
# nvm install 4.4.7
# nvm alias default 4.4.7
# npm install -g grunt grunt-cli bower
composer global require "laravel/installer"
cd "/vagrant" && composer install
sudo a2dissite 000-default
mkdir "/home/vagrant/logs"
printf "<VirtualHost *:80>\n	DocumentRoot /vagrant/public\n	ServerName api.mylesshannon.me\n	ServerAlias *.mylesshannon.me\n	ErrorLog /home/vagrant/logs/api-error.log\n	CustomLog /home/vagrant/logs/api-access.log combined\n	<Directory /vagrant/public>\n		AllowOverride All\n		Require all granted\n	</Directory>\n</VirtualHost>" | sudo tee /etc/apache2/sites-available/api.confsudo a2ensite api
sudo a2enmod rewrite
sudo service apache2 restart
echo "DONE!"