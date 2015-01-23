var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sio = require('../../lib/im/sio');
var pool = require('../../lib/buffer');
var sic = require('socket.io-client');
var bp = pool.NewPool(8, 102400);

function ddd(done) {

	app.get('/', function(req, res) {
		res.send('<h1>Welcome</h1>');
	});
	var ss = sio.NewSIO_j(io, bp, "http://localhost:9892/listSrv");
	setTimeout(function() {
		http.listen(3000, function() {
			console.log('listening on *:3000');
		});
	}, 1);
	ss.recon();
	var IM = ss.IM;
	var mc = 0;
	var sc = sic('http://localhost:3000');
	sc.on('connect', function() {
		sc.emit("ms", {
			t: 0,
			r: ["abcc"],
			c: new Buffer("bbb"),
		});
		sc.emit('li', {
			token: "abc",
		});
		sc.emit('li', {});
	});
	sc.on("li", function(v) {
		IM.uli_({
			token: "abc",
		}, {
			id: "aa-1",
			cback: function(tv) {
				// console.log(tv, v);
				for (var i = 10000; i > 0; i--) {
					IM.sendv({
						s: tv.res.r,
						t: 0,
						r: [v.res.r],
						c: new Buffer("aaa"),
					});
				}
				sc.emit("ms", {
					t: 0,
					r: [tv.res.r],
					c: new Buffer("bbb"),
				});
			},
		});
	});
	sc.on("ms", function() {
		mc++;
		if (mc >= 10000) {
			console.log("mc", mc);
			sc.emit("lo", {});
			ss.ims.token = "";
			ss.OnConn();
			setTimeout(function() {
				sc.close();
				ss.running = false;
				ss.end();
				ss.end();
				setTimeout(done, 500);
			}, 500);
		}
	});
}

//
describe('sio', function() {
	it("im", function(done) {
		console.log("");
		//
		// var mg = sic.Manager();
		// var sc = sic('http://localhost:3000');
		// sc.on('connect', function() {
		// 	sc.close();
		// 	sc.destroy();
		// 	sc.disconnect();
		// 	mg.close();
		// 	console.log(sc);
		// });
		// setTimeout(function() {
		ddd(done);
		// }, 1000);
	});
	it("imerr", function(done) {
		var st = sio.NewSIO_j(io, bp, "sdfsf");
		st.rc_t = 10;
		st.recon();
		setTimeout(function() {
			st.rc_t = 10000;
			done();
		}, 1000);
		var st2 = sio.NewSIO_j(io, bp, "http://localhost:9892/listSrv");
		st2.recon();
		st2.running = false;
		st2.recon();
		st2.OnCmd({
			V: function() {
				return {};
			},
		});
		st2.s = "sss";
		st2.onconn({
			conn: {
				remoteAddress: "",
				close: function() {},
			},
			emit: function() {},
		});
		st2.rc_t = 10;
		st2.dosrv("error", "", "");
		st2.dosrv("", "", '{"code":1,"data":[]}');
		st2.dosrv("", "", '{"code":0,"data":[]}');
		st2.dosrv("", "", JSON.stringify({
			code: 0,
			data: [{
				host: "",
				port: 2343,
			}],
		}));
	});
});