# siujaring-ptik

RESTFul API untuk Aplikasi Ujian Pilihan Ganda Daring menggunakan tools sebagai berikut:

- Framework => **Express.js**
- DBMS => **MariaDB**
- ORM => **Sequelize**
- Web Server => **XAMPP**

## Panduan Instalasi:

1. Clone repo dengan command:

```
    git clone https://github.com/nugraha-abd/siujaring-ptik.git
    atau
    git clone git@github.com:nugraha-abd/siujaring-ptik.git
```

2. Install dependencies dan devDependencies dengan command `npm install`

3. Buat database baru dengan nama **`siujaring`** pada PHPMyAdmin

4. Buat file `.env` pada folder utama

5. Buat variabel `ACCESS_TOKEN_SECRET` dan `REFRESH_TOKEN_SECRET` pada file `.env`

6. Jika ingin menambahkan akun admin jalankan command `npx sequelize-cli db:seed --seed 20211118101545-sample-admin`

```
    Username: admin
    Password: admin
```

7. Jalankan web service dengan command `npm run dev`

## Dummy Data:

Jika ingin menambahkan data dummy ganti command pada langkah no 6 menjadi `npx sequelize-cli db:seed:all`

## Dokumentasi Pengujian Endpoint:

https://documenter.getpostman.com/view/15098624/UVXokDat
