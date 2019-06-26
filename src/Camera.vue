<template>
    <div id="camera">
        <div>This is camera console.</div>
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
        <div id="detectGesture">
            <div>
                <button @click="onDetectGesture">Detect Gesture</button>
            </div>
            <ul class="list">
                <li v-for="gesture in detectedGestures">
                    <div>{{gesture}}</div>
                </li>
            </ul>
        </div>
        <div id="ocr">
            <div>
                <button @click="onOcr">OCR</button>
            </div>
            <div class="image">
                <img :src="ocrSrc">
            </div>
            <ul class="list">
                <li v-for="text in ocrResult">
                    <div>{{text}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
    name: "camera",
    components: {},
    data: function() {
        return {
            imageSrc: "",
            sequenceSrc: "",
            detectColorSrc: "",
            detectedGestures: [],
            ocrSrc: "",
            ocrResult: []
        };
    },
    methods: {
        onCapture() {
            axios.get("/apis/camera/capture").then(function() {});
        },
        onSequence() {
            axios.get("/apis/camera/sequence").then(function() {});
        },
        onDetectColor() {
            axios.get("/apis/camera/detectColor").then(function() {});
        },
        onDetectGesture() {
            axios.get("/apis/camera/detectGesture").then(() => {
                this.detectedGestures.splice(0, this.detectedGestures.length);
            });
        },
        onOcr() {
            axios.get("/apis/camera/ocr").then(function() {});
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
        socket.on("camera.capture", function(data) {
            if (data.code === 0) {
                if (data.file) {
                    cmp.imageSrc = data.file;
                }
            }
        });
        socket.on("camera.sequence", function(data) {
            if (data.code === 0) {
                if (data.file) {
                    cmp.sequenceSrc = data.file;
                }
            }
        });
        socket.on("camera.detectColor", function(data) {
            if (data.code === 0) {
                if (data.file) {
                    cmp.detectColorSrc = data.file;
                }
            }
        });
        socket.on("camera.detectGesture", function(rsp) {
            if (rsp.code === 0) {
                if (rsp.data) {
                    cmp.detectedGestures.push(rsp.data);
                }
            }
        });
        socket.on("camera.ocr", function(rsp) {
            if (rsp.code === 0) {
                if (rsp.file) {
                    cmp.ocrSrc = rsp.file;
                }
            }
        });
    }
};
</script>

<style>
#camera {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
ul {
    list-style-type: none;
    padding-left: 0;
}
</style>
