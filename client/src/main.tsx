import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const podcastDock = document.createElement("script");
podcastDock.src = "https://cdn.jsdelivr.net/gh/joshualparris/JoshHub@7b6ec3907b27924dbe1d64c9ece4e439e6de8de7/public/podcast-dock.js";
podcastDock.dataset.topics = "it,software,research,faith,relationships,career,decision,homelab,horses";
podcastDock.dataset.defaultTopic = "faith";
podcastDock.defer = true;
document.body.appendChild(podcastDock);
