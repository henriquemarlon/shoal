import { Video } from "lucide-react";
import { useRef, useState } from "react";


export default function VideoInput() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");
  
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
      } else {
        setFileName("");
      }
    }
  
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor="campaign-video">Campaign video</label>
        <input
          id="campaign-video"
          type="file"
          accept="video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#FF533F] text-white rounded-lg font-medium transition"
        >
          <Video className="w-4 h-4" />
          {fileName ? "Trocar vídeo" : "Selecionar vídeo"}
        </button>
        <span className="text-xs text-gray-500">
          {fileName || "Nenhum vídeo selecionado"}
        </span>
      </div>
    );
  }
      