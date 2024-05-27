var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var platforms;

var game = new Phaser.Game(config);

function preload() {
  this.load.image(
    "sky",
    "Assets/craftpix-net-481981-free-summer-pixel-art-backgrounds/PNG/summer 2/1.png"
  );
  this.load.image(
    "ground",
    "Assets/craftpix-net-481981-free-summer-pixel-art-backgrounds/PNG/summer 2/2.png"
  );
  this.load.spritesheet(
    "wizard1",
    "Assets/craftpix-net-431295-free-wizard-sprite-sheets-pixel-art/Lightning Mage/Idle.png",
    { frameWidth: 32, frameHeight: 48 }
  );
}

function create() {
  this.add.image(400, 300, "sky");
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");
}

function update() {}
