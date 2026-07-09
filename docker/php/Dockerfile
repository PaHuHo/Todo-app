FROM php:8.3-fpm

# Cài các package cần thiết
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev

# Cài extension cho Laravel
RUN docker-php-ext-install pdo_mysql zip

# Cài Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Thư mục làm việc
WORKDIR /var/www

COPY docker/start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh

CMD ["start.sh"]