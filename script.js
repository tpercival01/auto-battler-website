var start_game;
var body_element = document.body;
var start_screen;
var start_container;
var bg_state = false;
var bg_image;
var commanders = ["one", "two", "three", "four"];
var commander;
var commander_ls = localStorage.getItem("commander");
var chosen = null;
var clicked;
var main_screen;

document.addEventListener("DOMContentLoaded", () => load_first_page());

function load_first_page() {
  start_button_container = document.createElement("div");
  start_button_container.id = "start-button-container";

  start_game = document.createElement("button");
  start_game.id = "start-game";
  start_game.innerHTML = "Start Game";
  start_game.addEventListener("click", () => {
    console.log("Game started");
    load_game();
  });

  start_button_container.appendChild(start_game);
  body_element.appendChild(start_button_container);
}

function load_game() {
  document.getElementById("start-button-container").style.display = "none";
  create_screen();
  //start_game();
}

function load_images() {
  console.log("TODO - Load images used as assets");
  bg_image = new Image();
  bg_image.onload = function () {
    bg_state = true;
    console.log("BG loaded.");
    render_main_menu();
  };

  bg_image.onerror = function () {
    console.error("Failed to load BG");
  };

  bg_image.src = "Assets/test-bg.jpg";
}

function create_screen() {
  load_images();
  start_screen = document.createElement("div");

  start_container = document.createElement("div");
  start_container.appendChild(start_screen);
  start_container.id = "start_container";

  body_element.appendChild(start_container);
}

function render_main_menu() {
  if (bg_state) {
    // draw commanders
    for (let j = 1; j < commanders.length + 1; j++) {
      commander = document.createElement("div");
      commander.id = "commander_" + j.toString();
      commander.className = "commander";

      commander.addEventListener("click", (e) => handle_chosen(e));

      start_container.appendChild(commander);
    }

    if (localStorage.getItem("commander") !== null) {
      previous_commander = document.getElementById(
        localStorage.getItem("commander")
      );
      previous_commander.style.border = "4px solid white";
      chosen = previous_commander;
      displayBackpackVisual(previous_commander.id);
    }

    var new_game_button = document.createElement("div");
    var customize_button = document.createElement("div");
    var settings_button = document.createElement("div");
    var quit_game_button = document.createElement("div");

    new_game_button.id = "new_game_button";
    new_game_button.className = "menu_button";
    new_game_button.innerHTML = "New game";
    new_game_button.addEventListener("click", start_new_game);

    customize_button.id = "customize_button";
    customize_button.className = "menu_button";
    customize_button.innerHTML = "Customize";
    customize_button.addEventListener("click", open_customization);

    settings_button.id = "settings_button";
    settings_button.className = "menu_button";
    settings_button.innerHTML = "Settings";
    settings_button.addEventListener("click", open_settings);

    quit_game_button.id = "quit_game_button";
    quit_game_button.className = "menu_button";
    quit_game_button.innerHTML = "Quit game";
    quit_game_button.addEventListener("click", quit_game);

    var button_container = document.createElement("div");
    button_container.id = "button_container";

    let temp_buttons = [
      new_game_button,
      customize_button,
      settings_button,
      quit_game_button,
    ];

    temp_buttons.forEach((child) => {
      button_container.appendChild(child);
    });

    start_container.appendChild(button_container);
  }
}

function handle_chosen(event) {
  clicked = event.target;

  if (chosen === clicked) {
    clicked.style.border = "";
    chosen = null;
    removeBackpackVisual();
  } else {
    if (chosen !== null) {
      chosen.style.border = "";
      removeBackpackVisual();
    }

    clicked.style.border = "4px solid white";
    displayBackpackVisual(clicked.id);
    chosen = clicked;
    localStorage.setItem("commander", chosen.id);
  }
}

function displayBackpackVisual(commanderId) {
  //removeBackpackVisual();
  let backpack_container = document.createElement("div");
  let backpack_visual = document.createElement("div");

  switch (commanderId) {
    case "commander_1":
      backpack_visual.id = "backpack_visual_1";
      break;
    case "commander_2":
      backpack_visual.id = "backpack_visual_2";
      break;
    case "commander_3":
      backpack_visual.id = "backpack_visual_3";
      break;
    case "commander_4":
      backpack_visual.id = "backpack_visual_4";
      break;

    default:
      return;
  }

  backpack_container.appendChild(backpack_visual);
  backpack_container.id = "backpack_container";
  start_container.appendChild(backpack_container);
}

function removeBackpackVisual() {
  var existingBackpackContainer = document.getElementById("backpack_container");

  if (existingBackpackContainer) {
    start_container.removeChild(existingBackpackContainer);
  }
}

function open_settings() {
  // volume control
  //  - Music
  //  - SFX
  // graphics control
  //  - Quality
  //  - Fullscreen
  // controls
  //  - keybindings
  //  - mouse sensitivity
  //  - allow gamepad
  // user interface
  //  - toggle hud elements
  //  - scale of hud
  // save/load
  //  - manual save
  //  - load game
  //  - autosave toggle
  settings_screen = document.createElement("canvas");
  ctx = settings_screen.getContext("2d");
  settings_screen.id = "settings_screen";
  settings_screen.width = 850;
  settings_screen.height = 630;

  settings_container = document.createElement("div");
  settings_container.appendChild(settings_screen);
  settings_container.id = "settings_container";

  settings_menu_close = document.createElement("button");
  settings_menu_close.id = "settings_menu_close";
  settings_menu_close.className = "menu_button";
  settings_menu_close.innerHTML = "Close settings";
  settings_menu_close.addEventListener("click", () => {
    body_element.removeChild(body_element.children[3]);
  });
  settings_container.appendChild(settings_menu_close);

  body_element.appendChild(settings_container);
}

function open_customization() {
  customize_screen = document.createElement("canvas");
  ctx = customize_screen.getContext("2d");
  customize_screen.id = "customize_screen";
  customize_screen.width = 850;
  customize_screen.height = 630;

  customize_container = document.createElement("div");
  customize_container.appendChild(customize_screen);
  customize_container.id = "customize_container";

  customize_menu_close = document.createElement("button");
  customize_menu_close.id = "customize_menu_close";
  customize_menu_close.className = "menu_button";
  customize_menu_close.innerHTML = "Close customization";
  customize_menu_close.addEventListener("click", () => {
    body_element.removeChild(body_element.children[3]);
  });
  customize_container.appendChild(customize_menu_close);

  body_element.appendChild(customize_container);
}

function quit_game() {
  while (body_element.firstChild) {
    body_element.removeChild(body_element.firstChild);
  }

  load_first_page();
}

function start_new_game() {
  // clear screen
  // add elements for choosing team
  // add buttons for starting round, choosing name, returning to menu
  while (start_container.firstChild) {
    start_container.removeChild(start_container.firstChild);
  }

  main_screen = document.createElement("canvas");

  var commander_play = document.createElement("div");
  commander_play.id = commander_ls;
  commander_play.className = "commander";

  start_container.appendChild(commander_play);
}
