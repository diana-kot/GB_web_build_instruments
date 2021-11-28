import "./dateCalc.js";
import { Tabs } from "./tabs.js";
import { Timer } from "./timer.js";
import { initTimer } from "./timerInit.js";


//Tabs
Tabs();

// Timer
const timer = new Timer("timer");
initTimer(timer);