import devConfigs from "./dev.js";
import prodConfigs from "./prod.js";

let keys;

if (process.env.NODE_Env === "production") {
  keys = prodConfigs;
} else {
  keys = devConfigs;
}

export default keys;
