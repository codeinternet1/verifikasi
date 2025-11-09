import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Document, Signer } from "../../types";

interface DocumentEditModalProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (doc: Document) => void;
  API_BASE: string;
  allSigners: Signer[];
}

export const DocumentEditModal: React.FC<DocumentEditModalProps> = ({
  document,
  isOpen,
  onClose,
  onUpdated,
  API_BASE,
  allSigners,
}) => {
  const [nomor, setNomor] = useState(document.nomor_dokumen);
  const [judul, setJudul] = useState(document.judul);
  const [files, setFiles] = useState<File[]>([]);
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
  const [selectedSigners, setSelectedSigners] = useState<Signer[]>(document.signers || []);
  const [loading, setLoading] = useState(false);

  // 🔁 Reset saat modal dibuka atau dokumen berubah
  useEffect(() => {
    if (isOpen) {
      setNomor(document.nomor_dokumen);
      setJudul(document.judul);
      setFiles([]);
      setFilesToDelete([]);
      setSelectedSigners(document.signers || []);
    }
  }, [document, isOpen]);

  if (!isOpen) return null;

  const toggleSigner = (signer: Signer) => {
    setSelectedSigners((prev) =>
      prev.some((s) => s.id === signer.id)
        ? prev.filter((s) => s.id !== signer.id)
        : [...prev, signer]
    );
  };

  const toggleFileDelete = (filePath: string) => {
    setFilesToDelete((prev) =>
      prev.includes(filePath)
        ? prev.filter((f) => f !== filePath)
        : [...prev, filePath]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id", String(document.id));
      formData.append("nomor_dokumen", nomor);
      formData.append("judul", judul);

      // 🔥 File baru (opsional)
      files.forEach((file) => formData.append("files[]", file));

      // 🔥 File yang mau dihapus
      formData.append("files_to_delete", JSON.stringify(filesToDelete));

      // 🔥 Daftar signer ID
      formData.append("signer_ids", JSON.stringify(selectedSigners.map((s) => s.id)));

      const res = await fetch(`${API_BASE}/update_document.php`, {
        method: "POST",
        body: formData,
      });

      const raw = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${raw}`);

      let result;
      try {
        result = JSON.parse(raw);
      } catch {
        throw new Error("Response bukan JSON: " + raw);
      }

      if (result.success) {
        alert(`Dokumen berhasil diperbarui ✨`);
        onUpdated({
          ...document,
          nomor_dokumen: nomor,
          judul,
          signers: selectedSigners,
          signer_names: selectedSigners.map((s) => s.nama),
          files: result.data?.files || document.files,
        });
        onClose();
      } else {
        alert("Gagal memperbarui dokumen: " + (result.error || "Unknown error"));
      }
    } catch (error: any) {
      console.error("handleSubmit error:", error);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Dokumen</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nomor Dokumen */}
          <div>
            <label className="block text-sm font-medium">Nomor Dokumen</label>
            <input
              type="text"
              value={nomor}
              onChange={(e) => setNomor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Judul */}
          <div>
            <label className="block text-sm font-medium">Judul</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Upload File Baru */}
          <div>
            <label className="block text-sm font-medium">
              File Baru (Opsional, bisa banyak)
            </label>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,application/pdf,.doc,.docx"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full"
            />
          </div>

          {/* Daftar File Lama */}
          {Array.isArray(document.files) && document.files.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                File Sebelumnya (pilih untuk dihapus)
              </label>
              <ul className="space-y-2">
                {document.files.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={filesToDelete.includes(f.file_path)}
                      onChange={() => toggleFileDelete(f.file_path)}
                    />
                    <span>📎 {f.file_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pilih Penandatangan */}
          <div>
            <label className="block text-sm font-medium mb-1">Penandatangan</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-2">
              {allSigners.map((s) => (
                <label key={s.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSigners.some((sel) => sel.id === s.id)}
                    onChange={() => toggleSigner(s)}
                  />
                  {s.nama}{" "}
                  {s.jabatan && (
                    <span className="text-sm text-gray-500">({s.jabatan})</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
