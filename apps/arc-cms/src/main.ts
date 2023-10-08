import { createApp } from "vue";
import { add } from "@arc/utils";
import "./style.css";
import App from "./App.vue";

(function () {
  console.log("🚀 ~ :", add(15, 10));
})();


createApp(App).mount("#app")