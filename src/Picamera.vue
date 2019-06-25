<template>
    <div id="picamera">
        <div>This is picamera console.</div>
        <div>
            <a href="/">home</a>
        </div>
        <div id="capture">
            <div>
                <button @click="onCapture">Capture</button>
            </div>
            <div class="image">
                <img :src="imageSrc">
            </div>
        </div>
        <div id="sequence">
            <div>
                <button @click="onSequence">Sequence</button>
            </div>
            <div class="image">
                <img :src="sequenceSrc">
            </div>
        </div>
        <div id="detectColor">
            <div>
                <button @click="onDetectColor">Detect Color</button>
            </div>
            <div class="image">
                <img :src="detectColorSrc">
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
    name: "picamera",
    components: {},
    data: function() {
        return {
            imageSrc: "",
            sequenceSrc: "",
            detectColorSrc: ""
        };
    },
    methods: {
        onCapture() {
            axios.get("/apis/picamera/capture").then(function() {});
        },
        onSequence() {
            axios.get("/apis/picamera/sequence").then(function() {});
        },
        onDetectColor() {
            axios.get("/apis/picamera/detectColor").then(function() {});
        }
    },
    created: function() {
        var socket = io(
            [window.location.hostname, ":", process.env.VUE_APP_WS_PORT].join(
                ""
            ),
            {
                path: "/ws"
            }
        );
        socket.on("connect", function() {});
        socket.on("news", function() {
            socket.emit("my other event", { my: "data" });
        });
        var cmp = this;
        socket.on("picamera.capture", function(data) {
            if (data.code === 0) {
                if (data.file) {
                    cmp.imageSrc = data.file;
                }
            }
        });
        socket.on("picamera.sequence", function(data) {
            if (data.code === 0) {
                if (data.file) {
                    cmp.sequenceSrc = data.file;
                }
            }
        });
        socket.on("picamera.detectColor", function(data) {
            if (data.code === 0) {
                if (data.file) {
                    cmp.detectColorSrc = data.file;
                }
            }
        });
    }
};
</script>

<style>
#picamera {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
