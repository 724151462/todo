import Vue from 'vue'

const ChildComponent = {
  name: 'test',
  data() {
    return {
      value: 'value:v-bind  '
    }
    
  },
  template: 
  `<div>123
    <slot name="x"></slot>
    <slot :value="value" aaa="fff"></slot>
    <slot name="s"></slot>
  </div>`,
  inject: ['yeye', 'data'],
  mounted () {
    // console.log(this.yeye, this.value)
  }
}

// new Vue({
//   el: "#root",
//   components: {"cc":ChildComponent},
//   template: `<div>
//     <cc><span slot="x">rwqr</span></cc>
//   </div>`
// })

new Vue({
  el: "#root",
  data: {
    sss: 'ttt'
  },
  components: {"cc":ChildComponent},
  template: `<div>
    <cc>
      <p slot-scope="props">slot-scope具名插槽props：{{props.value}}{{props.aaa}}</p>
      <p slot="s">data上的sss：{{sss}}</p>
    </cc>
  </div>`
})


// const ChildComponent = {
//   template: '<div>child component: {{data.value}}</div>',
//   inject: ['yeye', 'data'],
//   mounted () {
//     // console.log(this.yeye, this.value)
//   }
// }

// const component = {
//   name: 'comp',
//   components: {
//     ChildComponent
//   },
//   // template: `
//   //   <div :style="style">
//   //     <div class="header">
//   //       <slot name="header"></slot>
//   //     </div>
//   //     <div class="body">
//   //       <slot name="body"></slot>
//   //     </div>
//   //   </div>
//   // `,
//   template: `
//     <div :style="style">
//       <slot :value="value" aaa="111"></slot>
//       <child-component />
//     </div>
//   `,
//   data () {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       },
//       value: 'component value'
//     }
//   }
// }

// new Vue({
//   components: {
//     CompOne: component
//   },
//   provide () {
//     const data = {}

//     Object.defineProperty(data, 'value', {
//       get: () => this.value,
//       enumerable: true
//     })

//     return {
//       yeye: this,
//       data
//     }
//   },
//   el: '#root',
//   data () {
//     return {
//       value: '123'
//     }
//   },
//   mounted () {
//     console.log(this.$refs.comp.value, this.$refs.span)
//   },
//   template: `
//     <div>
//       <comp-one ref="comp">
//         <span slot-scope="props" ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
//       </comp-one>
//       <input type="text" v-model="value" />
//     </div>
//   `
// })

