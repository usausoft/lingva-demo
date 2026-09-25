import { mount } from "svelte";
import App from "./App.svelte";
import "../../../../packages/theme/demo.css";
mount(App, { target: document.getElementById("app")! });
