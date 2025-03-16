import { type Job, type Tool, type InsertJob, type InsertTool } from "@shared/schema";

export interface IStorage {
  getJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getToolsByJobId(jobId: number): Promise<Tool[]>;
  searchJobs(query: string): Promise<Job[]>;
}

export class MemStorage implements IStorage {
  private jobs: Map<number, Job>;
  private tools: Map<number, Tool[]>;
  private currentJobId: number;
  private currentToolId: number;

  constructor() {
    this.jobs = new Map();
    this.tools = new Map();
    this.currentJobId = 1;
    this.currentToolId = 1;
    this.initializeData();
  }

  private initializeData() {
    const jobs: InsertJob[] = [
      {
        title: "Développeur logiciel",
        description: "Développe et maintient des applications logicielles",
        impactLevel: 5,
        aiImpact: "L'IA transforme le développement via la génération de code, l'automatisation des tests et le débogage intelligent.",
      },
      {
        title: "Data Scientist",
        description: "Analyse des données complexes pour en extraire des insights",
        impactLevel: 5,
        aiImpact: "L'IA augmente les capacités d'analyse et automatise le processus de modélisation.",
      },
      {
        title: "Médecin",
        description: "Diagnostique et traite les patients",
        impactLevel: 4,
        aiImpact: "L'IA aide au diagnostic, à l'analyse d'imagerie médicale et à la personnalisation des traitements.",
      },
      {
        title: "Marketing Manager",
        description: "Gère les stratégies marketing et les campagnes",
        impactLevel: 4,
        aiImpact: "L'IA optimise les campagnes, personnalise le contenu et analyse le comportement client.",
      },
      {
        title: "Avocat",
        description: "Fournit des conseils juridiques et représente les clients",
        impactLevel: 3,
        aiImpact: "L'IA assiste dans la recherche juridique et l'analyse de documents.",
      },
      {
        title: "Comptable",
        description: "Gère la comptabilité et les rapports financiers",
        impactLevel: 4,
        aiImpact: "L'IA automatise les tâches comptables répétitives et améliore la détection des fraudes.",
      },
      {
        title: "Designer UX/UI",
        description: "Conçoit des interfaces utilisateur et des expériences numériques",
        impactLevel: 3,
        aiImpact: "L'IA aide à la génération de designs et à l'optimisation des interfaces.",
      },
      {
        title: "Enseignant",
        description: "Éduque et forme les étudiants",
        impactLevel: 3,
        aiImpact: "L'IA personnalise l'apprentissage et automatise les tâches administratives.",
      },
      {
        title: "Journaliste",
        description: "Recherche et rédige des articles d'actualité",
        impactLevel: 4,
        aiImpact: "L'IA aide à la recherche, à la vérification des faits et à la génération de contenu.",
      },
      {
        title: "Commercial",
        description: "Vend des produits et services aux clients",
        impactLevel: 3,
        aiImpact: "L'IA optimise la prospection et personnalise les approches commerciales.",
      }
    ];

    const tools: InsertTool[] = [
      {
        name: "GitHub Copilot",
        description: "Assistant de programmation IA",
        url: "https://github.com/features/copilot",
        jobId: 1,
      },
      {
        name: "TensorFlow",
        description: "Bibliothèque d'apprentissage automatique",
        url: "https://www.tensorflow.org",
        jobId: 2,
      },
      {
        name: "IBM Watson Health",
        description: "IA pour le diagnostic médical",
        url: "https://www.ibm.com/watson-health",
        jobId: 3,
      },
      {
        name: "HubSpot",
        description: "Plateforme marketing avec IA intégrée",
        url: "https://www.hubspot.com",
        jobId: 4,
      },
      {
        name: "ROSS Intelligence",
        description: "Assistant juridique IA",
        url: "https://www.rossintelligence.com",
        jobId: 5,
      },
      {
        name: "QuickBooks AI",
        description: "Automatisation comptable",
        url: "https://quickbooks.intuit.com",
        jobId: 6,
      },
      {
        name: "Figma AI",
        description: "Assistant de design IA",
        url: "https://www.figma.com",
        jobId: 7,
      },
      {
        name: "Century Tech",
        description: "Plateforme d'apprentissage adaptatif",
        url: "https://www.century.tech",
        jobId: 8,
      },
      {
        name: "Automated Insights",
        description: "Génération automatique d'articles",
        url: "https://automatedinsights.com",
        jobId: 9,
      },
      {
        name: "Salesforce Einstein",
        description: "IA pour la vente",
        url: "https://www.salesforce.com/products/einstein/overview",
        jobId: 10,
      }
    ];

    jobs.forEach(job => {
      const id = this.currentJobId++;
      this.jobs.set(id, { ...job, id });
    });

    tools.forEach(tool => {
      const id = this.currentToolId++;
      const tool_list = this.tools.get(tool.jobId) || [];
      tool_list.push({ ...tool, id });
      this.tools.set(tool.jobId, tool_list);
    });
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getToolsByJobId(jobId: number): Promise<Tool[]> {
    return this.tools.get(jobId) || [];
  }

  async searchJobs(query: string): Promise<Job[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.jobs.values()).filter(job =>
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();