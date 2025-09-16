import { Injectable } from '@angular/core';

export interface ProjectImage {
  id?: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectImageSet {
  projectId: number;
  images: ProjectImage[];
}

@Injectable({
  providedIn: 'root'
})
export class ImageDictionaryService {
  private imageDictionary: Map<number, ProjectImage[]> = new Map();

  constructor() {
    this.initializeImageDictionary();
  }

  private initializeImageDictionary() {
    // Palms Place - Tower (ID: 1)


    // Versailles Tower (ID: 2)
    this.imageDictionary.set(2, [
      {
        id: 4,
        src: 'versailles/1.jpg',
        alt: 'Versailles Bridge Under Construction - Night View',
        caption: 'Versailles Bridge Under Construction - Night View'
      },
      {
        id: 5,
        src: 'versailles/2.webp',
        alt: 'Versailles Bridge Under Construction - Day View',
        caption: 'Versailles Bridge Under Construction - Day View'
      },
      {
        id: 6,
        src: 'versailles/3.webp',
        alt: 'Versailles Balconies',
        caption: 'Versailles Balconies'
      },
      {
        id: 7,
        src: 'versailles/4.webp',
        alt: 'Versailles Tower',
        caption: 'Versailles Tower'
      },

    ]);

    // MGM Grand Convention Center (ID: 3)
    this.imageDictionary.set(3, [
      {
        id: 7,
        src: 'mgm/1.jpg',
        alt: 'MGM Grand Expansion Exterior',
        caption: '250,000 sf expansion exterior'
      },
      {
        id: 8,
        src: 'mgm/2.webp',
        alt: 'MGM Grand Expansion Exterior',
        caption: 'MGM Grand Expansion Exterior'
      },
      {
        id: 9,
        src: 'mgm/3.webp',
        alt: 'MGM Grand Expansion Interior',
        caption: 'MGM Grand Expansion Interior'
      }
    ]);

    // Aria Convention Expansion (ID: 4)
    this.imageDictionary.set(4, [
      {
        id: 10,
        src: 'aria/1.webp',
        alt: 'Aria Convention Expansion ',
        caption: 'Aria Convention Expansion'
      },
      {
        id: 11,
        src: 'aria/2.webp',
        alt: 'Aria Convention Expansion',
        caption: 'Converted Zarkana theatre space'
      },
      {
        id: 12,
        src: 'aria/3.jpg',
        alt: 'Aria Sky Suites Lobby',
        caption: 'Aria Sky Suites Lobby'
      },
      {
        id: 13,
        src: 'aria/4.jpeg',
        alt: 'Aria concierge lounge',
        caption: 'Aria concierge lounge'
      }
    ]);

    // Palms Tree Beach Club Rebrand (ID: 5)
    this.imageDictionary.set(5, [
      {
        id: 13,
        src: 'palms/1.jpg',
        alt: 'Palms pool deck',
        caption: 'Palms pool deck'
      },
      {
        id: 14,
        src: 'palms/2.jpg',
        alt: 'Palms pool deck',
        caption: 'Palms pool deck'
      },
      {
        id: 15,
        src: 'palms/3.jpg',
        alt: 'Palms exterior',
        caption: 'Palms exterior'
      }
    ]);



  }

  getImagesForProject(projectId: number): ProjectImage[] {
    return this.imageDictionary.get(projectId) || [];
  }

  getAllProjectIds(): number[] {
    return Array.from(this.imageDictionary.keys());
  }

  addImagesForProject(projectId: number, images: ProjectImage[]): void {
    this.imageDictionary.set(projectId, images);
  }

  updateImageForProject(projectId: number, imageId: number, updatedImage: ProjectImage): void {
    const projectImages = this.imageDictionary.get(projectId);
    if (projectImages) {
      const index = projectImages.findIndex(img => img.id === imageId);
      if (index !== -1) {
        projectImages[index] = updatedImage;
      }
    }
  }
}
