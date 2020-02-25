var junil = junil || {};
(function () {
    let timerList = []
    // DOM 함수
    const all = ele => document.querySelectorAll(ele)
    const one = ele => document.querySelector(ele)
    const addClass = (ele, addClassName) => {
        const classList = ele.className.split(' ')
        const index = classList.indexOf(addClassName)
        if (index === -1) {
            classList.push(addClassName)
            ele.className = classList.join(' ')
        }
    }
    const removeClass = (ele, removeClassName) => {
        const classList = ele.className.split(' ')
        const index = classList.indexOf(removeClassName)
        if (index !== -1) {
            classList.splice(index, 1)
            ele.className = classList.join(' ')
        }
    }
    // animation plugin
    class Animation {
        constructor(option) {
            /* set variable */
            this.delay = 30
            this.lastTimer = 0
            this.playTarget = one(option.playTarget)
            this.reverse = option.reverse || false
            this.callback = option.callback || function () { }
            /* start play */
            this.play()
        }
        find(ele) { return this.playTarget.querySelectorAll(ele) }
        play() {
            this.clear()
            let timer = 0
            const seq = this.reverse ? this.find('.target-reverse') : this.find('.animation')
            const len = seq.length
            seq.forEach((ele, index) => {
                timerList.push(setTimeout(_ => {
                    if (this.reverse) {
                        const target = seq[len - index - 1]
                        addClass(target, 'animationBefore')
                        addClass(target, 'type2')
                        removeClass(target, 'target-reverse')
                    } else {
                        removeClass(ele, 'animationBefore')
                        removeClass(ele, 'type2')
                        addClass(ele, 'target-reverse')
                    }
                }, timer))
                timer += this.delay
            })
            this.lastTimer = timer
            setTimeout(this.callback, this.lastTimer + 1000)
        }
        clear() {
            timerList.forEach(element => { clearTimeout(element) })
            timerList = []
        }
        static init() {
            all('.animation').forEach(ele => addClass(ele, 'animationBefore'))
            timerList = []
            Animation.styleSet()
        }
        static styleSet() {
            const style = document.createElement('style')
            style.innerHTML = `
        .animation{opacity:1;transform:inherit;transition:1s}
        .animation.animationBefore{opacity:0;transform:scale(0);transition:0s}
        .animation.animationBefore.top2btm{transform:translateY(-100px)}
        .animation.animationBefore.btm2top{transform:translateY(100px)}
        .animation.animationBefore.left2right{transform:translateX(-100px)}
        .animation.animationBefore.right2left{transform:translateX(100px)}
        .animation.animationBefore.big2small{transform:scale(2, 2)}
        .animation.animationBefore.type2{transition:1s}
      `
            one('head').appendChild(style)
        }
    }
    window.onload = _ => {
        Animation.init()
    }
    junil.Animation = Animation
