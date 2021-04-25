const fs = require("fs");
const axios = require("axios").default;

async function downloadFile(url, path) {
  const writer = fs.createWriteStream(path);

  // await fetch(
  //   "https://r1---sn-hvcpuxa3-jhcl.googlevideo.com/videoplayback?expire=1619367219&ei=00CFYM3yDvj54-EPof2wqAo&ip=43.250.242.48&id=o-AH_tpEBQ-m-0k0IfTsb0PhMErUKJFLPOeGHGBOZGrcdM&itag=22&source=youtube&requiressl=yes&mh=Mh&mm=31%2C29&mn=sn-hvcpuxa3-jhcl%2Csn-npoe7ney&ms=au%2Crdu&mv=m&mvi=1&pl=24&gcr=lk&initcwndbps=142500&vprv=1&mime=video%2Fmp4&ns=5D2DBqlMMXLjGss_Et7UmJQF&cnr=14&ratebypass=yes&dur=522.240&lmt=1526043082892067&mt=1619345322&fvip=5&fexp=24001373%2C24007246&c=WEB&n=QCE_2-Trhpq9ioscN5&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgRUHs1A_nV2Zo2Ab2DZCHxZMQewJeU-ZbAxpKKkjC2lgCIG_ZWko3bxPhmymChhrE70LXIPs4ABiZZjiwMfXl7F9F&sig=AOq0QJ8wRAIgMcO5Jjl_LjiYMP3HPh-kZuJKE-kbr1ZY-zxROrXQvzECIDdUboiJUAih-6WZiUTeLbKdtOuMTS76XzGSYyuUHYRO&title=Interstellar%20theme%20song%20-%20video",
  //   {
  //     credentials: "omit",
  //     headers: {
  //       "User-Agent":
  //         "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0",
  //       Accept:
  //         "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  //       "Accept-Language": "en-US,en;q=0.5",
  //       "Upgrade-Insecure-Requests": "1",
  //       Pragma: "no-cache",
  //       "Cache-Control": "no-cache",
  //     },
  //     referrer: "https://en.savefrom.net/",
  //     method: "GET",
  //     mode: "cors",
  //   }
  // );

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
    headers: {
      mode: "cors",
      referrer: "https://en.savefrom.net/",
      Credential: "omit",
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Upgrade-Insecure-Requests": "1",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

module.exports.downloadFile = downloadFile;
