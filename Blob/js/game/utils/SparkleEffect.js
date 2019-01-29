

SparkleEffect = function(xPos, yPos, image,velocity)
{
    SparkleEffect.superclass.constructor.call(this);

    this.particles = [];

    this.initGrid = true;
    this.done = false;
    this.velocity = velocity;
    this.xPos = xPos;
    this.yPos = yPos;
    this.imagePath = image;

    this.elementToBeRemoved = [];
    this.isRemoved = false;
    this.sparkleCount = 0;
    this.elapsedTime = 0;

};

SparkleEffect.prototype =
{
    _drawClass: function(canvasContext)
    {

        if(this.isRemoved)
        {
            this.particles = null;
            this.initGrid = null;
            this.done = null;
            this.xPos = null;
            this.yPos = null;
            this.imagePath = null;
            this.elementToBeRemoved = null;
            this.visible = false;
            return;
        }

        if(this.initGrid)
        {
            this.initGrid = false;
            this.createParticle();
        }

        if(++this.elapsedTime % 20 == 0)
        {
            this.sparkleCount++;
            if(this.sparkleCount < 3)
                this.done = false;
            this.createParticle();
        }

        var a = this.particles.length;
        if(a <= 0 && this.done)
        {
            this.isRemoved = true;
            return;
        }

        while(a--)
        {
            var firework = this.particles[a];

            // if the update comes back as true
            // then our firework should explode
            if(firework.update())
            {
                // kill off the firework, replace it
                // with the particles for the exploded version
                this.elementToBeRemoved.push(a);
                // if the firework isn't using physics
                // then we know we can safely(!) explode it... yeah.
                if(!firework.usePhysics && !this.done) {
                    this.done = true;
                    FireworkExplosions1.circle(firework, this,this.velocity);

                }
            }

            // pass the canvas context and the firework
            // colours to the
            firework.render(canvasContext, this);
        }

        if(this.elementToBeRemoved.length > 0)
        {
            a = this.elementToBeRemoved.length;
            for(var i = 0; i < a; ++i)
            {
                firework = this.particles[this.elementToBeRemoved[i]];
                this.particles.splice(this.elementToBeRemoved[i], 1);
            }
            this.elementToBeRemoved.splice(0,this.elementToBeRemoved.length);
        }
    },

    /**
     * Creates a new particle / firework
     */
    createParticle: function(pos, target, vel, color, usePhysics)
    {
        pos = pos || {};
        target = target || {};
        vel = vel || {};

        this.particles.push(
            new Particle1(
                // position
                {
                    x: pos.x || this.xPos,
                    y: pos.y || this.yPos + 10
                },

                // target
                {
                    y: target.y || this.yPos
                },

                // velocity
                {
                    x: vel.x || Math.random() * 0.0002 - 0.0001,
                    y: vel.y || 0
                },

                color || Math.floor(Math.random() * 100) * 12, usePhysics)
        );
    }

};
extend(SparkleEffect, TGE.DisplayObjectContainer);

/**
 * Stores a collection of functions that
 * we can use for the firework explosions. Always
 * takes a firework (Particle) as its parameter
 */
var FireworkExplosions1 = {

    /**
     * Explodes in a roughly circular fashion
     */
    circle: function(firework, ref,velocity) {

        var count = 10;                     //change
        var angle = (Math.PI * 2) / count;
        var num = count;
        var direction = 1;
        while(count--) {

            var randomVelocity = velocity + Math.random() * 12;
            var particleAngle = count * angle;
            num += direction;
            if(num % 50 == 0)
            {
                //direction = 1;
            }

            ref.createParticle(
                firework.pos,
                null,
                {
                    x: Math.cos(particleAngle) * randomVelocity,
                    y: Math.sin(particleAngle) * randomVelocity
                },
                firework.color,
                true);
        }
    }

    /**
     * Explodes in a star shape
     */
    /*star: function(firework, ref) {

        // set up how many points the firework
        // should have as well as the velocity
        // of the exploded particles etc
        var points          = 6 + Math.round(Math.random() * 25);              //change
        var jump            = 3 + Math.round(Math.random() * 17);              //change
        var subdivisions    = 3;
        var radius          = 180;
        var randomVelocity  = -(Math.random() * 3 - 6);

        var start           = 0;
        var end             = 0;
        var circle          = Math.PI * 2;
        var adjustment      = Math.random() * circle;

        do {

            // work out the start, end
            // and change values
            start = end;
            end = (end + jump) % points;

            var sAngle = (start / points) * circle - adjustment;
            var eAngle = ((start + jump) / points) * circle - adjustment;

            var startPos = {
                x: firework.pos.x + Math.cos(sAngle) * radius,
                y: firework.pos.y + Math.sin(sAngle) * radius
            };

            var endPos = {
                x: firework.pos.x + Math.cos(eAngle) * radius,
                y: firework.pos.y + Math.sin(eAngle) * radius
            };

            var diffPos = {
                x: endPos.x - startPos.x,
                y: endPos.y - startPos.y,
                a: eAngle - sAngle
            };

            // now linearly interpolate across
            // the subdivisions to get to a final
            // set of particles
            for(var s = 0; s < subdivisions; s++) {

                var sub = s / subdivisions;
                var subAngle = sAngle + (sub * diffPos.a);

                ref.createParticle(
                    {
                        x: startPos.x + (sub * diffPos.x),
                        y: startPos.y + (sub * diffPos.y)
                    },
                    null,
                    {
                        x: Math.cos(subAngle) * randomVelocity,
                        y: Math.sin(subAngle) * randomVelocity
                    },
                    firework.color,
                    true);
            }

            // loop until we're back at the start
        } while(end !== 0);

    }*/

};

var Particle1 = function(pos, target, vel, marker, usePhysics) {

    // properties for animation
    // and colouring
    this.GRAVITY  = 0.06;
    this.alpha    = 1;
    this.easing   = Math.random() * 0.02;
    this.fade     = (Math.random() * (0.1 - 0.02)) + 0.02;
    this.gridX    = marker % 120;
    this.gridY    = Math.floor(marker / 120) * 12;
    this.color    = marker;

    this.pos = {
        x: pos.x || 0,
        y: pos.y || 0
    };

    this.vel = {
        x: vel.x || 0,
        y: vel.y || 0
    };

    this.lastPos = {
        x: this.pos.x,
        y: this.pos.y
    };

    this.target = {
        y: target.y || 0
    };

    this.usePhysics = usePhysics || false;

};

/**
 * Functions that we'd rather like to be
 * available to all our particles, such
 * as updating and rendering
 */
Particle1.prototype = {

    update: function() {
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;

        if(this.usePhysics) {
            this.vel.y += this.GRAVITY;
            this.pos.y += this.vel.y;

            // since this value will drop below
            // zero we'll occasionally see flicker,
            // ... just like in real life! Woo! xD
            this.alpha -= this.fade;
        } else {

            var distance = (this.target.y - this.pos.y);

            // ease the position
            this.pos.y += distance * (0.03 + this.easing);

            // cap to 1
            this.alpha = Math.min(distance * distance * 0.00005, 1);
        }

        this.pos.x += this.vel.x;

        return (this.alpha < 0.005);
    },

    render: function(context, ref)
    {
        if(context != null)
        {
            var x = Math.round(this.pos.x),
                y = Math.round(this.pos.y);

            context.globalAlpha = Math.random() * (this.alpha + 1);
            context.drawImage(TGE.AssetManager.GetImage(ref.imagePath), x - 3, y - 3);
        }
    }
};