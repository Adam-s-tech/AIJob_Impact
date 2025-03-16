import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Code, BarChart, Lightbulb } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("job");
  const [_, setLocation] = useLocation();

  const handleSearch = () => {
    setLocation(`/jobs?q=${encodeURIComponent(search)}&type=${searchType}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-violet-500/10 to-violet-600/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Next Gen AI
          </h1>
          <p className="text-2xl text-muted-foreground mb-12">
            Votre partenaire en conseil, formation et coaching en intelligence artificielle
          </p>

          <div className="max-w-md mx-auto space-y-4">
            <div className="flex gap-2">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de recherche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">Par métier</SelectItem>
                  <SelectItem value="task">Par tâche</SelectItem>
                  <SelectItem value="ai">Par outil IA</SelectItem>
                </SelectContent>
              </Select>
              <Search 
                value={search}
                onChange={setSearch}
                placeholder="Rechercher..."
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              size="lg"
              onClick={handleSearch}
            >
              Explorer l'Impact de l'IA
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Conseil en IA</h3>
                <p className="text-muted-foreground">
                  Accompagnement stratégique pour l'intégration de l'IA dans votre entreprise
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Code className="h-12 w-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Formation</h3>
                <p className="text-muted-foreground">
                  Programmes de formation adaptés à vos besoins en IA
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <BarChart className="h-12 w-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Automatisation</h3>
                <p className="text-muted-foreground">
                  Optimisation de vos processus grâce à l'IA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-violet-500/10 to-violet-600/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Lightbulb className="h-16 w-16 text-violet-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
          <p className="text-xl text-muted-foreground">
            Nous accompagnons les entreprises dans l'intégration de l'IA et l'automatisation des processus. 
            Notre expertise vous permet de rester compétitif dans un monde en constante évolution technologique.
          </p>
        </div>
      </section>
    </div>
  );
}