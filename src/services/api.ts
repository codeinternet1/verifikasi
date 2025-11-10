import { API_ENDPOINTS, CONFIG } from "../config";
import { Document, Signer } from "../types";

// 🔍 Verifikasi dokumen berdasarkan nomor
export async function verifyDocument(nomor_dokumen: string): Promise<Document | null> {
  try {
    const res = await fetch(`${API_ENDPOINTS.verify}?nomor_dokumen=${encodeURIComponent(nomor_dokumen)}`);
    if (!res.ok) {
      throw new Error("Gagal menghubungi server");
    }
    const result = await res.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error("verifyDocument error:", error);
    return null;
  }
}

// 👥 Ambil semua penandatangan
export async function getSigners(): Promise<Signer[]> {
  try {
    const res = await fetch(API_ENDPOINTS.signers);
    if (!res.ok) {
      throw new Error("Gagal mengambil data signers");
    }

    const data = await res.json();

    // Pastikan sesuai format dari backend
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("getSigners error:", error);
    return [];
  }
}

// 📄 Ambil semua dokumen
export async function getDocuments(): Promise<Document[]> {
  try {
    const res = await fetch(API_ENDPOINTS.getDocuments);
    if (!res.ok) {
      throw new Error("Gagal mengambil data dokumen");
    }

    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("getDocuments error:", error);
    return [];
  }
}
// 📄 Buat dokumen baru
export async function createDocument(formData: FormData): Promise<any> {
  try {
    const res = await fetch(API_ENDPOINTS.createDocument, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Gagal menyimpan dokumen");
    }
    return await res.json();
  } catch (error) {
    console.error("createDocument error:", error);
    throw error;
  }
}

// 🗑️ Hapus dokumen
export async function deleteDocument(id: number): Promise<boolean> {
  try {
    const res = await fetch(API_ENDPOINTS.deleteDocument, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    
    if (!res.ok) {
      throw new Error("Gagal menghapus dokumen");
    }
    
    const result = await res.json();
    return result.success;
  } catch (error) {
    console.error("deleteDocument error:", error);
    return false;
  }
}

// ✏️ Update dokumen
export async function updateDocument(formData: FormData): Promise<any> {
  try {
    const res = await fetch(API_ENDPOINTS.updateDocument, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error("Gagal mengupdate dokumen");
    }
    
    return await res.json();
  } catch (error) {
    console.error("updateDocument error:", error);
    throw error;
  }
}

// 👤 Login admin
export async function loginAdmin(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch(API_ENDPOINTS.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    if (!res.ok) {
      throw new Error("Gagal login");
    }
    
    const result = await res.json();
    return result.success;
  } catch (error) {
    console.error("loginAdmin error:", error);
    return false;
  }
}

// 📥 Download file
export function getDownloadUrl(filename: string): string {
  return `${API_ENDPOINTS.download}?file=${encodeURIComponent(filename)}`;
}

// 🖼️ Get upload URL
export function getUploadUrl(filename: string): string {
  return `${API_ENDPOINTS.uploads}/${filename}`;
}