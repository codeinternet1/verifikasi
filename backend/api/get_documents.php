<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();
    if (!$db) throw new Exception("Database connection failed.");

    // Ambil semua dokumen + signer
    $query = "
        SELECT 
            d.id,
            d.nomor_dokumen,
            d.judul,
            d.created_at,
            GROUP_CONCAT(s.nama ORDER BY s.nama ASC SEPARATOR ', ') AS signer_names,
            GROUP_CONCAT(s.id) AS signer_ids
        FROM documents d
        LEFT JOIN document_signers ds ON d.id = ds.document_id
        LEFT JOIN signers s ON ds.signer_id = s.id
        GROUP BY d.id
        ORDER BY d.created_at DESC
    ";

    $stmt = $db->prepare($query);
    $stmt->execute();
    $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ambil semua file terkait dalam satu query
    $file_stmt = $db->prepare("
        SELECT document_id, file_name, file_path
        FROM document_files
    ");
    $file_stmt->execute();
    $files = $file_stmt->fetchAll(PDO::FETCH_ASSOC);

    // Gabungkan file ke masing-masing dokumen
    foreach ($documents as &$doc) {
        $doc['files'] = array_values(array_filter($files, fn($f) => $f['document_id'] == $doc['id']));
    }

    echo json_encode(['success' => true, 'data' => $documents], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
