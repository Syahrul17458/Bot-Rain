//DIJIPLAK PENUH CINTA OLEH SAYA//

let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/「 Teka Teki 」/i.test(m.quoted.text)) return
  conn.tekateki = conn.tekateki ? conn.tekateki : {}
  if (!(id in conn.tekateki)) throw 'Soal itu telah berakhir!'
  if (m.quoted.id == conn.tekateki[id][0].id) {
    let json = JSON.parse(JSON.stringify(conn.tekateki[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
      global.db._data.users[m.sender].exp += conn.tekateki[id][2]
      m.reply(`*Benar!*\n+Rp${conn.tekateki[id][2]}`)
      clearTimeout(conn.tekateki[id][3])
      delete conn.tekateki[id]
    } else if (m.text.toLowerCase().endsWith(json.jawaban.split` `[1])) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
}
handler.exp = 0

module.exports = handler
