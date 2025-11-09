<?php
// File: backend/api/update_document.php

require_once __DIR__ . '/../config/database.php';

header("Content-Type: application/json; charset=utf-8");

// CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["success" => false, "error" => "Method not allowed"]);
        exit();
    }

    $database = new Database();
    $pdo = $database->getConnection();

    if (!$pdo) {
        throw new Exception("Database connection not available");
    }

    // Validasi input wajib
    if (!isset($_POST['id'], $_POST['nomor_dokumen'], $_POST['judul'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Missing required fields"]);
        exit();
    }

    $id     = intval($_POST['id']);
    $nomor  = trim($_POST['nomor_dokumen']);
    $judul  = trim($_POST['judul']);
    $signerIds = isset($_POST['signer_ids']) ? json_decode($_POST['signer_ids'], true) : [];

    // 🧩 Update data utama dokumen
    $stmt = $pdo->prepare("UPDATE documents SET nomor_dokumen = ?, judul = ? WHERE id = ?");
    $stmt->execute([$nomor, $judul, $id]);

    // 🔄 Update penandatangan
    if (is_array($signerIds)) {
        // Hapus semua signer lama dulu
        $pdo->prepare("DELETE FROM document_signers WHERE document_id = ?")->execute([$id]);

        // Masukkan ulang signer baru
        $stmtSigner = $pdo->prepare("INSERT INTO document_signers (document_id, signer_id) VALUES (?, ?)");
        foreach ($signerIds as $sid) {
            $stmtSigner->execute([$id, $sid]);
        }
    }

    // 📂 Upload file baru (bisa banyak)
    $uploadedFiles = [];
    if (!empty($_FILES['files']['name'][0])) {
        $uploadDir = __DIR__ . '/../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $allowedExt = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];
        foreach ($_FILES['files']['name'] as $key => $filename) {
            $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            if (!in_array($ext, $allowedExt)) continue;

            $newName = "doc_" . time() . "_" . uniqid() . "." . $ext;
            $target = $uploadDir . $newName;

            if (move_uploaded_file($_FILES['files']['tmp_name'][$key], $target)) {
                $uploadedFiles[] = [
                    "file_name" => $filename,
                    "file_path" => $newName
                ];

                $stmtFile = $pdo->prepare("
                    INSERT INTO document_files (document_id, file_name, file_path)
                    VALUES (?, ?, ?)
                ");
                $stmtFile->execute([$id, $filename, $newName]);
            }
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "Document updated successfully",
        "data" => [
            "id" => $id,
            "nomor_dokumen" => $nomor,
            "judul" => $judul,
            "signer_ids" => $signerIds,
            "uploaded_files" => $uploadedFiles
        ]
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
