import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

  
   let groupmenu = `
   ✦ ───『 *𝐆𝐑𝐎𝐔𝐏* 』─── ⚝
  ➫ .𝙶𝙴𝚃𝙱𝙸𝙾
  ➫ .𝙰𝙽𝙸𝙼𝙴𝚀𝚄𝙾𝚃𝙴
  ➫ .𝚂𝙴𝚃𝙳𝙴𝚂𝙲
  ➫ .𝚂𝙴𝚃𝙽𝙰𝙼𝙴
  ➫ .𝙰𝙳𝙳
  ➫ .𝙳𝙴𝙻𝙴𝚃𝙴
  ➫ .𝙳𝙴𝙻𝙴𝚆𝙰𝚁𝙽
  ➫ .𝙳𝙴𝙼𝙾𝚃𝙴
  ➫ .𝙸𝙽𝙵𝙾𝙶𝙿
  ➫ .𝙷𝙸𝙳𝙴𝚃𝙰𝙶
  ➫ .𝙸𝙽𝚅𝙸𝚃𝙴
  ➫ .𝙺𝙸𝙲𝙺
  ➫ .𝙻𝙸𝙽𝙺
  ➫ .𝙿𝙾𝙻𝙻
  ➫ .𝙿𝚁𝙾𝙵𝙸𝙻𝙴
  ➫ .𝙿𝚁𝙾𝙼𝙾𝚃𝙴
  ➫ .𝚁𝙴𝚂𝙴𝚃𝙻𝙸𝙽𝙺
  ➫ .𝚂𝙴𝚃𝙱𝚈𝙴
  ➫ .𝙶𝚁𝙾𝚄𝙿 *open/close*
  ➫ .𝚂𝙴𝚃𝚆𝙴𝙻𝙲𝙾𝙼𝙴
  ➫ .𝚂𝙸𝙼𝚄𝙻𝙰𝚃𝙴
  ➫ .𝚂𝚃𝙰𝙵𝙵
  ➫ .𝚃𝙰𝙶𝙰𝙻𝙻
  ➫ .𝚆𝙰𝚁𝙽
  ➫ .𝚆𝙰𝚁𝙽𝚂
  ╰──────────⳹`
  
  let ownermenu = `
  ✦ ───『 *𝐎𝐖𝐍𝐄𝐑* 』─── ⚝
  ◈ .𝙰𝙳𝙳𝙿𝚁𝙴𝙼
  ◈ .𝙰𝙻𝙻𝙾𝚆
  ◈ .𝙰𝙳𝙳𝙾𝚆𝙽𝙴𝚁
  ◈ .𝙷𝙴𝚁𝙾𝙺𝚄
  ◈ .𝙱𝙰𝙽𝙲𝙷𝙰𝚃
  ◈ .𝙱𝙰𝙽
  ◈ .𝚃𝚇
  ◈ .𝙱𝚁𝙾𝙰𝙳𝙲𝙰𝚂𝚃𝙶𝚁𝙾𝚄𝙿
  ◈ .𝙱𝙲𝙶𝙲
  ◈ .𝙲𝙻𝙴𝙰𝚁𝚃𝙼𝙿
  ◈ .𝙳𝙴𝙻𝙴𝚇𝙿𝙸𝚁𝙴𝙳
  ◈ .𝙳𝙴𝙻𝙿𝚁𝙴𝙼
  ◈ .𝚁𝙴𝙼𝙾𝚅𝙴𝙾𝚆𝙽𝙴𝚁
  ◈ .𝚂𝙴𝚃𝙵𝚄𝙻𝙻𝙿𝚁𝙾𝙵𝙸𝙻𝙴
  ◈ .𝙶𝙴𝚃𝙿𝙻𝚄𝙶𝙸𝙽
  ◈ .𝙹𝙾𝙸𝙽 <chat.whatsapp.com> <dias>
  ◈ .𝚁𝙴𝚂𝙴𝚃 <26xxx>
  ◈ .𝚁𝙴𝚂𝙴𝚃𝙿𝚁𝙴𝙵𝙸𝚇
  ◈ .𝚂𝙴𝚃𝙿𝚁𝙴𝙵𝙸𝚇
  ◈ .𝚁𝙴𝚂𝚃𝙰𝚁𝚃
  ◈ .𝚄𝙽𝙱𝙰𝙽 𝚄𝚂𝙴𝚁
  ◈ .𝚄𝙽𝙱𝙰𝙽𝙲𝙷𝙰𝚃
  ◈ .𝙲𝙾𝙽𝙵𝙸𝙶
  ◈ .𝚄𝙿𝙳𝙰𝚃𝙴
  ◈ .𝙻𝙸𝚂𝚃𝙱𝙰𝙽
  ◈ .𝙳𝙴𝙻𝙴𝚃𝙴𝙿𝙻𝚄𝙶𝙸𝙽
  ╰──────────⳹`
  
  let funmenu = `
  ✦ ───『 *𝐅𝐔𝐍* 』─── ⚝
  ◈ .𝙰𝙵𝙺
  ◈ .𝚃𝙾-𝙼𝙿3
  ◈ .𝚃𝙾-𝙰𝚅
  ◈ .𝙲𝙷𝙰𝚁𝙰𝙲𝚃𝙴𝚁
  ◈ .𝙳𝙰𝚁𝙴
  ◈ .𝙵𝙻𝙸𝚁𝚃
  ◈ .𝙶𝙰𝚈
  ◈ .𝙿𝙸𝙲𝙺𝚄𝙿-𝙻𝙸𝙽𝙴
  ◈ .𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽
  ◈ .𝚂𝙷𝙰𝚈𝙰𝚁𝙸
  ◈ .𝚂𝙷𝙸𝙾
  ◈ .𝚈𝙾𝙼𝙰𝙼𝙰-𝙹𝙾𝙺𝙴𝚂
  ◈ .𝚆𝙰𝚂𝚃𝙴
  ◈ .𝙸𝙼𝙰𝙶𝙴
  ◈ .𝙼𝙴𝙼𝙴
  ◈ .𝚀𝚄𝙾𝚃𝙴
  ╰──────────⳹`
  
  let reactmenu = `
  ✦ ───『 *𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒* 』─── ⚝
  ◈ .𝙱𝚄𝙻𝙻𝚈 - @tag
  ◈ .𝙲𝚁𝚈 - @tag
  ◈ .𝙷𝚄𝙶 - @tag
  ◈ .𝙰𝚆𝙾𝙾 - @tag
  ◈ .𝙺𝙸𝚂𝚂 - @tag
  ◈ .𝙻𝙸𝙲𝙺 - @tag
  ◈ .𝙿𝙰𝚃 - @tag
  ◈ .𝚂𝙼𝚄𝙶 - @tag
  ◈ .𝙱𝙾𝙽𝙺 - @tag
  ◈ .𝚈𝙴𝙴𝚃 - @tag
  ◈ .blush @tag
  ◈ .𝚂𝙼𝙸𝙻𝙴 - @tag
  ◈ .𝚆𝙰𝚅𝙴 - @tag
  ◈ .𝙷𝙸𝙶𝙷𝙵𝙸𝚅𝙴 - @tag
  ◈ .𝙷𝙰𝙽𝙳𝙷𝙾𝙻𝙳 - @tag
  ◈ .𝙽𝙾𝙼 - @tag
  ◈ .𝙱𝙸𝚃𝙴 - @tag
  ◈ .𝙶𝙻𝙾𝙼𝙿 - @tag
  ◈ .𝚂𝙻𝙰𝙿 - @tag
  ◈ .𝙺𝙸𝙻𝙻 - @tag
  ◈ .𝙷𝙰𝙿𝙿𝚈 - @tag
  ◈ .𝚆𝙸𝙽𝙺 - @tag
  ◈ .𝙿𝙾𝙺𝙴 - @tag
  ◈ .𝙳𝙰𝙽𝙲𝙴 - @tag
  ◈ .𝙲𝚁𝙸𝙽𝙶𝙴 - @tag
  ╰──────────⳹`
  
  let dlmenu = `
  ✦ ───『 *𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑* 』─── ⚝
  ◈ .𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 - 𝚄𝚁𝙻
  ◈ .𝙶𝙳𝚁𝙸𝚅𝙴 🅟
  ◈ .𝙶𝙸𝚃𝙲𝙻𝙾𝙽𝙴 - 𝚄𝚁𝙻
  ◈ .𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼
  ◈ .𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝙻𝙴 - 𝚄𝚁𝙻
  ◈ .𝙼𝙴𝙶𝙰
  ◈ .𝙼𝙾𝙳𝙰𝙿𝙺
  ◈ .𝙿𝙻𝙰𝚈
  ◈ .𝙿𝙻𝙰𝚈2
  ◈ .𝙿𝙻𝙰𝚈𝚅𝙸𝙳
  ◈ .𝚂𝙿𝙾𝚃𝙸𝙵𝚈
  ◈ .𝚃𝙸𝙺𝚃𝙾𝙺
  ◈ .𝚃𝙸𝙺𝚃𝙾𝙺𝚂𝚃𝙰𝙻𝙺
  ◈ .𝚃𝙴𝙸𝚃𝚃𝙴𝚁 - 𝚄𝚁𝙻 
  ◈ .𝚈𝚃-𝙼𝙿3
  ◈ .𝚈𝚃-𝚂𝙴𝙰𝚁𝙲𝙷
  ◈ .𝚈𝚃-𝙼𝙿4 
  ◈ .𝚆𝙰𝙻𝙻𝙿𝙰𝙿𝙴𝚁
  ╰──────────⳹`
  
  let gamemenu = `
  ✦ ───『 *𝐆𝐀𝐌𝐄* 』─── ⚝
  ◈ .slot <amount>
  ◈ .chess [from to]
  ◈ .chess delete
  ◈ .chess join
  ◈ .chess start
  ◈ .delttt
  ◈ .guessflag
  ◈ .Maths <modes>
  ◈ .ppt <rock/paper/scissors>
  ◈ .tictactoe <tag number>
  ╰──────────⳹`
  let logomenu = `
  ✦ ───『 *maker* 』─── ⚝
  ◈ .blur
  ◈ .difuminar2
  ◈ .hornycard
  ◈ .hornylicense
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ◈ .simpcard
  ◈ .itssostupid
  ◈ .iss
  ◈ .stupid
  ◈ .tweet <comment>
  ◈ .lolicon
  ◈ .ytcomment <comment>
  ╰──────────⳹`
  
  let stickermenu = `
  ✦ ───『 *sticker* 』─── ⚝
  ◈ .emojimix <emoji+emoji>
  ◈ .getsticker
  ◈ .smaker
  ◈ .stickerwithmeme (caption|reply media)
  ◈ .swmeme <url>
  ◈ .swm(caption|reply media)
  ◈ .sfull
  ◈ .toimg <sticker>
  ◈ .tovid
  ◈ .trigger <@user>
  ◈ .ttp
  ◈ .ttp2
  ◈ .ttp3
  ◈ .ttp4
  ◈ .ttp5
  ◈ .attp
  ◈ .attp2
  ◈ .attp3
  ◈ .take <name>|<author>
  ╰──────────⳹`
  
  let audiomenu = `
  ✦ ───『 *audio* 』─── ⚝
  ◈ .bass [vn]
  ◈ .blown [vn]
  ◈ .deep [vn]
  ◈ .earrape [vn]
  ◈ .fast [vn]
  ◈ .fat [vn]
  ◈ .nightcore [vn]
  ◈ .reverse [vn]
  ◈ .robot [vn]
  ◈ .slow [vn]
  ◈ .smooth [vn]
  ◈ .tupai [vn]
  ╰──────────⳹`
  
  
  let newsmenu = `
  ✦ ───『 *news* 』─── ⚝
  ◈ .news
  ◈ .technews
  ◈ .ndtv
  ╰──────────⳹
  `
  let economy = `
  ✦ ───『 *economy* 』─── ⚝
  ◈ .addgold <@user>
  ◈ .addxp <@user>
  ◈ .bank
  ◈ .buych
  ◈ .cock-fight <amount>
  ◈ .buy
  ◈ .buyall
  ◈ .daily
  ◈ .deposit
  ◈ .gamble <amount> <color(red/black)>
  ◈ .give credit [amount] [@tag]
  ◈ .levelup
  ◈ .rank
  ◈ .rob
  ◈ .roulette <amount> <color(red/black)>
  ◈ .wallet
  ◈ .withdraw
  ◈ .work
  ╰──────────⳹`
  let animemenu = `
  ✦ ───『 *anime* 』─── ⚝
  ◈ .anime
  ◈ .akira
  ◈ .akiyama
  ◈ .anna
  ◈ .asuna
  ◈ .ayuzawa
  ◈ .boruto
  ◈ .chiho
  ◈ .chitoge
  ◈ .deidara
  ◈ .erza
  ◈ .elaina
  ◈ .eba
  ◈ .emilia
  ◈ .hestia
  ◈ .hinata
  ◈ .inori
  ◈ .isuzu
  ◈ .itachi
  ◈ .itori
  ◈ .kaga
  ◈ .kagura
  ◈ .kaori
  ◈ .keneki
  ◈ .kotori
  ◈ .kurumi
  ◈ .madara
  ◈ .mikasa
  ◈ .miku
  ◈ .minato
  ◈ .naruto
  ◈ .nezuko
  ◈ .sagiri
  ◈ .sasuke
  ◈ .sakura
  ◈ .manhwa
  ◈ .waifu
  ◈ .neko
  ◈ .zerotwo
  ◈ .loli
  ◈ .pokedex <pokemon>
  ◈ .trace
  ╰──────────⳹
  `
  let nsfwmenu = `
  ✦ ───『 *nsfw* 』─── ⚝
  ◈ .genshin
  ◈ .swimsuit
  ◈ .schoolswimsuit
  ◈ .white
  ◈ .barefoot
  ◈ .touhou
  ◈ .gamecg
  ◈ .hololive
  ◈ .uncensored
  ◈ .sunglasses
  ◈ .glasses
  ◈ .weapon
  ◈ .shirtlift
  ◈ .chain
  ◈ .fingering
  ◈ .flatchest
  ◈ .torncloth
  ◈ .bondage
  ◈ .demon
  ◈ .wet
  ◈ .pantypull
  ◈ .headdress
  ◈ .headphone
  ◈ .tie
  ◈ .anusview
  ◈ .shorts
  ◈ .stokings
  ◈ .topless
  ◈ .beach
  ◈ .bunnygirl
  ◈ .bunnyear
  ◈ .idol
  ◈ .vampire
  ◈ .gun
  ◈ .maid
  ◈ .bra
  ◈ .nobra
  ◈ .bikini
  ◈ .whitehair
  ◈ .blonde
  ◈ .pinkhair
  ◈ .bed
  ◈ .ponytail
  ◈ .nude
  ◈ .dress
  ◈ .underwear
  ◈ .foxgirl
  ◈ .uniform
  ◈ .skirt
  ◈ .sex
  ◈ .sex2
  ◈ .sex3
  ◈ .breast
  ◈ .twintail
  ◈ .spreadpussy
  ◈ .tears
  ◈ .seethrough
  ◈ .breasthold
  ◈ .drunk
  ◈ .fateseries
  ◈ .spreadlegs
  ◈ .openshirt
  ◈ .headband
  ◈ .food
  ◈ .close
  ◈ .tree
  ◈ .nipples
  ◈ .erectnipples
  ◈ .horns
  ◈ .greenhair
  ◈ .wolfgirl
  ◈ .catgirl
  ◈ .nsfw
  ◈ .ass
  ◈ .boobs
  ◈ .lesbian
  ◈ .pussy
  ◈ .pack
  ◈ .xvid
  ◈ .xnxx
  ╰──────────⳹`
  
  let toolsmenu = `
  ✦ ───『 *tools* 』─── ⚝
  ◈ .nowa
  ◈ .qr <text>
  ◈ .qrcode <text>
  ◈ .style <key> <text>
  ◈ .weather *<place>*
  ◈ .dehaze
  ◈ .recolor
  ◈ .hdr
  ◈ .length <amount>
  ◈ .tinyurl <link>
  ◈ .shorten <link>
  ◈ .tempmail
  ◈ .shazam
  ◈ .cal <equation>
  ◈ .carbon <code>
  ◈ .define <word>
  ◈ .element
  ◈ .google
  ◈ .itunes
  ◈ .lyrics
  ◈ .imdb
  ◈ .course
  ◈ .randomcourse
  ◈ .readmore <text1>|<text2>
  ◈ .readvo
  ◈ .removebg
  ◈ .ss <url>
  ◈ .ssf <url>
  ◈ .subreddit
  ◈ .telesticker  Ⓛ
  ◈ .tourl
  ◈ .translate <lang> <text>
  ◈ .true
  ◈ .tts <lang> <task>
  ◈ .wa
  ◈ .wikipedia
  ╰──────────⳹`
  
  let Aimenu = `
  ✦ ───『 *AI* 』─── ⚝
  ◈ .bing
  ◈ .dalle
  ◈ .chatgpt
  ◈ .toanime
  ◈ .gitagpt
  ◈ .tocartoon
  ◈ .ai
  ◈ .bard
  ◈ .alexa
  ╰──────────⳹
  `
  let religionmenu = `
    ✦ ───『 *plugin* 』─── ⚝
  ◈ .plugins
  ◈ .install <Gist URL>
  ╰──────────⳹`
  
  let botmenu = `
  ✦ ───『 *Bot Menu* 』─── ⚝
  ◈ .ping
  ◈ .runtime
  ◈ .script
  ◈ .server
  ◈ .blocklist
  ◈ .alive
  ◈ .info
  ◈ .owner
  ◈ .totalfeature
  ◈ .list
  ◈ .messi
  ◈ .cristianoronaldo
  ◈ .cr7
  ◈ .ppcouple
  ◈ .ppcp
  ◈ .pinterest
  ◈ .reg <name.age>
  ◈ .mysn
  ◈ .unreg 
  ╰──────────⳹
  `
  let pluginmenu = `
  ✦ ───『 *plugin* 』─── ⚝
  ◈ .plugins
  ◈ .install <Gist URL>
  ╰──────────⳹
  `

  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
  
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `
  「 ${botname} 🎁XMD 」\n
  ┌─❖
  │ *_Hi_* 👋 
  └┬❖ *_${name}_* Senpai
  ┌┤✑ *${ucpn}* 😄
  │└────────────┈ ⳹
  │
  └─ 𝞑𝞗𝙏 𝞘𝞜𝙁𝞗
  │𝐁𝐎𝐓 : ${botname}
  │𝐌𝐨𝐝𝐞 : ${mode}
  │𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦 : ${platform}
  │𝐇𝐨𝐬𝐭 : Kali linux
  │𝐓𝐲𝐩𝐞 : NodeJs
  │𝐁𝐚𝐢𝐥𝐞𝐲𝐬 : Multi Device
  │𝐏𝐫𝐞𝐟𝐢𝐱 : [ *${usedPrefix}* ]
  │𝐒𝐩𝐞𝐞𝐝 : 0.00001 miliseconds
  │𝐑𝐮𝐧𝐭𝐢𝐦𝐞 : ${muptime}
  │𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞 : ${totalreg}
  │  ${readMore}
  └─ 𝙐𝙎𝞢𝞒 𝞘𝞜𝙁𝞗
  │𝐍𝐚𝐦𝐞 : ${name}
  │𝐆𝐨𝐥𝐝 : ${credit}
  │𝐑𝐨𝐥𝐞 : ${role}
  │𝐋𝐞𝐯𝐞𝐥 : ${level}
  │𝐗𝐩 : ${exp}
  │
  └─ 𝞘𝞜𝙁𝞗 𝘾𝞛𝘿
  │ *${totalfeatures}* Commands
  │
  └─ 𝞘𝞜𝙁𝞗 
  │ *_Reply With the Number_*
  │ *_To Get Respected Menu_*
  │${readMore}
  ┬────────────┈ ⳹
  │✑  Please Reply *MENU Number*
  │✑  Given *BELOW*
┌──────────────┈ ⳹
│ *1.*  ❏ Bot Menu
│ *2.*  ❏ Owner Menu
│ *3.*  ❏ Group Menu
│ *4.*  ❏ Fun Menu
│ *5.*  ❏ Reaction Menu
│ *6.*  ❏ Downloader Menu
│ *7.*  ❏ Game Menu
│ *8.*  ❏ Logo Menu
│ *9.*  ❏ Sticker Menu
│ *10.* ❏ Audio Menu
│ *11.* ❏ News Menu
│ *12.* ❏ Economy Menu 
│ *13.* ❏ Anime Menu 
│ *14.* ❏ Coming Soon
│ *15.* ❏ Tools Menu 
│ *16.* ❏ Ai Menu 
│ *17.* ❏ Plugin Menu 
└─────────────────┈⳹
 ${readMore}` 
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: fcontact })
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 60 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: botmenu
      }, { quoted:fcontact });
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: ownermenu
      }, { quoted:fcontact });
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: funmenu
      }, { quoted:fcontact });
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: reactmenu
      }, { quoted:fcontact });
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: dlmenu
      }, { quoted:fcontact });
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: logomenu
      }, { quoted:fcontact });
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: stickermenu
      }, { quoted:fcontact });
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: audiomenu
      }, { quoted:fcontact });
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: newsmenu
      }, { quoted:fcontact });
      } else if (choice === "12") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: economy
      }, { quoted:fcontact });
      } else if (choice === "13") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: animemenu
      }, { quoted:fcontact });
      } else if (choice === "14") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: nsfwmenu
      }, { quoted:fcontact });
      } else if (choice === "15") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: toolsmenu
      }, { quoted:fcontact });
      } else if (choice === "16") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: Aimenu
      }, { quoted:fcontact });
      } else if (choice === "17") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: religionmenu
      }, { quoted:fcontact });
      } else if (choice === "18") {
        await conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/74b32f0d7c0571b2bf5bb.jpg' },
        caption: pluginmenu
      }, { quoted:fcontact });
      } else {
        m.reply('Invalid choice. Please reply with a valid number.');
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["downloader"];
  handler.command = /^(menu4)$/i;
  handler.limit = true;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Kolkata").format("HH")
    let res = "Good morning ☀️"
    if (time >= 4) {
     res = "Good Morning 🌄"
    }
    if (time >= 10) {
     res = "Good Afternoon ☀️"
    }
    if (time >= 15) {
     res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
     res = "Good Night 🌙"
    }
    return res
   }
  
