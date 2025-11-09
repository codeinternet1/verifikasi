<?php
// File: backend/api/delete_document.php

header("Content-Type: application/json; charset=utf-8");

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/database.php';

$database = new Database();
$conn = $database->getConnection();

if ($conn === null) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed.']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

$id = null;

// Ambil ID sesuai method
if ($method === 'DELETE' || $method === 'POST') {
    if (isset($data['id'])) {
        $id = (int) $data['id'];
    }
} elseif ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = (int) $_GET['id'];
    }
}

if (!$id) {
    echo json_encode(['success' => false, 'error' => 'Document ID not provided.']);
    exit();
}

try {
    $conn->beginTransaction();

    // 1️⃣ Ambil file terkait dulu untuk dihapus dari server
    $stmt_files = $conn->prepare("SELECT file_path FROM document_files WHERE document_id = :id");
    $stmt_files->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt_files->execute();
    $files = $stmt_files->fetchAll(PDO::FETCH_ASSOC);

    // 2️⃣ Hapus relasi file di tabel
    $stmt_delete_files = $conn->prepare("DELETE FROM document_files WHERE document_id = :id");
    $stmt_delete_files->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt_delete_files->execute();

    // 3️⃣ Hapus relasi di document_signers
    $stmt_signers = $conn->prepare("DELETE FROM document_signers WHERE document_id = :id");
    $stmt_signers->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt_signers->execute();

    // 4️⃣ Hapus entri utama dokumen
    $stmt_doc = $conn->prepare("DELETE FROM documents WHERE id = :id");
    $stmt_doc->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt_doc->execute();

    $conn->commit();

    // 5️⃣ Hapus file fisik dari folder uploads
    $uploadDir = __DIR__ . '/../uploads/';
    foreach ($files as $f) {
        $filePath = $uploadDir . $f['file_path'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    echo json_encode(['success' => true, 'message' => 'Document and files deleted successfully.']);
} catch (Throwable $e) {
    $conn->rollBack();
    echo json_encode([
        'success' => false,
        'error' => 'Failed to delete document: ' . $e->getMessage()
    ]);
}
