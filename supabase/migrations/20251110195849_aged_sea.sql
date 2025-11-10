-- Seed data untuk testing dan development
-- Jalankan setelah schema.sql

USE document_verification;

-- Tambah data admin untuk testing
INSERT IGNORE INTO users (username, password, email) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@lirboyo.net'),
('sekretaris', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'sekretaris@lirboyo.net');

-- Tambah lebih banyak signers untuk testing
INSERT IGNORE INTO signers (id, nama, jabatan, bio, links_json) VALUES
(11, 'Nyai Khadijah', 'Pembina Santri Putri', 'Pembina santri putri yang berpengalaman dalam mendidik dan membimbing santri putri.', '[]'),
(12, 'Ustadz Hasan Basri', 'Kepala Perpustakaan', 'Kepala perpustakaan yang mengelola koleksi kitab dan buku-buku Islam klasik dan modern.', '[]'),
(13, 'Ustadz Umar Faruq', 'Koordinator Tahfidz', 'Koordinator program tahfidz Al-Quran dengan metode pembelajaran yang efektif.', '[]'),
(14, 'Ustadz Zainuddin', 'Kepala Bagian Sarana Prasarana', 'Kepala bagian yang mengelola dan memelihara sarana prasarana pondok pesantren.', '[]'),
(15, 'Nyai Aisyah', 'Koordinator Kesehatan Santri', 'Koordinator kesehatan yang menangani kesehatan dan kesejahteraan santri.', '[]');

-- Tambah dokumen untuk testing dengan berbagai kombinasi signers
INSERT IGNORE INTO documents (id, nomor_dokumen, judul, file_jpg) VALUES
(6, 'DOC006/2025', 'Surat Keputusan Pembagian Tugas Mengajar Semester Genap', 'doc_006_2025.jpg'),
(7, 'DOC007/2025', 'Undangan Rapat Persiapan Bulan Ramadhan 1446 H', 'doc_007_2025.jpg'),
(8, 'DOC008/2025', 'Surat Edaran Tata Tertib Santri Baru Tahun Ajaran 2025/2026', 'doc_008_2025.jpg'),
(9, 'DOC009/2025', 'Undangan Rapat Koordinasi Kegiatan Tahfidz Al-Quran', 'doc_009_2025.jpg'),
(10, 'DOC010/2025', 'Surat Keputusan Pengangkatan Koordinator Baru Bidang Kesehatan', 'doc_010_2025.jpg');

-- Tambah file untuk dokumen baru
INSERT IGNORE INTO document_files (document_id, file_name, file_path, file_type) VALUES
-- DOC006/2025
(6, 'SK_Pembagian_Tugas.pdf', 'doc_006_main.pdf', 'application/pdf'),
(6, 'Jadwal_Mengajar.xlsx', 'doc_006_jadwal.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
-- DOC007/2025
(7, 'Undangan_Ramadhan.pdf', 'doc_007_main.pdf', 'application/pdf'),
(7, 'Agenda_Persiapan.docx', 'doc_007_agenda.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
(7, 'Kalender_Ramadhan.jpg', 'doc_007_kalender.jpg', 'image/jpeg'),
-- DOC008/2025
(8, 'Tata_Tertib_Santri.pdf', 'doc_008_main.pdf', 'application/pdf'),
(8, 'Panduan_Orientasi.pdf', 'doc_008_panduan.pdf', 'application/pdf'),
-- DOC009/2025
(9, 'Undangan_Tahfidz.pdf', 'doc_009_main.pdf', 'application/pdf'),
(9, 'Program_Tahfidz.docx', 'doc_009_program.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
-- DOC010/2025
(10, 'SK_Koordinator_Kesehatan.pdf', 'doc_010_main.pdf', 'application/pdf');

-- Tambah relasi document-signer untuk dokumen baru
INSERT IGNORE INTO document_signers (document_id, signer_id, jabatan) VALUES
-- DOC006/2025 - SK Pembagian Tugas
(6, 2, 'Kepala Madrasah'),
(6, 6, 'Koordinator Pendidikan'),
(6, 9, 'Kepala Bagian Kurikulum'),
-- DOC007/2025 - Persiapan Ramadhan
(7, 1, 'Pengasuh Pondok Pesantren'),
(7, 10, 'Koordinator Kegiatan Santri'),
(7, 8, 'Koordinator Santri Putri'),
-- DOC008/2025 - Tata Tertib Santri Baru
(8, 2, 'Kepala Madrasah'),
(8, 10, 'Koordinator Kegiatan Santri'),
(8, 11, 'Pembina Santri Putri'),
-- DOC009/2025 - Kegiatan Tahfidz
(9, 13, 'Koordinator Tahfidz'),
(9, 2, 'Kepala Madrasah'),
(9, 1, 'Pengasuh Pondok Pesantren'),
-- DOC010/2025 - Koordinator Kesehatan
(10, 1, 'Pengasuh Pondok Pesantren'),
(10, 4, 'Sekretaris'),
(10, 15, 'Koordinator Kesehatan Santri');

-- Update beberapa signers dengan foto dan links untuk testing
UPDATE signers SET 
    photo = 'signer_1.jpg',
    foto_url = 'uploads/signers/signer_1.jpg',
    links_json = JSON_ARRAY(
        JSON_OBJECT('label', 'Website Resmi', 'url', 'https://lirboyo.net'),
        JSON_OBJECT('label', 'Instagram', 'url', 'https://instagram.com/lirboyo_official')
    )
WHERE id = 1;

UPDATE signers SET 
    photo = 'signer_2.jpg',
    foto_url = 'uploads/signers/signer_2.jpg',
    links_json = JSON_ARRAY(
        JSON_OBJECT('label', 'LinkedIn', 'url', 'https://linkedin.com/in/muhammad-ridwan')
    )
WHERE id = 2;

UPDATE signers SET 
    photo = 'signer_3.jpg',
    foto_url = 'uploads/signers/signer_3.jpg'
WHERE id = 3;

-- Tampilkan statistik setelah seeding
SELECT 'Seeding completed successfully!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_signers FROM signers;
SELECT COUNT(*) as total_documents FROM documents;
SELECT COUNT(*) as total_document_files FROM document_files;
SELECT COUNT(*) as total_document_signers FROM document_signers;

-- Tampilkan beberapa contoh data
SELECT 'Sample Documents:' as info;
SELECT nomor_dokumen, judul, created_at FROM documents ORDER BY created_at DESC LIMIT 5;

SELECT 'Sample Signers:' as info;
SELECT nama, jabatan FROM signers LIMIT 5;