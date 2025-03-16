import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { DOMAINS } from "@shared/schema";

interface JobFiltersProps {
  impactLevel: number | null;
  domain: string;
  onImpactLevelChange: (value: number) => void;
  onDomainChange: (value: string) => void;
}

export default function JobFilters({
  impactLevel,
  domain,
  onImpactLevelChange,
  onDomainChange,
}: JobFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Niveau d'impact de l'IA
            </label>
            <Slider
              value={[impactLevel || 1]}
              onValueChange={([value]) => onImpactLevelChange(value)}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
              <span>Faible</span>
              <span>Élevé</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Domaine d'activité
            </label>
            <Select value={domain} onValueChange={onDomainChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les domaines</SelectItem>
                {DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}