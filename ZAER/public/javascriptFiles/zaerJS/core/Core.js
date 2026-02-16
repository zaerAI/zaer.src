// Copyright 2026 - ZAER.
// Licensed over MIT License.

let messages = [];
let isLoading = false;
let theme = localStorage.getItem("zaer-theme") || "auto";

const messagesArea = document.getElementById("messagesArea");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");
const inputForm = document.getElementById("inputForm");
const settingsBtn = document.getElementById("settingsBtn");
const aboutBtn = document.getElementById("aboutBtn");
const settingsModal = document.getElementById("settingsModal");
const aboutModal = document.getElementById("aboutModal");
const logoImg = document.getElementById("logo");

window.appState = {
  messages,
  isLoading,
  theme,
};

window.appElements = {
  messagesArea,
  promptInput,
  sendBtn,
  inputForm,
  settingsBtn,
  aboutBtn,
  settingsModal,
  aboutModal,
  logoImg,
};
