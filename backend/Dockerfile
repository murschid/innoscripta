FROM php:8.1-fpm
RUN apt-get update -y && apt-get install -y openssl zip unzip git curl libonig-dev libzip-dev
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install mysqli pdo_mysql
WORKDIR /app/backend
COPY . .
COPY .env.example .env
RUN composer install
RUN php artisan key:generate --force
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]
