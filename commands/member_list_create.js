const { client } = require('../index.js');

module.exports = {
  data: {
    name: 'member_list_create',
    description: 'ð§°ãã¼ã¿ãã¼ã¹ãä½æãã¾ãï¼(Hoshimikan6490éå®)',
  },
  async execute(interaction) {
    if (interaction.user.id === '728495196303523900') {
      if (interaction.guild.id === '768073209169444884') {
        await interaction.deferReply();
        // ãµã¼ãã¼åã®å¨ã¡ã³ãã¼ãåå¾ãã
        const members = await interaction.guild.members.fetch();
        // mapãä½¿ã£ã¦å¨ã¡ã³ãã¼ã®ã¦ã¼ã¶ã¼ã¿ã°ã®éåãä½ã
        const tags = members.map((member) => member.user.id);

        const profileModel = require('../models/profileSchema.js');
        for (var key in tags) {
          const user_id = tags[key];
          //åã»ã©ä½æããã¹ã­ã¼ããåç§
          const isBot = (await client.users.fetch(user_id)).bot;
          if (isBot) {
            // ç¡è¦
          } else {
            const profileData = await profileModel.findOne({
              _id: user_id,
            });
            if (!profileData) {
              const user_name = (await interaction.client.users.fetch(user_id))
                .username;
              const profile = await profileModel.create({
                _id: tags[key], //ã¦ã¼ã¶ã¼ID
                user_name: user_name, //ã¦ã¼ã¶ã¼ãã¼ã 
                birthday_month: 'no_data',
                birthday_day: 'no_data',
                status: 'yet',
              });
              profile.save();
              console.log(user_name + 'ããã®ãã¼ã¿ãä½æãã¾ãã');
              //ä¸å¿ã­ã°ã¨ãã¦ã³ã³ã½ã¼ã«ã«åºå
            }
          }
        }
        await interaction.editReply('âãã¼ã¿ãã¼ã¹ã®ä½æãå®äºãã¾ããï¼');
      } else {
        await interaction.reply({
          content:
            'å°ç¨ãµã¼ãã¼ã§å®è¡ãã¦ãã ããã\nãã®ãµã¼ãã¼ã§ã¯ä½¿ç¨ã§ãã¾ããã',
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content:
          'ç³ãè¨³ãããã¾ããã\nãã®ã³ãã³ãã¯<@728495196303523900>ã®ã¿æå¹ã§ãã',
        ephemeral: true,
      });
    }
  },
};
