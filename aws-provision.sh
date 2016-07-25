#!/bin/bash

sudo apt-get update #> /dev/null 2>&1
sudo apt-get install libapache2-mod-php5 php5-mysql -y
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
sudo chown -R ubuntu:www-data /vagrant/vendor
sudo chmod -R 0775 /vagrant
sudo a2dissite 000-default
mkdir "/home/ubuntu/logs"
printf "ServerName api.mylesshannon.me\n<VirtualHost *:80>\n DocumentRoot /vagrant/public\n ErrorLog /home/ubuntu/logs/api-error.log\n CustomLog /home/ubuntu/logs/api-access.log combined\n <Directory /vagrant/public>\n  Options Indexes FollowSymLinks\n  AllowOverride All\n  Require all granted\n </Directory> \n</VirtualHost>" | sudo tee /etc/apache2/sites-available/api.conf
sudo a2ensite api
sudo a2enmod rewrite
sudo service apache2 restart
echo "DONE!"