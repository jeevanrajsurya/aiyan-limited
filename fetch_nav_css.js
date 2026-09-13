const https = require("https");
https.get("https://www.conoco.com/wp-content/themes/fuels-redesign/build/nav-menu/style-index.css?m=1787934377g", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    console.log(data.substring(0, 1000));
    // search for background or scroll or sticky
    const matches = data.match(/[^{}]*(?:background|backdrop|sticky|scroll)[^{}]*\{[^}]*\}/gi) || [];
    for (let m of matches.slice(0, 10)) {
      console.log("MATCH:", m.trim());
    }
  });
});
