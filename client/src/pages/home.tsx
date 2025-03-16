import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";

export default function Home() {
  const [search, setSearch] = useState("");
  const [_, setLocation] = useLocation();

  const handleSearch = () => {
    setLocation(`/jobs?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Découvrez l'Impact de l'IA sur Votre Carrière
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Explorez l'impact de l'intelligence artificielle sur différentes professions et trouvez les outils IA pertinents pour votre domaine.
      </p>

      <div className="max-w-md mx-auto space-y-4">
        <Search 
          value={search}
          onChange={setSearch}
          placeholder="Rechercher votre profession..."
        />
        <Button 
          className="w-full"
          size="lg"
          onClick={handleSearch}
        >
          Explorer l'Impact de l'IA
        </Button>
      </div>
    </div>
  );
}