fetch("https://restcountries.com/v3.1/all").then((o=>{if(!o.ok)throw new Error(o.status);return o.json()})).catch((o=>console.log("Error just hapend"))).then((o=>console.log(o)));
//# sourceMappingURL=index.f2c0c2ab.js.map
