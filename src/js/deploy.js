// pageZIndexInit使用於將pageState初始化
const pageZIndexInit = {
    mina: 2,
    gallery: 2,
    wolfy: 2,
    show: 2,
    luna: 2,
}

// ------------------------------------------------------------------------------------
const deployPage = (bookmarkName, setPageZIndex,
    setContainerPositionTop, setContainerWidth, setContainerPositionLeft) => {
    // 參數已經夠多了，不應該再把pageZIndex傳進來，所以利用setPageZIndex取得pageZIndex
    // 用來避免當一個頁面還在部屬時又部屬另一個頁面
    let ready = true;
    setPageZIndex((preState) => {
        for (let key in preState) {
            if (preState[key] === 1) {
                ready = false;
            }
        }
        return preState;
    })
    if (ready === false) {
        return
    }
    // 根據bookmarkName調整變動參數
    let [topChange, leftChange, widthChange] =
        bookmarkName === "mina" ? [2, 0, 1,] :
            bookmarkName === "gallery" ? [2, 0.25, 1] :
                bookmarkName === "wolfy" ? [2, 0.5, 1] :
                    bookmarkName === "show" ? [2, 0.75, 1] :
                        bookmarkName === "luna" ? [2, 1, 1] : undefined;

    return new Promise((res) => {
        // step1 改變pageZIndex與positionTop
        setPageZIndex((preState) => {
            preState = { ...preState };
            preState[bookmarkName] = 1;
            return preState
        })
        let intervalId = setInterval(() => {
            setContainerPositionTop((preState) => {
                // 把判斷式寫在父層範疇更麻煩還更亂，決定就這樣寫了
                // 因為會多跑一次，同時為了配合step2，用同樣的寫法，條件設為-1
                if (preState < -2) { return preState + topChange; }
                else {
                    clearInterval(intervalId);
                    res();
                    return preState + topChange
                }
            })
        }, 1000 / 60);
    }) // step1 改變positionTop
        // step2 改變positionLeft與width
        .then(() => {
            return new Promise((res) => {
                let intervalId = setInterval(() => {
                    // 改變positionLeft
                    setContainerPositionLeft((preState) => {
                        return preState - leftChange
                    });
                    // 改變width
                    setContainerWidth((preState) => {
                        // 因為會多跑一次，又要顧及setContainerPositionLeft，所以條件設定為99
                        if (preState < 99) { return preState + widthChange; }
                        else {
                            clearInterval(intervalId);
                            res();
                            return preState + widthChange
                        }
                    });
                    // setheroImagePositionX()
                }, 1000 / 60);
            })
        }) // step2 改變positionLeft與width
        // step3 改變pageZIndex
        // 把setState寫在另一個setState的引數函數裡面的話react會發出警告，
        // 因此決定寫在下一個then裡面
        .then(() => {
            setPageZIndex((preState) => {
                preState = { ...pageZIndexInit };
                preState[bookmarkName] = 0
                return preState
            })
        })// step3
}


export { deployPage };