import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const podcastDock = document.createElement("script");
podcastDock.src = "https://cdn.jsdelivr.net/gh/joshualparris/JoshHub@35c4348b4adfbc1c64bad8a3d3e31ede008a4441/public/podcast-dock.js";
podcastDock.dataset.topics = "it,software,research,faith,relationships,career,decision,homelab,horses";
podcastDock.dataset.defaultTopic = "faith";
podcastDock.defer = true;
document.body.appendChild(podcastDock);
