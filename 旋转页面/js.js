// 获取DOM对象 Get DOM object
const header = document.querySelector('header')

let rt = document.querySelector('.right')
let ct = document.querySelector('.center')
let lt = document.querySelector('.left')

const masg = document.querySelectorAll('svg.about_me')
const bili = document.querySelectorAll('svg.bili')
const kuan = document.querySelectorAll('svg.kuan')

const btk = document.querySelector('.bt_kuan')
const btm = document.querySelector('.bt_massage')
const btb = document.querySelector('.bt_bilibili')

const dk = document.querySelector('.div_kuan')
const dm = document.querySelector('.div_massage')
const db = document.querySelector('.div_bilibili')
const tr1 = document.querySelector('.triangle1')
const tr2 = document.querySelector('.triangle2')
const tr3 = document.querySelector('.triangle3')

// 记录角度 Record angle
let degs = 0
let is_rt = false
const deg_arr = [-120, 0 ,120]

// 为按钮添加事件 Add event to button
btk.addEventListener('mouseenter', () => {
    dk.classList.remove('disappear')
    tr1.classList.remove('disappear')
})

btm.addEventListener('mouseenter', () => {
    dm.classList.remove('disappear')
    tr2.classList.remove('disappear')
})

btb.addEventListener('mouseenter', () => {
    db.classList.remove('disappear')
    tr3.classList.remove('disappear')
})

btk.addEventListener('mouseleave', () => {
    dk.classList.add('disappear')
    tr1.classList.add('disappear')
})

btm.addEventListener('mouseleave', () => {
    dm.classList.add('disappear')
    tr2.classList.add('disappear')
})

btb.addEventListener('mouseleave', () => {
    db.classList.add('disappear')
    tr3.classList.add('disappear')
})

btk.addEventListener('click', () => {
    const lc = deg_arr.indexOf(-120)
    if (lc === 0) {
        rt_left()
    } else if (lc === 2) {
        rt_right()
    }
})

btm.addEventListener('click', () => {
    const lc = deg_arr.indexOf(0)
    if (lc === 0) {
        rt_left()
    } else if (lc === 2) {
        rt_right()
    }
})

btb.addEventListener('click', () => {
    const lc = deg_arr.indexOf(120)
    if (lc === 0) {
        rt_left()
    } else if (lc === 2) {
        rt_right()
    }
})

// 首次重载 First reload
reloadDom()

// 鼠标滚轮事件 Mouse wheel event
window.addEventListener('wheel', (e) => {
    e.preventDefault()

    ct.removeEventListener('mouseenter', ctHover)
    ct.removeEventListener('mouseleave', ctLeave)
    rt.removeEventListener('mouseenter', rtHover)
    rt.removeEventListener('mouseleave', rtLeave)
    lt.removeEventListener('mouseenter', ltHover)
    lt.removeEventListener('mouseleave', ltLeave)

    ct.style.transform = `rotateY(${deg_arr[1]}deg) translateZ(250px)`
    rt.style.transform = `rotateY(${deg_arr[2]}deg) translateZ(250px)`
    rt.style.border = `3px solid #a0a0a034`
    lt.style.transform = `rotateY(${deg_arr[0]}deg) translateZ(250px)`
    lt.style.border = `3px solid #a0a0a034`

    if (is_rt) return

    const delta = Math.sign(e.deltaY)

    if (delta > 0) {
        ct.classList.replace('center', 'left')
        lt.classList.replace('left', 'right')
        rt.classList.replace('right', 'center')

        deg_arr.push(deg_arr.shift())

        degs -= 120
    } else {
        ct.classList.replace('center', 'right')
        lt.classList.replace('left', 'center')
        rt.classList.replace('right', 'left')

        deg_arr.unshift(deg_arr.pop())

        degs += 120
    }

    rt = document.querySelector('.right')
    ct = document.querySelector('.center')
    lt = document.querySelector('.left')

    reloadDom()

    const bd = document.querySelector('.bt_border')
    bd.classList.remove('bt_border')
    
    if (deg_arr[1] === 0) {
        btm.classList.add('bt_border')
        kuan_none()
        masg_block()
        bili_none()
    } else if (deg_arr[1] === 120) {
        btb.classList.add('bt_border')
        kuan_none()
        masg_none()
        bili_block()
    } else if (deg_arr[1] === -120) {
        btk.classList.add('bt_border')
        kuan_block()
        masg_none()
        bili_none()
    }

    (function () {
        is_rt = true
        header.style.transform = `rotateY(${degs}deg)`

        setTimeout(() => {
            is_rt = false
        }, 500)
    } ())
})

// SVG显示和消失函数 SVG show and hide function
function kuan_none() {
    kuan.forEach((element) => {
        element.style.display = `none`
    })
}

function kuan_block() {
    kuan.forEach((element) => {
        element.style.display = `block`
    })
}

function bili_none() {
    bili.forEach((element) => {
        element.style.display = `none`
    })
}

function bili_block() {
    bili.forEach((element) => {
        element.style.display = `block`
    })
}

function masg_none() {
    masg.forEach((element) => {
        element.style.display = `none`
    })
}

function masg_block() {
    masg.forEach((element) => {
        element.style.display = `block`
    })
}

// 重载事件函数 Reload event function
function reloadDom() {
    ct.addEventListener('mouseenter', ctHover)
    ct.addEventListener('mouseleave', ctLeave)
    lt.addEventListener('mouseenter', ltHover)
    lt.addEventListener('mouseleave', ltLeave)
    rt.addEventListener('mouseenter', rtHover)
    rt.addEventListener('mouseleave', rtLeave)
}

// 对应位置块体动画函数 Corresponding position block body animation function
function ctHover() {
    this.style.transform = `rotateY(${deg_arr[1]}deg) translateZ(300px) scale(1.05)`
    document.querySelector('.right').style.transform = `rotateY(${deg_arr[2]}deg) translateZ(300px) scale(1.05)`
    document.querySelector('.left').style.transform = `rotateY(${deg_arr[0]}deg) translateZ(300px) scale(1.05)`
}

function ctLeave() {
    this.style.transform = `rotateY(${deg_arr[1]}deg) translateZ(250px)`
    document.querySelector('.right').style.transform = `rotateY(${deg_arr[2]}deg) translateZ(250px)`
    document.querySelector('.left').style.transform = `rotateY(${deg_arr[0]}deg) translateZ(250px)`
}

function ltHover() {
    this.style.transform = `rotateY(${deg_arr[0]}deg) translateZ(250px) scale(1.05)`
    this.style.border = `5px solid #ffffff`
}

function ltLeave() {
    this.style.transform = `rotateY(${deg_arr[0]}deg) translateZ(250px)`
    this.style.border = `3px solid #a0a0a034`
}

function rtHover() {
    this.style.transform = `rotateY(${deg_arr[2]}deg) translateZ(250px) scale(1.05)`
    this.style.border = `5px solid #ffffff`
}

function rtLeave() {
    this.style.transform = `rotateY(${deg_arr[2]}deg) translateZ(250px)`
    this.style.border = `3px solid #a0a0a034`
}

// 模拟用户滚轮行为函数 Simulate user wheel behavior function
function rt_left() {
    window.dispatchEvent(
        new WheelEvent(
            'wheel', {
                deltaY: -30
            }
        )
    )
}

function rt_right() {
    window.dispatchEvent(
        new WheelEvent(
            'wheel', {
                deltaY: 30
            }
        )
    )
}

// 提示栏动画循环 Toasted bar animation loop
const a = document.querySelector('nav')
let i = j = 0
let set_id = setInterval(() => {
    if (j === 8) {
        a.classList.add('clear')
        clearInterval(set_id)
    }

    if (i === 0) {
        a.innerHTML = `&lt;&lt; 上下滚动滚轮或点击下方按钮以切换展示页 &gt;&gt;`
        i++
    } else if (i === 1) {
        a.innerHTML = `&lt;&lt;&lt; 上下滚动滚轮或点击下方按钮以切换展示页 &gt;&gt;&gt;`
        i++
    } else {
        a.innerHTML = `&lt; 上下滚动滚轮或点击下方按钮以切换展示页 &gt;`
        i = 0
    }
    j++
}, 700)