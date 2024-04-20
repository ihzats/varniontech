Langkah langkah instalasi:
download dari github,
composer install,
php artisan key:generate,
php artisan migrate,
php artisan db:seed,
php artisan serve


saya menggunakan fe dan be terpisah supaya enak buat maintenance, jadi jika ingin mengakses dari sisi fronted, backend wajib dijalankan dahulu.

data sudah saya buat dengan dummydata, jadi tinggal manggil aja php artisan db:seed.

