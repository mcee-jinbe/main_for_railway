module.exports = {
  data: {
    name: 'code',
    description: 'ð§¬ãã®ãã­ã°ã©ã ã®åå®¹ãå¨å¬éï¼',
  },
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          title: 'ãã®BOTã®ãã­ã°ã©ã ã¯ãã¡ã',
          url: 'https://github.com/mcee-jinbe/main_for-railway',
          description: 'è»¢ç¨å¯',
          color: 0x227fff,
        },
      ],
    });
  },
};
