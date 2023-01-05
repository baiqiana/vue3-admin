<template>
    <div class="random-code">
        <canvas ref="canvas" width="100" height="50"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const canvas = ref<HTMLCanvasElement | null>(null)
const code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', "b", 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', "k", "l", "m", "n", "o"]
let currentCode: string = ""

function refresh() {
    currentCode = ""
    init()
}

function validate(code: any) {
    if (code === currentCode) {
        return true
    } else {
        return false
    }
}

function getRandomNumber(min: number, max: number) {
    return (Math.random() * (max - min)) + min
}

function getRandomColor() {
    let r1 = getRandomNumber(40, 150)
    let r2 = getRandomNumber(40, 150)
    let r3 = getRandomNumber(40, 150)
    return `rgba(${r1}, ${r2}, ${r3})`
}

function init() {
    if (canvas && canvas.value) {
        canvas.value.style.cursor = "pointer"
        canvas.value.style.background = "lightblue"
        canvas.value.onclick = refresh
        const ctx = canvas.value.getContext("2d")!
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
        ctx.textBaseline = "middle"

        for (let i = 0; i < 4; i++) {
            const num = code[Math.floor(getRandomNumber(0, code.length))]
            ctx.fillStyle = getRandomColor()

            let randomFontSize = Math.floor(getRandomNumber(14, 24)) + "px Verdana"
            ctx.font = randomFontSize

            let x = (canvas.value.width / 5 * i) + 10
            let y = canvas.value.height / 2

            let deg = Math.ceil(getRandomNumber(0, 10))
            // console.log(deg * Math.PI / 180)
            ctx.rotate(deg * Math.PI / 180)
            ctx.translate(x, y)
            ctx.fillText(num.toString(), 0, 0)

            ctx.translate(-x, -y)
            ctx.rotate(-deg * Math.PI / 180)

            currentCode += num
        }

        for (let i = 0; i < 4; i++) {
            ctx.beginPath()
            ctx.strokeStyle = getRandomColor()
            ctx.lineWidth = getRandomNumber(0, 2)
            ctx.moveTo(getRandomNumber(0, canvas.value.width), getRandomNumber(0, canvas.value.height))
            ctx.lineTo(getRandomNumber(0, canvas.value.width), getRandomNumber(0, canvas.value.height))
            ctx.stroke()
        }

        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = getRandomColor()
            ctx.beginPath()
            ctx.arc(getRandomNumber(0, canvas.value.width), getRandomNumber(0, canvas.value.height), 1, 0, 2 * Math.PI)
            ctx.fill()
        }
    }

}

onMounted(() => {
    init()
})

defineExpose({
    validate,
    refresh
})
</script>

<style scoped>

</style>