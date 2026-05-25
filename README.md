# GraphicsAPI
# 🎾 Rehana's Bouncy Ball

A classic arcade-style game built with HTML5 Canvas and JavaScript. Control a paddle, bounce a ball, and see how long you can keep it in play!

## 🎮 Gameplay

Control a paddle at the bottom of the screen to bounce a ball and prevent it from hitting the bottom wall. The ball bounces off the top, left, and right walls, as well as your paddle. Each successful hit scores a point, and the ball speeds up every 5 points - testing your reflexes as you progress!

**Goal:** Achieve the highest score possible before the ball hits the bottom.

## 🕹️ Controls

| Action | Key |
|--------|-----|
| Move Paddle Left | ← (Left Arrow) |
| Move Paddle Right | → (Right Arrow) |
| New Game | Click "NEW GAME" button |

## ✨ Features

- Smooth 60fps animation
- Progressive difficulty (ball speeds up every 5 hits)
- Dynamic angle deflection based on where ball hits paddle
- Visual effects including glow and shadows
- Score tracking
- Game over screen with final score

## 🖥️ Graphics Pipeline Demonstration

This project demonstrates the three main stages of the graphics rendering pipeline:

### 1. Application Stage
- User input handling (keyboard events)
- Game logic and state management
- Physics calculations (ball movement, collision detection)
- Score tracking and difficulty scaling

### 2. Geometry Stage
- Circle primitive definition (`ctx.arc()`)
- Rectangle primitive definition (`ctx.fillRect()`)
- Text glyph definition (`ctx.fillText()`)
- Vertex and primitive assembly

### 3. Rasterization Stage
- Fragment shading (`ctx.fillStyle`)
- Shadow effects (`ctx.shadowBlur`, `ctx.shadowColor`)
- Alpha blending / transparency (`rgba()`)
- Pixel output to canvas


