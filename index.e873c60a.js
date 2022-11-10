fetch("https://restcountries.com/v3.1/all").then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).catch((function(t){return console.log("Error just hapend")})).then((function(t){return console.log(t)}));
//# sourceMappingURL=index.e873c60a.js.map
