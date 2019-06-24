<template>
    <div id="wedo2">
        <div>This is wedo 2.0 console.</div>
        <div>
            <a href="/">home</a>
        </div>
        <div id="motor">
            <div>
                <button @click="onMotor">Motor</button>
            </div>
        </div>
        <div id="light">
            <div>
                <button @click="onLed">LED</button>
            </div>
        </div>
    </div>
</template>
<script>
import io from "socket.io-client";
import axios from "axios";

export default {
    name: "wedo2",
    components: {},
    methods: {
        onMotor() {
            axios.get("/apis/wedo2/motor").then(function() {});
        },
        onLed() {
            axios.get("/apis/wedo2/led").then(function() {});
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
        socket.on("wedo2.motor", function() {});
        socket.on("wedo2.led", function() {});
    }
};
</script>
<style>
#wedo2 {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>