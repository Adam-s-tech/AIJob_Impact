import { type Job, type Task, type Tool, type InsertJob, type InsertTask, type InsertTool } from "@shared/schema";

export interface IStorage {
  getJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getTasksByJobId(jobId: number): Promise<Task[]>;
  getToolsByJobId(jobId: number): Promise<Tool[]>;
  searchJobs(options: {
    query?: string;
    impactLevel?: number;
    domain?: string;
  }): Promise<Job[]>;
}

export class MemStorage implements IStorage {
  private jobs: Map<number, Job>;
  private tasks: Map<number, Task[]>;
  private tools: Map<number, Tool[]>;
  private currentJobId: number;
  private currentTaskId: number;
  private currentToolId: number;

  constructor() {
    this.jobs = new Map();
    this.tasks = new Map();
    this.tools = new Map();
    this.currentJobId = 1;
    this.currentTaskId = 1;
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
        imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop",
        domain: "Tech",
      },
      {
        title: "Data Scientist",
        description: "Analyse des données complexes pour en extraire des insights",
        impactLevel: 5,
        aiImpact: "L'IA augmente les capacités d'analyse et automatise le processus de modélisation.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
        domain: "Tech",
      },
      {
        title: "Médecin",
        description: "Diagnostique et traite les patients",
        impactLevel: 4,
        aiImpact: "L'IA aide au diagnostic, à l'analyse d'imagerie médicale et à la personnalisation des traitements.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
        domain: "Santé",
      }
    ];

    const tasks: InsertTask[] = [
      // Développeur logiciel
      {
        name: "Écriture de code",
        description: "Rédaction et maintenance du code source",
        jobId: 1
      },
      {
        name: "Tests unitaires",
        description: "Création et exécution de tests automatisés",
        jobId: 1
      },
      {
        name: "Débogage",
        description: "Identification et correction des bugs",
        jobId: 1
      },
      // Data Scientist
      {
        name: "Préparation des données",
        description: "Nettoyage et transformation des données",
        jobId: 2
      },
      {
        name: "Modélisation",
        description: "Création et entraînement de modèles ML",
        jobId: 2
      },
      {
        name: "Visualisation",
        description: "Création de visualisations de données",
        jobId: 2
      },
      // Médecin
      {
        name: "Diagnostic",
        description: "Évaluation des symptômes et diagnostic",
        jobId: 3
      },
      {
        name: "Prescription",
        description: "Prescription de traitements",
        jobId: 3
      },
      {
        name: "Suivi patient",
        description: "Suivi de l'évolution des patients",
        jobId: 3
      }
    ];

    const tools: InsertTool[] = [
      // Développeur logiciel
      {
        name: "GitHub Copilot",
        description: "Assistant de programmation IA pour la génération de code",
        url: "https://github.com/features/copilot",
        jobId: 1,
      },
      {
        name: "Amazon CodeWhisperer",
        description: "Génération de code et suggestions intelligentes",
        url: "https://aws.amazon.com/codewhisperer/",
        jobId: 1,
      },
      {
        name: "Tabnine",
        description: "Complétion de code basée sur l'IA",
        url: "https://www.tabnine.com/",
        jobId: 1,
      },
      // Data Scientist
      {
        name: "TensorFlow",
        description: "Bibliothèque d'apprentissage automatique",
        url: "https://www.tensorflow.org",
        jobId: 2,
      },
      {
        name: "AutoML",
        description: "Automatisation de la création de modèles ML",
        url: "https://cloud.google.com/automl",
        jobId: 2,
      },
      {
        name: "Dataiku",
        description: "Plateforme de Data Science automatisée",
        url: "https://www.dataiku.com",
        jobId: 2,
      },
      // Médecin
      {
        name: "IBM Watson Health",
        description: "IA pour le diagnostic médical",
        url: "https://www.ibm.com/watson-health",
        jobId: 3,
      },
      {
        name: "Ada Health",
        description: "Assistant diagnostic basé sur l'IA",
        url: "https://ada.com",
        jobId: 3,
      },
      {
        name: "Babylon Health",
        description: "Plateforme de consultation et diagnostic IA",
        url: "https://www.babylonhealth.com",
        jobId: 3,
      }
    ];

    jobs.forEach(job => {
      const id = this.currentJobId++;
      this.jobs.set(id, { ...job, id });
    });

    tasks.forEach(task => {
      const id = this.currentTaskId++;
      const task_list = this.tasks.get(task.jobId) || [];
      task_list.push({ ...task, id });
      this.tasks.set(task.jobId, task_list);
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

  async getTasksByJobId(jobId: number): Promise<Task[]> {
    return this.tasks.get(jobId) || [];
  }

  async getToolsByJobId(jobId: number): Promise<Tool[]> {
    return this.tools.get(jobId) || [];
  }

  async searchJobs(options: {
    query?: string;
    impactLevel?: number;
    domain?: string;
  }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());

    if (options.query) {
      const lowercaseQuery = options.query.toLowerCase();
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(lowercaseQuery) ||
        job.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    if (options.impactLevel) {
      jobs = jobs.filter(job => job.impactLevel === options.impactLevel);
    }

    if (options.domain) {
      jobs = jobs.filter(job => job.domain === options.domain);
    }

    return jobs;
  }
}

export const storage = new MemStorage();