if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-progress --no-interaction
fi

if [ ! -f ".env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp .env.example .env
else
    echo "env file exists."
fi

php artisan migrate
php artisan key:generate
php artisan cache:clear
php artisan serve --host=0.0.0.0
exec docker-php-entrypoint "$@"
