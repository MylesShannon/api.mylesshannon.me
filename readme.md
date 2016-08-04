# api.mylesshannon.me

## This project demonstrates the usage of:
* Laravel as a JSON API back-end
* Vagrant configured for VirtualBox and AWS deployment

## How to intall and run
### Required packages to be installed globally on local machine
* [PHP](http://php.net/manual/en/install.php)
* [Composer](https://getcomposer.org/download)
* [Laravel](https://laravel.com/docs/5.2/installation)
* [nodejs/npm](https://nodejs.org/en/download)

### For vagrant deployment
* [vagrant](https://www.vagrantup.com/downloads.html)
* vagrant 'vagrant-aws' plugin => `vagrant plugin install vagrant-aws`
* vagrant 'dummy vagrant-aws' box => `vagrant box add dummy https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box`
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* Amazon Web Services account (optional)

### Acquiring required libraries and dependencies
```sh
composer global require "laravel/installer"
composer install
```

## Running/building this project...
### For development
#### With vagrant
```sh
vagrant up --provider="virtualbox"
```
If your vagrant VirtualBox is already up, run instead:
```sh
vagrant reload
```
#### Without vagrant
```sh
php artisan serve
```
### For production with vagrant to AWS
```sh
vagrant up --provider="aws"
```
If your vagrant EC2 instance is already up and your ready for redeployment, run instead:
```sh
vagrant reload
```
## Configuring for AWS vagrant provider
### How to configure Vagrantfile for AWS deployment
* Change lines labeled "static configurations"
* Then follow the next step, "How to configure AWS credentials for vagrant"

### How to configure AWS credentials for Vagrantfile
Follow [these instructions](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) to install `awscli`, and then run and follow the prompts with:
```sh
aws configure
```
Vagrant automatically looks for credentials at "~/.aws/credentials" on `vagrant up --provider="aws"`

#### also requires a .env config file
