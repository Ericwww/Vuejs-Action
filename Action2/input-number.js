function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '\
        <div class="input-number"> \
            <input type="text" :value="currentValue" @change="handleChange" ref="input" @keydown="keyDown($event)"> \
            <button @click="handleDown" :disabled="currentValue <= min">-</button> \
            <button @click="handleUp" :disabled="currentValue >= max">+</button> \
        </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        },
        step:{
            type:Number,
            default:10
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('onchange', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;

                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
        keyDown:function(ev){
            if(ev.keyCode==38){
                this.handleUp();
            }else if (ev.keyCode==40) {
                this.handleDown();
            }
        }

    },
    mounted: function () {
        this.updateValue(this.value);
        this.$refs.input.focus();
    }
});
/*
若想实现功能，为input增加@keydown="keyDown($event)"，并增加keyDown来判断按下的按键即可实现
这里我们还增加了 ref="input" 和在mounted中增加this.$refs.input.focus()来监听输入框的聚焦
这样可以在网页挂载后自动聚焦输入框
*/