import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilePlus, Search, Trash, Edit, Star } from "lucide-react";
import { toast } from "sonner";

const subtestMap: Record<string, string> = {
  "Matematika": "Penalaran Matematika (PM)",
  "B. Indonesia": "Literasi Bahasa Indonesia (LBI)",
  "B. Inggris": "Literasi Bahasa Inggris (LBE)",
  "IPA": "Pengetahuan dan Pemahaman Umum (PPU)",
  "Fisika": "Penalaran Umum (PU)",
  "Kimia": "Pengetahuan Kuantitatif (PK)",
  "Biologi": "Pemahaman Bacaan dan Menulis (PBM)",
  "Geografi": "Pengetahuan dan Pemahaman Umum (PPU)",
  "Ekonomi": "Pengetahuan Kuantitatif (PK)",
  "Sejarah": "Pemahaman Bacaan dan Menulis (PBM)",
  "Sosiologi": "Penalaran Umum (PU)"
};

// Mock data for questions
const QUESTIONS = [
  {
    id: "1",
    question: "Jika 2x + 5 = 15, maka nilai x adalah...",
    subject: "Penalaran Matematika (PM)",
    category: "TPS",
    type: "pilihan_ganda",
    difficulty: "mudah",
  },
  {
    id: "2",
    question: "Bila x^2 - 2x + 1 = 0, maka nilai x adalah...",
    subject: "Penalaran Matematika (PM)",
    category: "TPS",
    type: "pilihan_ganda",
    difficulty: "sedang",
  },
  {
    id: "3",
    question: "Planet terbesar dalam tata surya kita adalah...",
    subject: "Pengetahuan dan Pemahaman Umum (PPU)",
    category: "TKA Saintek",
    type: "pilihan_ganda",
    difficulty: "mudah",
  },
  {
    id: "4",
    question: "Tokoh utama dalam novel 'Laskar Pelangi' adalah...",
    subject: "Literasi Bahasa Indonesia (LBI)",
    category: "TKA Soshum",
    type: "pilihan_ganda",
    difficulty: "sedang",
  },
  {
    id: "5",
    question: "The main idea of the passage is...",
    subject: "Literasi Bahasa Inggris (LBE)",
    category: "TPS",
    type: "pilihan_ganda",
    difficulty: "sulit",
  },
];

export default function GuruQuestions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [subjectFilter, setSubjectFilter] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    toast.success(`Soal dengan ID ${id} berhasil dihapus (dummy)`);
  };

  const filteredQuestions = QUESTIONS.filter((question) => {
    if (
      searchTerm &&
      !question.question.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (categoryFilter && question.category !== categoryFilter) {
      return false;
    }
    if (subjectFilter && question.subject !== subjectFilter) {
      return false;
    }
    if (typeFilter && question.type !== typeFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Bank Soal Guru</h2>
        <Link to="/guru/questions/create">
          <Button className="flex gap-2">
            <FilePlus className="h-4 w-4" />
            Tambah Soal
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari soal..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategori</SelectLabel>
              <SelectItem value="TPS">TPS</SelectItem>
              <SelectItem value="TKA Saintek">TKA Saintek</SelectItem>
              <SelectItem value="TKA Soshum">TKA Soshum</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mata Pelajaran</SelectLabel>
              <SelectItem value={subtestMap["Matematika"]}>Penalaran Matematika (PM)</SelectItem>
              <SelectItem value={subtestMap["B. Indonesia"]}>Literasi Bahasa Indonesia (LBI)</SelectItem>
              <SelectItem value={subtestMap["B. Inggris"]}>Literasi Bahasa Inggris (LBE)</SelectItem>
              <SelectItem value={subtestMap["IPA"]}>Pengetahuan dan Pemahaman Umum (PPU)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tipe Soal" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipe Soal</SelectLabel>
              <SelectItem value="pilihan_ganda">Pilihan Ganda</SelectItem>
              <SelectItem value="numerik">Numerik</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-[#0f172a] rounded-2xl border border-[#10182a] overflow-hidden shadow-none">
        <Table className="min-w-full bg-[#0f172a]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white text-lg font-bold">Pertanyaan</TableHead>
              <TableHead className="text-white text-lg font-bold">Mata Pelajaran</TableHead>
              <TableHead className="text-white text-lg font-bold">Kategori</TableHead>
              <TableHead className="text-white text-lg font-bold">Tipe</TableHead>
              <TableHead className="text-white text-lg font-bold">Kesulitan</TableHead>
              <TableHead className="text-white text-lg font-bold text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">Tidak ada soal ditemukan.</TableCell>
              </TableRow>
            ) : filteredQuestions.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.question}</TableCell>
                <TableCell>{q.subject}</TableCell>
                <TableCell>{q.category}</TableCell>
                <TableCell>{q.type}</TableCell>
                <TableCell>{q.difficulty}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="text-cyan-400 hover:bg-cyan-800/30" asChild>
                    <Link to={`/guru/questions/edit/${q.id}`}><Edit className="w-5 h-5" /></Link>
                  </Button>
                  <Button size="icon" variant="ghost" className="text-pink-400 hover:bg-pink-900/30" onClick={() => handleDelete(q.id)}><Trash className="w-5 h-5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 