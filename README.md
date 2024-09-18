# Aplikasi Backend Survei Pilkada

### Deskripsi Proyek:

Proyek ini adalah sebuah **Aplikasi Backend Survei Pilkada** yang dibangun dengan **Express.js** sebagai kerangka utama untuk backend. Aplikasi ini bertujuan untuk mengelola data kandidat, responden, dan hasil survei, serta menyimpan jawaban responden terkait dukungan mereka terhadap para kandidat dalam proses Pemilihan Kepala Daerah (Pilkada).

Aplikasi ini mencakup fitur-fitur berikut:

* **Manajemen Kandidat:** Menambahkan, mengedit, dan menghapus data kandidat yang ikut serta dalam Pilkada.
* **Manajemen Responden:** Responden dapat mendaftar, login, dan memberikan dukungan mereka kepada kandidat.
* **Survei Pilkada:** Aplikasi mengelola hasil survei yang berisi dukungan responden terhadap kandidat tertentu.

### Fitur Utama:

1. **Autentikasi dan Otentikasi (JWT + Bcryptjs)** :

* Pengguna (responden) bisa mendaftar dan login menggunakan email dan password yang dienkripsi dengan `bcryptjs`.
* Autentikasi menggunakan **JSON Web Token (JWT)** untuk mengamankan rute yang memerlukan otorisasi.

1. **Manajemen Data dengan Sequelize (PostgreSQL)** :

* **Sequelize** digunakan untuk mengelola model dan interaksi dengan database  **PostgreSQL** .
* Data kandidat, responden, dan hasil survei disimpan dan dimanipulasi melalui ORM Sequelize.

1. **Validasi Input (Joi)** :

* Setiap data yang masuk (pada saat pendaftaran responden, penambahan kandidat, atau hasil survei) divalidasi menggunakan **Joi** untuk memastikan data valid dan sesuai dengan aturan yang ditetapkan.

1. **Logging (Winston)** :

* **Winston** digunakan untuk logging pada aplikasi, termasuk logging error dan aktivitas penting lainnya yang dapat diatur dalam level logging tertentu (error, info, warn, dll.).

1. **Keamanan** :

* Password disimpan dengan aman menggunakan `bcryptjs`.
* **JWT** digunakan untuk mengamankan endpoint yang sensitif.

1. **Pengelolaan Database (pg dan pg-hstore)** :

* **pg** dan **pg-hstore** digunakan sebagai dependensi PostgreSQL untuk berkomunikasi dengan database.
