// Canvas版本的馬賽克幻燈片，效果與slideShow.jsx相同，但畫在同一張canvas上，不會有白線縫隙
// 照片都已經被裁減為6:4
// >=1440px：畫布1200x800，每一個cube 200x200
// <1440px：畫布900x600，每一個cube 150x150

import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"

const BREAKPOINT = 1440; // RWD斷點，單位px
const CUBE_SIZE_LARGE = 150; // >=BREAKPOINT時使用
const CUBE_SIZE_SMALL = 100; // <BREAKPOINT時使用，與LARGE同比例(3:4)縮小
const COLS = 6;
const ROWS = 4;
const TILE_COUNT = COLS * ROWS;

const fadeInDuration = 5000; // 淡入時間
const fadeOutDuration = 2000; // 淡出時間
const transitionDelayUnit = 200; // 每一個cube淡入淡出的間隔時間，單位為ms

// 依視窗寬度是否跨越斷點來取得對應的cube尺寸
function useCubeSize() {
    const getCubeSize = () => (window.innerWidth >= BREAKPOINT ? CUBE_SIZE_LARGE : CUBE_SIZE_SMALL);
    const [cubeSize, setCubeSize] = useState(getCubeSize);
    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
        const handleChange = () => setCubeSize(getCubeSize());
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);
    return cubeSize;
}

// 將指定資料夾的所有.jpg檔案全部匯入並以陣列的型式宣告為imgSrcArr
function importAllImagesWithArray(theRequireContext) {
    let images = []
    const requireContext = theRequireContext;
    requireContext.keys().map((item, index) => { images[index] = requireContext(item).default; return "" });
    return images;
}
const imgSrcArr = importAllImagesWithArray(require.context("img/index_show", false, /^\.\/.*\.jpg$/))

// 洗牌演算法
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
}

// 產生一組打亂過的transitionDelay陣列，讓每個tile的動畫起始時間錯開
function createShuffledDelays() {
    const delays = [];
    for (let i = 0; i < TILE_COUNT; i++) delays[i] = transitionDelayUnit * (i + 1);
    return shuffle(delays);
}

// 模擬CSS transition預設timing-function(ease)的漸變曲線
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// 建立單一圖層(上層或下層)的24個tile狀態
function createTiles(initialOpacity) {
    const tiles = [];
    for (let i = 0; i < TILE_COUNT; i++) {
        tiles.push({ opacity: initialOpacity, fromOpacity: initialOpacity, targetOpacity: initialOpacity, startTime: 0, duration: 0 });
    }
    return tiles;
}

let CanvasWrapper = styled.div`
margin: 12vh auto 4vh auto;
width: fit-content;
`

function SlideShowCanvas() {
    const cubeSize = useCubeSize();
    const canvasRef = useRef(null);
    const imagesRef = useRef([]); // 預先載入完成的HTMLImageElement陣列
    // layer0為下層、layer1為上層(繪製順序固定，只有fade目標會交替)，兩層結構跟slideShow.jsx的cube1State/cube2State對應
    const layersRef = useRef([
        { fade: false, image: null, tiles: createTiles(0) },
        { fade: true, image: null, tiles: createTiles(1) },
    ]);
    const recentImagesRef = useRef([999, 999, 999, 999]); // 避免連續幾次選到同一張圖片

    // 預先載入所有圖片，避免動畫開始時圖片還沒下載完
    useEffect(() => {
        let cancelled = false;
        Promise.all(imgSrcArr.map((src) => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        }))).then((imgs) => {
            if (!cancelled) imagesRef.current = imgs;
        });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const width = cubeSize * COLS;
        const height = cubeSize * ROWS;
        // 用devicePixelRatio設定畫布實際解析度，確保在任何螢幕縮放下都是整數物理像素
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const layers = layersRef.current;

        // 選一張跟最近四次都不同的圖片
        function chooseImage() {
            const imgs = imagesRef.current;
            let idx;
            do {
                idx = Math.floor(Math.random() * imgs.length);
            } while (recentImagesRef.current.includes(idx));
            recentImagesRef.current.unshift(idx);
            recentImagesRef.current.pop();
            return imgs[idx];
        }

        // 開始新的一輪淡入淡出：兩層fade互換，換上新圖片的那一層才更新image
        function startIteration(now) {
            const delays = createShuffledDelays();
            const newImg = chooseImage();
            layers.forEach((layer) => {
                const nextFade = !layer.fade;
                if (nextFade) layer.image = newImg; // 即將淡入的那一層才換圖，跟原本邏輯一致
                const duration = nextFade ? fadeInDuration : fadeOutDuration;
                layer.tiles.forEach((tile, i) => {
                    tile.fromOpacity = tile.opacity;
                    tile.targetOpacity = nextFade ? 1 : 0;
                    tile.startTime = now + delays[i];
                    tile.duration = duration;
                });
                layer.fade = nextFade;
            });
        }

        function updateTile(tile, now) {
            if (now < tile.startTime) return;
            const t = Math.min(1, (now - tile.startTime) / tile.duration);
            tile.opacity = tile.fromOpacity + (tile.targetOpacity - tile.fromOpacity) * easeInOutQuad(t);
        }

        function drawLayer(layer) {
            if (!layer.image) return;
            const sliceWidth = layer.image.width / COLS;
            const sliceHeight = layer.image.height / ROWS;
            for (let i = 0; i < TILE_COUNT; i++) {
                const tile = layer.tiles[i];
                if (tile.opacity <= 0) continue;
                const col = i % COLS;
                const row = Math.floor(i / COLS);
                ctx.globalAlpha = tile.opacity;
                ctx.drawImage(
                    layer.image,
                    col * sliceWidth, row * sliceHeight, sliceWidth, sliceHeight,
                    col * cubeSize, row * cubeSize, cubeSize, cubeSize
                );
            }
            ctx.globalAlpha = 1;
        }

        const iterationDelay = TILE_COUNT * transitionDelayUnit + fadeInDuration + 1000;
        let rafId;
        let nextIterationTime = 0; // 0代表尚未開始第一輪

        function frame(now) {
            if (imagesRef.current.length > 0) {
                if (nextIterationTime === 0) {
                    // 延遲100ms才開始第一輪，避免掛載瞬間就被畫成完全淡入、沒有動畫
                    nextIterationTime = now + 100;
                } else if (now >= nextIterationTime) {
                    startIteration(now);
                    nextIterationTime = now + iterationDelay;
                }
            }
            layers.forEach((layer) => layer.tiles.forEach((tile) => updateTile(tile, now)));

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, height);
            drawLayer(layers[0]); // 下層先畫
            drawLayer(layers[1]); // 上層後畫，蓋在下層之上

            rafId = requestAnimationFrame(frame);
        }
        rafId = requestAnimationFrame(frame);

        return () => cancelAnimationFrame(rafId);
    }, [cubeSize]);

    return (
        <CanvasWrapper id="ShowContainer">
            <canvas ref={canvasRef} />
        </CanvasWrapper>
    );
}

export default SlideShowCanvas;
