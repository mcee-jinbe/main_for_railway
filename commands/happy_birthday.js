const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  data: {
    name: 'happy_birthday',
    description:
      '๐ใใคใงใใฉใใงใใใใใผใใผในใใผ(็ธๆใซใกใณใทใงใณใใใใพใ)',
    options: [
      {
        type: ApplicationCommandOptionType.User,
        name: 'user',
        description: '่ชฐใฎ่ช็ๆฅใ็ฅใใพใใ๏ผ',
        value: 'user',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.reply({
      content: '<@' + user.id + '>',
      embeds: [
        {
          title: '๐ใใใใ๏ผ๐',
          description: '<@' + user.id + '>ใใใใ่ช็ๆฅใใใงใจใใใใใพใ๏ผ',
          color: 0xff30ff,
          timestamp: new Date(),
        },
      ],
    });
  },
};
