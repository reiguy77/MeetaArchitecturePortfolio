const { SiteContent } = require('./models');

async function initializeContent() {
  try {
    // Sync database
    await require('./models').sequelize.sync();

    // Default content
    const defaultContent = [
      {
        key: 'coverImage',
        value: 'header.jpeg',
        type: 'image'
      },
      {
        key: 'tagline',
        value: 'Creating spaces that inspire',
        type: 'text'
      },
      {
        key: 'subtext',
        value: 'With a passion for innovative design and sustainable architecture, I create spaces that harmoniously blend form and function.',
        type: 'text'
      },
      {
        key: 'about',
        value: 'With over 25 years of experience as a Principal Architect and Director of Architecture, I bring deep expertise in delivering hospitality, F&B, institutional, and master planning casino projects from early project programming, planning through completion. Skilled in strategic problem-solving, conflict resolution, and contractor collaboration, ensuring projects stay on track, meet budgets, and exceed expectations.\n\nKnown for building strong client relationships, partnering with industry trade professionals, and navigating jurisdictional approvals to streamline project delivery. Committed to mentoring teams, driving business development, and maintaining the highest standards of design excellence and operational efficiency.',
        type: 'text'
      },
      {
        key: 'hobbies',
        value: JSON.stringify([
          { name: 'Hiking', description: 'Exploring nature trails and mountain paths' },
          { name: 'Dancing', description: 'Various dance styles including ballroom and contemporary' },
          { name: 'Cooking', description: 'Experimenting with new recipes and cuisines' },
          { name: 'Hosting events as MC', description: 'Master of ceremonies for various social and professional events' },
          { name: 'LV chapter president for Non-Profit organization- Ekal Vidhyala', description: 'Leading educational initiatives for underprivileged children' },
          { name: 'Organizes annual fundraising event for it raising funds for a noble cause', description: 'Coordinating charity events to support educational programs' }
        ]),
        type: 'json'
      }
    ];

    // Create content entries
    for (const content of defaultContent) {
      const existing = await SiteContent.findOne({ where: { key: content.key } });
      if (!existing) {
        await SiteContent.create(content);
        console.log(`Created ${content.key}`);
      } else {
        console.log(`${content.key} already exists`);
      }
    }

    console.log('Content initialization complete!');
  } catch (error) {
    console.error('Error initializing content:', error);
  }
}

initializeContent();
