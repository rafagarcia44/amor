$(document).ready(function () {
    const envelope = $("#envelope");
    const btn_open = $("#open");
    const btn_writeMessage = $("#writeMessage");
    const btn_reset = $("#reset");
  
    envelope.click(function () {
      open();
      btn_writeMessage.show();
    });
  
    btn_open.click(function () {
      open();
      btn_writeMessage.show();
    });
  
    btn_writeMessage.click(function () {
      window.location.href = "writeMessage.html";
    });
  
    btn_reset.click(function () {
      close();
      btn_writeMessage.hide();
    });
  
    function open() {
      envelope.addClass("open").removeClass("close");
    }
  
    function close() {
      envelope.addClass("close").removeClass("open");
    }
  
    // Corazones animados
    const canvas = document.getElementById("heartCanvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const hearts = [];
  
    class Heart {
      constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.alpha = 1;
      }
  
      draw() {
        context.save();
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;
  
        context.beginPath();
        context.moveTo(this.x, this.y - this.size / 2);
        context.bezierCurveTo(
          this.x + this.size / 2,
          this.y - this.size / 2,
          this.x + this.size / 2,
          this.y + this.size / 2,
          this.x,
          this.y + this.size
        );
        context.bezierCurveTo(
          this.x - this.size / 2,
          this.y + this.size / 2,
          this.x - this.size / 2,
          this.y - this.size / 2,
          this.x,
          this.y - this.size / 2
        );
        context.fill();
  
        context.restore();
      }
  
      update() {
        this.y -= this.speed;
        this.alpha -= 0.01;
      }
    }
  
    function createHearts(event) {
      const numHearts = 10;
      const rect = canvas.getBoundingClientRect();
  
      for (let i = 0; i < numHearts; i++) {
        const x = event.clientX - rect.left + Math.random() * 50 - 25;
        const y = event.clientY - rect.top + Math.random() * 50 - 25;
        const size = Math.random() * 20 + 10;
        const color = `rgba(${Math.random() * 255}, 0, 0, 0.8)`;
        const speed = Math.random() * 2 + 1;
  
        hearts.push(new Heart(x, y, size, color, speed));
      }
    }
  
    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];
        heart.update();
        heart.draw();
  
        if (heart.alpha <= 0) {
          hearts.splice(i, 1);
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    $(document).click(function (event) {
      createHearts(event);
    });
  
    animate();
  });
  