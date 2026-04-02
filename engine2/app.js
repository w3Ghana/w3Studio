const NodeMediaServer = require("node-media-server");
const config = {
    logType: 0,
    auth: {
        api: true,
        api_user: 'admin',
        api_pass: 'admin'
    },
    http: {
        port: 8080,
        mediaroot: 'media',
        allow_origin: "*"
    },
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
    },
    relay: {
        ffmpeg: "ffmpeg.exe",
        tasks: [{
            app: 'a01',
            mode: 'static',
            edge: 'rtmp://127.0.0.1:5119/live/01-studio',
            name: 'live'
        },{
            app: 'b01',
            mode: 'static',
            edge: 'rtmp://sub.domain.com/a01/live_360p',
            name: 'live'
        },{
            app: 'b01',
            mode: 'push',
            edge: 'rtmp://localhost:19350/a01/live',
            appendName: false
        },{
            app: 'a02',
            mode: 'static',
            edge: 'rtmp://127.0.0.1:5119/live/02-studio',
            name: 'live'
        },{
            app: 'b02',
            mode: 'static',
            edge: 'rtmp://sub.domain.com/a02/live_360p',
            name: 'live'
        },{
            app: 'b02',
            mode: 'push',
            edge: 'rtmp://localhost:19350/a02/live',
            appendName: false
        },{
            app: 'a03',
            mode: 'static',
            edge: 'rtmp://127.0.0.1:5119/live/03-studio',
            name: 'live'
        },{
            app: 'b03',
            mode: 'static',
            edge: 'rtmp://sub.domain.com/a03/live_360p',
            name: 'live'
        },{
            app: 'b03',
            mode: 'push',
            edge: 'rtmp://localhost:19350/a03/live',
            appendName: false
        }]
    },
    fission: {
        ffmpeg: "ffmpeg.exe",
        tasks: [{
            rule: "a01/*",
            model: [{
                ab: "64k",
                af: "volume=0",
                vb: "360k",
                vs: "640x360",
                vf: "23"
            }]
        },{
            rule: "a02/*",
            model: [{
                ab: "64k",
                af: "alimiter",
                vb: "360k",
                vs: "640x360",
                vf: "23"
            }]
        },{
            rule: "a03/*",
            model: [{
                ab: "64k",
                af: "alimiter",
                vb: "360k",
                vs: "640x360",
                vf: "23"
            }]
        }]
    }
};
const nms = new NodeMediaServer(config);
nms.run();
