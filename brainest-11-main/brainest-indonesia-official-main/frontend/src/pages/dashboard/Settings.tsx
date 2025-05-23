import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const universitasList = ["UI", "ITB", "UGM", "UNPAD", "IPB", "ITS", "UNDIP", "UNS", "BINUS", "Telkom University"];
const jurusanList = ["Kedokteran", "Teknik Informatika", "Hukum", "Manajemen", "Psikologi", "Ilmu Komunikasi", "Akuntansi", "Arsitektur"];
const kotaList = ["Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Semarang", "Medan", "Makassar"];

export default function Settings() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    nama: "Nama Siswa",
    email: "siswa@email.com",
    hp: "",
    gender: "",
    tglLahir: "",
    universitas: "",
    jurusan: "",
    kota: "",
    bahasa: "id",
    tema: "dark",
    notif: true,
  });
  const [password, setPassword] = useState({ lama: "", baru: "", konfirmasi: "" });
  const [targetScore, setTargetScore] = useState(() => localStorage.getItem('target_score') || '');
  const [targetError, setTargetError] = useState('');

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ev => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    // Otomatis kapital setiap awal kata untuk nama, universitas, jurusan, kota
    const value = e.target.value;
    const capitalizeWords = (str: string) => str.replace(/\b\w/g, c => c.toUpperCase());
    if (["nama", "universitas", "jurusan", "kota"].includes(e.target.name)) {
      setProfile({ ...profile, [e.target.name]: capitalizeWords(value) });
    } else {
      setProfile({ ...profile, [e.target.name]: value });
    }
  }

  function handleTargetScoreChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTargetScore(e.target.value);
    setTargetError('');
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!targetScore || isNaN(Number(targetScore)) || Number(targetScore) < 0) {
      setTargetError('Skor target harus berupa angka positif');
      return;
    }
    localStorage.setItem('target_score', targetScore);
    toast.success("Profil berhasil diperbarui!");
  }

  function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();
    if (password.baru !== password.konfirmasi) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }
    toast.success("Password berhasil diganti!");
    setPassword({ lama: "", baru: "", konfirmasi: "" });
  }

  return (
    <div className="p-8 text-white max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">Pengaturan Akun</h1>
      {/* Profil Siswa */}
      <form onSubmit={handleSaveProfile} className="bg-gradient-to-b from-[#10172a] via-[#151e34] to-[#0f172a] border border-cyan-900/40 rounded-2xl shadow-xl p-6 mb-4 space-y-6">
        <h2 className="text-xl font-bold mb-2">Profil Siswa</h2>
        <div className="flex items-center gap-6 mb-4">
          <div className="relative w-20 h-20">
            <img src={avatar || "/avatar-default.png"} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-700 shadow" />
            <input ref={avatarInput} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
            <Button type="button" size="sm" className="absolute bottom-0 right-0 bg-cyan-700 hover:bg-cyan-800 rounded-full px-2 py-1 text-xs" onClick={() => avatarInput.current?.click()}>Ubah</Button>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="nama" value={profile.nama} onChange={handleProfileChange} placeholder="Nama Lengkap" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
            <select name="gender" value={profile.gender} onChange={handleProfileChange} className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl px-3 py-2">
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>
        {/* Tujuan Pendidikan */}
        <h2 className="text-xl font-bold mb-2">Tujuan Pendidikan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input name="universitas" value={profile.universitas} onChange={handleProfileChange} placeholder="Universitas Tujuan" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
          <Input name="jurusan" value={profile.jurusan} onChange={handleProfileChange} placeholder="Jurusan Tujuan" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
          <Input name="kota" value={profile.kota} onChange={handleProfileChange} placeholder="Kota Domisili" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
          <Input
            type="number"
            min={0}
            value={targetScore}
            onChange={handleTargetScoreChange}
            className={(targetError ? 'border-red-500 ' : '') + 'bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl hide-number-spinner'}
            placeholder="Skor Target (misal: 800)"
            style={{ maxWidth: 220 }}
          />
          {targetError && <span className="text-sm text-red-400">{targetError}</span>}
        </div>
        <div className="text-xs text-blue-200 mb-2">Skor target akan digunakan sebagai acuan pada dashboard dan progress belajar Anda.</div>
        <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800 rounded-full font-bold shadow">Simpan Profil</Button>
      </form>
      {/* Keamanan Akun */}
      <form onSubmit={handleSavePassword} className="bg-gradient-to-b from-[#10172a] via-[#151e34] to-[#0f172a] border border-cyan-900/40 rounded-2xl shadow-xl p-6 mb-4 space-y-4">
        <h2 className="text-xl font-bold mb-2">Keamanan Akun</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="lama" value={password.lama} onChange={e => setPassword({ ...password, lama: e.target.value })} type="password" placeholder="Password Lama" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
          <Input name="baru" value={password.baru} onChange={e => setPassword({ ...password, baru: e.target.value })} type="password" placeholder="Password Baru" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
          <Input name="konfirmasi" value={password.konfirmasi} onChange={e => setPassword({ ...password, konfirmasi: e.target.value })} type="password" placeholder="Konfirmasi Password Baru" className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl" />
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Switch id="2fa" />
          <label htmlFor="2fa" className="text-white font-semibold">Aktifkan Two-Factor Authentication (2FA)</label>
        </div>
        <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800 rounded-full font-bold shadow">Ganti Password</Button>
      </form>
      {/* Preferensi & Notifikasi */}
      <form className="bg-gradient-to-b from-[#10172a] via-[#151e34] to-[#0f172a] border border-cyan-900/40 rounded-2xl shadow-xl p-6 mb-4 space-y-4">
        <h2 className="text-xl font-bold mb-2">Preferensi & Notifikasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select name="bahasa" value={profile.bahasa} onChange={handleProfileChange} className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl px-3 py-2">
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
          <select name="tema" value={profile.tema} onChange={handleProfileChange} className="bg-[#181f2e] border border-cyan-900/40 text-cyan-100 rounded-xl px-3 py-2">
            <option value="dark">Tema Gelap</option>
            <option value="light">Tema Terang</option>
          </select>
          <div className="flex items-center gap-3">
            <Switch checked={profile.notif} onCheckedChange={v => setProfile({ ...profile, notif: v })} />
            <span className="text-cyan-100">Notifikasi Email</span>
          </div>
        </div>
        <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800 rounded-full font-bold shadow">Simpan Preferensi</Button>
      </form>
      {/* Aksi Lain */}
      <div className="bg-gradient-to-b from-[#10172a] via-[#151e34] to-[#0f172a] border border-cyan-900/40 rounded-2xl shadow-xl p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Aksi Lain</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-pink-600 hover:bg-pink-700 rounded-full font-bold shadow">Logout Semua Perangkat</Button>
          <Button className="bg-red-700 hover:bg-red-800 rounded-full font-bold shadow">Hapus Akun</Button>
        </div>
      </div>
    </div>
  );
} 