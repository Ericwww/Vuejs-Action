var app = new Vue({
    el: '#app',
    data: {
        list: [{
                prop: 'Electronic',
                product: [{
                        id: 1,
                        name: 'iPhone 7',
                        price: 6188,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 2,
                        name: 'iPad Pro',
                        price: 5888,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 3,
                        name: 'Macbook Pro',
                        price: 21488,
                        count: 1,
                        checked: false
                    }
                ]
            },
            {
                prop: 'Life',
                product: [{
                    id: 1,
                    name: 'Shower',
                    price: 30,
                    count: 1,
                    checked: false
                }]
            },
            {
                prop: 'Vegetable',
                product: [{
                    id: 1,
                    name: 'Apple',
                    price: 3,
                    count: 1,
                    checked: false
                },]
            }
        ]
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                if (item.checked) {
                    total += item.price * item.count;
                }
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        handleReduce: function (index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
        },
        selectAll: function () {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].checked = true;
            }
        }
    },
})