FROM php:8.1-apache
RUN apt-get update -y && apt-get install -y openssl zip unzip git libonig-dev libzip-dev
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install mysqli pdo_mysql
WORKDIR /app/backend
# COPY composer*.json .
COPY . .
RUN composer install
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]
