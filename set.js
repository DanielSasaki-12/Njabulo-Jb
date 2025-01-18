const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0Q2L1U1U2w0eGdLdGFSQUdQc2c2NTBpS3Q4K3FHdTRpRk0wbEovcU9HYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDA0blVkaDZSbjdSL0pSZE1VTFdvY0FVNzErR3l5bDdQTUd0SWlONDlsMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzREVTbnJQenp2bnB4YVR4UjQ0WFhtL0g3cHlzV3VUTlRJb3JLbVlEY1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHbHFNYUhmQitUNXdYQ1VtWFVmczQ0UFVPK1I2TUdJWVJhdDdXRk9uTG5nPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHRGluNVk1eUFqTVAxZGp0OXNOeGJTeU56RjZnN3Uwc2FyY245Vi9wbXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFPaGdRbWNHN2UyamRoZFI0YUFqSGZWOFI2MXRaeVl2eS9MVWEzQkIrR2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFBGeklvbGppZ1h2R3N0RFl6bHJzbUU5a2VLVGZMMVMwM3pyZzl1SC8zRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVlVSGhJUEFEK2o2Ri80S3dyZWV3VEhvS0NZeFlFTW50aHZxVzZhcDZEWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtSVjFTNWxReFFkaGVRb0JNazJqOXEvWnhmMWhBZEE5dEVTTnNyMFZhRWQ2b2FzSHdxS05MeEtscWY2Z0pTdDhpbXNaUkk4YzJzVFlwVjczZU84OWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IkJrcEpicjRWc0NkZGlPdkdIbzhjOTFWUzRONlVZR2cxbktHNGlNZVYyMHM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjdFR2RDeTh4UmtxRWExWTF2U2ZHaUEiLCJwaG9uZUlkIjoiMGJjOTg2Y2UtN2IyZi00NWY1LTg1ODEtMWIwYzM3ZjkwMzNlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im42ckhUbEVpbXkxT0JTazVvMkpZc0lEOFFocz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyamVTWXpRNjZiYjI5R3NySG5GQitSOEh2SkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFRUV1JDRDQiLCJtZSI6eyJpZCI6IjIyMTc2ODY0OTU5MDo1NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBcnRodXIgU2FzYWtpIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQNzJ1WkVFRU4rdXI3d0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTVHBRcDZIMTVrYldrM0t2NUdFVjBycmZkVTZBZ2RCV242VFpCZjNZODFBPSIsImFjY291bnRTaWduYXR1cmUiOiJ3OTUxcHhvZUo5OE1acDI2bWhEWXZXMFZnUldKdWJ3WXVLcjQxaGdGamRSaXpmSVNZUmdhaVU5QlRsWDhEWFlYWC8wUmwyMkMySDN0YTYya013R1pCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaGtNR044ZkJlTzVvYVBPeFFBUktQMUJqNCt4ZFB6SzZlOFhkekVnbGd4ODBpdGNTcFFLUjViRUZSNlN4VzZ0MU9lUG5rNmFVNW85NjdiQUcwOWpkalE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjE3Njg2NDk1OTA6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVWs2VUtlaDllWkcxcE55citSaEZkSzYzM1ZPZ0lIUVZwK2syUVg5MlBOUSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNzIxNzkwMH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Njabulo",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
