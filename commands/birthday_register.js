const { ApplicationCommandOptionType } = require('discord.js');
const profileModel = require('../models/profileSchema.js');

module.exports = {
  data: {
    name: 'birthday_register',
    description: '๐ง่ช็ๆฅใ็ป้ฒใปๆดๆฐใใใ๏ผ',
    options: [
      {
        type: ApplicationCommandOptionType.Number,
        name: 'month',
        description: '่ช็ๆใๅฅๅใใฆใใ ใใ๏ผๅ่งๆฐๅญใงใ1ใ~ใ12ใใๅฅๅ๏ผ',
        value: 'month',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Number,
        name: 'day',
        description: '่ช็ๆฅใๅฅๅใใฆใใ ใใ(ๅ่งๆฐๅญใงใ1ใ~ใ31ใใๅฅๅ)',
        value: 'day',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    if (interaction.guild.id == '768073209169444884') {
      // ในใฉใใทใฅใณใใณใใฎๅฅๅๆๅ ฑใๅๅพ
      var new_birthday_month = interaction.options.getNumber('month');
      var new_birthday_day = interaction.options.getNumber('day');
      let lastday = new Date(2020, new_birthday_month, 0).getDate();

      let user_id = interaction.user.id;

      if (new_birthday_month >= 1 && new_birthday_month <= 12) {
        if (new_birthday_day >= 1 && new_birthday_day <= lastday) {
          if (new_birthday_month >= 1 && new_birthday_month <= 9) {
            var new_birthday_month = '0' + new_birthday_month;
          }
          if (new_birthday_day >= 1 && new_birthday_day <= 9) {
            var new_birthday_day = '0' + new_birthday_day;
          }
          let database_data = await profileModel.findById(user_id);
          let database_month = database_data.birthday_month;
          let database_day = database_data.birthday_day;
          console.log(
            `---ใใผใฟใใผในใใใฎใใผใฟ---\nmonth: ${database_month}\nday: ${database_day}\n------`
          );

          if (database_month == 'no_data') {
            if (database_day == 'no_data') {
              profileModel.findOne({ _id: user_id }, function (err, model) {
                if (err) {
                  console.log(err.message);
                  return;
                }

                // ๅๅฎนใๆดๆฐ
                model.birthday_month = new_birthday_month;
                model.birthday_day = new_birthday_day;
                model.status = 'yet';
                model.save(async function (err, model) {
                  if (err) {
                    console.log(err.message);
                    await interaction.reply(
                      '็ณใ่จณใใใใพใใใๅ้จใจใฉใผใ็บ็ใใพใใใ\n้็บ่(<@728495196303523900>)ใๅฏพๅฟใใพใใฎใงใใใฐใใใๅพใกใใ ใใใ\n\n----ๆฅญๅ้ฃ็ตก---\nใใผใฟใใผในใฎๆดๆฐๆใซใจใฉใผใ็บ็ใใพใใใ\nใณใณใฝใผใซใ็ขบ่ชใใฆใใ ใใใ'
                    );
                    return;
                  } else {
                    await interaction.reply({
                      embeds: [
                        {
                          title: 'ๆฐ่ฆ็ป้ฒๅฎไบ๏ผ',
                          description: `ใใชใใฎ่ช็ๆฅใ\`${new_birthday_month}ๆ${new_birthday_day}ๆฅ\`ใซ่จญๅฎใใพใใใ`,
                          color: 0x0000ff,
                        },
                      ],
                    });
                    return;
                  }
                });
              });
            } else {
              await interaction.reply(
                '็ณใ่จณใใใใพใใใๅ้จใจใฉใผใ็บ็ใใพใใใ\n้็บ่(<@728495196303523900>)ใๅฏพๅฟใใพใใฎใงใใใฐใใใๅพใกใใ ใใใ\n\n----ๆฅญๅ้ฃ็ตก---\nใใผใฟใใผในใฎmonthใ ใใno_dataใงใใใ'
              );
            }
          } else {
            if (database_day == 'no_data') {
              await interaction.reply(
                '็ณใ่จณใใใใพใใใๅ้จใจใฉใผใ็บ็ใใพใใใ\n้็บ่(<@728495196303523900>)ใๅฏพๅฟใใพใใฎใงใใใฐใใใๅพใกใใ ใใใ\n\n----ๆฅญๅ้ฃ็ตก---\nใใผใฟใใผในใฎdayใ ใใno_dataใงใใใ'
              );
            } else {
              profileModel.findOne({ _id: user_id }, function (err, model) {
                if (err) {
                  console.log(err.message);
                  return;
                }

                // ๅคใๆๅ ฑใๅๅพ
                let old_month = model.birthday_month;
                let old_day = model.birthday_day;
                // ๅๅฎนใๆดๆฐ
                model.birthday_month = new_birthday_month;
                model.birthday_day = new_birthday_day;
                model.save(async function (err, model) {
                  if (err) {
                    console.log(err.message);
                    await interaction.reply(
                      '็ณใ่จณใใใใพใใใๅ้จใจใฉใผใ็บ็ใใพใใใ\n้็บ่(<@728495196303523900>)ใๅฏพๅฟใใพใใฎใงใใใฐใใใๅพใกใใ ใใใ\n\n----ๆฅญๅ้ฃ็ตก---\nใใผใฟใใผในใฎๆดๆฐๆใซใจใฉใผใ็บ็ใใพใใใ\nใณใณใฝใผใซใ็ขบ่ชใใฆใใ ใใใ'
                    );
                    return;
                  } else {
                    await interaction.reply({
                      embeds: [
                        {
                          title: 'ๆดๆฐๅฎไบ๏ผ',
                          description: `ใใชใใฎ่ช็ๆฅใ\`${old_month}ๆ${old_day}ๆฅ\`ใใ\`${new_birthday_month}ๆ${new_birthday_day}ๆฅ\`ใซๆดๆฐใใพใใใ`,
                          color: 0x10ff00,
                        },
                      ],
                    });
                    return;
                  }
                });
              });
            }
          }
        } else {
          await interaction.reply({
            embeds: [
              {
                title: 'ใจใฉใผ๏ผ',
                description: `${new_birthday_month}ๆใซใฏใๆๅคงใง${lastday}ๆฅใพใงใใๅญๅจใใพใใใ\nๆญฃใใๆๆฅไฝฟ็จใใฆๅๅบฆใ่ฉฆใใใ ใใใ`,
                color: 0xff0000,
              },
            ],
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          embeds: [
            {
              title: 'ใจใฉใผ๏ผ',
              description: `1ๅนดใฏ1๏ฝ12ๆใพใงใใๅญๅจใใพใใใ\nๆญฃใใๆๆฅใไฝฟ็จใใฆๅๅบฆใ่ฉฆใใใ ใใใ`,
              color: 0xff0000,
            },
          ],
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        embeds: [
          {
            title: 'ใจใฉใผ๏ผ',
            description: `ใใฎใตใผใใผใงใใฎใณใใณใใฏๅฎ่กใงใใพใใใ`,
            color: 0xff0000,
          },
        ],
        ephemeral: true,
      });
    }
  },
};
