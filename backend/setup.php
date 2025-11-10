<?php
/**
 * Setup script untuk inisialisasi database
 * Jalankan sekali saat pertama kali setup
 */

// Load environment variables
function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

loadEnv(__DIR__ . '/../.env');

$host = $_ENV['DB_HOST'] ?? 'localhost';
$dbname = $_ENV['DB_NAME'] ?? 'document_verification';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASS'] ?? '';

echo "<h1>Database Setup - Document Verification System</h1>";

try {
    // Connect tanpa database untuk create database
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "<p style='color: green;'>✓ Connected to MySQL server</p>";
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "<p style='color: green;'>✓ Database '$dbname' created/verified</p>";
    
    // Use database
    $pdo->exec("USE `$dbname`");
    
    // Read and execute schema
    $schemaFile = __DIR__ . '/database/schema.sql';
    if (file_exists($schemaFile)) {
        $schema = file_get_contents($schemaFile);
        // Remove USE database statement karena sudah dihandle di atas
        $schema = preg_replace('/USE\s+[^;]+;/', '', $schema);
        
        // Split by semicolon and execute each statement
        $statements = array_filter(array_map('trim', explode(';', $schema)));
        
        foreach ($statements as $statement) {
            if (!empty($statement) && !preg_match('/^(--|#)/', $statement)) {
                try {
                    $pdo->exec($statement);
                } catch (PDOException $e) {
                    // Ignore errors for statements that might already exist
                    if (!strpos($e->getMessage(), 'already exists')) {
                        echo "<p style='color: orange;'>Warning: " . $e->getMessage() . "</p>";
                    }
                }
            }
        }
        echo "<p style='color: green;'>✓ Schema executed successfully</p>";
    }
    
    // Read and execute seed data
    $seedFile = __DIR__ . '/database/seed.sql';
    if (file_exists($seedFile)) {
        $seed = file_get_contents($seedFile);
        $seed = preg_replace('/USE\s+[^;]+;/', '', $seed);
        
        $statements = array_filter(array_map('trim', explode(';', $seed)));
        
        foreach ($statements as $statement) {
            if (!empty($statement) && !preg_match('/^(--|#|SELECT)/', $statement)) {
                try {
                    $pdo->exec($statement);
                } catch (PDOException $e) {
                    // Ignore duplicate entry errors
                    if (!strpos($e->getMessage(), 'Duplicate entry')) {
                        echo "<p style='color: orange;'>Warning: " . $e->getMessage() . "</p>";
                    }
                }
            }
        }
        echo "<p style='color: green;'>✓ Seed data executed successfully</p>";
    }
    
    // Create uploads directory
    $uploadsDir = __DIR__ . '/uploads';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
        echo "<p style='color: green;'>✓ Uploads directory created</p>";
    }
    
    $signersDir = $uploadsDir . '/signers';
    if (!is_dir($signersDir)) {
        mkdir($signersDir, 0755, true);
        echo "<p style='color: green;'>✓ Signers uploads directory created</p>";
    }
    
    // Create .htaccess files
    $htaccessContent = "Options -Indexes\nDeny from all\n<FilesMatch \"\\.(jpg|jpeg|png|gif|pdf|doc|docx)$\">\n    Allow from all\n</FilesMatch>";
    file_put_contents($uploadsDir . '/.htaccess', $htaccessContent);
    echo "<p style='color: green;'>✓ Upload security configured</p>";
    
    // Show statistics
    echo "<h2>Database Statistics</h2>";
    
    $tables = ['users', 'signers', 'documents', 'document_files', 'document_signers'];
    foreach ($tables as $table) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM $table");
        $count = $stmt->fetch()['count'];
        echo "<p>$table: <strong>$count</strong> records</p>";
    }
    
    echo "<h2>Default Admin Account</h2>";
    echo "<p>Username: <strong>admin</strong></p>";
    echo "<p>Password: <strong>admin123</strong></p>";
    
    echo "<h2>Next Steps</h2>";
    echo "<ol>";
    echo "<li>Update your .env file with correct database credentials</li>";
    echo "<li>Test the API endpoints using backend/test/test_api.php</li>";
    echo "<li>Start your frontend development server</li>";
    echo "<li>Change default admin password</li>";
    echo "</ol>";
    
    echo "<p style='color: green; font-size: 18px; font-weight: bold;'>🎉 Setup completed successfully!</p>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Database Error: " . $e->getMessage() . "</p>";
    echo "<p>Please check your database configuration in .env file</p>";
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error: " . $e->getMessage() . "</p>";
}
?>