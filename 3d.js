// Variables

const Display = document.getElementById("display")
const GL = Display.getContext("webgl")
const Data = [
    1, -1, 0,
    0, 1, 1,
    -1, 0, 0
]

if (!GL) {
    alert("Your browser DOES NOT support WebGL!")
}
else {
    alert("Your browser DOES support WebGL!")
}

// Buffer

const Buffer = GL.createBuffer()
GL.bindBuffer(GL.ARRAY_BUFFER, Buffer)
GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(Data), GL.STATIC_DRAW)

// Vertex Shader

const VertexShader = GL.createShader(GL.VERTEX_SHADER)
GL.shaderSource(VertexShader, `
    attribute vec3 Position;
    void main() {
        GL_Position = vec4(Position, 1);
    }
`)
GL.compileShader(VertexShader)

// Fragment Shader

const FragmentShader = GL.createShader(GL.FRAGMENT_SHADER)
GL.shaderSource(FragmentShader, `
    void main() {
        GL_FragColor = vec4(1, 0, 0, 1);
    }
`)
GL.compileShader(FragmentShader)

// Program

const Program = GL.createProgram()
GL.attachShader(Program, VertexShader)
GL.attachShader(Program, FragmentShader)
GL.linkProgram(Program)

const Position = GL.getAttribLocation(Program, "Position")
GL.enableVertexAttribArray(Position)
GL.vertexAttribPointer(Position, 3, GL.FLOAT, false, 0, 0)
GL.useProgram(Program)
GL.drawArrays(GL.TRIANGLES, 0, 3)
