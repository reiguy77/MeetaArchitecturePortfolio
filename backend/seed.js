const { sequelize, ProjectCategory, Project, ProjectImage } = require('./models');

async function seedDatabase() {
  try {
    // Sync database (create tables)
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Create categories
    const hospitalityCategory = await ProjectCategory.create({
      name: 'Hospitality',
      description: 'Luxury hospitality projects including hotels, convention centers, and guest accommodations.'
    });

    const entertainmentCategory = await ProjectCategory.create({
      name: 'Entertainment Venue',
      description: 'Dynamic entertainment spaces including nightclubs, day clubs, and outdoor venues.'
    });

    // Create projects for Hospitality category
    const palmsPlace = await Project.create({
      name: 'Palms Place - Tower',
      description: 'Luxury hotel tower with comprehensive amenities',
      role: 'Job Captain / Project Manager',
      constructionCompleted: '2008',
      details: 'Guest rooms - 599, Pool /Spa - 50,000 sf including Turkish bath - Hammam',
      categoryId: hospitalityCategory.id
    });

    const versaillesTower = await Project.create({
      name: 'Versailles Tower',
      description: 'Modern hotel tower with innovative skybridge connection',
      role: 'Principal / Sr. Architect',
      constructionCompleted: '2023',
      details: 'Guest Room - Skybridge connection Paris Low-rise, Pool Deck level to Guest rooms across internal driveway',
      categoryId: hospitalityCategory.id
    });

    const mgmConvention = await Project.create({
      name: 'MGM Grand Convention Center',
      description: 'Large-scale convention center expansion',
      role: 'Design Project Manager',
      constructionCompleted: '2018',
      details: '250,000 sf expansion to existing Convention space',
      categoryId: hospitalityCategory.id
    });

    const ariaConvention = await Project.create({
      name: 'Aria Convention Expansion',
      description: 'Innovative convention space conversion and expansion',
      role: 'Design Project Manager',
      constructionCompleted: '2018',
      details: '200,000 sf expansion to existing Convention space. Conversion of existing Zarkana theatre into 4 story convention space keeping the exterior Shell and using the real estate within the footprint for new space',
      categoryId: hospitalityCategory.id
    });

    // Create projects for Entertainment Venue category
    const palmsBeachClub = await Project.create({
      name: 'Palms Tree Beach Club Rebrand',
      description: 'Complete rebranding of day club with selective modifications',
      role: 'Principal',
      constructionCompleted: '2025',
      details: 'Rebranding of Day Club complete with selective modifications',
      categoryId: entertainmentCategory.id
    });

    const bellagioPool = await Project.create({
      name: 'Bellagio Pool Deck Refresh',
      description: 'Award-winning pool deck renovation',
      role: 'Principal',
      constructionCompleted: '2024',
      details: 'Shortlisted for the AHEAD Americas 2025 Awards under the Landscaping & Outdoor Spaces category. Listed as a finalist in Landscape + Outdoor Spaces in the 2025 HD Awards (Hospitality Design) for the "Bellagio Pool Deck, Las Vegas" project.',
      categoryId: entertainmentCategory.id
    });

    const ariaJewel = await Project.create({
      name: 'Aria Jewel Nightclub',
      description: 'Luxury dual-level nightclub with VIP accommodations',
      role: 'Design Project Manager',
      constructionCompleted: '2016',
      details: '24,000 sf dual level nightclub with 5 VIP box suits',
      categoryId: entertainmentCategory.id
    });

    const discoshowLinq = await Project.create({
      name: 'Discoshow @ Linq',
      description: 'An immersive, retro disco environment',
      role: 'Principal / Sr. Architect',
      constructionCompleted: '2023',
      details: 'It includes multiple themed zones: 99 Prince (a speakeasy-styled bar), The Glitterloft, Diner Ross (a nostalgic diner), and the main show/club floor which evokes warehouse-party and club culture of 1970s New York.',
      categoryId: entertainmentCategory.id
    });

    // Create images for projects
    // Palms Place - Tower (ID: 1)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/palms-place-tower/palms-place-1.jpg',
        alt: 'Palms Place Tower exterior view',
        caption: 'Exterior view of Palms Place Tower',
        projectId: palmsPlace.id
      },
      {
        src: 'assets/images/palms-place-tower/palms-place-2.jpg',
        alt: 'Palms Place Tower lobby',
        caption: 'Luxury lobby design',
        projectId: palmsPlace.id
      },
      {
        src: 'assets/images/palms-place-tower/palms-place-3.jpg',
        alt: 'Palms Place Tower pool area',
        caption: '50,000 sf Pool/Spa area with Turkish bath',
        projectId: palmsPlace.id
      }
    ]);

    // Versailles Tower (ID: 2)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/versailles-tower/versailles-1.jpg',
        alt: 'Versailles Tower exterior',
        caption: 'Modern Versailles Tower design',
        projectId: versaillesTower.id
      },
      {
        src: 'assets/images/versailles-tower/versailles-2.jpg',
        alt: 'Versailles Tower skybridge',
        caption: 'Innovative skybridge connection',
        projectId: versaillesTower.id
      },
      {
        src: 'assets/images/versailles-tower/versailles-3.jpg',
        alt: 'Versailles Tower guest rooms',
        caption: 'Luxury guest room design',
        projectId: versaillesTower.id
      }
    ]);

    // MGM Grand Convention Center (ID: 3)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/mgm-convention/mgm-convention-1.jpg',
        alt: 'MGM Grand Convention Center exterior',
        caption: '250,000 sf expansion exterior',
        projectId: mgmConvention.id
      },
      {
        src: 'assets/images/mgm-convention/mgm-convention-2.jpg',
        alt: 'MGM Grand Convention Center interior',
        caption: 'Expansive convention space',
        projectId: mgmConvention.id
      },
      {
        src: 'assets/images/mgm-convention/mgm-convention-3.jpg',
        alt: 'MGM Grand Convention Center meeting rooms',
        caption: 'Flexible meeting room configurations',
        projectId: mgmConvention.id
      }
    ]);

    // Aria Convention Expansion (ID: 4)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/aria-convention/aria-convention-1.jpg',
        alt: 'Aria Convention Expansion exterior',
        caption: '200,000 sf expansion',
        projectId: ariaConvention.id
      },
      {
        src: 'assets/images/aria-convention/aria-convention-2.jpg',
        alt: 'Aria Convention Expansion interior',
        caption: 'Converted Zarkana theatre space',
        projectId: ariaConvention.id
      },
      {
        src: 'assets/images/aria-convention/aria-convention-3.jpg',
        alt: 'Aria Convention Expansion meeting space',
        caption: '4-story convention space',
        projectId: ariaConvention.id
      }
    ]);

    // Palms Tree Beach Club Rebrand (ID: 5)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/palms-beach-club/palms-beach-1.jpg',
        alt: 'Palms Tree Beach Club exterior',
        caption: 'Rebranded day club exterior',
        projectId: palmsBeachClub.id
      },
      {
        src: 'assets/images/palms-beach-club/palms-beach-2.jpg',
        alt: 'Palms Tree Beach Club pool area',
        caption: 'Redesigned pool and lounge area',
        projectId: palmsBeachClub.id
      },
      {
        src: 'assets/images/palms-beach-club/palms-beach-3.jpg',
        alt: 'Palms Tree Beach Club bar area',
        caption: 'Modern bar and dining space',
        projectId: palmsBeachClub.id
      }
    ]);

    // Bellagio Pool Deck Refresh (ID: 6)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/bellagio-pool/bellagio-pool-1.jpg',
        alt: 'Bellagio Pool Deck exterior',
        caption: 'Award-winning pool deck design',
        projectId: bellagioPool.id
      },
      {
        src: 'assets/images/bellagio-pool/bellagio-pool-2.jpg',
        alt: 'Bellagio Pool Deck lounge area',
        caption: 'Luxury lounge and seating areas',
        projectId: bellagioPool.id
      },
      {
        src: 'assets/images/bellagio-pool/bellagio-pool-3.jpg',
        alt: 'Bellagio Pool Deck landscaping',
        caption: 'Landscaping & Outdoor Spaces',
        projectId: bellagioPool.id
      }
    ]);

    // Aria Jewel Nightclub (ID: 7)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/aria-jewel/aria-jewel-1.jpg',
        alt: 'Aria Jewel Nightclub entrance',
        caption: '24,000 sf dual level nightclub',
        projectId: ariaJewel.id
      },
      {
        src: 'assets/images/aria-jewel/aria-jewel-2.jpg',
        alt: 'Aria Jewel Nightclub main floor',
        caption: 'Main dance floor and bar area',
        projectId: ariaJewel.id
      },
      {
        src: 'assets/images/aria-jewel/aria-jewel-3.jpg',
        alt: 'Aria Jewel Nightclub VIP suites',
        caption: '5 VIP box suites',
        projectId: ariaJewel.id
      }
    ]);

    // Discoshow @ Linq (ID: 8)
    await ProjectImage.bulkCreate([
      {
        src: 'assets/images/discoshow-linq/discoshow-1.jpg',
        alt: 'Discoshow @ Linq main entrance',
        caption: 'Retro disco environment entrance',
        projectId: discoshowLinq.id
      },
      {
        src: 'assets/images/discoshow-linq/discoshow-2.jpg',
        alt: '99 Prince speakeasy bar',
        caption: '99 Prince speakeasy-styled bar',
        projectId: discoshowLinq.id
      },
      {
        src: 'assets/images/discoshow-linq/discoshow-3.jpg',
        alt: 'The Glitterloft area',
        caption: 'The Glitterloft themed zone',
        projectId: discoshowLinq.id
      },
      {
        src: 'assets/images/discoshow-linq/discoshow-4.jpg',
        alt: 'Diner Ross nostalgic diner',
        caption: 'Diner Ross nostalgic diner space',
        projectId: discoshowLinq.id
      },
      {
        src: 'assets/images/discoshow-linq/discoshow-5.jpg',
        alt: 'Main show/club floor',
        caption: 'Main show/club floor evoking 1970s New York warehouse-party culture',
        projectId: discoshowLinq.id
      }
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
