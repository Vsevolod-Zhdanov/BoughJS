var BOUGH = {}

BOUGH.Scene = function() {
	var cnv = document.createElement('canvas');
	cnv.id = 'boughCanvas';
	cnv.cssText = 'position: absolute;left: 0px; top: 0px;';
	document.body.appendChild(cnv);
	this.g = cnv.getContext('2d');
	this.viewWidth = window.innerWidth,
		this.viewHeight = window.innerHeight,
		this.buffer = [],
		this.position = {
			x: 0,
			y: 0
		},
		this.tile = {
			w: 1,
			l: 1,
			h: 1
		},
		this.angle = 0,
		this.slope = 2,
		this.oX = {},
		this.oY = {},
		this.oZ = {},

		this.getDotPosition = function(x, y, z) {
			return {
				x: this.position.x + x * this.oX.a + y * this.oY.a,
				y: this.position.y + x * this.oX.b + y * this.oY.b + z * this.oZ.a
			}
		},

		this.zoom = function(val) {
			this.tile.w += val; this.tile.l += val; this.tile.h += val;
		},

		this.rotate = function(degree) {
			this.angle += degree;
		},

		this.add = function(object) {
			this.buffer.push(object);
		},

		this.deleteObject = function(index) {
			this.buffer.splice(index, 1);
		},

		this.getIndexObject = function(object) {
			return this.buffer.indexOf(object);
		},

		this.update = function() {
			
			var a0 = this.angle * Math.PI / 180,
				a1 = (this.angle + 90) * Math.PI / 180;

			this.oX = {
				a: Math.cos(a0) * this.tile.w,
				b: Math.sin(a0) * this.tile.w / this.slope
			};
			this.oY = {
				a: Math.cos(a1) * this.tile.l,
				b: Math.sin(a1) * this.tile.l / this.slope
			};

			this.oZ = {
				a: this.tile.h * Math.abs(this.slope - 1) / this.slope,
				b: 0
			};

			this.buffer.sort(function(a, b) {
				return Math.round(a.vy - b.vy);
			});

			for (var i = 0; i < this.buffer.length; i++) {
				var obj = this.buffer[i];
				var pos = this.getDotPosition(obj.position.x, obj.position.y, obj.position.z);
				obj.vx = pos.x;
				obj.vy = pos.y;
			};
			for (var i = 0; i < this.buffer.length; i++) {
				this.buffer[i].draw();
			}
		};
};

BOUGH.createObject = function() {
	var obj = {
		position: {
			x: 0,
			y: 0,
			z: 0
		},
		vx: 0,
		vy: 0,
		color: '#f0f',
		draw: function() {}
	};
	return Object.create(obj);
};
