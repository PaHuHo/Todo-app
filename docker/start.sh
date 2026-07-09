
#!/bin/sh

cd /var/www

# nếu chưa có .env thì tạo
if [ ! -f .env ]; then
    cp .env.example .env
fi

if [ ! -d vendor ]; then
    composer install
fi

if ! grep -q "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
fi

php artisan migrate --force

# chạy laravel
php artisan serve --host=0.0.0.0 --port=8000