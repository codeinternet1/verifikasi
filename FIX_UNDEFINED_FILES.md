# Fix: Undefined File Path Issue

## Masalah
- Error 404: `https://verifikasi.surat.lirboyo.net/backend/uploads/undefined`
- File path tidak konsisten antara frontend dan backend
- Duplikasi path `/uploads/uploads/`

## Solusi yang Diterapkan

### 1. Frontend (ResultPage.tsx)
- Membersihkan file path dari prefix `uploads/` dan `/`
- Filter file yang mengandung string `undefined`
- Normalisasi URL menjadi: `${uploadsBase}/uploads/${cleanPath}`

```typescript
// Filter dan bersihkan path
files = files
  .filter((f) => f && f !== 'undefined' && !f.includes('undefined'))
  .map((f) => f.replace(/^uploads\/uploads\//, '').replace(/^\/?uploads\//, '').replace(/^\/+/, ''));

// Generate URL
const fileURL = `${uploadsBase}/uploads/${file}`;
```

### 2. Frontend (DocumentViewer.tsx)
- Konsistensi path cleaning di semua fungsi
- Error handling untuk file yang gagal dimuat

```typescript
const cleanPath = file.file_path?.replace(/^\/?uploads\//, '').replace(/^\/+/, '') || '';
const fileUrl = `${uploadsBase}/uploads/${cleanPath}`;
```

### 3. Backend (verify.php)
- Tambah query untuk mengambil document_files
- Return array files lengkap dengan metadata

```php
// Get document files
$file_stmt = $db->prepare("
    SELECT id, document_id, file_name, file_path, file_type, uploaded_at
    FROM document_files
    WHERE document_id = :document_id
    ORDER BY id ASC
");
$file_stmt->execute();
$document['files'] = $file_stmt->fetchAll(PDO::FETCH_ASSOC);
```

## Format Path yang Benar

### Database Storage
```
file_path: "nama_file_1234567890.jpg"
```

### Backend Return
```json
{
  "file_path": "nama_file_1234567890.jpg"
}
```

### Frontend URL Generation
```
https://verifikasi.surat.lirboyo.net/backend/uploads/nama_file_1234567890.jpg
```

## Testing Checklist
- [x] Upload dokumen dengan multiple files
- [x] Preview dokumen di ResultPage
- [x] Preview dokumen di Admin DocumentViewer
- [x] Download file
- [x] Error handling untuk file tidak ditemukan
- [x] Build production berhasil

## Error Handling
Semua image/iframe sekarang memiliki error handler:

```typescript
onError={(e) => {
  console.error('Error loading image:', fileURL);
  e.currentTarget.src = '/placeholder.png';
}}
```

## Hasil
- Tidak ada lagi error 404 undefined
- File path konsisten di semua komponen
- URL selalu dalam format yang benar
- Build berhasil tanpa error
