/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
  user: [
    {
      name: 'John Wayne',
      email: 'johnnie86@gmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
      location: 'Mombasa',
      bio: 'Spends most of my time at the beach'
    },
    {
      name: 'Peter Quinn',
      email: 'peter.quinn@live.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'Langley',
      bio: 'Rather not say'
    },
    {
      name: 'Jane Eyre',
      email: 'jane@hotmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/94.jpg',
      location: 'London',
      bio: 'Loves reading motivation books'
    }
  ]
}
