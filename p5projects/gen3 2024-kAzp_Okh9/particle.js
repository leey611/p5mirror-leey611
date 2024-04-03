class Particle extends VerletParticle2D {
  constructor(x, y) {
    super(x, y);
    this.r = 2;
    physics.addParticle(this);
  }

  show(g) {
    g.fill(252, 238, 33);
    g.strokeWeight(1);
    g.circle(this.x, this.y, this.r * 12);

    g.strokeWeight(this.r * 4);
    g.point(this.x, this.y);
  }
}
