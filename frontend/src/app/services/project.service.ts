import { Injectable } from '@angular/core';
import { ImageDictionaryService, ProjectImage } from './image-dictionary.service';

export interface Project {
  id: number;
  name: string;
  description: string;
  role: string;
  constructionCompleted: string;
  details: string;
  images: ProjectImage[];
}

export interface ProjectCategory {
  id: number;
  name: string;
  description: string;
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectCategories: ProjectCategory[] = [
    {
      id: 1,
      name: 'Hospitality',
      description: 'Luxury hospitality projects including hotels, convention centers, and guest accommodations.',
      projects: [
        {
          id: 1,
          name: 'Palms Place - Tower',
          description: 'Luxury hotel tower with comprehensive amenities',
          role: 'Job Captain / Project Manager',
          constructionCompleted: '2008',
          details: 'Guest rooms - 599, Pool /Spa - 50,000 sf including Turkish bath - Hammam',
          images: []
        },
        {
          id: 2,
          name: 'Versailles Tower',
          description: 'Modern hotel tower with innovative skybridge connection',
          role: 'Principal / Sr. Architect',
          constructionCompleted: '2023',
          details: 'Guest Room - Skybridge connection Paris Low-rise, Pool Deck level to Guest rooms across internal driveway',
          images: []
        },
        {
          id: 3,
          name: 'MGM Grand Convention Center',
          description: 'Large-scale convention center expansion',
          role: 'Design Project Manager',
          constructionCompleted: '2018',
          details: '250,000 sf expansion to existing Convention space',
          images: []
        },
        {
          id: 4,
          name: 'Aria Convention Expansion',
          description: 'Innovative convention space conversion and expansion',
          role: 'Design Project Manager',
          constructionCompleted: '2018',
          details: '200,000 sf expansion to existing Convention space. Conversion of existing Zarkana theatre into 4 story convention space keeping the exterior Shell and using the real estate within the footprint for new space',
          images: []
        }
      ]
    },
    {
      id: 2,
      name: 'Entertainment Venue',
      description: 'Dynamic entertainment spaces including nightclubs, day clubs, and outdoor venues.',
      projects: [
        {
          id: 5,
          name: 'Palms Tree Beach Club Rebrand',
          description: 'Complete rebranding of day club with selective modifications',
          role: 'Principal',
          constructionCompleted: '2025',
          details: 'Rebranding of Day Club complete with selective modifications',
          images: []
        },
        {
          id: 6,
          name: 'Bellagio Pool Deck Refresh',
          description: 'Award-winning pool deck renovation',
          role: 'Principal',
          constructionCompleted: '2024',
          details: 'Shortlisted for the AHEAD Americas 2025 Awards under the Landscaping & Outdoor Spaces category. Listed as a finalist in Landscape + Outdoor Spaces in the 2025 HD Awards (Hospitality Design) for the "Bellagio Pool Deck, Las Vegas" project.',
          images: []
        },
        {
          id: 7,
          name: 'Aria Jewel Nightclub',
          description: 'Luxury dual-level nightclub with VIP accommodations',
          role: 'Design Project Manager',
          constructionCompleted: '2016',
          details: '24,000 sf dual level nightclub with 5 VIP box suits',
          images: []
        },
        {
          id: 8,
          name: 'Discoshow @ Linq',
          description: 'An immersive, retro disco environment',
          role: 'Principal / Sr. Architect',
          constructionCompleted: '2023',
          details: 'It includes multiple themed zones: 99 Prince (a speakeasy-styled bar), The Glitterloft, Diner Ross (a nostalgic diner), and the main show/club floor which evokes warehouse-party and club culture of 1970s New York.',
          images: []
        }
      ]
    }
  ];

  constructor(private imageDictionaryService: ImageDictionaryService) {
    this.initializeProjectImages();
  }

  private initializeProjectImages() {
    // Populate images for each project using the image dictionary service
    this.projectCategories.forEach(category => {
      category.projects.forEach(project => {
        project.images = this.imageDictionaryService.getImagesForProject(project.id);
      });
    });
  }

  getProjectById(id: number): Project | undefined {
    for (const category of this.projectCategories) {
      const project = category.projects.find(p => p.id === id);
      if (project) {
        return project;
      }
    }
    return undefined;
  }

  getAllProjects(): Project[] {
    const allProjects: Project[] = [];
    this.projectCategories.forEach(category => {
      allProjects.push(...category.projects);
    });
    return allProjects;
  }

  getProjectCategories(): ProjectCategory[] {
    return this.projectCategories;
  }
}
