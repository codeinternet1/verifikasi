import { Document, DocumentFile, Signer } from '../types';

// Enhanced mock signers dengan data lengkap
export const mockSigners: Signer[] = [
  {
    id: 1,
    nama: 'KH. Ahmad Zaini',
    jabatan: 'Pengasuh Pondok Pesantren',
    bio: 'Pengasuh Pondok Pesantren Lirboyo sejak 1995. Menguasai berbagai kitab klasik dan memimpin ribuan santri dengan dedikasi tinggi.',
    photo: 'signer_1.jpg',
    links: [
      { label: 'Website Resmi', url: 'https://lirboyo.net' },
      { label: 'Instagram', url: 'https://instagram.com/lirboyo_official' }
    ]
  },
  {
    id: 2,
    nama: 'Ustadz Muhammad Ridwan',
    jabatan: 'Kepala Madrasah',
    bio: 'Kepala Madrasah Aliyah dengan pengalaman 15 tahun dalam bidang pendidikan Islam. Alumni Al-Azhar Kairo.',
    photo: 'signer_2.jpg',
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/muhammad-ridwan' }
    ]
  },
  {
    id: 3,
    nama: 'Nyai Siti Fatimah',
    jabatan: 'Pengurus Pondok',
    bio: 'Pengurus pondok yang menangani administrasi dan kesejahteraan santri putri dengan penuh kasih sayang.',
    photo: 'signer_3.jpg',
  },
  {
    id: 4,
    nama: 'Ustadz Abdullah',
    jabatan: 'Sekretaris',
    bio: 'Sekretaris pondok yang menangani surat-menyurat dan administrasi umum dengan ketelitian tinggi.',
    photo: 'signer_4.jpg',
  },
  {
    id: 5,
    nama: 'Ustadz Yusuf Rahman',
    jabatan: 'Bendahara',
    bio: 'Bendahara pondok yang mengelola keuangan dan aset pondok pesantren dengan transparansi dan akuntabilitas.',
    photo: 'signer_5.jpg',
  }
];

// Enhanced mock document files
export const mockDocumentFiles: DocumentFile[] = [
  // Files untuk DOC001/2025
  {
    id: 1,
    document_id: 1,
    file_name: 'Undangan_Rapat_Koordinasi.pdf',
    file_path: 'doc_690e3a16663c70.72403152.pdf',
    file_type: 'application/pdf',
    uploaded_at: '2025-01-15 10:30:00',
  },
  {
    id: 2,
    document_id: 1,
    file_name: 'Agenda_Rapat_Lengkap.docx',
    file_path: 'doc_690e3a30e05482.04556935.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploaded_at: '2025-01-15 10:31:00',
  },
  {
    id: 3,
    document_id: 1,
    file_name: 'Denah_Lokasi_Rapat.jpg',
    file_path: 'doc_690e3a30e0b8b7.75908900.jpg',
    file_type: 'image/jpeg',
    uploaded_at: '2025-01-15 10:32:00',
  },
  // Files untuk DOC002/2025
  {
    id: 4,
    document_id: 2,
    file_name: 'SK_Pengangkatan_Ustadz.pdf',
    file_path: 'doc_690e37b325a134.06095764.pdf',
    file_type: 'application/pdf',
    uploaded_at: '2025-01-14 14:20:00',
  },
  {
    id: 5,
    document_id: 2,
    file_name: 'CV_Ustadz_Baru.pdf',
    file_path: 'doc_690e37b325b245.17206875.pdf',
    file_type: 'application/pdf',
    uploaded_at: '2025-01-14 14:21:00',
  },
  // Files untuk DOC003/2025
  {
    id: 6,
    document_id: 3,
    file_name: 'Undangan_Evaluasi_Pembelajaran.pdf',
    file_path: 'doc_690e38c436c356.28317986.pdf',
    file_type: 'application/pdf',
    uploaded_at: '2025-01-13 09:15:00',
  },
  {
    id: 7,
    document_id: 3,
    file_name: 'Laporan_Semester_Genap.docx',
    file_path: 'doc_690e38c436d467.39429097.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploaded_at: '2025-01-13 09:16:00',
  }
];

// Enhanced mock documents dengan data lengkap
export const mockDocuments: Document[] = [
  {
    id: 1,
    nomor_dokumen: 'DOC001/2025',
    judul: 'Undangan Rapat Koordinasi Santri Tahun 2025',
    file_jpg: 'doc_690e3a16663c70.72403152.pdf',
    created_at: '2025-01-15',
    signer_names: ['KH. Ahmad Zaini', 'Ustadz Muhammad Ridwan', 'Ustadz Abdullah'],
    signers: [mockSigners[0], mockSigners[1], mockSigners[3]],
    files: mockDocumentFiles.filter(f => f.document_id === 1),
  },
  {
    id: 2,
    nomor_dokumen: 'DOC002/2025',
    judul: 'Surat Keputusan Pengangkatan Ustadz Baru',
    file_jpg: 'doc_690e37b325a134.06095764.pdf',
    created_at: '2025-01-14',
    signer_names: ['KH. Ahmad Zaini', 'Ustadz Abdullah', 'Ustadz Yusuf Rahman'],
    signers: [mockSigners[0], mockSigners[3], mockSigners[4]],
    files: mockDocumentFiles.filter(f => f.document_id === 2),
  },
  {
    id: 3,
    nomor_dokumen: 'DOC003/2025',
    judul: 'Undangan Rapat Evaluasi Pembelajaran Semester Genap',
    file_jpg: 'doc_690e38c436c356.28317986.pdf',
    created_at: '2025-01-13',
    signer_names: ['Ustadz Muhammad Ridwan', 'Nyai Siti Fatimah'],
    signers: [mockSigners[1], mockSigners[2]],
    files: mockDocumentFiles.filter(f => f.document_id === 3),
  },
  {
    id: 4,
    nomor_dokumen: 'DOC004/2025',
    judul: 'Surat Edaran Jadwal Ujian Semester dan Persiapan',
    file_jpg: 'doc_690e39d547e578.50641208.pdf',
    created_at: '2025-01-12',
    signer_names: ['Ustadz Muhammad Ridwan'],
    signers: [mockSigners[1]],
    files: [
      {
        id: 8,
        document_id: 4,
        file_name: 'Jadwal_Ujian_Semester.pdf',
        file_path: 'doc_690e39d547e578.50641208.pdf',
        file_type: 'application/pdf',
        uploaded_at: '2025-01-12 16:45:00',
      }
    ],
  },
  {
    id: 5,
    nomor_dokumen: 'DOC005/2025',
    judul: 'Undangan Rapat Koordinasi Pengurus Pondok',
    file_jpg: 'doc_690e3ae658f689.61752319.pdf',
    created_at: '2025-01-11',
    signer_names: ['KH. Ahmad Zaini', 'Nyai Siti Fatimah', 'Ustadz Abdullah', 'Ustadz Yusuf Rahman'],
    signers: [mockSigners[0], mockSigners[2], mockSigners[3], mockSigners[4]],
    files: [
      {
        id: 9,
        document_id: 5,
        file_name: 'Undangan_Rapat_Pengurus.pdf',
        file_path: 'doc_690e3ae658f689.61752319.pdf',
        file_type: 'application/pdf',
        uploaded_at: '2025-01-11 11:30:00',
      }
    ],
  }
];

// LocalStorage functions dengan error handling yang lebih baik
export function getDocumentsFromLocalStorage(): Document[] {
  try {
    const stored = localStorage.getItem('uploadedDocuments');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validasi struktur data
      if (Array.isArray(parsed)) {
        return parsed.map(doc => ({
          ...doc,
          files: doc.files || [],
          signers: doc.signers || [],
          signer_names: doc.signer_names || []
        }));
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('uploadedDocuments');
  }
  return [];
}

export function saveDocumentsToLocalStorage(documents: Document[]): void {
  try {
    // Limit to 50 documents untuk menghindari quota exceeded
    const limitedDocs = documents.slice(0, 50);
    localStorage.setItem('uploadedDocuments', JSON.stringify(limitedDocs));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    // Jika quota exceeded, coba dengan data yang lebih sedikit
    try {
      const reducedDocs = documents.slice(0, 20);
      localStorage.setItem('uploadedDocuments', JSON.stringify(reducedDocs));
    } catch (retryError) {
      console.error('Failed to save even reduced data:', retryError);
    }
  }
}

export function addDocumentToLocalStorage(document: Document): void {
  const existing = getDocumentsFromLocalStorage();
  // Cek duplikasi berdasarkan nomor dokumen
  const filtered = existing.filter(doc => doc.nomor_dokumen !== document.nomor_dokumen);
  filtered.unshift(document);
  saveDocumentsToLocalStorage(filtered);
}

export function removeDocumentFromLocalStorage(documentId: number): void {
  const existing = getDocumentsFromLocalStorage();
  const filtered = existing.filter(doc => doc.id !== documentId);
  saveDocumentsToLocalStorage(filtered);
}

export function updateDocumentInLocalStorage(updatedDocument: Document): void {
  const existing = getDocumentsFromLocalStorage();
  const updated = existing.map(doc => 
    doc.id === updatedDocument.id ? updatedDocument : doc
  );
  saveDocumentsToLocalStorage(updated);
}

// Initialize mock data dengan merge yang lebih cerdas
export function initMockData(): void {
  const existing = getDocumentsFromLocalStorage();
  
  if (existing.length === 0) {
    // Jika tidak ada data, gunakan mock data
    saveDocumentsToLocalStorage(mockDocuments);
  } else {
    // Jika ada data, merge dengan mock data (hanya yang belum ada)
    const existingNumbers = existing.map(doc => doc.nomor_dokumen);
    const newMockDocs = mockDocuments.filter(
      mockDoc => !existingNumbers.includes(mockDoc.nomor_dokumen)
    );
    
    if (newMockDocs.length > 0) {
      const merged = [...existing, ...newMockDocs];
      saveDocumentsToLocalStorage(merged);
    }
  }
}

// Utility functions
export function clearAllLocalStorageData(): void {
  localStorage.removeItem('uploadedDocuments');
  console.log('All localStorage data cleared');
}

export function getLocalStorageSize(): string {
  const data = localStorage.getItem('uploadedDocuments');
  if (!data) return '0 KB';
  
  const sizeInBytes = new Blob([data]).size;
  const sizeInKB = (sizeInBytes / 1024).toFixed(2);
  return `${sizeInKB} KB`;
}

// Export untuk debugging
export function debugLocalStorage(): void {
  console.log('=== DEBUG LOCALSTORAGE ===');
  console.log('Documents count:', getDocumentsFromLocalStorage().length);
  console.log('Storage size:', getLocalStorageSize());
  console.log('Mock signers count:', mockSigners.length);
  console.log('Mock documents count:', mockDocuments.length);
  console.log('Mock files count:', mockDocumentFiles.length);
}