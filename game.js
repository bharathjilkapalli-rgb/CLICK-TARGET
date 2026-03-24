// Global theme: 'snow' or 'desert'
let currentTheme = 'snow';

function initiateGameOver(data) {
  alert("Game Over! Score: " + data.score);
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this._buildSnowAssets();
    this._buildDesertAssets();
    this._buildTargetAsset();
  }

  _buildTargetAsset() {
    const tCanvas = document.createElement('canvas');
    tCanvas.width = 80; tCanvas.height = 80;
    const c = tCanvas.getContext('2d');
    c.beginPath(); c.arc(40, 40, 38, 0, Math.PI * 2);
    c.strokeStyle = '#ff0000'; c.lineWidth = 4; c.stroke();
    c.beginPath(); c.arc(40, 40, 26, 0, Math.PI * 2);
    c.strokeStyle = '#ff0000'; c.lineWidth = 4; c.stroke();
    c.beginPath(); c.arc(40, 40, 12, 0, Math.PI * 2);
    c.fillStyle = '#ff0000'; c.fill();
    c.strokeStyle = '#ff0000'; c.lineWidth = 2;
    c.moveTo(40, 0); c.lineTo(40, 80); c.stroke();
    c.moveTo(0, 40); c.lineTo(80, 40); c.stroke();
    this.textures.addCanvas('target', tCanvas);
  }

  _buildSnowAssets() {
    // Snow background
    const bg = document.createElement('canvas');
    bg.width = 1280; bg.height = 720;
    const c = bg.getContext('2d');
    const g = c.createLinearGradient(0, 0, 0, 720);
    g.addColorStop(0, '#0d0221'); g.addColorStop(0.4, '#1a0533'); g.addColorStop(1, '#0a1045');
    c.fillStyle = g; c.fillRect(0, 0, 1280, 720);
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1280, y = Math.random() * 720, r = Math.random() * 2;
      const cols = ['#ffffff','#ffe4b5','#add8e6','#ffb6c1','#90ee90'];
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = cols[Math.floor(Math.random() * cols.length)]; c.fill();
    }
    const n1 = c.createRadialGradient(400,300,10,400,300,300);
    n1.addColorStop(0,'rgba(138,43,226,0.15)'); n1.addColorStop(1,'rgba(0,0,0,0)');
    c.fillStyle = n1; c.fillRect(0,0,1280,720);
    const n2 = c.createRadialGradient(900,400,10,900,400,250);
    n2.addColorStop(0,'rgba(0,191,255,0.12)'); n2.addColorStop(1,'rgba(0,0,0,0)');
    c.fillStyle = n2; c.fillRect(0,0,1280,720);
    this.textures.addCanvas('bg_snow', bg);

    // Rock
    const rc = document.createElement('canvas');
    rc.width = 100; rc.height = 100;
    const r = rc.getContext('2d');
    r.beginPath();
    r.moveTo(50,4); r.lineTo(90,25); r.lineTo(96,62);
    r.lineTo(70,93); r.lineTo(30,95); r.lineTo(6,68); r.lineTo(10,28); r.closePath();
    const rg = r.createRadialGradient(40,35,4,50,50,50);
    rg.addColorStop(0,'#bbbbbb'); rg.addColorStop(1,'#333333');
    r.fillStyle = rg; r.fill();
    r.strokeStyle = '#111'; r.lineWidth = 3; r.stroke();
    this.textures.addCanvas('rock', rc);
  }

  _buildDesertAssets() {
    // Desert background
    const bg = document.createElement('canvas');
    bg.width = 1280; bg.height = 720;
    const c = bg.getContext('2d');
    // Sky
    const sky = c.createLinearGradient(0, 0, 0, 480);
    sky.addColorStop(0, '#ff6a00'); sky.addColorStop(0.5, '#ffb347'); sky.addColorStop(1, '#ffe066');
    c.fillStyle = sky; c.fillRect(0, 0, 1280, 480);
    // Sun
    const sun = c.createRadialGradient(640, 160, 10, 640, 160, 120);
    sun.addColorStop(0, 'rgba(255,255,200,1)'); sun.addColorStop(0.4, 'rgba(255,220,50,0.9)'); sun.addColorStop(1, 'rgba(255,140,0,0)');
    c.fillStyle = sun; c.fillRect(0, 0, 1280, 480);
    // Heat shimmer lines
    c.strokeStyle = 'rgba(255,200,50,0.15)'; c.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const y = 300 + i * 15;
      c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(320, y-8, 960, y+8, 1280, y); c.stroke();
    }
    // Sand ground
    const sand = c.createLinearGradient(0, 480, 0, 720);
    sand.addColorStop(0, '#e8c97a'); sand.addColorStop(1, '#c8a84b');
    c.fillStyle = sand; c.fillRect(0, 480, 1280, 240);
    // Sand dunes
    c.fillStyle = '#d4a843';
    c.beginPath(); c.ellipse(300, 490, 320, 60, 0, 0, Math.PI); c.fill();
    c.beginPath(); c.ellipse(900, 500, 400, 70, 0, 0, Math.PI); c.fill();
    c.beginPath(); c.ellipse(1150, 485, 200, 45, 0, 0, Math.PI); c.fill();
    // Cacti
    const drawCactus = (cx, cy) => {
      c.fillStyle = '#3a7d44'; c.strokeStyle = '#2d6035'; c.lineWidth = 2;
      c.fillRect(cx-8, cy-80, 16, 80); c.strokeRect(cx-8, cy-80, 16, 80);
      c.fillRect(cx-28, cy-55, 20, 10); c.strokeRect(cx-28, cy-55, 20, 10);
      c.fillRect(cx-28, cy-65, 10, 20); c.strokeRect(cx-28, cy-65, 10, 20);
      c.fillRect(cx+8, cy-45, 20, 10); c.strokeRect(cx+8, cy-45, 20, 10);
      c.fillRect(cx+18, cy-55, 10, 20); c.strokeRect(cx+18, cy-55, 10, 20);
    };
    drawCactus(180, 480); drawCactus(1050, 480); drawCactus(620, 480);
    this.textures.addCanvas('bg_desert', bg);

    // Flame obstacle
    const fc = document.createElement('canvas');
    fc.width = 80; fc.height = 100;
    const f = fc.getContext('2d');
    // Outer flame
    const fg1 = f.createRadialGradient(40, 80, 5, 40, 50, 50);
    fg1.addColorStop(0, 'rgba(255,50,0,1)'); fg1.addColorStop(0.5, 'rgba(255,150,0,0.8)'); fg1.addColorStop(1, 'rgba(255,200,0,0)');
    f.fillStyle = fg1;
    f.beginPath(); f.moveTo(40,100); f.bezierCurveTo(0,80,5,40,40,0); f.bezierCurveTo(75,40,80,80,40,100); f.fill();
    // Inner flame
    const fg2 = f.createRadialGradient(40, 75, 2, 40, 60, 25);
    fg2.addColorStop(0, 'rgba(255,255,150,1)'); fg2.addColorStop(1, 'rgba(255,100,0,0)');
    f.fillStyle = fg2;
    f.beginPath(); f.moveTo(40,100); f.bezierCurveTo(15,85,20,55,40,30); f.bezierCurveTo(60,55,65,85,40,100); f.fill();
    this.textures.addCanvas('flame', fc);
  }

  create() {
    this.score = 0;
    this.paused = false;
    this.width = this.game.config.width;
    this.height = this.game.config.height;
    this._theme = currentTheme;

    // Background
    this.bgImage = this.add.image(0, 0, this._theme === 'snow' ? 'bg_snow' : 'bg_desert').setOrigin(0, 0);

    // Score
    const scoreFill = this._theme === 'snow' ? '#ffffff' : '#fff8e1';
    this.scoreText = this.add.text(this.width / 2, 40, 'Score: 0', {
      fontSize: '48px', fill: scoreFill, stroke: '#000000', strokeThickness: 5
    }).setOrigin(0.5, 0.5).setDepth(11);

    // Timer
    const timerFill = this._theme === 'snow' ? '#ffff00' : '#ff4400';
    this.timeLeft = 45;
    this.timerText = this.add.text(this.width - 20, 40, 'Time: 45', {
      fontSize: '48px', fill: timerFill, stroke: '#000000', strokeThickness: 5
    }).setOrigin(1, 0.5).setDepth(11);

    this.timerEvent = this.time.addEvent({
      delay: 1000, repeat: 44,
      callback: () => {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        if (this.timeLeft <= 0) {
          initiateGameOver.bind(this)({ score: this.score });
          this.scene.restart();
        }
      }
    });

    // Target
    this.target = this.add.image(400, 300, 'target').setInteractive().setDepth(5);
    this.target.on('pointerdown', () => {
      this.score++;
      this.scoreText.setText('Score: ' + this.score);
      this.playHitEffect();
      this.moveTarget();
    });

    this.input.on('pointermove', (pointer) => {
      if (this.paused) return;
      const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.target.x, this.target.y);
      if (dist < 120) this.moveTarget();
    });

    // Buttons
    this.createButton(80, 40, 'PAUSE', 0x2255cc, () => this.togglePause());
    this.createButton(210, 40, 'EXIT', 0xcc2222, () => {
      if (confirm('Exit game?')) { currentTheme = 'snow'; location.reload(); }
    });
    const themeLabel = this._theme === 'snow' ? '🏜 DESERT' : '❄ SNOW';
    this.createButton(360, 40, themeLabel, this._theme === 'snow' ? 0xcc6600 : 0x0066cc, () => {
      currentTheme = currentTheme === 'snow' ? 'desert' : 'snow';
      this.scene.restart();
    });

    // Pause overlay
    this.pauseOverlay = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.6).setDepth(20).setVisible(false);
    this.pauseLabel = this.add.text(this.width / 2, this.height / 2 - 60, 'PAUSED', {
      fontSize: '72px', fill: '#ffffff', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5).setDepth(21).setVisible(false);
    this.resumeBtn = this.add.rectangle(this.width / 2, this.height / 2 + 40, 200, 56, 0x22aa44).setDepth(22).setVisible(false).setInteractive();
    this.resumeBtnText = this.add.text(this.width / 2, this.height / 2 + 40, 'RESUME', {
      fontSize: '28px', fill: '#ffffff', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(23).setVisible(false);
    this.resumeBtn.on('pointerover', () => this.resumeBtn.setAlpha(0.75));
    this.resumeBtn.on('pointerout', () => this.resumeBtn.setAlpha(1));
    this.resumeBtn.on('pointerdown', () => this.togglePause());
    this.input.keyboard.on('keydown', () => { if (this.paused) this.togglePause(); });

    // Obstacles
    this.rocks = [];
    this.spawnRock();
    this.time.addEvent({ delay: 2000, loop: true, callback: () => { if (!this.paused) this.spawnRock(); } });

    // Theme particles
    if (this._theme === 'snow') {
      this.particles = [];
      for (let i = 0; i < 80; i++) {
        this.particles.push({ x: Math.random() * this.width, y: Math.random() * this.height, r: Math.random() * 3 + 1, speed: Math.random() * 40 + 20, drift: Math.random() * 20 - 10 });
      }
    } else {
      // Heat shimmer particles (rising embers)
      this.particles = [];
      for (let i = 0; i < 50; i++) {
        this.particles.push({ x: Math.random() * this.width, y: Math.random() * this.height + 400, r: Math.random() * 3 + 1, speed: Math.random() * 50 + 30, drift: Math.random() * 30 - 15, alpha: Math.random() });
      }
    }
    this.particleGraphics = this.add.graphics().setDepth(3);

    this.startBgMusic();
  }

  createButton(x, y, label, color, onClick) {
    const btn = this.add.rectangle(x, y, 140, 44, color, 1).setDepth(15).setInteractive();
    this.add.text(x, y, label, { fontSize: '20px', fill: '#ffffff', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(16);
    btn.on('pointerover', () => btn.setAlpha(0.75));
    btn.on('pointerout', () => btn.setAlpha(1));
    btn.on('pointerdown', onClick);
  }

  togglePause() {
    this.paused = !this.paused;
    this.pauseOverlay.setVisible(this.paused);
    this.pauseLabel.setVisible(this.paused);
    this.resumeBtn.setVisible(this.paused);
    this.resumeBtnText.setVisible(this.paused);
    this.timerEvent.paused = this.paused;
  }

  spawnRock() {
    if (this.rocks.length >= 6) return;
    const edge = Phaser.Math.Between(0, 3);
    const speed = Phaser.Math.Between(80, 180);
    let x, y, vx, vy;
    if (edge === 0)      { x = Phaser.Math.Between(0, this.width); y = -60;              vx = Phaser.Math.FloatBetween(-0.5, 0.5) * speed; vy = speed; }
    else if (edge === 1) { x = this.width + 60;                    y = Phaser.Math.Between(0, this.height); vx = -speed; vy = Phaser.Math.FloatBetween(-0.5, 0.5) * speed; }
    else if (edge === 2) { x = Phaser.Math.Between(0, this.width); y = this.height + 60; vx = Phaser.Math.FloatBetween(-0.5, 0.5) * speed; vy = -speed; }
    else                 { x = -60;                                y = Phaser.Math.Between(0, this.height); vx = speed;  vy = Phaser.Math.FloatBetween(-0.5, 0.5) * speed; }

    const key = this._theme === 'snow' ? 'rock' : 'flame';
    const obs = this.add.image(x, y, key).setDepth(4).setInteractive();
    obs.vx = vx; obs.vy = vy;
    obs.rotSpeed = this._theme === 'snow' ? Phaser.Math.FloatBetween(-2, 2) : 0;
    obs.on('pointerover', () => {
      this.playDeathEffect();
      initiateGameOver.bind(this)({ score: this.score });
      this.scene.restart();
    });
    this.rocks.push(obs);
  }

  update(_time, delta) {
    if (this.paused) return;
    const dt = delta / 1000;

    for (let i = this.rocks.length - 1; i >= 0; i--) {
      const obs = this.rocks[i];
      obs.x += obs.vx * dt;
      obs.y += obs.vy * dt;
      obs.rotation += obs.rotSpeed * dt;
      // Flames flicker scale
      if (this._theme === 'desert') {
        obs.setScale(0.9 + Math.sin(_time * 0.01 + i) * 0.1);
      }
      if (obs.x < -150 || obs.x > this.width + 150 || obs.y < -150 || obs.y > this.height + 150) {
        obs.destroy(); this.rocks.splice(i, 1);
      }
    }

    this.particleGraphics.clear();
    if (this._theme === 'snow') {
      this.particleGraphics.fillStyle(0xffffff, 0.7);
      for (const f of this.particles) {
        f.y += f.speed * dt; f.x += f.drift * dt;
        if (f.y > this.height) { f.y = -5; f.x = Math.random() * this.width; }
        if (f.x > this.width) f.x = 0;
        if (f.x < 0) f.x = this.width;
        this.particleGraphics.fillCircle(f.x, f.y, f.r);
      }
    } else {
      // Rising embers
      for (const e of this.particles) {
        e.y -= e.speed * dt; e.x += e.drift * dt * 0.3;
        e.alpha -= 0.005;
        if (e.y < 0 || e.alpha <= 0) { e.y = this.height; e.x = Math.random() * this.width; e.alpha = 1; }
        this.particleGraphics.fillStyle(Phaser.Math.Between(0, 1) ? 0xff6600 : 0xffaa00, e.alpha * 0.8);
        this.particleGraphics.fillCircle(e.x, e.y, e.r);
      }
    }
  }

  moveTarget() {
    const x = Phaser.Math.Between(60, this.width - 60);
    const y = Phaser.Math.Between(100, this.height - 60);
    this.target.setPosition(x, y);
  }

  playHitEffect() {
    const flash = this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0xffffff, 0.4).setDepth(10);
    this.tweens.add({ targets: flash, alpha: 0, duration: 150, onComplete: () => flash.destroy() });
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  startBgMusic() {
    try {
      const actx = new AudioContext();
      this._bgActx = actx;
      // Snow: gentle cool melody | Desert: tense warmer scale
      const snowNotes  = [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66];
      const desertNotes = [220.00, 246.94, 261.63, 293.66, 329.63, 293.66, 246.94, 220.00];
      const notes = this._theme === 'snow' ? snowNotes : desertNotes;
      const waveType = this._theme === 'snow' ? 'sine' : 'triangle';
      let step = 0;
      const playNote = () => {
        if (!this._bgActx) return;
        const osc = actx.createOscillator(), gain = actx.createGain();
        osc.connect(gain); gain.connect(actx.destination);
        osc.type = waveType;
        osc.frequency.value = notes[step % notes.length];
        gain.gain.setValueAtTime(0, actx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, actx.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0, actx.currentTime + 0.7);
        osc.start(actx.currentTime); osc.stop(actx.currentTime + 0.8);
        step++;
        this.time.delayedCall(800, playNote);
      };
      playNote();
    } catch (e) {}
  }

  playDeathEffect() {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#0a0a2e',
  scene: [GameScene],
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
};

new Phaser.Game(config);
