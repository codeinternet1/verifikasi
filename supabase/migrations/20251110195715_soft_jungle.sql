-- Document Verification System Database Schema
-- Pondok Pesantren Lirboyo Kediri
-- Updated with multi-file support

-- Create database
CREATE DATABASE IF NOT EXISTS document_verification CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE document_verification;

-- Table: users (untuk admin login)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: signers
CREATE TABLE IF NOT EXISTS signers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    jabatan VARCHAR(100),
    bio TEXT,
    photo VARCHAR(255),
    foto_url VARCHAR(500),
    links_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nama (nama),
    INDEX idx_jabatan (jabatan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: documents
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_dokumen VARCHAR(50) NOT NULL UNIQUE,
    judul TEXT NOT NULL,
    file_jpg VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nomor_dokumen (nomor_dokumen),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: document_files (untuk multi-file support)
CREATE TABLE IF NOT EXISTS document_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    INDEX idx_document_id (document_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: document_signers
CREATE TABLE IF NOT EXISTS document_signers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    signer_id INT NOT NULL,
    jabatan VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (signer_id) REFERENCES signers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_document_signer (document_id, signer_id),
    INDEX idx_document_id (document_id),
    INDEX idx_signer_id (signer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (username, password, email) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@lirboyo.net');

-- Insert sample signers
INSERT IGNORE INTO signers (id, nama, jabatan, bio, links_json) VALUES
(1, 'KH. Ahmad Zaini', 'Pengasuh Pondok Pesantren', 'Pengasuh Pondok Pesantren Lirboyo sejak 1995. Menguasai berbagai kitab klasik dan memimpin ribuan santri.', '[]'),
(2, 'Ustadz Muhammad Ridwan', 'Kepala Madrasah', 'Kepala Madrasah Aliyah dengan pengalaman 15 tahun dalam bidang pendidikan Islam.', '[]'),
(3, 'Nyai Siti Fatimah', 'Pengurus Pondok', 'Pengurus pondok yang menangani administrasi dan kesejahteraan santri putri.', '[]'),
(4, 'Ustadz Abdullah', 'Sekretaris', 'Sekretaris pondok yang menangani surat-menyurat dan administrasi umum.', '[]'),
(5, 'Ustadz Yusuf Rahman', 'Bendahara', 'Bendahara pondok yang mengelola keuangan dan aset pondok pesantren.', '[]'),
(6, 'Ustadz Ali Hasan', 'Koordinator Pendidikan', 'Koordinator pendidikan yang mengawasi kurikulum dan metode pembelajaran.', '[]'),
(7, 'Ustadz Ibrahim Malik', 'Wakil Kepala Madrasah', 'Wakil kepala madrasah yang membantu dalam pengelolaan pendidikan formal.', '[]'),
(8, 'Nyai Aminah', 'Koordinator Santri Putri', 'Koordinator yang menangani kegiatan dan pembinaan santri putri.', '[]'),
(9, 'Ustadz Muhammad Salim', 'Kepala Bagian Kurikulum', 'Kepala bagian kurikulum yang merancang dan mengembangkan materi pembelajaran.', '[]'),
(10, 'Ustadz Ahmad Fauzi', 'Koordinator Kegiatan Santri', 'Koordinator yang menangani kegiatan ekstrakurikuler dan pengembangan bakat santri.', '[]');

-- Insert sample documents
INSERT IGNORE INTO documents (id, nomor_dokumen, judul, file_jpg) VALUES
(1, 'DOC001/2025', 'Undangan Rapat Koordinasi Santri Tahun 2025', 'doc_001_2025.jpg'),
(2, 'DOC002/2025', 'Surat Keputusan Pengangkatan Ustadz Baru', 'doc_002_2025.jpg'),
(3, 'DOC003/2025', 'Undangan Rapat Evaluasi Pembelajaran Semester Genap', 'doc_003_2025.jpg'),
(4, 'DOC004/2025', 'Surat Edaran Jadwal Ujian Semester dan Persiapan', 'doc_004_2025.jpg'),
(5, 'DOC005/2025', 'Undangan Rapat Koordinasi Pengurus Pondok', 'doc_005_2025.jpg');

-- Insert sample document files
INSERT IGNORE INTO document_files (document_id, file_name, file_path, file_type) VALUES
(1, 'Undangan_Rapat_Koordinasi.pdf', 'doc_001_main.pdf', 'application/pdf'),
(1, 'Agenda_Rapat.docx', 'doc_001_agenda.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
(1, 'Denah_Lokasi.jpg', 'doc_001_denah.jpg', 'image/jpeg'),
(2, 'SK_Pengangkatan.pdf', 'doc_002_main.pdf', 'application/pdf'),
(2, 'CV_Ustadz_Baru.pdf', 'doc_002_cv.pdf', 'application/pdf'),
(3, 'Undangan_Evaluasi.pdf', 'doc_003_main.pdf', 'application/pdf'),
(3, 'Laporan_Semester.docx', 'doc_003_laporan.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
(4, 'Jadwal_Ujian.pdf', 'doc_004_main.pdf', 'application/pdf'),
(5, 'Undangan_Pengurus.pdf', 'doc_005_main.pdf', 'application/pdf');

-- Insert sample document-signer relationships
INSERT IGNORE INTO document_signers (document_id, signer_id, jabatan) VALUES
-- DOC001/2025
(1, 1, 'Pengasuh Pondok Pesantren'),
(1, 2, 'Kepala Madrasah'),
(1, 4, 'Sekretaris'),
-- DOC002/2025
(2, 1, 'Pengasuh Pondok Pesantren'),
(2, 4, 'Sekretaris'),
(2, 5, 'Bendahara'),
-- DOC003/2025
(3, 2, 'Kepala Madrasah'),
(3, 6, 'Koordinator Pendidikan'),
(3, 9, 'Kepala Bagian Kurikulum'),
-- DOC004/2025
(4, 2, 'Kepala Madrasah'),
(4, 7, 'Wakil Kepala Madrasah'),
-- DOC005/2025
(5, 1, 'Pengasuh Pondok Pesantren'),
(5, 3, 'Pengurus Pondok'),
(5, 4, 'Sekretaris'),
(5, 5, 'Bendahara');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signers_nama_jabatan ON signers(nama, jabatan);
CREATE INDEX IF NOT EXISTS idx_document_signers_composite ON document_signers(document_id, signer_id);
CREATE INDEX IF NOT EXISTS idx_document_files_document_id ON document_files(document_id);

-- Show success message
SELECT 'Database schema created successfully!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_signers FROM signers;
SELECT COUNT(*) as total_documents FROM documents;
SELECT COUNT(*) as total_document_files FROM document_files;
SELECT COUNT(*) as total_document_signers FROM document_signers;